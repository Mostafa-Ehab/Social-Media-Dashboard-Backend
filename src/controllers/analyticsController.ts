import { Request, Response, NextFunction } from "express";
import { IAnalyticsService } from "../services/analyticsService";

export interface IAnalyticsController {
    getAnalytics(req: Request, res: Response, next: NextFunction): Promise<any>;
    getPlatforms(req: Request, res: Response, next: NextFunction): Promise<any>;
    getStats(req: Request, res: Response, next: NextFunction): Promise<any>;
}

class AnalyticsController implements IAnalyticsController {
    constructor(private readonly analyticsService: IAnalyticsService) { }

    getAnalytics = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { userId } = req.params;
            const { platform } = req.query;
            const analytics = await this.analyticsService.getAnalytics(userId, platform as string);
            return res.status(200).send(analytics);
        } catch (err) {
            next(err);
        }
    }
    getPlatforms = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { userId } = req.params;
            const platforms = await this.analyticsService.getPlatforms(userId);
            return res.status(200).send(platforms);
        } catch (err) {
            next(err);
        }
    }
    getStats = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { userId, platform } = req.params;
            const stats = await this.analyticsService.getStats(userId, platform);
            return res.status(200).send(stats);
        } catch (err) {
            next(err);
        }
    }
}

export default AnalyticsController

