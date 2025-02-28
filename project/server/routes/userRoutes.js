import express from 'express';
import { userController } from '../controllers/userController.js';

const router = express.Router();

// GET /api/users - Get all users
router.get('/', userController.getUsers);

// GET /api/users/:id - Get a user by ID
router.get('/:id', userController.getUserById);

export { router as userRoutes };