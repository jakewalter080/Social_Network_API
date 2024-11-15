import { Router } from 'express';
import userRoutes from './user.routes';
import thoughtRoutes from './thought.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

export default router;

import { Router } from 'express';
import { userController } from '../../controllers/user.controllers';

const router = Router();