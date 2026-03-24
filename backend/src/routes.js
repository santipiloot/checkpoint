import { Router } from 'express';
import authRoutes from './modulos/auth/auth.routes.js';
import categoriaRoutes from './modulos/categorias/categoria.routes.js';
import proveedorRoutes from './modulos/proveedores/proveedor.routes.js';
import { verificarAutenticacion } from './middlewares/auth.middleware.js';

const router = Router();

// Rutas publicas
router.use('/auth', authRoutes);

// Rutas privadas
router.use(verificarAutenticacion);
router.use('/categorias', categoriaRoutes);
router.use('/proveedores', proveedorRoutes);

export default router;
