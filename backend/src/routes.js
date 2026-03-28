import { Router } from 'express';
import authRoutes from './modulos/auth/auth.routes.js';
import categoriaRoutes from './modulos/categorias/categoria.routes.js';
import proveedorRoutes from './modulos/proveedores/proveedor.routes.js';
import productosRoutes from './modulos/productos/productos.routes.js';
import movimientosRoutes from './modulos/movimientos/movimientos.routes.js';
import { verificarAutenticacion } from './middlewares/auth.middleware.js';

const router = Router();

// Rutas publicas
router.use('/auth', authRoutes);

// Rutas privadas
router.use(verificarAutenticacion);
router.use('/categorias', categoriaRoutes);
router.use('/proveedores', proveedorRoutes);
router.use('/productos', productosRoutes);
router.use('/movimientos', movimientosRoutes);

export default router;
