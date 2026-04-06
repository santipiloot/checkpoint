import { Router } from "express";
import * as reportesController from "./reportes.controller.js";
import { verificarRoles } from "../../middlewares/rol.middleware.js";

const router = Router();

router.get("/", verificarRoles(["admin"]), reportesController.obtenerReporte);

export default router;
