import { Router } from 'express';
import * as movimientosController from './movimientos.controller.js';
import { validarMovimiento } from './movimientos.validator.js';
import { verificarRoles } from '../../middlewares/rol.middleware.js';

const router = Router();

/**
 * GET /api/movements
 * Solo accesible por Admin para ver el historial completo.
 */
router.get('/', [verificarRoles(['admin'])], movimientosController.obtenerMovimientos);

/**
 * POST /api/movements
 * Accesible por Admin y Empleado. 
 * La lógica interna del Service restringirá las entradas solo a Admins.
 */
router.post('/', [validarMovimiento], movimientosController.crearMovimiento);

export default router;
