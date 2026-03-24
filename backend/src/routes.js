import { Router } from 'express';
import authRoutes from './modulos/auth/auth.routes.js';
import categoriaRoutes from './modulos/categorias/categoria.routes.js';
import { verificarAutenticacion } from './middlewares/auth.middleware.js';

const router = Router();

// Rutas publicas
router.use('/auth', authRoutes);

// Rutas privadas
router.use(verificarAutenticacion);
router.use('/categorias', categoriaRoutes);

export default router;
