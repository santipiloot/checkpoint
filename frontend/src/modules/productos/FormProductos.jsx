import React, { useState, useEffect } from "react";
import { X, Save, Box, Wand2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";

function FormProductos({ isOpen, onClose, onProductSaved, editData }) {
    const { fetchAuth } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCalculatingRop, setIsCalculatingRop] = useState(false);

    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);

    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        codigo_barras: "",
        categoria_id: "",
        proveedor_id: "",
        precio_costo: "",
        stock: "0",
        stock_minimo: "0"
    });

    useEffect(() => {
        if (isOpen) {
            cargarListas();
        }
    }, [isOpen]);

    useEffect(() => {
        if (editData && isOpen) {
            setFormData({
                nombre: editData.nombre || "",
                descripcion: editData.descripcion || "",
                codigo_barras: editData.codigo_barras || "",
                categoria_id: editData.categoria_id || "",
                proveedor_id: editData.proveedor_id || "",
                precio_costo: editData.precio_costo || "",
                stock: editData.stock !== undefined ? editData.stock.toString() : "0",
                stock_minimo: editData.stock_minimo !== undefined ? editData.stock_minimo.toString() : "0"
            });
        } else if (isOpen) {
            setFormData({
                nombre: "",
                descripcion: "",
                codigo_barras: "",
                categoria_id: "",
                proveedor_id: "",
                precio_costo: "",
                stock: "0",
                stock_minimo: "0"
            });
        }
    }, [editData, isOpen]);

    const cargarListas = async () => {
        try {
            const [catsRes, provsRes] = await Promise.all([
                fetchAuth("http://localhost:3000/categorias"),
                fetchAuth("http://localhost:3000/proveedores")
            ]);

            if (catsRes.ok) {
                const cats = await catsRes.json();
                setCategorias(cats.data || []);
            }
            if (provsRes.ok) {
                const provs = await provsRes.json();
                setProveedores(provs.data || []);
            }
        } catch (error) {
            console.error("Error obteniendo categorias y proveedores:", error);
            toast.error("Error al cargar las listas desplegables");
        }
    };

    const calcularRop = async () => {
        if (!editData || !editData.id) return;
        setIsCalculatingRop(true);
        try {
            const res = await fetchAuth(`http://localhost:3000/productos/${editData.id}/rop`);
            const data = await res.json();
            if (res.ok && data.success && data.data !== null && data.data !== undefined) {
                const stockSugerido = data.data.stock_minimo_sugerido || data.data.rop_sugerido || data.data;
                setFormData(prev => ({ ...prev, stock_minimo: stockSugerido.toString() }));
                toast.success(`Cálculo Inteligente completado: Sugerido ${stockSugerido}`);
            } else {
                toast.error("No hay suficientes datos de ventas en los últimos 30 días para calcular el ROP.");
            }
        } catch (error) {
            console.error("Error al calcular rop:", error);
            toast.error("Fallo al contactar al motor inteligente");
        } finally {
            setIsCalculatingRop(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const cleanData = {
                ...formData,
                categoria_id: formData.categoria_id ? parseInt(formData.categoria_id) : null,
                proveedor_id: formData.proveedor_id ? parseInt(formData.proveedor_id) : null,
                precio_costo: formData.precio_costo ? parseFloat(formData.precio_costo) : 0,
                stock: parseInt(formData.stock),
                stock_minimo: parseInt(formData.stock_minimo)
            };

            const url = editData
                ? `http://localhost:3000/productos/editar/${editData.id}`
                : "http://localhost:3000/productos";

            const method = editData ? "PUT" : "POST";

            const response = await fetchAuth(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cleanData)
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                toast.error(data.message || data.error || "Hubo un error al guardar");
                return;
            }

            toast.success(editData ? "Producto actualizado correctamente" : "Producto creado correctamente");
            if (onProductSaved) onProductSaved();
            onClose();

        } catch (error) {
            console.error("Error submitting product:", error);
            toast.error("Error de conexión");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#191c1e]/40 backdrop-blur-sm px-4">
            <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                <div className="p-6 bg-gradient-to-r from-[#004ac6] to-[#2563eb] text-white shrink-0">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Box className="w-6 h-6 text-white/80" />
                            <h2 className="text-xl font-bold font-manrope">
                                {editData ? "Editar Producto" : "Nuevo Producto"}
                            </h2>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="overflow-y-auto px-8 py-6 scrollbar-thin scrollbar-thumb-primary/20">
                    <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-bold text-[#434655] uppercase tracking-wide">
                                    Nombre del Producto <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-[#f7f9fb] border-2 border-transparent focus:border-[#004ac6] focus:bg-white rounded-xl transition-all outline-none text-[#191c1e] font-medium"
                                    placeholder="Ej. Resma A4"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#434655] uppercase tracking-wide">
                                    Código de Barras <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="codigo_barras"
                                    value={formData.codigo_barras}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-[#f7f9fb] border-2 border-transparent focus:border-[#004ac6] focus:bg-white rounded-xl transition-all outline-none text-[#191c1e]"
                                    placeholder="Número de código EAN"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#434655] uppercase tracking-wide">
                                    Precio de Costo <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="precio_costo"
                                    value={formData.precio_costo}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-[#f7f9fb] border-2 border-transparent focus:border-[#004ac6] focus:bg-white rounded-xl transition-all outline-none text-[#191c1e]"
                                    placeholder="0.00"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#434655] uppercase tracking-wide">
                                    Categoría
                                </label>
                                <select
                                    name="categoria_id"
                                    value={formData.categoria_id}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-[#f7f9fb] border-2 border-transparent focus:border-[#004ac6] focus:bg-white rounded-xl transition-all outline-none text-[#191c1e]"
                                >
                                    <option value="">-- Seleccionar Categoría --</option>
                                    {categorias.map(c => (
                                        <option key={c.id} value={c.id}>{c.nombre}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#434655] uppercase tracking-wide">
                                    Proveedor
                                </label>
                                <select
                                    name="proveedor_id"
                                    value={formData.proveedor_id}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-[#f7f9fb] border-2 border-transparent focus:border-[#004ac6] focus:bg-white rounded-xl transition-all outline-none text-[#191c1e]"
                                >
                                    <option value="">-- Seleccionar Proveedor --</option>
                                    {proveedores.map(p => (
                                        <option key={p.id} value={p.id}>{p.nombre}</option>
                                    ))}
                                </select>
                            </div>

                            {!editData && (
                                <div className="space-y-2 md:col-span-2 p-4 bg-orange-50 border border-orange-100 rounded-xl">
                                    <label className="text-xs font-bold text-orange-800 uppercase tracking-wide">
                                        Stock Inicial <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white border-2 border-transparent focus:border-orange-500 rounded-xl transition-all outline-none font-bold text-[#191c1e]"
                                        placeholder="0"
                                        required
                                    />
                                    <p className="text-sm text-orange-700 mt-2">Atención: Solo definible al crear el producto. Modificaciones futuras deben realizarse mediante Movimientos (Ajustes).</p>
                                </div>
                            )}

                            <div className="space-y-2 md:col-span-2 p-5 bg-indigo-50 border border-indigo-100 rounded-xl shadow-inner relative">
                                <div className="flex justify-between items-center mb-2 flex-wrap">
                                    <label className="text-xs font-bold text-indigo-900 uppercase tracking-wide">
                                        Stock Mínimo de Alerta (ROP) <span className="text-red-500">*</span>
                                    </label>

                                    {editData && (
                                        <button
                                            type="button"
                                            onClick={calcularRop}
                                            disabled={isCalculatingRop}
                                            className="ml-auto flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md transition-all active:scale-95"
                                        >
                                            <Wand2 className="w-4 h-4" />
                                            {isCalculatingRop ? 'Pensando...' : 'Calcular Sugerido'}
                                        </button>
                                    )}
                                </div>
                                <input
                                    type="number"
                                    name="stock_minimo"
                                    value={formData.stock_minimo}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white border-2 border-indigo-200 focus:border-indigo-600 rounded-xl transition-all outline-none font-bold text-indigo-900 text-lg"
                                    placeholder="0"
                                    required
                                />
                                {editData && (
                                    <p className="text-sm text-indigo-700 mt-2 font-medium flex items-center gap-2">
                                        <Wand2 className="w-4 h-4 opacity-70" /> Utilice la varita mágica para auto-completar según movimientos reales de los últimos 30 días.
                                    </p>
                                )}
                            </div>

                        </div>
                    </form>
                </div>

                <div className="p-6 bg-[#f7f9fb] border-t border-[#eceef0]/50 shrink-0 flex gap-4 justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 text-[#434655] font-bold rounded-xl hover:bg-[#eceef0] transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        form="product-form"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-gradient-to-r from-[#004ac6] to-[#2563eb] text-white font-bold rounded-xl shadow-lg shadow-[#004ac6]/20 flex items-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FormProductos;
