import { IUser } from "../models/userModel";
import UserModel from '../models/userModel';

export interface IUserRepository {
    createUser(userData: Partial<IUser>): Promise<IUser>;

    getUserById(id: string): Promise<IUser | null>;

    getUserByEmail(email: string): Promise<IUser | null>;

    getUserByUsername(username: string): Promise<IUser | null>;

    updateUserById(id: string, userData: Partial<IUser>): Promise<IUser | null>;
}

class UserRepository implements IUserRepository {
    async createUser(userData: Partial<IUser>): Promise<IUser> {
        const user = new UserModel(userData);
        await user.save();
        return user;
    }

    async getUserById(id: string): Promise<IUser | null> {
        return await UserModel
            .findById(id)
            .exec();
    }

    async getUserByEmail(email: string): Promise<IUser | null> {
        return await UserModel
            .findOne({ email })
            .exec();
    }

    async getUserByUsername(username: string): Promise<IUser | null> {
        return await UserModel
            .findOne({ username })
            .exec();
    }

    async updateUserById(id: string, userData: Partial<IUser>): Promise<IUser | null> {
        return await UserModel
            .findByIdAndUpdate(id, userData, { new: true });
    }
}

export default UserRepository;