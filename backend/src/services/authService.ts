import { createError } from "@/middleware/errorHandler";
import { generateToken } from "@/utils/jwt";
import {
    comparePassword,
    hashPassword,
} from "@/utils/password";

import type { IUserRepository } from "@/repositories/interfaces/IUserRepository";
import type { IUser } from "@/repositories/models/User";
import type { Prettify } from "@/types/utility";

export interface RegisterData {
    email: string;
    password: string;
    name: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: Prettify<
        Pick<IUser, "email" | "name"> & { id: string }
    >;
}

export type AuthService = ReturnType<
    typeof createAuthService
>;

export const createAuthService = (
    userRepo: IUserRepository
) => ({
    register: async (
        data: RegisterData
    ): Promise<AuthResponse> => {
        const { email, password, name } = data;

        const existingUser =
            await userRepo.findByEmail(email);
        if (existingUser) {
            throw createError(
                "User with this email already exists",
                409
            );
        }

        const hashedPassword = await hashPassword(password);

        const user = await userRepo.create({
            email,
            password: hashedPassword,
            name,
        });

        const token = generateToken({
            userId: user._id.toString(),
            email: user.email,
        });

        return {
            token,
            user: {
                id: user._id.toString(),
                email: user.email,
                name: user.name,
            },
        };
    },

    login: async (
        data: LoginData
    ): Promise<AuthResponse> => {
        const { email, password } = data;

        const user = await userRepo.findByEmail(email);
        if (!user) {
            throw createError(
                "Invalid email or password",
                401
            );
        }

        const isPasswordValid = await comparePassword(
            password,
            user.password
        );
        if (!isPasswordValid) {
            throw createError(
                "Invalid email or password",
                401
            );
        }

        const token = generateToken({
            userId: user._id.toString(),
            email: user.email,
        });

        return {
            token,
            user: {
                id: user._id.toString(),
                email: user.email,
                name: user.name,
            },
        };
    },
});
