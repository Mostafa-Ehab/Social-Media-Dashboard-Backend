import e, { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../exceptions/badRequestException';
import { IUserService } from '../services/userService';

export interface IUserController {
    getMeController(req: Request, res: Response, next: NextFunction): Promise<any>;
    updatePersonalInfoController(req: Request, res: Response, next: NextFunction): Promise<any>;
    updateEmailController(req: Request, res: Response, next: NextFunction): Promise<any>;
}

class UserController implements IUserController {
    constructor(private readonly userService: IUserService) { }

    getMeController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userID = req.user.id;
            const response = await this.userService.getMyProfile(userID);

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };

    updatePersonalInfoController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id;

            const newUser = {
                username: req.body.username
            };

            const response = await this.userService.updateUserById(userId, newUser);

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };

    updateEmailController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id;
            const email = String(req.body.email).toLowerCase().trim();

            if (!email) {
                throw new BadRequestException('Email is required');
            }

            const response = await this.userService.updateEmail(userId, email);

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };
}

export default UserController;