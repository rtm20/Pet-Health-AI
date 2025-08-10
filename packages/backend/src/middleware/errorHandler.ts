import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', error);

  // Prisma errors
  if (error.code === 'P2002') {
    res.status(409).json({
      error: 'Conflict',
      message: 'Resource already exists'
    });
    return;
  }

  if (error.code === 'P2025') {
    res.status(404).json({
      error: 'Not Found',
      message: 'Resource not found'
    });
    return;
  }

  // Validation errors
  if (error.name === 'ValidationError') {
    res.status(400).json({
      error: 'Validation Error',
      message: error.message,
      details: error.details
    });
    return;
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    res.status(401).json({
      error: 'Authentication Error',
      message: 'Invalid token'
    });
    return;
  }

  if (error.name === 'TokenExpiredError') {
    res.status(401).json({
      error: 'Authentication Error',
      message: 'Token expired'
    });
    return;
  }

  // File upload errors
  if (error.code === 'LIMIT_FILE_SIZE') {
    res.status(413).json({
      error: 'File Too Large',
      message: 'File size exceeds the maximum allowed limit'
    });
    return;
  }

  // Default error
  res.status(error.status || 500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong' 
      : error.message
  });
};
