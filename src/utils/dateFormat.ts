export const formatDate = (timestamp: Date): string => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };
  
  import { Response } from 'express';
  import { ErrorResponse } from '../types';
  
  export const handleError = (res: Response, err: any): Response => {
    console.error('Error:', err);
    const error: ErrorResponse = {
      message: err.message || 'Internal server error',
    };
    
    if (process.env.NODE_ENV === 'development') {
      error.stack = err.stack;
    }
    
    return res.status(err.status || 500).json(error);
  };