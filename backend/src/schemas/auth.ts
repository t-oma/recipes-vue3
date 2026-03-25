import z from "zod/v4";

export const registerSchema = z.object({
    name: z
        .string()
        .refine((val) => val.length >= 3, {
            error: "Too short!",
        })
        .refine((val) => val.length < 100, {
            error: "Too long!",
        }),
    email: z.email(),
    password: z
        .string()
        .refine((val) => val.length > 6, {
            error: "Too short!",
        })
        .refine((val) => val.length <= 72, {
            error: "Too long!",
        })
        .refine((val) => val.match(/[A-Z]+/), {
            error: "Must contain capital letter",
        })
        .refine((val) => val.match(/[a-z]+/), {
            error: "Must contain lowercase letter",
        })
        .refine((val) => val.match(/[0-9]+/), {
            error: "Must contain number",
        }),
});

export const loginSchema = registerSchema.omit({
    name: true,
});
