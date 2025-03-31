import express from 'express';
import { IAnalyticsController } from '../controllers/analyticsController';
import { IAuthMiddleware } from '../middlewares/authMiddleware';

export function analyticsRoute(analyticsController: IAnalyticsController, authMiddleware: IAuthMiddleware): express.Router {
    const router = express.Router();

    router.get("/", authMiddleware.loginRequired, analyticsController.getAnalytics);
    router.get("/stats", authMiddleware.loginRequired, analyticsController.getStats);

    return router;
}