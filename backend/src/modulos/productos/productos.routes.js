import { Router } from 'express';
import * as productosController from './productos.controller.js';
import { validarId, validarProducto } from './productos.validator.js';
import { verificarRoles } from '../../middlewares/rol.middleware.js';

const router = Router();

// Todo el mundo
router.get('/', productosController.obtenerProductos);
router.get('/:id', validarId, productosController.obtenerProductoPorId);

// Solo admin
router.post('/', [verificarRoles(['admin']), validarProducto], productosController.crearProducto);
router.put('/:id', [verificarRoles(['admin']), validarId, validarProducto], productosController.actualizarProducto);
router.delete('/:id', [verificarRoles(['admin']), validarId], productosController.eliminarProducto);

export default router;
