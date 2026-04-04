import { Router } from 'express';
import { register, login } from './auth.controller.js';
import { validarRegistro, validarLogin } from './auth.validator.js';
import { verificarRoles } from '../../middlewares/rol.middleware.js';
import { verificarAutenticacion } from '../../middlewares/auth.middleware.js';


const router = Router();

router.post('/register', verificarAutenticacion, verificarRoles(['admin']), validarRegistro, register);
router.post('/login', validarLogin, login);

export default router;
