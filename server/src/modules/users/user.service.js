import User from './user.model.js';

/**
 * Fetch logged-in user safely
 */
export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

/**
 * Update allowed profile fields
 */
export const updateCurrentUser = async (userId, updates) => {
  const allowedUpdates = {
    name: updates.name
  };

  const user = await User.findByIdAndUpdate(
    userId,
    allowedUpdates,
    { new: true }
  ).select('-password');

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
