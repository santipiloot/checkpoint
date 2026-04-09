import { body, param, query } from "express-validator";
import { verificarValidaciones } from "../../middlewares/validaciones.middleware.js";

export const validarId = [
    param("id")
        .isInt({ min: 1 }).withMessage("El ID de la categoría debe ser un número entero positivo"),
    verificarValidaciones
];

export const validarCategoria = [
    body("nombre")
        .isString().withMessage("El nombre debe ser texto")
        .trim()
        .notEmpty().withMessage("El nombre de la categoría es obligatorio")
        .isLength({ min: 3, max: 100 }).withMessage("El nombre debe tener entre 3 y 100 caracteres"),
    verificarValidaciones
];

export const validarFiltros = [
    query("inactivos")
        .optional()
        .isBoolean().withMessage("inactivos debe ser un valor booleano (true/false)"),
    verificarValidaciones
];