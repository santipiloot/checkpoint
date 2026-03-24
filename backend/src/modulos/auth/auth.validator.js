import { body } from 'express-validator';

export const validarRegistro = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio').isLength({ max: 100, min: 3 }).withMessage('El nombre debe tener entre 3 y 100 caracteres'),
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('rol').optional().isIn(['admin', 'empleado']).withMessage('El rol debe ser admin o empleado')
];

export const validarLogin = [
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
];
