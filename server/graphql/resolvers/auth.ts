import User from "../../models/user";
import Permission from "../../models/permission";
import {
    Arg,
    Ctx,
    FieldResolver,
    Mutation,
    Query,
    Resolver,
    Root,
} from "type-graphql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { RegisterOutput } from "../../types/ResisterOutPut";
import { RegisterInput } from "../../types/RegisterInput";

interface User {
    username: string;
    password: string;
    error: string;
}
interface updatedUser {
    username: string;
    password: string;
    newPassword: string;
}

interface resetUser {
    username: string;
}
interface argument {
    userInputs: [User];
}

const resolvers = {
    Query: {
        hello: () => {
            return "hehe";
        },
        hii: () => {
            return "hello world";
        },
    },
    Mutation: {
        async createSellerAccount(args: argument) {
            try {
                let result = await Promise.all(
                    args.userInputs.map(async (user) => {
                        const { username, password } = user;
                        const existingUser = await User.findOne({ username });
                        if (existingUser) {
                            user.error = "User exist";
                            return user;
                        }
                        // const hashedPassword = bcrypt.hash(password, 10);
                        const anUser = await new User({
                            username,
                            password: password,
                            defaultPassword: password,
                            permission: `${process.env.SELLER}`,
                            state: true,
                        });
                        await anUser.save();
                        return user;
                    })
                );
                return result;
            } catch (err) {
                throw err;
            }
        },
        async login(args: User) {
            try {
                const user = await User.findOne({ username: args.username });
                if (!user) throw new Error("Username does not exist");
                const passwordIsValid = args.password === user.password;
                if (!passwordIsValid) throw new Error("Password incorrect");
                const token = jwt.sign(
                    { id: user._id },
                    `${process.env.SECRET_STRING}`
                );
                return { token, password: null, ...user._doc };
            } catch (error) {
                throw error;
            }
        },
        async changePassword(updatedUser: updatedUser) {
            try {
                const user = await User.findOne({
                    username: updatedUser.username,
                });
                if (!user) throw new Error("Username does not exist");
                const passwordIsValid = user.password === updatedUser.password;
                if (!passwordIsValid) throw new Error("Password incorrect");
                const newUser = await User.findOneAndUpdate(
                    {
                        username: updatedUser.username,
                    },
                    {
                        password: updatedUser.newPassword,
                    },
                    { new: true }
                );
                return { username: newUser.username };
            } catch (error) {
                throw error;
            }
        },
        async resetPassword(resetUser: User) {
            try {
                const user = await User.findOne({
                    username: resetUser.username,
                });
                if (!user) throw new Error("Username does not exist");
                const newUser = await User.findOneAndUpdate(
                    {
                        username: resetUser.username,
                    },
                    {
                        password: user.defaultPassword,
                    },
                    { new: true }
                );
                return { username: newUser.username };
            } catch (error) {
                throw error;
            }
        },
    },
};

export default resolvers;
