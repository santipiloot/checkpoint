import React from "react";
import { TrendingDown, AlertCircle } from "lucide-react";

function BajaRotacion({ data, loading }) {
  const productosBaja = data?.menosVendidos?.slice(0, 5) || [];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#eceef0] h-[400px] flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#191c1e] font-manrope">
            Baja Rotación
          </h3>
          <p className="text-sm text-[#737686]">Productos con menor salida</p>
        </div>
        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
          <TrendingDown className="w-5 h-5" />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-12 bg-[#f7f9fb] animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {productosBaja.length > 0 ? (
              productosBaja.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl border border-[#eceef0] hover:bg-[#f7f9fb] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#eceef0] flex items-center justify-center text-xs font-bold text-[#737686]">
                      {i + 1}
                    </div>
                    <div className="max-w-[180px]">
                      <p
                        className="text-sm font-semibold text-[#191c1e] truncate"
                        title={item.nombre}
                      >
                        {item.nombre}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#434655]">
                      {item.total_vendido}
                    </p>
                    <p className="text-[10px] uppercase font-bold text-[#737686]">
                      unidades
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-[#737686]">
                <div className="flex flex-col items-center gap-2 opacity-50">
                  <AlertCircle className="w-8 h-8" />
                  <p>Sin datos de rotación</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BajaRotacion;
