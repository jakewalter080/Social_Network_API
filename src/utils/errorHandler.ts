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