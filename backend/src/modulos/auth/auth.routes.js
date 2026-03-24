import { Router } from 'express';
import { register, login } from './auth.controller.js';
import { validarRegistro, validarLogin } from './auth.validator.js';
import { verificarValidaciones } from '../../middlewares/validaciones.middleware.js';

const router = Router();

router.post('/register', validarRegistro, verificarValidaciones, register);
router.post('/login', validarLogin, verificarValidaciones, login);

export default router;
