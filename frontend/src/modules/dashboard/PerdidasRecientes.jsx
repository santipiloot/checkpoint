import React from "react";
import { TrendingDown } from "lucide-react";

function PerdidasRecientes({ perdidas, loading }) {
  const totalPerdidas =
    perdidas?.reduce((acc, curr) => acc + parseFloat(curr.costo_estimado), 0) ||
    0;

  const formatCurrency = (val) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(val);

  return (
    <div className="bg-white p-6 rounded-3xl border border-[#eceef0] shadow-sm flex items-center gap-5 transition-all hover:shadow-md group">
      <div className="p-4 bg-red-50 text-red-600 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-colors">
        <TrendingDown className="w-8 h-8" />
      </div>
      <div>
        <p className="text-sm font-bold text-[#737686] uppercase tracking-wider">
          Salidas (Ultimos 7 días)
        </p>
        <p className="text-3xl font-black text-[#191c1e] font-manrope">
          {loading ? (
            <span className="animate-pulse">...</span>
          ) : (
            <span className="text-red-600">
              -{formatCurrency(totalPerdidas)}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default PerdidasRecientes;
