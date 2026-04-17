import { Router } from 'express';
import * as productosController from './productos.controller.js';
import { validarId, validarProducto, validarFiltros } from './productos.validator.js';
import { verificarRoles } from '../../middlewares/rol.middleware.js';

const router = Router();

// Todo el mundo
router.get('/', validarFiltros, productosController.obtenerProductos);
router.get('/:id', validarId, productosController.obtenerProductoPorId);
router.get('/codigo/:codigo_barras', productosController.obtenerProductoPorCodigo);

// Solo admin
router.post('/', [verificarRoles(['admin']), validarProducto], productosController.crearProducto);
router.put('/editar/:id', [verificarRoles(['admin']), validarId, validarProducto], productosController.actualizarProducto);
router.delete('/:id', [verificarRoles(['admin']), validarId], productosController.eliminarProducto);
router.get('/:id/rop', [verificarRoles(['admin']), validarId], productosController.calcularRopSugerido);
router.patch('/:id/reactivar', [verificarRoles(['admin']), validarId], productosController.reactivarProducto);

export default router;
