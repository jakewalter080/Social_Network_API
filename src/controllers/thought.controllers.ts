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

    async getThoughtById(req: Request, res: Response) {
        try {
          const thought = await Thought.findById(req.params.id);
          if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
          }
          return res.json(thought);
        } catch (err) {
          return handleError(res, err);
        }
      },

      async createThought(req: Request, res: Response) {
        try {
          const thought = await Thought.create(req.body);
          await User.findByIdAndUpdate(
            req.body.userId,
            { $push: { thoughts: thought._id } },
            { new: true }
          );
          return res.json(thought);
        } catch (err) {
          return handleError(res, err);
        }
      },

      async updateThought(req: Request, res: Response) {
        try {
          const thought = await Thought.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
          );
          if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
          }
          return res.json(thought);
        } catch (err) {
          return handleError(res, err);
        }
      },
    
      async deleteThought(req: Request, res: Response) {
        try {
          const thought = await Thought.findById(req.params.id);
          if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
          }
    
          await thought.deleteOne();
          await User.findByIdAndUpdate(
            thought.userId,
            { $pull: { thoughts: thought._id } }
          );
    
          return res.json({ message: 'Thought deleted!' });
        } catch (err) {
          return handleError(res, err);
        }
      },

      async addReaction(req: Request, res: Response) {
        try {
          const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
          );
          if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
          }
          return res.json(thought);
        } catch (err) {
          return handleError(res, err);
        }
      },
    
      async removeReaction(req: Request, res: Response) {
        try {
          const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
          );
          if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
          }
          return res.json(thought);
        } catch (err) {
          return handleError(res, err);
        }
      },
    };