import mongoose, { Schema } from "mongoose";
import { IUser } from "./userModel";
import { IPlatform } from "./platformModel";

export interface IUserPlatform {
    id: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    user: IUser;
    platformId: Schema.Types.ObjectId;
    platform: IPlatform;
    token: string;
}

export const userPlatformSchema = new mongoose.Schema<IUserPlatform>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        platformId: {
            type: Schema.Types.ObjectId,
            ref: 'Platform',
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

userPlatformSchema.virtual('id').get(function () {
    return this._id;
});

userPlatformSchema.virtual('platform', {
    ref: 'Platform',
    localField: 'platformId',
    foreignField: '_id',
    justOne: true
});

export default mongoose.model<IUserPlatform>('UserPlatform', userPlatformSchema);
