import express from 'express';
import { getMe, updateMe } from './user.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/me', protect, getMe);
router.put('/me', protect, updateMe);

export default router;
