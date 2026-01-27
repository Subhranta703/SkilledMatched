import express from 'express';

const router = express.Router();

// Get all users (for testing)
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Users route is working',
    users: []
  });
});

// Update user profile
router.put('/profile', (req, res) => {
  res.json({
    success: true,
    message: 'Profile updated (mock)',
    data: req.body
  });
});

export default router;