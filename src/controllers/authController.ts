import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/userModel";
import { IAuthService } from "../services/authService";
import { BadRequestException } from "../exceptions/badRequestException";
import { validateEmail } from "../utils/authUtils";

export interface IAuthController {
    registerController(req: Request, res: Response, next: NextFunction): Promise<any>;
    loginController(req: Request, res: Response, next: NextFunction): Promise<any>;
    changePasswordController(req: Request, res: Response, next: NextFunction): Promise<any>;
    refreshTokenController(req: Request, res: Response, next: NextFunction): Promise<any>;
}

class AuthController implements IAuthController {
    constructor(private readonly authService: IAuthService) { }

    loginController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const {
                email = String(req.body.email).toLowerCase().trim(),
                password
            } = req.body;

            if (!email) {
                throw new BadRequestException("Email is required");
            }

            if (!validateEmail(email)) {
                throw new BadRequestException("Invalid email");
            }

            if (!password) {
                throw new BadRequestException("Password is required");
            }

            const user = await this.authService.userLogin(email, password) as {
                username: string,
                email: string,
                accessToken: string,
                refreshToken: string
            };

            return res.status(200).send(user);
        } catch (err) {
            next(err);
        }
    }

    registerController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { username, email, password } = req.body;

            if (!username) {
                throw new BadRequestException("First name is required");
            }


            if (!email) {
                throw new BadRequestException("Email is required");
            }

            if (!validateEmail(email)) {
                throw new BadRequestException("Invalid email");
            }

            if (!password) {
                throw new BadRequestException("Password is required");
            }

            const newUser = {
                username,
                email: String(email).toLowerCase().trim(),
                password
            } as IUser;

            await this.authService.userRegister(newUser);
            const data = await this.authService.userLogin(email, password)

            return res.status(200).send(data);
        } catch (err) {
            next(err);
        }
    }

    changePasswordController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { oldPassword, newPassword, refreshToken } = req.body;
            const user = req.user as IUser;

            if (!oldPassword) {
                throw new BadRequestException("Old password is required");
            }

            if (!newPassword) {
                throw new BadRequestException("New password is required");
            }

            if (oldPassword === newPassword) {
                throw new BadRequestException("Old password and new password cannot be the same");
            }

            const data = await this.authService.changePassword(user, oldPassword, newPassword, refreshToken);

            return res.status(200).send(data);
        } catch (err) {
            next(err);
        }
    }


    refreshTokenController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { refreshToken, userId } = req.body;

            const data = await this.authService.refreshToken(refreshToken, userId);

            return res.status(200).send(data);
        } catch (err) {
            next(err);
        }
    }
}

export default AuthController