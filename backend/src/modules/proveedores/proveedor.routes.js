import { Router } from "express";
import * as proveedorController from "./proveedor.controller.js";
import { verificarRoles } from "../../middlewares/rol.middleware.js";
import { validarId, validarProveedor } from "./proveedor.validator.js";

const router = Router();

router.get("/", verificarRoles(['admin']), proveedorController.obtenerProveedores);

router.get("/:id", [verificarRoles(['admin']), validarId], proveedorController.obtenerProveedorPorId);

router.post("/", [verificarRoles(['admin']), validarProveedor], proveedorController.crearProveedor);

router.put("/editar/:id", [verificarRoles(['admin']), validarId, validarProveedor], proveedorController.actualizarProveedor);

router.delete("/:id", [verificarRoles(['admin']), validarId], proveedorController.eliminarProveedor);

export default router;
