import { BadRequestException } from "../exceptions/badRequestException";
import { IPlatform } from "../models/platformModel";
import { IUserPlatform } from "../models/userPlatformModel";
import { IPlatformRepository } from "../repositories/platformRepository";
import { IUserPlatformRepository } from "../repositories/userPlatformRepository";

export interface IPlatformService {
    getAllPlatforms(): Promise<IPlatform[]>;
    getUserPlatforms(userId: string): Promise<IUserPlatform[]>;
    addPlatform(userId: string, platformId: string, token: string): Promise<IUserPlatform>;
    deletePlatform(userId: string, platformId: string): Promise<any>;
}

class PlatformService implements IPlatformService {
    constructor(
        private readonly platformRepository: IPlatformRepository,
        private readonly userPlatformRepository: IUserPlatformRepository
    ) { }

    getAllPlatforms = async (): Promise<IPlatform[]> => {
        return await this.platformRepository.getAllPlatforms();
    }

    getUserPlatforms = async (userId: string): Promise<IUserPlatform[]> => {
        return await this.userPlatformRepository.getUserPlatforms(userId);
    }

    addPlatform = async (userId: string, platformId: string, token: string): Promise<IUserPlatform> => {
        const platform = await this.platformRepository.getPlatformById(platformId);
        if (!platform) {
            throw new BadRequestException("Invalid platform ID");
        }
        const userPlatform = await this.userPlatformRepository.addUserPlatform(userId, platformId, token);

        console.log(userPlatform);

        return userPlatform;
    }

    deletePlatform = async (userId: string, platformId: string): Promise<any> => {
        const platform = await this.userPlatformRepository.getUserPlatformById(platformId);
        if (!platform) {
            throw new BadRequestException("Invalid platform ID");
        }
        if (platform.userId.toString() !== userId) {
            throw new BadRequestException("You are not authorized to delete this platform");
        }
        await this.userPlatformRepository.deleteUserPlatform(platformId);
    }
}

export default PlatformService;
