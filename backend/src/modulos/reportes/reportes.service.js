import * as reportesRepository from "./reportes.repository.js";


export const generarReporteGeneral = async (filtros) => {
    const { desde, hasta, tipo, motivo } = filtros;

    const fechaDesde = desde;
    const fechaHasta = hasta || new Date().toISOString();

    const [
        topVendidos,
        menosVendidos,
        analisisPerdidas,
        resumenMovimientos,
        valorInventario
    ] = await Promise.all([
        reportesRepository.getTopVendidos(fechaDesde, fechaHasta),
        reportesRepository.getMenosVendidos(fechaDesde, fechaHasta),
        reportesRepository.getAnalisisPerdidas(fechaDesde, fechaHasta),
        reportesRepository.getResumenMovimientos(fechaDesde, fechaHasta, tipo, motivo),
        reportesRepository.getValorInventario()
    ]);

    return {
        periodo: { desde: fechaDesde, hasta: fechaHasta },
        kpis: {
            resumen_movimientos: resumenMovimientos,
            valoracion_inventario: parseFloat(valorInventario)
        },
        ventas: {
            masVendidos: topVendidos,
            menosVendidos: menosVendidos
        },
        perdidas: analisisPerdidas
    };
};
