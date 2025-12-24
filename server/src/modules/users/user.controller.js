import {
  getCurrentUser,
  updateCurrentUser
} from './user.service.js';

export const getMe = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.user.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateMe = async (req, res, next) => {
  try {
    const user = await updateCurrentUser(req.user.id, req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
