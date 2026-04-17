import * as categoriaService from "./categoria.service.js";

export const obtenerCategorias = async (req, res) => {
    const filtros = req.query;
    const categorias = await categoriaService.obtenerCategorias(filtros);
    res.json({ success: true, data: categorias });
};

export const obtenerCategoriaPorId = async (req, res) => {
    const { id } = req.params;
    const categoria = await categoriaService.obtenerCategoriaPorId(id);
    res.json({ success: true, data: categoria });
};

export const crearCategoria = async (req, res) => {
    const { nombre } = req.body;
    const nuevaCategoria = await categoriaService.crearCategoria(nombre);
    res.status(201).json({ success: true, data: nuevaCategoria });
};

export const actualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const categoriaActualizada = await categoriaService.actualizarCategoria(id, nombre);
    res.json({ success: true, message: "Categoria actualizada correctamente", data: categoriaActualizada });
};

export const eliminarCategoria = async (req, res) => {
    const { id } = req.params;
    const categoriaEliminada = await categoriaService.eliminarCategoria(id);
    res.json({ success: true, message: "Categoria eliminada correctamente", data: categoriaEliminada });
};

export const reactivarCategoria = async (req, res) => {
    const { id } = req.params;
    const categoriaReactivada = await categoriaService.reactivarCategoria(id);
    res.json({ success: true, message: "Categoria reactivada correctamente", data: categoriaReactivada });
};
