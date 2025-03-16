import JWT from "jsonwebtoken"
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedException } from "../exceptions/unauthorizedException";
import { IUserRepository } from "../repositories/userRepository";

export interface IAuthMiddleware {
    loginRequired(req: Request, res: Response, next: NextFunction): Promise<void>;
}

class AuthMiddleware implements IAuthMiddleware {
    constructor(private readonly userRepository: IUserRepository) { }

    loginRequired = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (process.env.JWT_SECRET) {
                if (req.headers.authorization) {
                    try {
                        const user = JWT.verify(
                            req.headers.authorization.replace('Bearer ', '').trim(),
                            process.env.JWT_SECRET
                        ) as { userId: string, companyId: string | null }
                        req.user = await this.userRepository.getUserById(user.userId)


                        return next();
                    } catch (err) {
                        if (err instanceof JWT.TokenExpiredError) {
                            throw new UnauthorizedException("Token expired", 401101);
                        }
                    }
                }
                throw new UnauthorizedException();
            }
            throw new Error("Can't find JWT_SECRET");
        } catch (err) {
            next(err);
        }
    }
}

export default AuthMiddleware
