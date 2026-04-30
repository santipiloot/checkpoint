import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import TarjetasKPIs from "./components/TarjetasKPIs.jsx";
import TendenciaChart from "./components/TendenciaChart.jsx";
import Ventas from "./components/Ventas.jsx";
import Perdidas from "./components/Perdidas.jsx";
import ResumenMovimientos from "./components/ResumenMovimientos.jsx";
import BajaRotacion from "./components/BajaRotacion.jsx";
import { Calendar } from "lucide-react";

function ReportesLayout() {
  const { fetchAuth } = useAuth();
  const [reporteData, setReporteData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fechaActual = new Date();
  const mesActual = fechaActual.toISOString().split("T")[0];
  const fechaInicioMes = new Date(
    fechaActual.getFullYear(),
    fechaActual.getMonth(),
    1,
  )
    .toISOString()
    .split("T")[0];

  const [filtros, setFiltros] = useState({
    desde: fechaInicioMes,
    hasta: mesActual,
  });

  const fetchReportes = useCallback(async () => {
    setLoading(true);
    try {
      const query = `desde=${filtros.desde}&hasta=${filtros.hasta}`;
      const response = await fetchAuth(
        `http://localhost:3000/reportes?${query}`,
      );
      const data = await response.json();
      setReporteData(data);
    } catch (error) {
      console.error("Error al cargar reportes:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchAuth, filtros]);

  useEffect(() => {
    fetchReportes();
  }, [fetchReportes]);

  return (
    <div className="min-h-screen bg-[#f7f9fb] p-8 font-inter">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold font-manrope text-[#191c1e] tracking-tight">
              Reportes de Gestión
            </h1>
          </div>

          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-[#eceef0]">
            <Calendar className="w-5 h-5 text-[#004ac6]" />
            <input
              type="date"
              value={filtros.desde}
              onChange={(e) =>
                setFiltros({ ...filtros, desde: e.target.value })
              }
              className="border-none text-sm font-medium focus:ring-0 cursor-pointer"
            />
            <span className="text-[#eceef0]">|</span>
            <input
              type="date"
              value={filtros.hasta}
              onChange={(e) =>
                setFiltros({ ...filtros, hasta: e.target.value })
              }
              className="border-none text-sm font-medium focus:ring-0 cursor-pointer"
            />
          </div>
        </div>

        <TarjetasKPIs kpis={reporteData?.kpis} loading={loading} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TendenciaChart
              data={reporteData?.grafico_dias}
              loading={loading}
            />
          </div>
          <ResumenMovimientos
            data={reporteData?.kpis?.resumen_movimientos}
            loading={loading}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Ventas data={reporteData?.ventas} loading={loading} />
          <BajaRotacion data={reporteData?.ventas} loading={loading} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Perdidas data={reporteData?.perdidas} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default ReportesLayout;
