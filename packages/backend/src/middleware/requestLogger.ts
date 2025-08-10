import { Request, Response, NextFunction } from 'express';
import { prisma } from '../server';

export const requestLogger = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const startTime = Date.now();

  // Store original end method
  const originalEnd = res.end;

  // Override end method to capture response details
  res.end = function(chunk?: any, encoding?: any) {
    res.end = originalEnd;
    
    const responseTime = Date.now() - startTime;
    
    // Log to database (non-blocking)
    prisma.apiUsage.create({
      data: {
        endpoint: req.path,
        method: req.method,
        statusCode: res.statusCode,
        responseTime,
        userAgent: req.get('User-Agent') || null,
        ipAddress: req.ip || req.connection.remoteAddress || null
      }
    }).catch(error => {
      console.error('Failed to log API usage:', error);
    });

    return originalEnd.call(this, chunk, encoding);
  };

  next();
};
