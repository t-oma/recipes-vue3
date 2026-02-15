import User from "../models/User";
import {
    hashPassword,
    comparePassword,
} from "../utils/password";
import { generateToken } from "../utils/jwt";
import { createError } from "../middleware/errorHandler";

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
    user: {
        id: string;
        email: string;
        name: string;
    };
}

export const register = async (
    data: RegisterData
): Promise<AuthResponse> => {
    const { email, password, name } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw createError(
            "User with this email already exists",
            409
        );
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
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
};

export const login = async (
    data: LoginData
): Promise<AuthResponse> => {
    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) {
        throw createError("Invalid email or password", 401);
    }

    const isPasswordValid = await comparePassword(
        password,
        user.password
    );
    if (!isPasswordValid) {
        throw createError("Invalid email or password", 401);
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
};
