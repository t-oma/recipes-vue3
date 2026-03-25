import { NextFunction, Request, Response } from "express";

import type { AuthService } from "@/services/authService";

export const createAuthController = (
    authService: AuthService
) => ({
    register: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { email, password, name } = req.body;

            const result = await authService.register({
                email,
                password,
                name,
            });
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    },

    login: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { email, password } = req.body;

            const result = await authService.login({
                email,
                password,
            });
            res.json(result);
        } catch (error) {
            next(error);
        }
    },
});
