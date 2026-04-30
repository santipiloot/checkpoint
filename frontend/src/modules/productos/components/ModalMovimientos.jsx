import React, { useState, useEffect } from "react";
import { X, CheckCircle, Package } from "lucide-react";
import { useAuth } from "../../../context/AuthContext.jsx";
import toast from "react-hot-toast";

function ModalMovimientos({ isOpen, onClose, producto, onMovimientoSaved, tipoMovimiento, esAdmin }) {
    const { fetchAuth } = useAuth();
    const [cantidad, setCantidad] = useState("");
    const [notas, setNotas] = useState("");
    const [motivo, setMotivo] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    let titulo = "";
    let colorTheme = "";
    let motivoPorDefecto = "";

    switch (tipoMovimiento) {
        case "entrada":
            titulo = "Registrar Entrada de Stock";
            colorTheme = "from-blue-600 to-blue-500 bg-blue-50 text-blue-600";
            motivoPorDefecto = "compra";
            break;
        case "salida":
            titulo = "Registrar Salida de Stock";
            colorTheme = "from-green-500 to-green-400 bg-green-50 text-green-600";
            motivoPorDefecto = "venta";
            break;
        case "ajuste":
            titulo = "Ajustar Stock";
            colorTheme = "from-orange-500 to-amber-500 bg-orange-50 text-orange-600";
            motivoPorDefecto = "correccion";
            break;
        default:
            titulo = "Movimiento Express";
            colorTheme = "from-gray-500 to-gray-400";
    }

    const [esResta, setEsResta] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setCantidad("");
            setNotas("");
            setMotivo(motivoPorDefecto);
            setEsResta(false);
        }
    }, [isOpen, tipoMovimiento, motivoPorDefecto]);

    if (!isOpen || !producto) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cantidad || isNaN(cantidad) || Number(cantidad) <= 0) {
            toast.error("La cantidad debe ser mayor a 0");
            return;
        }

        setIsSubmitting(true);
        try {
            const numCantidad = parseInt(cantidad);
            const cantidadFinal = (tipoMovimiento === 'ajuste' && esResta) ? -Math.abs(numCantidad) : numCantidad;

            const bodyEnvio = {
                producto_id: producto.id,
                tipo: tipoMovimiento,
                motivo: esAdmin ? motivo : motivoPorDefecto,
                cantidad: cantidadFinal,
                notas: notas.trim()
            };

            const response = await fetchAuth("http://localhost:3000/movimientos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyEnvio)
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                toast.error(data.message || data.error || "Error al procesar el movimiento");
                return;
            }

            toast.success("Movimiento registrado correctamente");
            onClose();
            if (onMovimientoSaved) onMovimientoSaved();

        } catch (error) {
            console.error("Error al registrar el movimiento:", error);
            toast.error("Error de conexión");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#191c1e]/40 backdrop-blur-sm p-2 sm:px-4">
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[96vh]">
                <div className={`p-5 bg-gradient-to-r text-white ${colorTheme.split(" ")[0]} ${colorTheme.split(" ")[1]} flex-shrink-0`}>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Package className="w-5 h-5 text-white/80" />
                            <h2 className="text-lg font-bold font-manrope">{titulo}</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-5 overflow-y-auto custom-scrollbar">
                    <div className="bg-[#f7f9fb] p-3 rounded-xl border border-[#eceef0]/50 mb-2">
                        <p className="text-xs text-[#737686] mb-0.5">Producto:</p>
                        <p className="font-bold text-[#191c1e]">{producto.nombre}</p>
                        <p className="text-xs font-semibold text-[#004ac6] mt-1">
                            Stock Actual: {producto.stock} unidades
                        </p>
                    </div>

                    {tipoMovimiento === 'ajuste' && (
                        <div className="space-y-3">
                            <label className="text-[11px] font-bold text-[#434655] uppercase tracking-wider">
                                Operación del Ajuste <span className="text-[#ba1a1a]">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setEsResta(false)}
                                    className={`py-2 px-3 rounded-xl font-bold border-2 transition-all flex items-center justify-center gap-2 text-sm ${!esResta ? 'bg-blue-50 border-blue-600 text-blue-600' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}
                                >
                                    Sumar (+)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEsResta(true)}
                                    className={`py-2 px-3 rounded-xl font-bold border-2 transition-all flex items-center justify-center gap-2 text-sm ${esResta ? 'bg-red-50 border-red-600 text-red-600' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}
                                >
                                    Restar (-)
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-[#434655] uppercase tracking-wider">
                            Cantidad {tipoMovimiento === 'salida' ? 'a retirar' : (tipoMovimiento === 'ajuste' && esResta) ? 'a restar' : 'a ingresar'} <span className="text-[#ba1a1a]">*</span>
                        </label>
                        <input
                            type="number"
                            min="1"
                            step="1"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            className="w-full px-4 py-3 text-lg bg-[#f7f9fb] border-2 border-transparent focus:border-[#004ac6] focus:bg-white rounded-xl transition-all outline-none font-bold text-[#191c1e]"
                            placeholder="Ej: 5"
                            required
                            autoFocus
                        />
                    </div>

                    {esAdmin && (
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-[#434655] uppercase tracking-wider">
                                Motivo Específico <span className="text-[#ba1a1a]">*</span>
                            </label>
                            <select
                                value={motivo}
                                onChange={(e) => setMotivo(e.target.value)}
                                className="w-full px-4 py-2.5 bg-[#f7f9fb] border-2 border-transparent focus:border-[#004ac6] focus:bg-white rounded-xl transition-all outline-none font-semibold text-[#191c1e] text-sm"
                                required
                            >
                                {tipoMovimiento === 'entrada' && (
                                    <>
                                        <option value="compra">Compra a Proveedor</option>
                                        <option value="devolucion">Devolución de Cliente</option>
                                    </>
                                )}
                                {tipoMovimiento === 'salida' && (
                                    <>
                                        <option value="venta">Venta Normal</option>
                                        <option value="devolucion">Devolución a Proveedor</option>
                                    </>
                                )}
                                {tipoMovimiento === 'ajuste' && (
                                    <>
                                        <option value="robo">Robo / Faltante</option>
                                        <option value="daño">Producto Dañado</option>
                                        <option value="correccion">Corrección Manual</option>
                                    </>
                                )}
                            </select>
                        </div>
                    )}

                    {tipoMovimiento !== 'salida' && (
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-[#434655] uppercase tracking-wider">
                                Notas (Opcional)
                            </label>
                            <input
                                type="text"
                                value={notas}
                                onChange={(e) => setNotas(e.target.value)}
                                className="w-full px-4 py-2.5 bg-[#f7f9fb] border-2 border-transparent focus:border-[#004ac6] focus:bg-white rounded-xl transition-all outline-none text-sm"
                                maxLength={250}
                                placeholder="Referencia extra..."
                            />
                        </div>
                    )}

                    <div className="pt-2 flex gap-3 flex-shrink-0">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`flex-1 py-3.5 text-white rounded-xl font-bold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity bg-gradient-to-r ${colorTheme.split(" ")[0]} ${colorTheme.split(" ")[1]} disabled:opacity-50`}
                        >
                            <CheckCircle className="w-5 h-5" />
                            {isSubmitting ? "Procesando..." : "Confirmar Operación"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalMovimientos;
