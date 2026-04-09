import { Router } from "express";
import * as proveedorController from "./proveedor.controller.js";
import { verificarRoles } from "../../middlewares/rol.middleware.js";
import { validarId, validarProveedor, validarFiltros } from "./proveedor.validator.js";

const router = Router();

router.get("/", verificarRoles(['admin']), validarFiltros, proveedorController.obtenerProveedores);

router.get("/:id", [verificarRoles(['admin']), validarId], proveedorController.obtenerProveedorPorId);

router.post("/", [verificarRoles(['admin']), validarProveedor], proveedorController.crearProveedor);

router.put("/:id", [verificarRoles(['admin']), validarId, validarProveedor], proveedorController.actualizarProveedor);

router.delete("/:id", [verificarRoles(['admin']), validarId], proveedorController.eliminarProveedor);

router.patch("/:id/reactivar", [verificarRoles(['admin']), validarId], proveedorController.reactivarProveedor);

export default router;
