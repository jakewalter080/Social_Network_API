import { Request, Response } from 'express';
import { Thought, User } from '../models';
import { handleError } from '../utils/errorHandler';

export const thoughtController = {
    // Get all thoughts
    async getAllThoughts(_req: Request, res: Response) {
      try {
        const thoughts = await Thought.find().sort({ createdAt: -1 });
        return res.json(thoughts);
      } catch (err) {
        return handleError(res, err);
      }
    },