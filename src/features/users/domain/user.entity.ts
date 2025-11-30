export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export class User {
    constructor(
        public id: string,
        public username: string,
        public email: string,
        public password: string,
        public role: UserRole = UserRole.USER,
    ) {}
}

export interface UserRepository {
  createUser(user: User): Promise<void>;
  updateUser(user: User): Promise<void>;
  findUserById(userId: string): Promise<User | null>;
  deleteUser(userId: string): Promise<void>;
  findByemail(email: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
}