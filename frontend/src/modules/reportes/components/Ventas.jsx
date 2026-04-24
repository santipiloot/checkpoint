import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function Ventas({ data, loading }) {
  const datosGrafico =
    data?.masVendidos?.slice(0, 5).map((item) => ({
      full: item.nombre,
      name:
        item.nombre.length > 12
          ? item.nombre.substring(0, 12) + "..."
          : item.nombre,
      total: parseInt(item.total_vendido),
    })) || [];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#eceef0] h-[400px] flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#191c1e] font-manrope">
          Top Productos
        </h3>
        <p className="text-sm text-[#737686]">Más vendidos en el periodo</p>
      </div>

      <div className="flex-1 w-full">
        {loading ? (
          <div className="w-full h-full bg-[#f7f9fb] animate-pulse rounded-xl" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={datosGrafico}
              layout="vertical"
              margin={{ left: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#eceef0"
              />
              <XAxis type="number" hide />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#191c1e", fontSize: 12, fontWeight: 500 }}
                width={120}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{ borderRadius: "12px", border: "none" }}
                labelFormatter={(value, payload) =>
                  payload[0]?.payload?.full || value
                }
              />
              <Bar dataKey="total" radius={[0, 4, 4, 0]} barSize={20}>
                {datosGrafico.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? "#004ac6" : "#dbe1ff"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default Ventas;
