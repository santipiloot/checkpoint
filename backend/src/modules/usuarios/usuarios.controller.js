import * as usuarioService from "./usuarios.service.js";

export const obtenerUsuarios = async (req, res) => {
    const filtros = req.query;
    const usuarios = await usuarioService.obtenerUsuarios(filtros);
    res.json({ success: true, data: usuarios });
}

export const obtenerUsuario = async (req, res) => {
    const usuario = await usuarioService.obtenerUsuario(req.params.id);
    res.json({ success: true, data: usuario });
}

export const editarUsuario = async (req, res) => {
    const usuarioActualizado = await usuarioService.editarUsuario(req.params.id, req.body);
    res.json({ success: true, message: "Usuario actualizado correctamente", data: usuarioActualizado });
}

export const eliminarUsuario = async (req, res) => {
    const usuarioEliminado = await usuarioService.eliminarUsuario(req.params.id);
    res.json({ success: true, message: "Usuario eliminado correctamente", data: usuarioEliminado });
}

export const reactivarUsuario = async (req, res) => {
    const usuarioReactivado = await usuarioService.reactivarUsuario(req.params.id);
    res.json({ success: true, message: "Usuario reactivado correctamente", data: usuarioReactivado });
}