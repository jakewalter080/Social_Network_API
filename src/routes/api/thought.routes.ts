import { Router } from 'express';
import { thoughtController } from '../../controllers/thought.controllers';

const router = Router();

router
  .route('/')
  .get(thoughtController.getAllThoughts)
  .post(thoughtController.createThought);

router
  .route('/:id')
  .get(thoughtController.getThoughtById)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought);

router
  .route('/:thoughtId/reactions')
  .post(thoughtController.addReaction);

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(thoughtController.removeReaction);

export default router;