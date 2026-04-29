import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  ArrowUpRight,
  ArrowDownLeft,
  History,
  Package,
  User,
  Calendar,
  Search,
  Filter,
  FileText,
} from "lucide-react";

function TablaMovimientos() {
  const { fetchAuth } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const filters = {
    search: searchParams.get("search") || "",
    tipo: searchParams.get("tipo") || "",
    desde: searchParams.get("desde") || "",
    hasta: searchParams.get("hasta") || "",
  };

  const fetchMovimientos = useCallback(async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.tipo) params.append("tipo", filters.tipo);
      if (filters.desde) params.append("desde", filters.desde);
      if (filters.hasta) params.append("hasta", filters.hasta);

      const response = await fetchAuth(
        `http://localhost:3000/movimientos?${params.toString()}`,
      );
      const data = await response.json();

      if (!response.ok) {
        console.error("Error fetching movimientos:", data.error);
        return;
      }
      setMovimientos(data.data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchAuth, searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMovimientos();
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchMovimientos, searchParams]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set(name, value);
    } else {
      newParams.delete(name);
    }

    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] p-8 font-inter">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold font-manrope text-[#191c1e] tracking-tight flex items-center gap-3">
              <History className="w-10 h-10 text-[#004ac6]" />
              Historial de Movimientos
            </h1>
            <p className="text-[#434655] text-lg">
              Registro detallado de entradas y salidas de mercadería.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737686]" />
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Buscar por producto o motivo..."
                className="pl-10 pr-4 py-2 bg-white border border-[#eceef0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#004ac6]/20 transition-all w-64 shadow-sm"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-xl border transition-all ${
                showFilters || filters.tipo || filters.desde || filters.hasta
                  ? "bg-[#004ac6] border-[#004ac6] text-white shadow-md shadow-[#004ac6]/20"
                  : "bg-white border-[#eceef0] text-[#434655] hover:bg-[#f7f9fb]"
              }`}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white p-6 rounded-2xl border border-[#eceef0] shadow-sm animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#737686] uppercase tracking-wider">
                  Tipo
                </label>
                <select
                  name="tipo"
                  value={filters.tipo}
                  onChange={handleFilterChange}
                  className="w-full p-2 bg-[#f7f9fb] border border-[#eceef0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004ac6]/20"
                >
                  <option value="">Todos</option>
                  <option value="entrada">Entrada</option>
                  <option value="salida">Salida</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#737686] uppercase tracking-wider">
                  Desde
                </label>
                <input
                  type="date"
                  name="desde"
                  value={filters.desde}
                  onChange={handleFilterChange}
                  className="w-full p-2 bg-[#f7f9fb] border border-[#eceef0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004ac6]/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#737686] uppercase tracking-wider">
                  Hasta
                </label>
                <input
                  type="date"
                  name="hasta"
                  value={filters.hasta}
                  onChange={handleFilterChange}
                  className="w-full p-2 bg-[#f7f9fb] border border-[#eceef0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004ac6]/20"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full p-2 text-sm font-semibold text-[#004ac6] hover:bg-[#dbe1ff] rounded-lg transition-all"
                >
                  Limpiar Filtros
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
              <ArrowDownLeft className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-[#737686] font-medium">Entradas</p>
              <h3 className="text-2xl font-bold text-[#191c1e]">
                {movimientos.filter((m) => m.tipo === "entrada").length}
              </h3>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
              <ArrowUpRight className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-[#737686] font-medium">Salidas</p>
              <h3 className="text-2xl font-bold text-[#191c1e]">
                {movimientos.filter((m) => m.tipo === "salida").length}
              </h3>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-[#004ac6]">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-[#737686] font-medium">
                Items Movidos
              </p>
              <h3 className="text-2xl font-bold text-[#191c1e]">
                {movimientos.reduce((acc, curr) => acc + curr.cantidad, 0)}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden border border-[#eceef0]/50">
          <div className="max-h-[600px] overflow-y-auto overflow-x-auto scrollbar-thin scrollbar-thumb-[#004ac6]/10 scrollbar-track-transparent">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-20 bg-white">
                <tr className="bg-[#f7f9fb]/90 backdrop-blur-md border-b border-[#eceef0]">
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-[#434655] font-manrope">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Fecha
                    </div>
                  </th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-[#434655] font-manrope">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4" /> Producto
                    </div>
                  </th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-[#434655] font-manrope">
                    Tipo
                  </th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-[#434655] font-manrope">
                    Cantidad
                  </th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-[#434655] font-manrope">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Motivo
                    </div>
                  </th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-[#434655] font-manrope">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" /> Usuario
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eceef0]/50">
                {movimientos.map((movimiento) => (
                  <tr
                    key={movimiento.id}
                    className="hover:bg-[#f7f9fb]/50 transition-all duration-200 group"
                  >
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="text-sm font-medium text-[#191c1e]">
                        {formatDate(movimiento.creado_at)}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="font-semibold text-[#191c1e] group-hover:text-[#004ac6] transition-colors">
                        {movimiento.producto_nombre}
                      </div>
                      {movimiento.notas && (
                        <div
                          className="text-xs text-[#737686] truncate max-w-[200px]"
                          title={movimiento.notas}
                        >
                          {movimiento.notas}
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight ${
                          movimiento.tipo === "entrada"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {movimiento.tipo === "entrada" ? (
                          <ArrowDownLeft className="w-3 h-3" />
                        ) : (
                          <ArrowUpRight className="w-3 h-3" />
                        )}
                        {movimiento.tipo}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-lg font-bold text-[#191c1e]">
                        {movimiento.cantidad}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-2.5 py-1 rounded-lg bg-[#f0f2f5] text-[#434655] text-sm font-medium capitalize">
                        {movimiento.motivo}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#004ac6] to-[#2563eb] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                          {movimiento.usuario_nombre.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-[#191c1e]">
                          {movimiento.usuario_nombre}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!loading && movimientos.length === 0 && (
              <div className="py-24 flex flex-col items-center justify-center text-[#737686] space-y-4">
                <div className="w-20 h-20 bg-[#f7f9fb] rounded-full flex items-center justify-center shadow-inner">
                  <History className="w-10 h-10 opacity-20" />
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-[#191c1e]">
                    Sin registros
                  </p>
                  <p className="text-sm">
                    No se han encontrado movimientos en el historial.
                  </p>
                </div>
              </div>
            )}

            {loading && (
              <div className="py-24 flex flex-col items-center justify-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004ac6]"></div>
                <p className="text-sm font-medium text-[#737686]">
                  Cargando historial...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TablaMovimientos;
