import { body, param } from "express-validator";
import { verificarValidaciones } from "../../middlewares/validaciones.middleware.js";

export const validarId = [
    param("id")
        .isInt({ min: 1 }).withMessage("El ID del producto debe ser un número entero positivo"),
    verificarValidaciones
];

export const validarProducto = [
    body("nombre")
        .isString().withMessage("El nombre debe ser texto")
        .trim()
        .notEmpty().withMessage("El nombre del producto es obligatorio")
        .isLength({ min: 3, max: 150 }).withMessage("El nombre debe tener entre 3 y 150 caracteres"),

    body("descripcion")
        .optional()
        .isString().withMessage("La descripción debe ser texto")
        .trim()
        .isLength({ max: 500 }).withMessage("La descripción no puede superar los 500 caracteres"),

    body("codigo_barras")
        .optional({ checkFalsy: true })
        .isString().withMessage("El código de barras debe ser texto")
        .trim()
        .isLength({ max: 100 }).withMessage("El código de barras no puede superar los 100 caracteres"),

    body("categoria_id")
        .optional({ checkFalsy: true })
        .isInt({ min: 1 }).withMessage("El ID de la categoría debe ser un número entero positivo"),

    body("proveedor_id")
        .optional({ checkFalsy: true })
        .isInt({ min: 1 }).withMessage("El ID del proveedor debe ser un número entero positivo"),

    body("precio_costo")
        .optional({ checkFalsy: true })
        .isFloat({ min: 0 }).withMessage("El precio de costo debe ser un número positivo"),

    body("stock")
        .optional()
        .isInt({ min: 0 }).withMessage("El stock debe ser un número entero no negativo")
        .toInt(),

    body("stock_minimo")
        .optional()
        .isInt({ min: 0 }).withMessage("El stock mínimo debe ser un número entero no negativo")
        .toInt(),
    verificarValidaciones
];