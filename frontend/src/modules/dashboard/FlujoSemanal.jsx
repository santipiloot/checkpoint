import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { transformarTendencia } from "../reportes/utils/estandarizacionDatos.js";

function FlujoSemanal({ data, loading }) {
  console.log("Datos recibidos para el gráfico:", data);
  const datosGrafico = transformarTendencia(data);
  console.log("Datos transformados:", datosGrafico);

  return (
    <div className="bg-white p-8 rounded-3xl border border-[#eceef0] shadow-sm h-full min-h-[500px] flex flex-col">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-[#191c1e] font-manrope">
          Flujo de Mercadería (7d)
        </h3>
        <p className="text-[#737686] font-medium">Comparativa de unidades que entran vs salen por día</p>
      </div>

      <div className="flex-1 w-full" style={{ minHeight: "350px" }}>
        {loading ? (
          <div className="w-full h-full bg-[#f7f9fb] animate-pulse rounded-2xl" />
        ) : datosGrafico.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-[#737686] opacity-60">
            <p className="font-medium">No hay movimientos registrados esta semana.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={datosGrafico} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#eceef0"
              />
              <XAxis
                dataKey="fecha"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#737686", fontSize: 12, fontWeight: 500 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#737686", fontSize: 12, fontWeight: 500 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                  padding: "12px",
                }}
              />
              <Legend 
                verticalAlign="top" 
                align="right" 
                iconType="circle"
                content={({ payload }) => (
                  <div className="flex justify-end gap-6 mb-4">
                    {payload.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-sm font-bold text-[#191c1e]">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              />
              <Line
                type="monotone"
                dataKey="entrada"
                name="Entradas"
                stroke="#10b981"
                strokeWidth={4}
                dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="salida"
                name="Salidas"
                stroke="#004ac6"
                strokeWidth={4}
                dot={{ r: 4, fill: "#004ac6", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default FlujoSemanal;

