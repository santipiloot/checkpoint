import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { transformarTendencia } from "../utils/estandarizacionDatos.js";

function TendenciaChart({ data, loading }) {
  const datosGrafico = transformarTendencia(data);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#eceef0] h-[400px] flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#191c1e] font-manrope">
          Tendencia de Movimientos
        </h3>
        <p className="text-sm text-[#737686]">Entradas vs Salidas diarias</p>
      </div>

      <div className="flex-1 w-full">
        {loading ? (
          <div className="w-full h-full bg-[#f7f9fb] animate-pulse rounded-xl" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={datosGrafico}>
              <defs>
                <linearGradient id="colorEntrada" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSalida" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#004ac6" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#004ac6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorAjuste" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#eceef0"
              />
              <XAxis
                dataKey="fecha"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#737686", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#737686", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Legend verticalAlign="top" align="right" iconType="circle" />
              <Area
                type="monotone"
                dataKey="entrada"
                name="Entradas"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorEntrada)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="salida"
                name="Salidas"
                stroke="#004ac6"
                fillOpacity={1}
                fill="url(#colorSalida)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="ajuste"
                name="Ajustes"
                stroke="#f97316"
                fillOpacity={1}
                fill="url(#colorAjuste)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default TendenciaChart;
