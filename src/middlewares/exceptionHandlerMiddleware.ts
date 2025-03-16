import { Request, Response, NextFunction } from 'express';
import { BaseException } from '../exceptions/baseException';

export const exceptionHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof BaseException) {
    return res.status(err.statusCode).json({
      message: err.message,
      errorCode: err.errorCode,
    });
  }

  return res.status(500).json({
    message: 'Internal server error',
    errorCode: 500,
  });
};
