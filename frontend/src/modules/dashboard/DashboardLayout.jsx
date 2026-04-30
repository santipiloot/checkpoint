import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import AlertasStock from "./AlertasStock.jsx";
import PerdidasRecientes from "./PerdidasRecientes.jsx";
import ValorInventario from "./ValorInventario.jsx";
import FlujoSemanal from "./FlujoSemanal.jsx";
import { LayoutDashboard } from "lucide-react";

function DashboardLayout() {
  const { isAuthenticated, rol, fetchAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    stockCritico: [],
    reporteSemanal: null,
  });

  const fetchData = useCallback(async () => {
    if (!isAuthenticated || rol !== "admin") return;
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f7f9fb] flex flex-col items-center justify-center p-8 font-inter">
        <div className="bg-white p-10 rounded-3xl shadow-xl shadow-blue-100 border border-[#eceef0] text-center max-w-md">
          <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <LayoutDashboard className="w-10 h-10 text-[#004ac6]" />
          </div>
          <h1 className="text-3xl font-bold text-[#191c1e] mb-4 font-manrope">
            Inicia sesión
          </h1>
          <p className="text-[#737686] mb-8 leading-relaxed">
            Debes iniciar sesion para poder acceder a la aplicacipn
          </p>
          <a
            href="/login"
            className="inline-block bg-[#004ac6] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-[#003da5] transition-all transform hover:-translate-y-0.5"
          >
            Ir al Login
          </a>
        </div>
      </div>
    );
  }

  if (rol !== "admin") {
    return (
      <div className="min-h-screen bg-[#f7f9fb] flex flex-col items-center justify-center p-8 font-inter">
        <div className="bg-white p-10 rounded-3xl shadow-xl shadow-blue-100 border border-[#eceef0] text-center max-w-md">
          <h1 className="text-3xl font-bold text-[#191c1e] mb-4 font-manrope">
            Bienvenido, {rol}
          </h1>
          <p className="text-[#737686] mb-8 leading-relaxed">
            Tu perfil no tiene acceso al dashboard administrativo.
          </p>
          {/* <Navigate to="/productos/emp" /> */}
        </div>
      </div>
    );
  }

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
