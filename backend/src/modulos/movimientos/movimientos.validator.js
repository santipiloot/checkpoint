import { body } from "express-validator";
import { verificarValidaciones } from "../../middlewares/validaciones.middleware.js";

export const validarMovimiento = [
    body("producto_id")
        .notEmpty().withMessage("El ID del producto es obligatorio")
        .isInt({ min: 1 }).withMessage("El ID del producto debe ser un número entero válido"),

    body("cantidad")
        .notEmpty().withMessage("La cantidad es obligatoria")
        .isInt({ min: 1 }).withMessage("La cantidad debe ser un número entero mayor a 0"),

    body("tipo")
        .notEmpty().withMessage("El tipo de movimiento es obligatorio")
        .isIn(['entrada', 'salida', 'ajuste']).withMessage("El tipo de movimiento debe ser: entrada, salida o ajuste"),

    body("motivo")
        .notEmpty().withMessage("El motivo del movimiento es obligatorio")
        .isIn(['compra', 'venta', 'daño', 'robo', 'devolucion', 'correccion'])
        .withMessage("El motivo no es válido"),

    body("notas")
        .optional()
        .isString().withMessage("Las notas deben ser texto")
        .trim()
        .isLength({ max: 500 }).withMessage("Las notas no pueden superar los 500 caracteres"),

    verificarValidaciones
];
