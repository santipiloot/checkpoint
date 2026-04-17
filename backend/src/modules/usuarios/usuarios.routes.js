import { Router } from "express";
import * as usuarioController from "./usuarios.controller.js";
import { verificarRoles } from "../../middlewares/rol.middleware.js";
import { validarId, validarUsuario, validarFiltros } from "./usuarios.validator.js";

const router = Router();

router.get("/",verificarRoles(['admin']), usuarioController.obtenerUsuarios);
router.get("/:id",verificarRoles(['admin']), validarId, usuarioController.obtenerUsuario);
router.put("/editar/:id",verificarRoles(['admin']), validarId, validarUsuario, usuarioController.editarUsuario);
router.delete("/:id",verificarRoles(['admin']), validarId, usuarioController.eliminarUsuario);
router.patch("/:id/reactivar", verificarRoles(['admin']), validarId, usuarioController.reactivarUsuario);

export default router;