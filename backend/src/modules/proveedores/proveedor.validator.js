import { body, param } from "express-validator";
import { verificarValidaciones } from "../../middlewares/validaciones.middleware.js";

export const validarId = [
    param("id")
        .isInt({ min: 1 }).withMessage("El ID del proveedor debe ser un número entero positivo"),
    verificarValidaciones
];

export const validarProveedor = [
    body("nombre")
        .isString().withMessage("El nombre debe ser texto")
        .trim()
        .notEmpty().withMessage("El nombre del proveedor es obligatorio")
        .isLength({ min: 3, max: 100 }).withMessage("El nombre debe tener entre 3 y 100 caracteres"),

    body("email")
        .optional({ checkFalsy: true })
        .isEmail().withMessage("Debe ser un email válido")
        .isLength({ min: 5, max: 100 }).withMessage("El email debe tener entre 5 y 100 caracteres"),

    body("telefono")
        .optional({ checkFalsy: true })
        .isString().withMessage("El teléfono debe ser texto")
        .trim()
        .isLength({ min: 9, max: 15 }).withMessage("El teléfono debe tener entre 9 y 15 caracteres"),

    body("notas")
        .optional({ checkFalsy: true })
        .isString().withMessage("Las notas deben ser texto")
        .trim(),

    verificarValidaciones
];
