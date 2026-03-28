import * as movimientosService from './movimientos.service.js';

export const obtenerMovimientos = async (req, res) => {
    const filtros = req.query;
    const movimientos = await movimientosService.obtenerMovimientos(filtros);
    res.json({ success: true, data: movimientos });
};

export const crearMovimiento = async (req, res) => {
    const datosEnvio = {
        ...req.body,
        usuario_id: req.user.id
    };

    const nuevoMovimiento = await movimientosService.crearMovimiento(datosEnvio);

    res.status(201).json({
        success: true,
        message: "Movimiento registrado con éxito",
        data: nuevoMovimiento
    });
};
