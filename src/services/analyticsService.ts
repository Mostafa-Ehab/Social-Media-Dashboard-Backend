import { BadRequestException } from "../exceptions/badRequestException";

export interface IAnalyticsService {
    getAnalytics(userId: string, platform: string): Promise<any>;
    getPlatforms(userId: string): Promise<any>;
    getStats(userId: string, platform: string): Promise<any>;
}

class AnalyticsService implements IAnalyticsService {
    getAnalytics = async (userId: string, platform: string): Promise<any> => {
        if (!platform) {
            throw new BadRequestException("Platform is required");
        }
        if (platform == "facebook") {
            return {
                platform: platform,
                summary: {
                    likes: 3400,
                    shares: 1200,
                    comments: 850
                },
                chart_data: [
                    {
                        date: "2025-03-01",
                        likes: 100,
                        shares: 40,
                        comments: 20
                    },
                    {
                        date: "2025-03-02",
                        likes: 150,
                        shares: 50,
                        comments: 30
                    },
                    {
                        date: "2025-03-03",
                        likes: 120,
                        shares: 35,
                        comments: 25
                    },
                    {
                        date: "2025-03-04",
                        likes: 130,
                        shares: 45,
                        comments: 35
                    },
                    {
                        date: "2025-03-05",
                        likes: 140,
                        shares: 55,
                        comments: 40
                    },
                    {
                        date: "2025-03-06",
                        likes: 150,
                        shares: 60,
                        comments: 45
                    },
                    {
                        date: "2025-03-07",
                        likes: 160,
                        shares: 70,
                        comments: 50
                    },
                    {
                        date: "2025-03-08",
                        likes: 170,
                        shares: 80,
                        comments: 55
                    },
                    {
                        date: "2025-03-09",
                        likes: 180,
                        shares: 90,
                        comments: 60
                    },
                    {
                        date: "2025-03-10",
                        likes: 190,
                        shares: 100,
                        comments: 65
                    }
                ]
            };
        } else if (platform == "instagram") {
            return {
                platform: platform,
                summary: {
                    likes: 2500,
                    shares: 800,
                    comments: 1200
                },
                chart_data: [
                    {
                        date: "2025-03-01",
                        likes: 80,
                        shares: 30,
                        comments: 10
                    },
                    {
                        date: "2025-03-02",
                        likes: 90,
                        shares: 35,
                        comments: 15
                    },
                    {
                        date: "2025-03-03",
                        likes: 100,
                        shares: 40,
                        comments: 20
                    },
                    {
                        date: "2025-03-04",
                        likes: 110,
                        shares: 45,
                        comments: 25
                    },
                    {
                        date: "2025-03-05",
                        likes: 120,
                        shares: 50,
                        comments: 30
                    },
                    {
                        date: "2025-03-06",
                        likes: 130,
                        shares: 55,
                        comments: 35
                    },
                    {
                        date: "2025-03-07",
                        likes: 140,
                        shares: 60,
                        comments: 40
                    },
                    {
                        date: "2025-03-08",
                        likes: 150,
                        shares: 65,
                        comments: 45
                    },
                    {
                        date: "2025-03-09",
                        likes: 160,
                        shares: 70,
                        comments: 50
                    },
                    {
                        date: "2025-03-10",
                        likes: 170,
                        shares: 75,
                        comments: 55
                    }
                ]
            }
        } else if (platform == "tiktok") {
            return {
                platform: platform,
                summary: {
                    likes: 4000,
                    shares: 1500,
                    comments: 900
                },
                chart_data: [
                    {
                        date: "2025-03-01",
                        likes: 200,
                        shares: 80,
                        comments: 40
                    },
                    {
                        date: "2025-03-02",
                        likes: 250,
                        shares: 90,
                        comments: 50
                    },
                    {
                        date: "2025-03-03",
                        likes: 300,
                        shares: 100,
                        comments: 60
                    },
                    {
                        date: "2025-03-04",
                        likes: 350,
                        shares: 110,
                        comments: 70
                    },
                    {
                        date: "2025-03-05",
                        likes: 400,
                        shares: 120,
                        comments: 80
                    },
                    {
                        date: "2025-03-06",
                        likes: 450,
                        shares: 130,
                        comments: 90
                    },
                    {
                        date: "2025-03-07",
                        likes: 500,
                        shares: 140,
                        comments: 100
                    },
                    {
                        date: "2025-03-08",
                        likes: 550,
                        shares: 150,
                        comments: 110
                    },
                    {
                        date: "2025-03-09",
                        likes: 600,
                        shares: 160,
                        comments: 120
                    },
                    {
                        date: "2025-03-10",
                        likes: 650,
                        shares: 170,
                        comments: 130
                    }
                ]
            };
        } else {
            throw new BadRequestException("Invalid platform");
        }
    }
    getPlatforms = async (userId: string): Promise<any> => {
        return ["facebook", "instagram", "tiktok"];
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
