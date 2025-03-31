export const generateRandomData = (days: number) => {
    const chartData = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        chartData.push({
            date: date.toISOString().split("T")[0], // Format: YYYY-MM-DD
            likes: Math.floor(Math.random() * 500 + 100), // Between 100-600
            shares: Math.floor(Math.random() * 200 + 50), // Between 50-250
            comments: Math.floor(Math.random() * 150 + 30), // Between 30-180
        });
    }

    return chartData;
};