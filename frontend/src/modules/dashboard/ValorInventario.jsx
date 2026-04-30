import React from "react";
import { Wallet } from "lucide-react";

function ValorInventario({ valor, loading }) {
  const formatCurrency = (val) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(val || 0);

  return (
    <div className="bg-white p-6 rounded-3xl border border-[#eceef0] shadow-sm flex items-center gap-5 transition-all hover:shadow-md group">
      <div className="p-4 bg-green-50 text-green-600 rounded-2xl group-hover:bg-green-600 group-hover:text-white transition-colors">
        <Wallet className="w-8 h-8" />
      </div>
      <div>
        <p className="text-sm font-bold text-[#737686] uppercase tracking-wider">
          Valor del inventario
        </p>
        <p className="text-3xl font-black text-[#191c1e] font-manrope">
          {loading ? (
            <span className="animate-pulse">...</span>
          ) : (
            <span className="text-green-600">{formatCurrency(valor)}</span>
          )}
        </p>
      </div>
    </div>
  );
}

export default ValorInventario;
