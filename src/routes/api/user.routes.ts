import { Router } from 'express';
import { userController } from '../../controllers/user.controllers';

const router = Router();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      await userController.getAllUsers(req, res);
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      await userController.createUser(req, res);
    } catch (err) {
      next(err);
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      await userController.getUserById(req, res);
    } catch (err) {
      next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      await userController.updateUser(req, res);
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      await userController.deleteUser(req, res);
    } catch (err) {
      next(err);
    }
  });

router
  .route('/:userId/friends/:friendId')
  .post(async (req, res, next) => {
    try {
      await userController.addFriend(req, res);
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      await userController.removeFriend(req, res);
    } catch (err) {
      next(err);
    }
  });

export default router;

// import { Router } from 'express';
// import { userController } from '../../controllers/user.controllers';

// const router = Router();

// router
//   .route('/')
//   .get(userController.getAllUsers)
//   .post(userController.createUser);

// router
//   .route('/:id')
//   .get(userController.getUserById)
//   .put(userController.updateUser)
//   .delete(userController.deleteUser);

// router
//   .route('/:userId/friends/:friendId')
//   .post(userController.addFriend)
//   .delete(userController.removeFriend);

// export default router