import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/User';

export const thoughtController = {
  getAllThoughts: async (_req: Request, res: Response): Promise<void> => {
    try {
      const thoughts = await Thought.find().sort({ createdAt: -1 });
      res.json(thoughts);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  getThoughtById: async (req: Request, res: Response): Promise<void> => {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  createThought: async (req: Request, res: Response): Promise<void> => {
    try {
      const thought = await Thought.create(req.body);
      await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      res.json(thought);
    } catch (err) {
      res.status(400).json({ message: 'Invalid request' });
    }
  },

  updateThought: async (req: Request, res: Response): Promise<void> => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(400).json({ message: 'Invalid request' });
    }
  },

  deleteThought: async (req: Request, res: Response): Promise<void> => {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
        return;
      }
      await thought.deleteOne();
      await User.findByIdAndUpdate(
        thought.userId,
        { $pull: { thoughts: thought._id } }
      );
      res.json({ message: 'Thought deleted!' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  addReaction: async (req: Request, res: Response): Promise<void> => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(400).json({ message: 'Invalid request' });
    }
  },

  removeReaction: async (req: Request, res: Response): Promise<void> => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(400).json({ message: 'Invalid request' });
    }
  }
};