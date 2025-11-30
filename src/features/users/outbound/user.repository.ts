import { type User, type UserRepository } from './../domain/user.entity';

export class SimpleUserRepository implements UserRepository {
    private users: User[] = [];
    
    async createUser(user: User): Promise<void> {
        this.users.push(user);
    }

    async updateUser(user: User): Promise<void> {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            this.users[index] = user;
        }
    }

    async findUserById(userId: string): Promise<User | null> {
        const user = this.users.find(u => u.id === userId);
        return user || null;
    }

    async deleteUser(userId: string): Promise<void> {
        const index = this.users.findIndex(u => u.id === userId);
        if (index !== -1) {
            this.users.splice(index, 1);
        }
    }

    async findByemail(email: string): Promise<User | null> {
        const user = this.users.find(u => u.email === email);
        return user || null;
    }

    async getAllUsers(): Promise<User[]> {
        return [...this.users];
    }
}
