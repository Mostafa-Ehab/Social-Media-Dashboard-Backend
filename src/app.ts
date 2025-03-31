import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoute from './routes/authRoute';
import { connectDB } from './config/db';
import { exceptionHandler } from './middlewares/exceptionHandlerMiddleware';
import { NextFunction } from 'express';
import { NotFoundException } from './exceptions/notFoundException';
import configureDI from './config/di';
import cors from 'cors';
import { analyticsRoute } from './routes/analyticsRoute';
import { platformsRoute } from './routes/platformsRoute';

dotenv.config();
connectDB();

const container = configureDI();
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use('/public', express.static('public'));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express!');
});

app.use('/api/auth', authRoute(
    container.get('authController'), container.get('authMiddleware')
));

app.use('/api/analytics', analyticsRoute(
    container.get('analyticsController'),
    container.get('authMiddleware')
));

app.use('/api/platforms', platformsRoute(
    container.get('platformController'),
    container.get('authMiddleware')
))

app.get('*', (req: Request, res: Response) => {
    throw new NotFoundException('Route not found');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    exceptionHandler(err, req, res, next);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
