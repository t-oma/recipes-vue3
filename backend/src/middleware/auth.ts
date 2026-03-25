import { NextFunction, Request, Response } from "express";
import { verifyToken } from "@/shared/utils/jwt";

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const authHeader = req.headers.authorization;

        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {
            res.status(401).json({
                error: "Access token required",
            });
            return;
        }

        const token = authHeader.substring(7);
        const decoded = verifyToken(token);

        req.user = decoded;
        next();
    } catch {
        res.status(401).json({
            error: "Invalid or expired token",
        });
    }
};
