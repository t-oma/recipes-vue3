import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService";
import { createError } from "../middleware/errorHandler";

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            throw createError(
                "Email, password, and name are required",
                400
            );
        }

        const result = await authService.register({
            email,
            password,
            name,
        });
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw createError(
                "Email and password are required",
                400
            );
        }

        const result = await authService.login({
            email,
            password,
        });
        res.json(result);
    } catch (error) {
        next(error);
    }
};
