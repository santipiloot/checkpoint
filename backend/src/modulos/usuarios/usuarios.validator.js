import { body, param } from 'express-validator';
import { verificarValidaciones } from '../../middlewares/validaciones.middleware.js';

export const validarId = [
    param("id")
        .isInt({ min: 1 }).withMessage("El ID de la categoría debe ser un número entero positivo"),
    verificarValidaciones
];

export const validarUsuario = [
    body('nombre')
        .optional()
        .isString().withMessage('El nombre debe ser texto')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ max: 100, min: 3 }).withMessage('El nombre debe tener entre 3 y 100 caracteres'),
    body('email')
        .optional()
        .isEmail().withMessage('Debe ser un email válido'),
    body('rol')
        .optional()
        .isIn(['admin', 'empleado']).withMessage('El rol debe ser admin o empleado'),
    verificarValidaciones
];
