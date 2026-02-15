import { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod/v4";

export const validate = <ZT extends ZodType>(
    schema: ZT
) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            res.status(400).json({
                error: "Validation failed",
                details: result.error.issues.map((e) => ({
                    field: e.path.join("."),
                    message: e.message,
                })),
            });
            return;
        }

        next();
    };
};
