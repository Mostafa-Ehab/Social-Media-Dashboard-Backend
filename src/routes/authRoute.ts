import express from 'express'
import { IAuthController } from '../controllers/authController';
import { IAuthMiddleware } from '../middlewares/authMiddleware';

export function authRoute(authController: IAuthController, authMiddleware: IAuthMiddleware): express.Router {
    const router = express.Router();

    router.post("/register", authController.registerController);
    router.post("/login", authController.loginController);

    return router;
}

export default authRoute