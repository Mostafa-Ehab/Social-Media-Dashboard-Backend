import { DIContainer } from 'rsdi';
import { IDIContainer } from 'rsdi/dist/types';
import AuthController, { IAuthController } from '../controllers/authController';
import AuthMiddleware, { IAuthMiddleware } from '../middlewares/authMiddleware';
import UserRepository, { IUserRepository } from '../repositories/userRepository';
import AuthService, { IAuthService } from '../services/authService';
import AnalyticsService, { IAnalyticsService } from '../services/analyticsService';
import AnalyticsController, { IAnalyticsController } from '../controllers/analyticsController';

export default function configureDI(): IDIContainer<{
    authController: IAuthController;
    authMiddleware: IAuthMiddleware;
    analyticsController: IAnalyticsController;
}> {
    return new DIContainer()
        // Repositories
        .add("userRepository", (): IUserRepository => new UserRepository())

        // Application services
        .add(
            'authService', ({ userRepository }): IAuthService =>
            new AuthService(userRepository)
        )
        .add(
            'analyticsService', (): IAnalyticsService =>
            new AnalyticsService()
        )

        //Middlewares
        .add(
            "authMiddleware", ({ userRepository }): IAuthMiddleware =>
            new AuthMiddleware(userRepository)
        )

        // Controllers
        .add(
            'authController', ({ authService }): IAuthController =>
            new AuthController(authService)
        )
        .add(
            'analyticsController', ({ analyticsService }): IAnalyticsController =>
            new AnalyticsController(analyticsService)
        );
}
