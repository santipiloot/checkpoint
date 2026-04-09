import { Router } from "express";
import * as categoriaController from "./categoria.controller.js";
import { verificarRoles } from "../../middlewares/rol.middleware.js";
import { validarId, validarCategoria, validarFiltros } from "./categoria.validator.js";

const router = Router();

// Todo el mundo
router.get("/", validarFiltros, categoriaController.obtenerCategorias);
router.get("/:id", validarId, categoriaController.obtenerCategoriaPorId);

// Solo admin
router.post("/", [verificarRoles(['admin']), validarCategoria], categoriaController.crearCategoria);

router.put("/:id", [verificarRoles(['admin']), validarId, validarCategoria], categoriaController.actualizarCategoria);

router.delete("/:id", [verificarRoles(['admin']), validarId], categoriaController.eliminarCategoria);

router.patch("/:id/reactivar", [verificarRoles(['admin']), validarId], categoriaController.reactivarCategoria);

export default router;
