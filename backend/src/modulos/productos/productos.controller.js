import * as productosService from "./productos.service.js";

export const obtenerProductos = async (req, res) => {
    const filtros = req.query;
    const productos = await productosService.obtenerProductos(filtros);
    res.json({ success: true, data: productos });
};

export const obtenerProductoPorId = async (req, res) => {
    const { id } = req.params;
    const producto = await productosService.obtenerProductoPorId(id);
    res.json({ success: true, data: producto });
};

export const crearProducto = async (req, res) => {
    const producto = req.body;
    const nuevoProducto = await productosService.crearProducto(producto);
    res.status(201).json({ success: true, data: nuevoProducto });
};

export const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const producto = req.body;
    const productoActualizada = await productosService.actualizarProducto(id, producto);
    res.json({ success: true, message: "Producto actualizado correctamente", data: productoActualizada });
};

export const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    const productoEliminado = await productosService.eliminarProducto(id);
    res.json({ success: true, message: "Producto eliminado correctamente", data: productoEliminado });
};
