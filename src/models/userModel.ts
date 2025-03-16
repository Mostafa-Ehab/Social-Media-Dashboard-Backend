import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
    id: Schema.Types.ObjectId;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    refreshToken?: string[];
    profile?: string;
    passwordMatch(password: string): Promise<Boolean>;
};

export const userSchema = new mongoose.Schema<IUser>(
    {
        firstname: {
            type: String,
            required: true,
            trim: true,
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: [
            {
                type: String,
            }
        ],
        profile: {
            type: String,
        },
    },
    { timestamps: true }
);

// Check password
userSchema.methods.passwordMatch = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Hash password on save
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    } else {
        const saltRounds = Number(process.env.PASSWORD_SALT || 10);
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
});

// Map the field id in the interface with _id field of mongoose
userSchema.virtual('id').get(function () {
    return this._id;
});

export default mongoose.model<IUser>('User', userSchema);
