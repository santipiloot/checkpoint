import React from "react";
import { AlertCircle } from "lucide-react";

function Perdidas({ data, loading }) {
  const formatCurrency = (val) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(val);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#eceef0] h-[400px] flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#191c1e] font-manrope">
          Análisis de Pérdidas
        </h3>
        <p className="text-sm text-[#737686]">Impacto financiero por ajustes</p>
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
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold uppercase text-[#737686] border-b border-[#eceef0]">
                <th className="pb-3">Motivo</th>
                <th className="pb-3 text-right">Unidades</th>
                <th className="pb-3 text-right">Costo Est.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eceef0]">
              {data?.length > 0 ? (
                data.map((item, i) => (
                  <tr key={i} className="text-sm">
                    <td className="py-4 font-medium text-[#191c1e] capitalize">
                      {item.motivo}
                    </td>
                    <td className="py-4 text-right text-[#434655]">
                      {item.total_unidades}
                    </td>
                    <td className="py-4 text-right font-bold text-[#ba1a1a]">
                      {formatCurrency(item.costo_estimado)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-10 text-center text-[#737686]">
                    <div className="flex flex-col items-center gap-2 opacity-50">
                      <AlertCircle className="w-8 h-8" />
                      <p>Sin pérdidas registradas</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Perdidas;
