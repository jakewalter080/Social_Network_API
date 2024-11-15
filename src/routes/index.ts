// src/routes/api/index.ts
import { Router } from 'express';
import userRoutes from './user.routes';
import thoughtRoutes from './thought.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

export default router;

// src/routes/api/user.routes.ts
import { Router } from 'express';
import { userController } from '../../controllers/user.controllers';

const router = Router();