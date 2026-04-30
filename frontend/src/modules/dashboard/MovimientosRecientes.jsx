import React from "react";
import { Activity } from "lucide-react";

function MovimientosRecientes({ resumen, loading }) {
  const totalMovimientos =
    resumen?.reduce((acc, curr) => acc + parseInt(curr.total_movimientos), 0) ||
    0;

  return (
    <div className="bg-white p-6 rounded-3xl border border-[#eceef0] shadow-sm flex items-center gap-5 transition-all hover:shadow-md group">
      <div className="p-4 bg-blue-50 text-[#004ac6] rounded-2xl group-hover:bg-[#004ac6] group-hover:text-white transition-colors">
        <Activity className="w-8 h-8" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-[#737686] uppercase tracking-wider truncate">
          Movimientos
        </p>
        <p
          className="text-2xl font-black text-[#191c1e] font-manrope truncate"
          title={!loading ? totalMovimientos : ""}
        >
          {loading ? (
            <span className="animate-pulse">...</span>
          ) : (
            <span className="text-[#004ac6]">{totalMovimientos}</span>
          )}
        </p>
      </div>
    </div>
  );
}

export default MovimientosRecientes;
