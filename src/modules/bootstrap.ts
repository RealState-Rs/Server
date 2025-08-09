import { Express } from 'express';
import authRoutes from './auth/auth.routes';
export const Bootstrap = (app: Express): void => {
    app.use('/api/v0.1/auth', authRoutes);
}