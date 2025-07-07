import { IUser } from "../models/userModel";
import { IUserRepository } from "../repositories/userRepository";
import { NotFoundException } from "../exceptions/notFoundException";
import { BadRequestException } from "../exceptions/badRequestException";
import { ConflictException } from "../exceptions/conflictException";

export interface IUserService {
    getMyProfile(userId: string): Promise<IUser>;
    updateUserById(userId: string, newUser: Partial<IUser>): Promise<IUser>;
    updateEmail(userId: string, email: string): Promise<IUser>;
}

class UserService implements IUserService {
    constructor(
        private readonly userRepository: IUserRepository
    ) { }

    async getMyProfile(userId: string): Promise<IUser> {
        const user = await this.userRepository.getUserById(userId);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return user as IUser;
    }

    async updateUserById(userId: string, newUser: Partial<IUser>): Promise<IUser> {
        const user = await this.userRepository.getUserById(userId);
        if (!user) {
            throw new NotFoundException("User not found");
        }

        if (newUser.username && newUser.username !== user.username) {
            const existingUser = await this.userRepository.getUserByUsername(newUser.username);
            if (existingUser) {
                throw new BadRequestException("Username already exists");
            }
        }

        const updatedUser = await this.userRepository.updateUserById(userId, newUser);
        return updatedUser as IUser;
    }

    async updateEmail(userId: string, email: string): Promise<IUser> {
        const user = await this.userRepository.getUserById(userId);
        if (!user) {
            throw new NotFoundException("User not found");
        }

        const existingUser = await this.userRepository.getUserByEmail(email);
        if (existingUser && String(existingUser.id) !== userId) {
            throw new ConflictException("Email already exists");
        }

        const userProfile = await this.userRepository.updateUserById(userId, { email });
        return userProfile as IUser;
    }
}

export default UserService;