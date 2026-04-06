import { Router } from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import categoriaRoutes from './modules/categorias/categoria.routes.js';
import proveedorRoutes from './modules/proveedores/proveedor.routes.js';
import productosRoutes from './modules/productos/productos.routes.js';
import movimientosRoutes from './modules/movimientos/movimientos.routes.js';
import reportesRoutes from './modules/reportes/reportes.routes.js';
import { verificarAutenticacion } from './middlewares/auth.middleware.js';
import usuariosRoutes from "./modules/usuarios/usuarios.routes.js";

const router = Router();

// Rutas publicas
router.use('/auth', authRoutes);

// Rutas privadas
router.use(verificarAutenticacion);
router.use("/usuarios", usuariosRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/proveedores', proveedorRoutes);
router.use('/productos', productosRoutes);
router.use('/movimientos', movimientosRoutes);
router.use('/reportes', reportesRoutes);

export default router;
