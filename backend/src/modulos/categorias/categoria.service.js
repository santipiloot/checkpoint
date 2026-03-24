import * as categoriaRepository from "./categoria.repository.js";

export const obtenerCategorias = async () => {
    const categorias = await categoriaRepository.obtenerCategorias();
    return categorias

}

export const obtenerCategoriaPorId = async (id) => {
    const categoria = await categoriaRepository.obtenerCategoriaPorId(id);
    if (!categoria) {
        const error = new Error("Categoria no encontrada");
        error.statusCode = 404;
        throw error;
    }
    return categoria
}

export const crearCategoria = async (nombre) => {
    const nuevaCategoria = await categoriaRepository.crearCategoria(nombre);
    return nuevaCategoria;
}

export const actualizarCategoria = async (id, nombre) => {
    const categoriaActualizada = await categoriaRepository.actualizarCategoria(id, nombre);

    if (!categoriaActualizada) {
        const error = new Error("Categoria no encontrada");
        error.statusCode = 404;
        throw error;
    }

    return categoriaActualizada;
}

export const eliminarCategoria = async (id) => {
    const categoriaEliminada = await categoriaRepository.eliminarCategoria(id);

    if (!categoriaEliminada) {
        const error = new Error("Categoria no encontrada");
        error.statusCode = 404;
        throw error;
    }

    return categoriaEliminada;
}