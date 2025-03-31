import { IPlatform } from "../models/platformModel";
import Platform from "../models/platformModel";

export interface IPlatformRepository {
    getAllPlatforms(): Promise<IPlatform[]>;
    getPlatformById(platformId: string): Promise<IPlatform | null>;
}

class PlatformRepository implements IPlatformRepository {
    async getAllPlatforms(): Promise<IPlatform[]> {
        return await Platform.find().exec();
    }
    async getPlatformById(platformId: string): Promise<IPlatform | null> {
        return await Platform.findById(platformId).exec();
    }
}

export default PlatformRepository;

