import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from './middlewares/error.middleware.js';

import authRoutes from './modules/auth/auth.routes.js';
import resumeRoutes from './modules/resumes/resume.routes.js';
import userRoutes from './modules/users/user.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

export default app;
