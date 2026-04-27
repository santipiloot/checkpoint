import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { X, Tag, Save } from "lucide-react";

function FormCategorias({ isOpen, onClose, onCategorySaved, editData = null }) {
    const { fetchAuth } = useAuth();

    const initialValues = {
        nombre: "",
    };

    const [values, setValues] = useState(initialValues);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editData) {
            setValues({ nombre: editData.nombre });
        } else {
            setValues(initialValues);
        }
    }, [editData, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const url = editData
            ? `http://localhost:3000/categorias/${editData.id}`
            : "http://localhost:3000/categorias";
        const method = editData ? "PUT" : "POST";

        try {
            const response = await fetchAuth(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                console.log("Hubo un error: ", data.error);
                return;
            }

            setValues(initialValues);
            if (onCategorySaved) onCategorySaved();
            onClose();
        } catch (error) {
            console.error("Error saving category:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
            <div
                className="absolute inset-0 bg-black/10 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ease-out transform translate-x-0 flex flex-col">
                <div className="px-8 pt-8 pb-6 flex items-center justify-between border-b border-[#eceef0]/50">
                    <div>
                        <h2 className="text-2xl font-bold font-manrope text-[#191c1e] flex items-center gap-2">
                            <Tag className="w-6 h-6 text-[#004ac6]" />
                            {editData ? "Editar Categoría" : "Nueva Categoría"}
                        </h2>
                        <p className="text-sm text-[#434655] font-inter mt-1">
                            {editData ? "Renombrar familia de productos" : "Agregar nueva familia de productos"}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[#eceef0] rounded-full transition-colors text-[#434655]"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-8 py-6">
                    <form id="categoria-form" onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2 group">
                            <label className="text-xs font-semibold uppercase tracking-wider text-[#434655] font-inter ml-1">
                                Nombre de la Categoría
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Tag className="h-5 w-5 text-[#737686]" />
                                </div>
                                <input
                                    required
                                    placeholder="Ej. Lácteos, Bebidas..."
                                    className="block w-full pl-10 pr-3 py-3 bg-[#f7f9fb] border-b-2 border-transparent focus:border-[#004ac6] focus:bg-white transition-all duration-200 outline-none font-inter text-[#191c1e]"
                                    value={values.nombre}
                                    onChange={(e) =>
                                        setValues({ ...values, nombre: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                    </form>
                </div>

                <div className="p-8 border-t border-[#eceef0]/50 bg-[#f7f9fb]">
                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-xl border border-[#c3c6d7] text-[#515f74] font-semibold hover:bg-white transition-all duration-200"
                        >
                            Cancelar
                        </button>
                        <button
                            form="categoria-form"
                            disabled={loading}
                            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#004ac6] to-[#2563eb] text-white font-semibold shadow-lg shadow-[#004ac6]/20 hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            {loading ? "Guardando..." : "Guardar Cambios"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormCategorias;
