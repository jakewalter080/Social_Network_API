import { Request, Response } from 'express';
import { User, Thought } from '../models';
import { handleError } from '../utils/errorHandler';

export const userController = {
    async getAllUsers(_req: Request, res: Response) {
      try {
        const users = await User.find()
          .populate('thoughts')
          .populate('friends');
        return res.json(users);
      } catch (err) {
        return handleError(res, err);
      }
    },

    const ThoughtSchema = new Schema<IThought>(
        {
          thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
          },
          createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp: Date) => formatDate(timestamp),
          },
          username: {
            type: String,
            required: true,
          },
          reactions: [ReactionSchema],
        },