import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                email: string;
            };
        }
    }
}

export interface JwtPayload {
    userId: string;
    email: string;
}

export interface AuthRequest extends Request {
    user?: JwtPayload;
}
