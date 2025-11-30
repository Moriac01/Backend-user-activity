import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret";

export function createJwtToken(id: string, email: string, role: string) {
    return jwt.sign({ id, email, role }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyJwtToken(token: string): { id: string; email: string; role: string } | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };
        return decoded;
    } catch (e) {
        return null;
    }
}
