import { Request, Response, NextFunction } from "express";
import { IAnalyticsService } from "../services/analyticsService";

export interface IAnalyticsController {
    getAnalytics(req: Request, res: Response, next: NextFunction): Promise<any>;
    getStats(req: Request, res: Response, next: NextFunction): Promise<any>;
}

class AnalyticsController implements IAnalyticsController {
    constructor(private readonly analyticsService: IAnalyticsService) { }

    getAnalytics = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { platformId } = req.params;
            const userId = String(req.user.id);
            const analytics = await this.analyticsService.getAnalytics(userId, platformId);
            return res.status(200).send(analytics);
        } catch (err) {
            next(err);
        }
    }
    getStats = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { platformId } = req.params;
            const userId = String(req.user.id);
            const stats = await this.analyticsService.getStats(userId, platformId);
            return res.status(200).send(stats);
        } catch (err) {
            next(err);
        }
    }
}

export default AnalyticsController

