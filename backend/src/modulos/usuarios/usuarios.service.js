import * as usuarioRepository from "./usuarios.repository.js";

export const obtenerUsuarios = async () => {
    const usuarios = await usuarioRepository.obtenerUsuarios();
    return usuarios;
}

export const obtenerUsuario = async (id) => {
    const usuario = await usuarioRepository.obtenerUsuario(id);
    if (!usuario) {
        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;
        throw error;
    }
    return usuario;
}

export const editarUsuario = async (id, data) => {
    const usuarioActualizado = await usuarioRepository.editarUsuario(id, data);
    if (!usuarioActualizado) {
        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;
        throw error;
    }
    return usuarioActualizado;
}

export const eliminarUsuario = async (id) => {
    const usuarioEliminado = await usuarioRepository.eliminarUsuario(id);
    if (!usuarioEliminado) {
        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;
        throw error;
    }
    return usuarioEliminado;
}
