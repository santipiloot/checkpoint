import * as movimientosRepository from './movimientos.repository.js';
import * as productosRepository from '../productos/productos.repository.js';


export const obtenerMovimientos = async (filtros) => {
    return await movimientosRepository.obtenerMovimientos(filtros);
};


export const crearMovimiento = async (datosMovimiento) => {
   
    const producto = await productosRepository.productoPorId(datosMovimiento.producto_id);
    
    if (!producto) {
        const error = new Error("El producto no existe");
        error.status = 404;
        throw error;
    }



    if (datosMovimiento.tipo === 'entrada' && datosMovimiento.rol === 'empleado') {
        const error = new Error("El empleado no tiene puede hacer esto");
        error.status = 403;
        throw error;
    }


    
    if (datosMovimiento.tipo === 'salida') {
        if (producto.stock < datosMovimiento.cantidad) {
            const error = new Error(`Stock insuficiente`);
            error.status = 400;
            throw error;
        }
    }

    const resultado = await movimientosRepository.crearMovimiento(datosMovimiento);

    return resultado;
};
