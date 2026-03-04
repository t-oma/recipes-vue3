import User from "@/repositories/models/User";

import type {
    CreateUserData,
    IUserRepository,
} from "@/repositories/interfaces/IUserRepository";

export const createMongooseUserRepository =
    (): IUserRepository => ({
        findByEmail: async (email: string) => {
            return User.findOne({ email });
        },

        findById: async (id: string) => {
            return User.findById(id);
        },

        create: async (data: CreateUserData) => {
            return User.create(data);
        },
    });
