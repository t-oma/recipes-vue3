import type { IUser } from "@/repositories/models/User";

export interface CreateUserData {
    email: string;
    password: string;
    name: string;
}

export interface IUserRepository {
    findByEmail(email: string): Promise<IUser | null>;
    findById(id: string): Promise<IUser | null>;
    create(data: CreateUserData): Promise<IUser>;
}
