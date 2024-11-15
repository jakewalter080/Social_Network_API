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

    async getUserById(req: Request, res: Response) {
        try {
          const user = await User.findById(req.params.id)
            .populate('thoughts')
            .populate('friends');
          
          if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
          }
          return res.json(user);
        } catch (err) {
          return handleError(res, err);
        }
      },

      async createUser(req: Request, res: Response) {
        try {
          const user = await User.create(req.body);
          return res.json(user);
        } catch (err) {
          return handleError(res, err);
        }
      },

      async updateUser(req: Request, res: Response) {
        try {
          const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
          );
          if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
          }
          return res.json(user);
        } catch (err) {
          return handleError(res, err);
        }
      },
