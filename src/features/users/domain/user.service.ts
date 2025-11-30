import bcrypt from "bcrypt";
import { createJwtToken, verifyJwtToken } from "../../../lib/auth";
import type { EmailSender } from "../../messaging/domain/email.model";
import { User, type UserRepository, UserRole } from "./user.entity";

type CreateUserInput = {
    email: string;
    password: string;
    username?: string;
};

export type LoginOutput = { token: string };

export class UserService {
    private repo: UserRepository;
    private emailSender?: EmailSender;

    constructor(repo: UserRepository, emailSender?: EmailSender) {
        this.repo = repo;
        this.emailSender = emailSender;
    }

    async createUser(user: CreateUserInput): Promise<User> {
        const existingUser = await this.repo.findByemail(user.email);
        if (existingUser != null) {
            throw new Error("ERR_EMAIL_ALREADY_TAKEN");
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        // Le modèle User du projet exige username; par défaut on utilise l'email si non fourni.
        const username = user.username ?? user.email;
        const entity = new User(crypto.randomUUID(), username, user.email, hashedPassword, UserRole.USER);
        await this.repo.createUser(entity);

        if (this.emailSender) {
            await this.emailSender.sendEmail({
                to: entity.email,
                subject: "Bienvenue sur l'application",
                message: `Bonjour ${username} ! Votre compte a été créé avec succès. Vous pouvez désormais vous connecter à l'application.`,
            });
        }

        return entity;
    }

    verifyToken(token: string): { id: string; email: string; role: UserRole } | null {
        const decoded = verifyJwtToken(token);
        if (decoded == null) return null;
        // decoded contient { id, email, role }
        return decoded as { id: string; email: string; role: UserRole };
    }

    async deleteUser(id: string): Promise<void> {
        return this.repo.deleteUser(id);
    }

    async loginUser(email: string, password: string): Promise<LoginOutput | null> {
        const user = await this.repo.findByemail(email);
        if (!user) return null;

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = createJwtToken(user.id, user.email, user.role ?? UserRole.USER);
            return { token };
        } else {
            return null;
        }
    }
}
