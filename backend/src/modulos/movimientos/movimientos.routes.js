import { Router } from 'express';
import * as movimientosController from './movimientos.controller.js';
import { validarMovimiento } from './movimientos.validator.js';
import { verificarRoles } from '../../middlewares/rol.middleware.js';

const router = Router();
router.get('/', [verificarRoles(['admin'])], movimientosController.obtenerMovimientos);
router.post('/', [validarMovimiento], movimientosController.crearMovimiento);

export default router;
