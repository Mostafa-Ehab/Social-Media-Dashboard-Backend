import userPlatformModel, { IUserPlatform } from "../models/userPlatformModel";

export interface IUserPlatformRepository {
    getUserPlatforms(userId: string): Promise<IUserPlatform[]>;
    getUserPlatformById(platformId: string): Promise<IUserPlatform | null>;
    addUserPlatform(userId: string, platformId: string, token: string): Promise<IUserPlatform>;
    deleteUserPlatform(platformId: string): Promise<any>;
}

class UserPlatformRepository implements IUserPlatformRepository {
    async getUserPlatforms(userId: string): Promise<IUserPlatform[]> {
        const platforms = await userPlatformModel.find({ userId })
            .populate("platform")
            .exec();
        return platforms;
    }

    async getUserPlatformById(platformId: string): Promise<IUserPlatform | null> {
        return await userPlatformModel.findById(platformId).exec();
    }

    async addUserPlatform(userId: string, platformId: string, token: string): Promise<IUserPlatform> {
        const userPlatform = await userPlatformModel
            .create({ userId, platformId, token });

        return await userPlatform.populate("platform");
    }

    async deleteUserPlatform(platformId: string): Promise<any> {
        return await userPlatformModel.findByIdAndDelete(platformId);
    }
}

export default UserPlatformRepository;