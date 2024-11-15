import { Router } from 'express';
import { thoughtController } from '../../controllers/thought.controllers';

const router = Router();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      await thoughtController.getAllThoughts(req, res);
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      await thoughtController.createThought(req, res);
    } catch (err) {
      next(err);
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      await thoughtController.getThoughtById(req, res);
    } catch (err) {
      next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      await thoughtController.updateThought(req, res);
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      await thoughtController.deleteThought(req, res);
    } catch (err) {
      next(err);
    }
  });

router
  .route('/:thoughtId/reactions')
  .post(async (req, res, next) => {
    try {
      await thoughtController.addReaction(req, res);
    } catch (err) {
      next(err);
    }
  });

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(async (req, res, next) => {
    try {
      await thoughtController.removeReaction(req, res);
    } catch (err) {
      next(err);
    }
  });

export default router;