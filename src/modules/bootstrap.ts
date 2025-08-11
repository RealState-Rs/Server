import { Express } from 'express';
import authRoutes from './auth/auth.routes';
import userRoutes from './users/user.routes';
export const Bootstrap = (app: Express): void => {
    app.use('/api/v0.1/auth', authRoutes);
    app.use('/api/v0.1/users', userRoutes);
}