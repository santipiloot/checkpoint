import { Router } from 'express';
import { register, login } from './auth.controller.js';
import { validarRegistro, validarLogin } from './auth.validator.js';

const router = Router();

router.post('/register', validarRegistro, register);
router.post('/login', validarLogin, login);

export default router;
