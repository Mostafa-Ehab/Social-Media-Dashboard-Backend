import { BadRequestException } from "../exceptions/badRequestException";
import { UnauthorizedException } from "../exceptions/unauthorizedException";
import { IUserPlatformRepository } from "../repositories/userPlatformRepository";
import { generateRandomData, generateRandomNumber } from "../utils/analyticsUtils";

export interface IAnalyticsService {
    getAnalytics(userId: string, platformId: string): Promise<any>;
    getStats(userId: string, platformId: string): Promise<any>;
}

class AnalyticsService implements IAnalyticsService {
    constructor(
        private readonly userPlatformRepository: IUserPlatformRepository
    ) { }

    getAnalytics = async (userId: string, platformId: string): Promise<any> => {
        if (!platformId) {
            throw new BadRequestException("Platform is required");
        }

        const platform = await this.userPlatformRepository.getUserPlatformById(platformId);
        if (!platform) {
            throw new BadRequestException("Platform not found");
        }

        if (String(platform.userId) !== userId) {
            throw new UnauthorizedException("Unauthorized");
        }

        const chartData = generateRandomData(10);
        const summary = {
            likes: chartData.reduce((sum, entry) => sum + entry.likes, 0),
            shares: chartData.reduce((sum, entry) => sum + entry.shares, 0),
            comments: chartData.reduce((sum, entry) => sum + entry.comments, 0),
        };

        return {
            platform: platform.platform.name,
            summary: summary,
            chart_data: chartData
        }
    }
    getStats = async (userId: string, platformId: string): Promise<any> => {
        if (!platformId) {
            throw new BadRequestException("Platform is required");
        }

        const platform = await this.userPlatformRepository.getUserPlatformById(platformId);
        if (!platform) {
            throw new BadRequestException("Platform not found");
        }

        if (String(platform.userId) !== userId) {
            throw new UnauthorizedException("Unauthorized");
        }

        return {
            likes: generateRandomNumber(100, 600),
            shares: generateRandomNumber(50, 250),
            comments: generateRandomNumber(30, 180)
        }
    }
}

export default AnalyticsService
