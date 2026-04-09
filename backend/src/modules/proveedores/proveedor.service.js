import * as proveedorRepository from "./proveedor.repository.js";

export const obtenerProveedores = async (filtros) => {
    const proveedores = await proveedorRepository.obtenerProveedores(filtros);
    return proveedores;
}

export const obtenerProveedorPorId = async (id) => {
    const proveedor = await proveedorRepository.obtenerProveedorPorId(id);
    if (!proveedor) {
        const error = new Error("Proveedor no encontrado");
        error.statusCode = 404;
        throw error;
    }
    return proveedor;
}

export const crearProveedor = async (datos) => {
    const { nombre, email, telefono, notas } = datos;
    const nuevoProveedor = await proveedorRepository.crearProveedor(nombre, email, telefono, notas);
    return nuevoProveedor;
}

export const actualizarProveedor = async (id, datos) => {
    const { nombre, email, telefono, notas } = datos;
    const proveedorActualizado = await proveedorRepository.actualizarProveedor(id, nombre, email, telefono, notas);

    if (!proveedorActualizado) {
        const error = new Error("Proveedor no encontrado");
        error.statusCode = 404;
        throw error;
    }

    return proveedorActualizado;
}

export const eliminarProveedor = async (id) => {
    const proveedorEliminado = await proveedorRepository.eliminarProveedor(id);

    if (!proveedorEliminado) {
        const error = new Error("Proveedor no encontrado");
        error.statusCode = 404;
        throw error;
    }

    return proveedorEliminado;
}

export const reactivarProveedor = async (id) => {
    const proveedorReactivado = await proveedorRepository.reactivarProveedor(id);

    if (!proveedorReactivado) {
        const error = new Error("Proveedor no encontrado");
        error.statusCode = 404;
        throw error;
    }

    return proveedorReactivado;
}
