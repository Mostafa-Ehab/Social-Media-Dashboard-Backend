import { generateAccessToken, generateRefreshToken } from "../utils/authUtils";
import { UnauthorizedException } from "../exceptions/unauthorizedException";
import { IUserRepository } from "../repositories/userRepository";
import { IUser } from "../models/userModel";
import { BadRequestException } from "../exceptions/badRequestException";

export interface IAuthService {
    userLogin(email: string, password: string): Promise<{
        userId: string;
        username: string;
        email: string;
        accessToken: string;
        refreshToken: string;
    }>;
    userRegister(user: IUser): Promise<IUser>;
    refreshToken(refreshToken: string, userId: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
};

class AuthService implements IAuthService {
    constructor(private readonly userRepository: IUserRepository) { }

    async userLogin(email: string, password: string): Promise<{
        userId: string;
        username: string;
        email: string;
        accessToken: string;
        refreshToken: string;
    }> {
        const user = await this.userRepository.getUserByEmail(email);

        if (user && await user.passwordMatch(password)) {
            const refreshToken = generateRefreshToken(String(user.id));
            const accessToken = generateAccessToken(String(user.id));
            await this.userRepository.updateUserById(String(user.id), {
                refreshToken: [refreshToken, ...(user.refreshToken || [])]
            });
            return {
                userId: String(user.id),
                username: user.username,
                email: user.email,
                accessToken: accessToken,
                refreshToken: refreshToken
            }
        }

        throw new UnauthorizedException("Incorrect email or password");
    }

    async userRegister(user: IUser): Promise<IUser> {
        if (!user.email || !user.password) {
            throw new BadRequestException("Email and password are required");
        }

        if (await this.userRepository.getUserByEmail(user.email)) {
            throw new BadRequestException("Email already exists");
        }

        user.username = user.email.split('@')[0];
        while (await this.userRepository.getUserByUsername(user.username)) {
            user.username = `${user.username}${Math.floor(Math.random() * 100000)}`;
        }

        await this.userRepository.createUser(user);

        // TODO: Send email

        return user;
    }

    async refreshToken(refreshToken: string, userId: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }> {
        const user = await this.userRepository.getUserById(userId);
        if (!user) {
            throw new UnauthorizedException("Invalid user ID");
        }

        if (!refreshToken || !user.refreshToken || !user.refreshToken.includes(refreshToken)) {
            throw new UnauthorizedException("Invalid refresh token");
        }

        const newAccessToken = generateAccessToken(String(user.id));
        const newRefreshToken = generateRefreshToken(String(user.id));

        await this.userRepository.updateUserById(String(user.id), {
            refreshToken: [newRefreshToken, ...user.refreshToken.filter(token => token !== refreshToken)]
        });

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        }
    }
}

export default AuthService;