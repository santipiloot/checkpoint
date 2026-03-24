import { Router } from "express";
import * as categoriaController from "./categoria.controller.js";
import { verificarRoles } from "../../middlewares/rol.middleware.js";
import { validarId, validarCrearCategoria, validarActualizarCategoria } from "./categoria.validator.js";

const router = Router();

// Todo el mundo
router.get("/", categoriaController.obtenerCategorias);
router.get("/:id", validarId, categoriaController.obtenerCategoriaPorId);

// Solo admin
router.post("/", [verificarRoles(['admin']), validarCrearCategoria], categoriaController.crearCategoria);

router.put("/:id", [verificarRoles(['admin']), validarId, validarActualizarCategoria], categoriaController.actualizarCategoria);

router.delete("/:id", [verificarRoles(['admin']), validarId], categoriaController.eliminarCategoria);

export default router;
