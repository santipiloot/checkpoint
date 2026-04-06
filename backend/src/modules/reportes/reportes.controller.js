import * as reportesService from "./reportes.service.js";

export const obtenerReporte = async (req, res) => {
    const { desde, hasta, tipo, motivo } = req.query;

    if (!desde) {
        return res.status(400).json({ error: "La fecha 'desde' es obligatoria" });
    }

    const reporte = await reportesService.generarReporteGeneral({ 
        desde, 
        hasta, 
        tipo, 
        motivo 
    });

    res.json(reporte);
};
