import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { transformarPie } from "../utils/estandarizacionDatos.js";

function ResumenMovimientos({ data, loading }) {
  const datosGrafico = transformarPie(data);

  const getMotivoColor = (motivo) => {
    const m = motivo.toLowerCase();
    if (m === "venta") return "#004ac6"; // Azul Premium
    if (m === "compra") return "#10b981"; // Verde Éxito
    if (m === "daño" || m === "robo") return "#ef4444"; // Rojo Alerta
    if (m === "devolucion") return "#f59e0b"; // Naranja / Ámbar
    if (m === "correccion") return "#6366f1"; // Índigo
    return "#94a3b8"; // Gris por defecto
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#eceef0] h-[400px] flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#191c1e] font-manrope">
          Distribución de Motivos
        </h3>
        <p className="text-sm text-[#737686]">Operaciones por causa</p>
      </div>

      <div className="flex-1 w-full">
        {loading ? (
          <div className="w-full h-full bg-[#f7f9fb] animate-pulse rounded-xl" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={datosGrafico}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {datosGrafico.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getMotivoColor(entry.name)}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "none" }}
              />
              <Legend verticalAlign="bottom" align="center" iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default ResumenMovimientos;
