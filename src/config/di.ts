import { DIContainer } from 'rsdi';
import { IDIContainer } from 'rsdi/dist/types';
import AuthController, { IAuthController } from '../controllers/authController';
import AuthMiddleware, { IAuthMiddleware } from '../middlewares/authMiddleware';
import UserRepository, { IUserRepository } from '../repositories/userRepository';
import AuthService, { IAuthService } from '../services/authService';

export default function configureDI(): IDIContainer<{
    authController: IAuthController;
    authMiddleware: IAuthMiddleware;
}> {
    return new DIContainer()
        // Repositories
        .add("userRepository", (): IUserRepository => new UserRepository())

        // Application services
        .add(
            'authService', ({ userRepository }): IAuthService =>
            new AuthService(userRepository))

        //Middlewares
        .add(
            "authMiddleware", ({ userRepository }): IAuthMiddleware =>
            new AuthMiddleware(userRepository)
        )

        // Controllers
        .add(
            'authController', ({ authService }): IAuthController =>
            new AuthController(authService)
        );
}
