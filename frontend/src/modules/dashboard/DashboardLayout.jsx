import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import AlertasStock from "./AlertasStock.jsx";
import PerdidasRecientes from "./PerdidasRecientes.jsx";
import ValorInventario from "./ValorInventario.jsx";
import FlujoSemanal from "./FlujoSemanal.jsx";
import { LayoutDashboard } from "lucide-react";

function DashboardLayout() {
  const { fetchAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    stockCritico: [],
    reporteSemanal: null,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const hoy = new Date();
      const hace7Dias = new Date();
      hace7Dias.setDate(hoy.getDate() - 7);

      const fechaDesde = hace7Dias.toISOString().split("T")[0];
      const query = `desde=${fechaDesde}`;

      const [reporteRes, stockRes] = await Promise.all([
        fetchAuth(`http://localhost:3000/reportes?${query}`),
        fetchAuth(`http://localhost:3000/productos?stock_critico=true`),
      ]);

      const reporteData = await reporteRes.json();
      const stockData = await stockRes.json();

      setData({
        reporteSemanal: reporteData,
        stockCritico: stockData.data || [],
      });
    } catch (error) {
      console.error("Error al cargar datos del dashboard:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchAuth]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-[#f7f9fb] p-8 font-inter">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#004ac6] rounded-2xl text-white shadow-lg shadow-blue-200">
            <LayoutDashboard className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-bold font-manrope text-[#191c1e] tracking-tight">
              Dashboard Operativo
            </h1>
            <p className="text-[#737686] font-medium">
              Resumen de las últimas 24hs y alertas críticas
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ValorInventario
            valor={data.reporteSemanal?.kpis?.valoracion_inventario}
            loading={loading}
          />
          <PerdidasRecientes
            perdidas={data.reporteSemanal?.perdidas}
            loading={loading}
          />
          <div className="hidden lg:block bg-white p-6 rounded-2xl border border-[#eceef0] shadow-sm">
            <p className="text-sm font-semibold text-[#737686] mb-1">
              Estado del Sistema
            </p>
            <div className="flex items-center gap-2 text-green-600 font-bold">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Sincronizado
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <AlertasStock productos={data.stockCritico} loading={loading} />
          </div>

          <div className="lg:col-span-7">
            <FlujoSemanal
              data={data.reporteSemanal?.grafico_dias}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
