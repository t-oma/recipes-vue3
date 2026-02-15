import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export const USER_DOCUMENT_NAME = "User";

export default mongoose.model<IUser>(
    USER_DOCUMENT_NAME,
    userSchema
);
