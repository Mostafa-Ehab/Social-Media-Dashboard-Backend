import { DIContainer } from 'rsdi';
import { IDIContainer } from 'rsdi/dist/types';
import AuthController, { IAuthController } from '../controllers/authController';
import AuthMiddleware, { IAuthMiddleware } from '../middlewares/authMiddleware';
import UserRepository, { IUserRepository } from '../repositories/userRepository';
import AuthService, { IAuthService } from '../services/authService';
import AnalyticsService, { IAnalyticsService } from '../services/analyticsService';
import AnalyticsController, { IAnalyticsController } from '../controllers/analyticsController';
import PlatformRepository, { IPlatformRepository } from '../repositories/platformRepository';
import UserPlatformRepository, { IUserPlatformRepository } from '../repositories/userPlatformRepository';
import PlatformService, { IPlatformService } from '../services/platformService';
import PlatformController, { IPlatformController } from '../controllers/platformController';

export default function configureDI(): IDIContainer<{
    authController: IAuthController;
    authMiddleware: IAuthMiddleware;
    analyticsController: IAnalyticsController;
    platformController: IPlatformController;
}> {
    return new DIContainer()
        // Repositories
        .add("userRepository", (): IUserRepository => new UserRepository())
        .add("platformRepository", (): IPlatformRepository => new PlatformRepository())
        .add("userPlatformRepository", (): IUserPlatformRepository => new UserPlatformRepository())

        // Application services
        .add(
            'authService', ({ userRepository }): IAuthService =>
            new AuthService(userRepository)
        )
        .add(
            'analyticsService', ({ platformRepository }): IAnalyticsService =>
            new AnalyticsService(platformRepository)
        )
        .add(
            'platformService', ({ platformRepository, userPlatformRepository }): IPlatformService =>
            new PlatformService(platformRepository, userPlatformRepository)
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
        )
        .add(
            'platformController', ({ platformService }): IPlatformController =>
            new PlatformController(platformService)
        );
}
