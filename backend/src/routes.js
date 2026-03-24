import { Router } from 'express';
import authRoutes from './modulos/auth/auth.routes.js';

const router = Router();

// Rutas publicas

router.use('/auth', authRoutes);

// Rutas privadas 

export default router;
