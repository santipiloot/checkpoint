import React from "react";
import { DollarSign, RefreshCw } from "lucide-react";

function TarjetasKPIs({ kpis, loading }) {
  const formatCurrency = (val) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(val);

  const totalMovs = kpis?.resumen_movimientos?.reduce(
    (acc, curr) => acc + parseInt(curr.total_movimientos),
    0,
  );

  const tarjetas = [
    {
      title: "Valor en inventario",
      value: formatCurrency(kpis?.valoracion_inventario || 0),
      icon: DollarSign,
      color: "text-[#004ac6]",
      bg: "bg-[#dbe1ff]",
    },
    {
      title: "Total de movimientos",
      value: totalMovs || 0,
      icon: RefreshCw,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tarjetas.map((tarjeta, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-2xl shadow-sm border border-[#eceef0] flex items-center gap-4 transition-all hover:shadow-md"
        >
          <div className={`p-4 rounded-xl ${tarjeta.bg} ${tarjeta.color}`}>
            <tarjeta.icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#737686]">
              {tarjeta.title}
            </p>
            <p className="text-3xl font-bold text-[#191c1e]">
              {loading ? (
                <span className="animate-pulse">...</span>
              ) : (
                tarjeta.value
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TarjetasKPIs;
