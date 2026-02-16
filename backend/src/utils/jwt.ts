import jwt, { SignOptions } from "jsonwebtoken";
import { JwtPayload } from "../types/express";

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";

export const generateToken = (
    payload: JwtPayload
): string => {
    const options: SignOptions = {
        expiresIn:
            JWT_EXPIRES_IN as SignOptions["expiresIn"],
    };

    return jwt.sign(
        payload,
        process.env.JWT_SECRET!,
        options
    );
};

export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(
        token,
        process.env.JWT_SECRET!
    ) as JwtPayload;
};
