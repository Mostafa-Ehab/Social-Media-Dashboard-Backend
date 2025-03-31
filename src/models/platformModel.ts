import mongoose, { Schema } from "mongoose";

export interface IPlatform {
    id: Schema.Types.ObjectId;
    name: string;
    description: string;
    icon: string;
    token: string;
}

export const platformSchema = new mongoose.Schema<IPlatform>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        icon: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

platformSchema.virtual('id').get(function () {
    return this._id;
});

export default mongoose.model<IPlatform>('Platform', platformSchema);
