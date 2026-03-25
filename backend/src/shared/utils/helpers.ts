import type { IUser } from "../repositories/models/User";

export function isUser(author: unknown): author is IUser {
    return (
        typeof author === "object" &&
        author !== null &&
        "_id" in author &&
        "name" in author &&
        (author as IUser)._id !== undefined &&
        (author as IUser).name !== undefined
    );
}
