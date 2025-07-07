import express from 'express'
import { IAuthMiddleware } from '../middlewares/authMiddleware';
import { IUserController } from '../controllers/userController';

export function userRoute(userController: IUserController, authMiddleware: IAuthMiddleware): express.Router {
    const router = express.Router();

    router.get("/me", authMiddleware.loginRequired, userController.getMeController);
    router.put("/edit/personal-info", authMiddleware.loginRequired, userController.updatePersonalInfoController);
    router.put("/edit/email", authMiddleware.loginRequired, userController.updateEmailController);

    return router;
}

export default userRoute