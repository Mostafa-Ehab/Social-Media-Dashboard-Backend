import { BadRequestException } from "../exceptions/badRequestException";
import { IPlatformRepository } from "../repositories/platformRepository";
import { generateRandomData } from "../utils/analyticsUtils";

export interface IAnalyticsService {
    getAnalytics(userId: string, platform: string): Promise<any>;
    getStats(userId: string, platform: string): Promise<any>;
}

class AnalyticsService implements IAnalyticsService {
    constructor(private readonly platformRepository: IPlatformRepository) { }

    getAnalytics = async (userId: string, platform: string): Promise<any> => {
        if (!platform) {
            throw new BadRequestException("Platform is required");
        }

        const chartData = generateRandomData(10);
        const summary = {
            likes: chartData.reduce((sum, entry) => sum + entry.likes, 0),
            shares: chartData.reduce((sum, entry) => sum + entry.shares, 0),
            comments: chartData.reduce((sum, entry) => sum + entry.comments, 0),
        };

        return {
            platform: platform,
            summary: summary,
            chart_data: chartData
        }
    }
    getStats = async (userId: string, platform: string): Promise<any> => {
        return {
            likes: 3400,
            shares: 1200,
            comments: 850
        }
    }
}

export default AnalyticsService
