import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/userModel";
import { IAuthService } from "../services/authService";
import { BadRequestException } from "../exceptions/badRequestException";
import { validateEmail } from "../utils/authUtils";

export interface IAuthController {
    registerController(req: Request, res: Response, next: NextFunction): Promise<any>;
    loginController(req: Request, res: Response, next: NextFunction): Promise<any>;
    refreshTokenController(req: Request, res: Response, next: NextFunction): Promise<any>;
}

class AuthController implements IAuthController {
    constructor(private readonly authService: IAuthService) { }

    loginController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { email, password } = req.body;

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
                email,
                password
            } as IUser;

            await this.authService.userRegister(newUser);
            const data = await this.authService.userLogin(email, password)

            return res.status(200).send(data);
        } catch (err) {
            next(err);
        }
    }

    refreshTokenController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { refreshToken } = req.body;
            const { userId, companyId } = req.params;

            const data = await this.authService.refreshToken(refreshToken, userId, companyId);

            return res.status(200).send(data);
        } catch (err) {
            next(err);
        }
    }
}

export default AuthController