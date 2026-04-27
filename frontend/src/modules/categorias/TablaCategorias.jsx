import React from "react";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import FormCategorias from "./FormCategorias.jsx";
import {
    Tags,
    Plus,
    MoreHorizontal,
    Edit3,
    Trash2,
    RefreshCcw,
} from "lucide-react";

function TablaCategorias() {
    const { fetchAuth } = useAuth();
    const [categorias, setCategorias] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [filtro, setFiltro] = useState("activos"); // 'activos' o 'inactivos'

    const fetchCategorias = useCallback(async () => {
        try {
            const url = `http://localhost:3000/categorias${filtro === "inactivos" ? "?inactivos=true" : ""}`;
            const response = await fetchAuth(url);
            const data = await response.json();

            if (!response.ok) {
                console.log("Hubo un error: ", data.error);
                return;
            }
            setCategorias(data.data);
        } catch (error) {
            console.error("Error en el fetch de categorias:", error);
        }
    }, [fetchAuth, filtro]);

    useEffect(() => {
        fetchCategorias();
    }, [fetchCategorias]);

    const handleDesactivar = async (id) => {
        if (window.confirm("¿Está seguro de desactivar esta categoría?")) {
            try {
                const response = await fetchAuth(`http://localhost:3000/categorias/${id}`, {
                    method: "DELETE",
                });

                const data = await response.json();

                if (!response.ok || !data.success) {
                    console.log("Hubo un error: ", data.error);
                    return;
                }

                await fetchCategorias();
            } catch (error) {
                console.error("Error al desactivar la categoria:", error);
            }
        }
    };

    const handleReactivar = async (id) => {
        if (window.confirm("¿Está seguro de reactivar esta categoría?")) {
            try {
                const response = await fetchAuth(`http://localhost:3000/categorias/${id}/reactivar`, {
                    method: "PATCH",
                });

                const data = await response.json();

                if (!response.ok || !data.success) {
                    console.log("Hubo un error: ", data.error);
                    return;
                }

                await fetchCategorias();
            } catch (error) {
                console.error("Error activating category:", error);
            }
        }
    };

    const handleEdit = (categoria) => {
        setEditData(categoria);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditData(null);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#f7f9fb] p-8 font-inter">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-bold font-manrope text-[#191c1e] tracking-tight">
                            Familias de Productos
                        </h1>
                        <p className="text-[#434655] text-lg">
                            Gestione las categorías para organizar su inventario.
                        </p>
                    </div>

                    <button
                        onClick={handleAddNew}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#004ac6] to-[#2563eb] text-white rounded-xl font-semibold shadow-lg shadow-[#004ac6]/20 hover:opacity-90 active:scale-[0.98] transition-all duration-200"
                    >
                        <Plus className="w-5 h-5" />
                        Nueva Categoría
                    </button>
                </div>

                <div className="flex items-center gap-4 p-1 bg-surface-container-low rounded-2xl w-fit">
                    <button
                        onClick={() => setFiltro("activos")}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${filtro === "activos"
                            ? "bg-white text-primary shadow-sm"
                            : "text-on-surface-variant hover:text-on-surface"
                            }`}
                    >
                        Activas
                    </button>
                    <button
                        onClick={() => setFiltro("inactivos")}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${filtro === "inactivos"
                            ? "bg-white text-primary shadow-sm"
                            : "text-on-surface-variant hover:text-on-surface"
                            }`}
                    >
                        Inactivas
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(25,28,30,0.06)] border border-[#eceef0]/50 overflow-hidden">
                    <div className="max-h-[500px] overflow-y-auto overflow-x-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                        <table className="w-full text-left border-separate border-spacing-0">
                            <thead className="sticky top-0 z-20 bg-white">
                                <tr className="bg-[#f7f9fb]/80 backdrop-blur-md">
                                    <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#434655] font-manrope border-b border-[#eceef0]/50">
                                        Nombre
                                    </th>
                                    <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#434655] font-manrope">
                                        Estado
                                    </th>
                                    <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#434655] font-manrope text-right w-40">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#eceef0]/50">
                                {categorias.map((categoria) => (
                                    <tr
                                        key={categoria.id}
                                        className="hover:bg-[#f7f9fb] transition-colors group"
                                    >
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-[#dbe1ff] flex items-center justify-center text-[#004ac6] font-bold">
                                                    <Tags className="w-5 h-5" />
                                                </div>
                                                <div className="font-semibold text-[#191c1e]">
                                                    {categoria.nombre}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={`w-2 h-2 rounded-full ${categoria.activo ? "bg-green-500" : "bg-[#ba1a1a]"}`}
                                                />
                                                <span className="text-sm font-medium text-[#191c1e]">
                                                    {categoria.activo ? "Activo" : "Inactivo"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right w-40">
                                            <div className="flex justify-end items-center h-10 w-full">
                                                <div className="hidden group-hover:flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleEdit(categoria)}
                                                        className="p-2 text-[#737686] hover:text-[#004ac6] hover:bg-[#dbe1ff] rounded-lg transition-all"
                                                        title="Renombrar"
                                                    >
                                                        <Edit3 className="w-5 h-5" />
                                                    </button>
                                                    {categoria.activo ? (
                                                        <button
                                                            onClick={() => handleDesactivar(categoria.id)}
                                                            className="p-2 text-[#737686] hover:text-[#ba1a1a] hover:bg-[#ffdad6] rounded-lg transition-all"
                                                            title="Desactivar"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleReactivar(categoria.id)}
                                                            className="p-2 text-[#737686] hover:text-[#00c64a] hover:bg-[#d5fcde] rounded-lg transition-all"
                                                            title="Activar"
                                                        >
                                                            <RefreshCcw className="w-5 h-5" />
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="flex group-hover:hidden items-center justify-center w-10 h-10 text-[#737686]">
                                                    <MoreHorizontal className="w-5 h-5" />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {categorias.length === 0 && (
                            <div className="py-20 flex flex-col items-center justify-center text-[#737686] space-y-4">
                                <Tags className="w-16 h-16 opacity-20" />
                                <p className="text-lg font-medium">
                                    No se encontraron categorías registradas.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <FormCategorias
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCategorySaved={fetchCategorias}
                editData={editData}
            />
        </div>
    );
}

export default TablaCategorias;
