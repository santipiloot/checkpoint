import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../context/AuthContext.jsx";
import { X, Building2, Mail, Phone, FileText } from "lucide-react";

function EditProveedores() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchAuth } = useAuth();

  const [values, setValues] = useState(null);
  const [loading, setLoading] = useState(false);

  const onClose = () => navigate("/proveedores");

  const fetchProveedor = useCallback(async () => {
    try {
      const response = await fetchAuth(
        `http://localhost:3000/proveedores/${id}`,
      );
      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error("Error al obtener proveedor:", data.error);
        return;
      }

      setValues(data.data);
    } catch (error) {
      console.error("Error al cargar proveedor:", error);
    }
  }, [fetchAuth, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetchAuth(
        `http://localhost:3000/proveedores/editar/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error("Error al actualizar proveedor:", data.error);
        setLoading(false);
        return;
      }

      navigate("/proveedores");
    } catch (error) {
      console.error("Error al actualizar proveedor:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProveedor();
  }, [fetchProveedor]);

  if (!values) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-md">
        <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-ambient flex items-center gap-3">
          <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="font-manrope font-bold text-on-surface">
            Cargando proveedor...
          </span>
        </div>
      </div>
    );
  }

  const inputClasses =
    "block w-full pl-10 pr-3 py-3 bg-surface-container-low border-b-2 border-transparent focus:border-primary focus:bg-surface-container-lowest transition-all duration-200 outline-none font-inter text-on-surface";
  const labelClasses =
    "text-xs font-bold uppercase tracking-wider text-on-surface-variant font-inter ml-1";

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      <div
        className="absolute inset-0 bg-black/10 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-surface-container-lowest shadow-2xl transition-transform duration-300 ease-out transform translate-x-0 flex flex-col">
        <div className="px-8 pt-8 pb-6 flex items-center justify-between border-b border-surface-container-high">
          <div>
            <h2 className="text-2xl font-bold font-manrope text-on-surface flex items-center gap-2">
              <Building2 className="w-6 h-6 text-primary" />
              Editar Proveedor
            </h2>
            <p className="text-sm text-on-surface-variant font-inter mt-1">
              Actualice la información del proveedor
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          <form
            id="proveedor-form"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-2 group">
              <label className={labelClasses}>Nombre de la Empresa</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-on-surface-variant/50" />
                </div>
                <input
                  required
                  placeholder="Ej: Tech Supply S.A."
                  className={inputClasses}
                  value={values.nombre || ""}
                  onChange={(e) =>
                    setValues({ ...values, nombre: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className={labelClasses}>Correo Electrónico</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-on-surface-variant/50" />
                </div>
                <input
                  required
                  type="email"
                  placeholder="contacto@empresa.com"
                  className={inputClasses}
                  value={values.email || ""}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className={labelClasses}>Teléfono de Contacto</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-on-surface-variant/50" />
                </div>
                <input
                  required
                  placeholder="+54 11 1234-5678"
                  className={inputClasses}
                  value={values.telefono || ""}
                  onChange={(e) =>
                    setValues({ ...values, telefono: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className={labelClasses}>Notas Adicionales</label>
              <div className="relative">
                <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                  <FileText className="h-5 w-5 text-on-surface-variant/50" />
                </div>
                <textarea
                  placeholder="Ingrese detalles relevantes..."
                  className={`${inputClasses} min-h-[120px] resize-none pt-3`}
                  value={values.notas || ""}
                  onChange={(e) =>
                    setValues({ ...values, notas: e.target.value })
                  }
                />
              </div>
            </div>
          </form>
        </div>

        <div className="p-8 border-t border-surface-container-high bg-surface-container-low">
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl border border-outline-variant text-on-surface-variant font-bold hover:bg-surface-container-lowest transition-all duration-200"
            >
              Cancelar
            </button>
            <button
              form="proveedor-form"
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProveedores;
