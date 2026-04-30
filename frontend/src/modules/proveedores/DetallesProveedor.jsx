import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  X,
  Building2,
  Mail,
  Phone,
  FileText,
  Calendar,
  Hash,
} from "lucide-react";

function DetallesProveedor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchAuth } = useAuth();

  const [proveedor, setProveedor] = useState(null);
  const [loading, setLoading] = useState(true);

  const onClose = () => navigate("/proveedores");

  const fetchProveedor = useCallback(async () => {
    const response = await fetchAuth(`http://localhost:3000/proveedores/${id}`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error("Error al obtener proveedor:", data.error);
      setLoading(false);
      return;
    }

    setProveedor(data.data);
    setLoading(false);
  }, [fetchAuth, id]);

  useEffect(() => {
    fetchProveedor();
  }, [fetchProveedor]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-md">
        <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-ambient flex items-center gap-3">
          <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="font-manrope font-bold text-on-surface">
            Cargando detalles...
          </span>
        </div>
      </div>
    );
  }

  if (!proveedor) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-md">
        <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-ambient flex flex-col items-center gap-4">
          <span className="font-manrope font-bold text-on-surface">
            No se encontró el proveedor
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary text-white rounded-xl font-bold"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  const DetailItem = ({ icon: Icon, label, value }) => (
    <div className="flex gap-4 p-4 rounded-2xl bg-surface-container-low border border-surface-container-high transition-all hover:bg-surface-container-lowest group">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wider text-on-surface-variant/60 font-bold font-inter">
          {label}
        </span>
        <span className="text-on-surface font-manrope font-semibold break-all">
          {value || "No especificado"}
        </span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      <div
        className="absolute inset-0 bg-black/10 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-surface-container-lowest shadow-2xl transition-transform duration-300 ease-out transform translate-x-0 flex flex-col border-l border-surface-container-high">
        <div className="px-8 pt-8 pb-6 flex items-center justify-between border-b border-surface-container-high">
          <div>
            <h2 className="text-2xl font-bold font-manrope text-on-surface flex items-center gap-2">
              <Building2 className="w-6 h-6 text-primary" />
              Proveedor
            </h2>
            <p className="text-sm text-on-surface-variant font-inter mt-1">
              Informacion del prroveedor
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
          <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 mb-6 text-center">
            <div className="w-20 h-20 bg-primary rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-primary/20 text-white text-3xl font-bold font-manrope">
              {proveedor.nombre?.charAt(0).toUpperCase()}
            </div>
            <h3 className="text-xl font-bold text-on-surface font-manrope">
              {proveedor.nombre}
            </h3>
          </div>

          <DetailItem
            icon={Mail}
            label="Correo Electrónico"
            value={proveedor.email}
          />

          <DetailItem
            icon={Phone}
            label="Teléfono de Contacto"
            value={proveedor.telefono}
          />

          <div className="flex flex-col gap-2 p-4 rounded-2xl bg-surface-container-low border border-surface-container-high min-h-[120px]">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-[10px] uppercase tracking-wider text-on-surface-variant/60 font-bold font-inter">
                Notas
              </span>
            </div>
            <p className="text-on-surface font-inter text-sm whitespace-pre-wrap leading-relaxed">
              {proveedor.notas || "Sin notas adicionales registradas."}
            </p>
          </div>
        </div>

        <div className="p-8 border-t border-surface-container-high bg-surface-container-low">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetallesProveedor;
