import * as proveedorService from "./proveedor.service.js";

export const obtenerProveedores = async (req, res) => {
    const proveedores = await proveedorService.obtenerProveedores();
    res.json({ success: true, data: proveedores });
};

export const obtenerProveedorPorId = async (req, res) => {
    const { id } = req.params;
    const proveedor = await proveedorService.obtenerProveedorPorId(id);
    res.json({ success: true, data: proveedor });
};

export const crearProveedor = async (req, res) => {
    const nuevoProveedor = await proveedorService.crearProveedor(req.body);
    res.status(201).json({ success: true, data: nuevoProveedor });
};

export const actualizarProveedor = async (req, res) => {
    const { id } = req.params;
    const proveedorActualizado = await proveedorService.actualizarProveedor(id, req.body);
    res.json({ success: true, message: "Proveedor actualizado correctamente", data: proveedorActualizado });
};

export const eliminarProveedor = async (req, res) => {
    const { id } = req.params;
    const proveedorEliminado = await proveedorService.eliminarProveedor(id);
    res.json({ success: true, message: "Proveedor eliminado correctamente", data: proveedorEliminado });
};
