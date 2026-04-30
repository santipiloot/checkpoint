import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import FormProductos from "./FormProductos.jsx";
import ModalMovimientos from "./components/ModalMovimientos.jsx";
import {
    Box,
    Plus,
    Edit3,
    Trash2,
    RefreshCcw,
    ArrowDownToLine,
    ArrowUpFromLine,
    Wrench,
    AlertTriangle,
    Search
} from "lucide-react";
import toast from "react-hot-toast";

function TablaProductos() {
    const { fetchAuth, rol } = useAuth();
    const esAdmin = rol === "admin";

    const [productos, setProductos] = useState([]);
    const [filtro, setFiltro] = useState("activos");
    const [busqueda, setBusqueda] = useState("");


    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editData, setEditData] = useState(null);


    const [isMovimientoOpen, setIsMovimientoOpen] = useState(false);
    const [movimientoType, setMovimientoType] = useState("salida");
    const [selectedProducto, setSelectedProducto] = useState(null);


    const [categoriasMap, setCategoriasMap] = useState({});

    const fetchCategorias = useCallback(async () => {
        try {
            const response = await fetchAuth("http://localhost:3000/categorias");
            const data = await response.json();
            if (response.ok && data.success) {
                const map = {};
                data.data.forEach(c => map[c.id] = c.nombre);
                setCategoriasMap(map);
            }
        } catch (error) {
            console.error("Error fetching categorias:", error);
        }
    }, [fetchAuth]);

    const fetchProductos = useCallback(async () => {
        try {
            const url = `http://localhost:3000/productos${filtro === "inactivos" ? "?inactivos=true" : ""}`;
            const response = await fetchAuth(url);
            const data = await response.json();

            if (!response.ok) {
                console.log("Hubo un error: ", data.error);
                return;
            }
            setProductos(data.data);
        } catch (error) {
            console.error("Error en el fetch de productos:", error);
            toast.error("Error al cargar productos");
        }
    }, [fetchAuth, filtro]);

    useEffect(() => {
        fetchCategorias();
        fetchProductos();
    }, [fetchCategorias, fetchProductos]);

    const handleDesactivar = async (id) => {
        if (window.confirm("¿Está seguro de desactivar este producto?")) {
            try {
                const response = await fetchAuth(`http://localhost:3000/productos/${id}`, {
                    method: "DELETE",
                });
                const data = await response.json();

                if (!response.ok || !data.success) {
                    toast.error(data.message || "Error al desactivar");
                    return;
                }
                toast.success("Producto eliminado correctamente");
                fetchProductos();
            } catch (error) {
                console.error("Error al desactivar producto:", error);
            }
        }
    };

    const handleReactivar = async (id) => {
        if (window.confirm("¿Está seguro de reactivar este producto?")) {
            try {
                const response = await fetchAuth(`http://localhost:3000/productos/${id}/reactivar`, {
                    method: "PATCH",
                });
                const data = await response.json();

                if (!response.ok || !data.success) {
                    toast.error(data.message || "Error al reactivar");
                    return;
                }
                toast.success("Producto reactivado correctamente");
                fetchProductos();
            } catch (error) {
                console.error("Error activating product:", error);
            }
        }
    };

    const handleEdit = (producto) => {
        setEditData(producto);
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setEditData(null);
        setIsFormOpen(true);
    };

    const handleOpenMovimiento = (type, producto) => {
        setMovimientoType(type);
        setSelectedProducto(producto);
        setIsMovimientoOpen(true);
    };

    const productosFiltrados = productos.filter((p) => {
        if (!busqueda.trim()) return true;
        const term = busqueda.toLowerCase().trim();
        return (
            p.nombre.toLowerCase().includes(term) ||
            (p.codigo_barras && p.codigo_barras.toLowerCase().includes(term))
        );
    });

    return (
        <div className="min-h-screen bg-[#f7f9fb] p-8 font-inter">
            <div className="max-w-screen-2xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-bold font-manrope text-[#191c1e] tracking-tight">
                            Inventario de Productos
                        </h1>
                        <p className="text-[#434655] text-lg">
                            {esAdmin
                                ? "Panel central de productos"
                                : "Panel de stock y ventas"}
                        </p>
                    </div>

                    {esAdmin && (
                        <button
                            onClick={handleAddNew}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#004ac6] to-[#2563eb] text-white rounded-xl font-semibold shadow-lg shadow-[#004ac6]/20 hover:opacity-90 active:scale-[0.98] transition-all duration-200"
                        >
                            <Plus className="w-5 h-5" />
                            Nuevo Producto
                        </button>
                    )}
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {esAdmin ? (
                        <div className="flex items-center gap-2 p-1 bg-surface-container-low rounded-2xl w-fit">
                            <button
                                onClick={() => setFiltro("activos")}
                                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${filtro === "activos"
                                    ? "bg-white text-primary shadow-sm"
                                    : "text-on-surface-variant hover:text-on-surface"
                                    }`}
                            >
                                Activos
                            </button>
                            <button
                                onClick={() => setFiltro("inactivos")}
                                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${filtro === "inactivos"
                                    ? "bg-white text-primary shadow-sm"
                                    : "text-on-surface-variant hover:text-on-surface"
                                    }`}
                            >
                                Inactivos
                            </button>
                        </div>
                    ) : (
                        <div className="hidden md:block"></div>
                    )}

                    <div className="relative w-full md:w-96 shrink-0">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#737686]" />
                        <input
                            type="text"
                            placeholder="Buscar por código de barras o nombre..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-[#eceef0] rounded-xl focus:border-[#004ac6] focus:ring-2 focus:ring-[#004ac6]/20 transition-all outline-none font-medium text-[#191c1e] shadow-sm"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(25,28,30,0.06)] border border-[#eceef0]/50 overflow-hidden text-sm">
                    <div className="max-h-[650px] overflow-y-auto overflow-x-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                        <table className="w-full text-left border-separate border-spacing-0">
                            <thead className="sticky top-0 z-20 bg-white shadow-sm">
                                <tr className="bg-[#f7f9fb]/90 backdrop-blur-md">
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-[#434655] font-manrope border-b border-[#eceef0]/50 whitespace-nowrap">
                                        Producto
                                    </th>
                                    <th className="px-4 py-4 font-bold uppercase tracking-wider text-[#434655] font-manrope border-b border-[#eceef0]/50">
                                        Stock
                                    </th>
                                    {esAdmin && (
                                        <th className="px-4 py-4 font-bold uppercase tracking-wider text-[#434655] font-manrope border-b border-[#eceef0]/50 text-right">
                                            Precio costo
                                        </th>
                                    )}
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-[#434655] font-manrope border-b border-[#eceef0]/50 text-center">
                                        Operaciones
                                    </th>
                                    {esAdmin && (
                                        <th className="px-6 py-4 font-bold uppercase tracking-wider text-[#434655] font-manrope border-b border-[#eceef0]/50 text-right w-32">
                                            Gestión
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#eceef0]/50">
                                {productosFiltrados.map((producto) => {
                                    const isCritical = producto.stock <= producto.stock_minimo;
                                    return (
                                        <tr
                                            key={producto.id}
                                            className={`transition-colors group ${isCritical ? 'hover:bg-red-50/50' : 'hover:bg-[#f7f9fb]'}`}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${isCritical ? "bg-red-100 text-red-600" : "bg-[#dbe1ff] text-[#004ac6]"}`}>
                                                        <Box className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-[#191c1e] text-base">
                                                            {producto.nombre}
                                                        </div>
                                                        <div className="text-xs text-[#737686] flex gap-2 items-center mt-1">
                                                            <span className="font-mono bg-gray-100 px-1 rounded">{producto.codigo_barras || 'S/N'}</span>
                                                            <span className="truncate max-w-[200px]">{categoriasMap[producto.categoria_id] || 'Sin categoría'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-xl font-bold ${isCritical ? 'text-red-600' : 'text-[#191c1e]'}`}>
                                                        {producto.stock}
                                                    </span>
                                                    {isCritical && (
                                                        <span title={`ROP Sugerido alcanzado. Min: ${producto.stock_minimo}`}>
                                                            <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
                                                        </span>
                                                    )}
                                                </div>
                                                {esAdmin && (
                                                    <div className="text-xs text-gray-400 font-medium">
                                                        Min: {producto.stock_minimo}
                                                    </div>
                                                )}
                                            </td>

                                            {esAdmin && (
                                                <td className="px-4 py-4 text-right font-medium text-[#434655]">
                                                    {producto.precio_costo ? `$${parseFloat(producto.precio_costo).toFixed(2)}` : '-'}
                                                </td>
                                            )}

                                            <td className="px-6 py-4 text-center">
                                                <div className="flex justify-center items-center gap-2">
                                                    {/* ADMIN: Verá los tres botones */}
                                                    {esAdmin && (
                                                        <>
                                                            <button
                                                                onClick={() => handleOpenMovimiento("entrada", producto)}
                                                                title="Cargar Entrada (Compra)"
                                                                disabled={!producto.activo}
                                                                className="px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:shadow-sm rounded-lg font-semibold flex gap-1 items-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                                            >
                                                                <ArrowDownToLine className="w-4 h-4" /> Entrada
                                                            </button>

                                                            <button
                                                                onClick={() => handleOpenMovimiento("salida", producto)}
                                                                title="Dar Salida (Venta)"
                                                                disabled={!producto.activo || producto.stock <= 0}
                                                                className="px-3 py-2 bg-green-50 text-green-600 hover:bg-green-100 hover:shadow-sm rounded-lg font-semibold flex gap-1 items-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                                            >
                                                                <ArrowUpFromLine className="w-4 h-4" /> Salida
                                                            </button>

                                                            <button
                                                                onClick={() => handleOpenMovimiento("ajuste", producto)}
                                                                title="Ajuste Manual"
                                                                disabled={!producto.activo}
                                                                className="px-2 py-2 bg-orange-50 text-orange-600 hover:bg-orange-100 hover:shadow-sm rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                                            >
                                                                <Wrench className="w-4 h-4" />
                                                            </button>
                                                        </>
                                                    )}

                                                    {!esAdmin && (
                                                        <button
                                                            onClick={() => handleOpenMovimiento("salida", producto)}
                                                            disabled={!producto.activo || producto.stock <= 0}
                                                            className="px-6 py-2 bg-[#00c64a] text-white hover:bg-[#00a33c] hover:shadow-lg shadow-[#00c64a]/20 rounded-xl font-bold text-sm tracking-wide flex gap-2 items-center transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                                        >
                                                            <ArrowUpFromLine className="w-4 h-4" />
                                                            {producto.stock <= 0 ? 'Agotado' : 'Venta'}
                                                        </button>
                                                    )}
                                                </div>
                                            </td>

                                            {esAdmin && (
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end items-center gap-1">
                                                        <button
                                                            onClick={() => handleEdit(producto)}
                                                            className="p-2 text-[#737686] hover:text-[#004ac6] hover:bg-[#dbe1ff] rounded-lg transition-all"
                                                            title="Editar Producto"
                                                        >
                                                            <Edit3 className="w-5 h-5" />
                                                        </button>
                                                        {producto.activo ? (
                                                            <button
                                                                onClick={() => handleDesactivar(producto.id)}
                                                                className="p-2 text-[#737686] hover:text-[#ba1a1a] hover:bg-[#ffdad6] rounded-lg transition-all"
                                                                title="Eliminar a Papelera"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleReactivar(producto.id)}
                                                                className="p-2 text-[#737686] hover:text-[#00c64a] hover:bg-[#d5fcde] rounded-lg transition-all"
                                                                title="Reactivar"
                                                            >
                                                                <RefreshCcw className="w-5 h-5" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {productosFiltrados.length === 0 && (
                            <div className="py-24 flex flex-col items-center justify-center text-[#737686]">
                                <Box className="w-16 h-16 opacity-20 mb-4" />
                                <p className="text-xl font-bold font-manrope text-[#434655]">
                                    {productos.length === 0 ? "Catálogo Vacío" : "Sin resultados"}
                                </p>
                                <p className="text-sm mt-1 text-center max-w-sm">
                                    {productos.length === 0
                                        ? (filtro === 'activos' ? "No hay productos registrados en el sistema." : "La papelera está vacía.")
                                        : `No hay coincidencias para la búsqueda "${busqueda}".`
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <FormProductos
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onProductSaved={fetchProductos}
                editData={editData}
            />

            <ModalMovimientos
                isOpen={isMovimientoOpen}
                onClose={() => setIsMovimientoOpen(false)}
                producto={selectedProducto}
                tipoMovimiento={movimientoType}
                onMovimientoSaved={fetchProductos}
                esAdmin={esAdmin}
            />
        </div>
    );
}

export default TablaProductos;
