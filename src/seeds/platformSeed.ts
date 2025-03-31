import mongoose from "mongoose";
import Platform from "../models/platformModel"; // Adjust the path if needed
import UserPlatform from "../models/userPlatformModel";
import dotenv from "dotenv";

dotenv.config();

const platforms = [
    {
        name: "Facebook",
        description: "Social networking platform for connecting with people.",
        icon: "/public/icons/facebook.png",
    },
    {
        name: "YouTube",
        description: "Video-sharing platform for creators and viewers.",
        icon: "/public/icons/youtube.png",
    },
    {
        name: "TikTok",
        description: "Short-form video platform with trending content.",
        icon: "/public/icons/tiktok.png",
    },
    {
        name: "Twitter",
        description: "Microblogging platform for real-time updates and discussions.",
        icon: "/public/icons/twitter.png",
    },
    {
        name: "Instagram",
        description: "Social networking platform for sharing photos and videos.",
        icon: "/public/icons/instagram.png",
    }
];

const seedPlatforms = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("Can't find MONGO_URL");
        }

        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");

        await Platform.deleteMany({});
        console.log("Old platform data removed");

        await Platform.insertMany(platforms);
        console.log("Platforms seeded successfully");

        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding platforms:", error);
        mongoose.connection.close();
    }
};

seedPlatforms();
