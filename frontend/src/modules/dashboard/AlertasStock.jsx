import React from "react";
import { AlertTriangle, PackageSearch, ChevronRight } from "lucide-react";

function AlertasStock({ productos, loading }) {
  const totalCriticos = productos?.length || 0;

  return (
    <div className="bg-white rounded-3xl border border-[#eceef0] shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
      <div
        className={`p-6 flex items-center justify-between ${totalCriticos > 0 ? "bg-red-50" : "bg-green-50"}`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`p-3 rounded-2xl ${totalCriticos > 0 ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
          >
            {totalCriticos > 0 ? (
              <AlertTriangle className="w-6 h-6" />
            ) : (
              <PackageSearch className="w-6 h-6" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#191c1e] font-manrope">
              Alertas de Stock
            </h2>
            <p
              className={`text-sm font-semibold ${totalCriticos > 0 ? "text-red-600" : "text-green-600"}`}
            >
              {totalCriticos === 0
                ? "Todo bajo control"
                : `${totalCriticos} Productos en estado crítico`}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          [1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-16 bg-[#f7f9fb] animate-pulse rounded-2xl"
            />
          ))
        ) : totalCriticos === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-[#737686] space-y-2 opacity-60">
            <PackageSearch className="w-12 h-12" />
            <p className="font-medium text-center px-8">
              No hay artículos por debajo del stock mínimo.
            </p>
          </div>
        ) : (
          productos.map((prod) => (
            <div
              key={prod.id}
              className="group flex items-center justify-between p-4 bg-[#f7f9fb] hover:bg-white border border-transparent hover:border-[#eceef0] rounded-2xl transition-all shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col">
                <span className="font-bold text-[#191c1e] group-hover:text-[#004ac6] transition-colors line-clamp-1">
                  {prod.nombre}
                </span>
                <span className="text-xs font-semibold text-[#737686]">
                  Stock: <span className="text-red-500">{prod.stock}</span> /
                  Mín: {prod.stock_minimo}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AlertasStock;
