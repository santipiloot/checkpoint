import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../context/AuthContext.jsx";
import { UserPlus, X, Mail, Lock, ShieldCheck } from "lucide-react";

function EditUsuarios() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchAuth } = useAuth();

  const [values, setValues] = useState(null);
  const [loading, setLoading] = useState(false);

  const onClose = () => navigate("/usuarios");

  const fetchUsuarios = useCallback(async () => {
    const response = await fetchAuth(`http://localhost:3000/usuarios/${id}`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      if (response.status === 400) {
        console.log("hubo un error: ", data.error);
        return;
      }
    }

    setValues(data.data);
  }, [fetchAuth, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetchAuth(
      `http://localhost:3000/usuarios/editar/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      },
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      if (response.status(400)) {
        console.log("Hubo un error: ", data.error);
      }
    }

    navigate("/usuarios");
  };

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  if (!values) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-md">
        <div className="bg-white p-8 rounded-2xl shadow-xl flex items-center gap-3">
          <div className="w-6 h-6 border-4 border-[#004ac6] border-t-transparent rounded-full animate-spin"></div>
          <span className="font-semibold text-[#191c1e]">
            Cargando usuario...
          </span>
        </div>
      </div>
    );
  }

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
              <UserPlus className="w-6 h-6 text-[#004ac6]" />
              Editar Usuario
            </h2>
            <p className="text-sm text-[#434655] font-inter mt-1">
              Modifique las credenciales del sistema
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
          <form id="usuario-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 group">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#434655] font-inter ml-1">
                Nombre Completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserPlus className="h-5 w-5 text-[#737686]" />
                </div>
                <input
                  required
                  placeholder="Ej: Nazareno Pilot"
                  className="block w-full pl-10 pr-3 py-3 bg-[#f7f9fb] border-b-2 border-transparent focus:border-[#004ac6] focus:bg-white transition-all duration-200 outline-none font-inter text-[#191c1e]"
                  value={values.nombre || ""}
                  onChange={(e) =>
                    setValues({ ...values, nombre: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#434655] font-inter ml-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#737686]" />
                </div>
                <input
                  required
                  type="email"
                  placeholder="usuario@checkpoint.com"
                  className="block w-full pl-10 pr-3 py-3 bg-[#f7f9fb] border-b-2 border-transparent focus:border-[#004ac6] focus:bg-white transition-all duration-200 outline-none font-inter text-[#191c1e]"
                  value={values.email || ""}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#434655] font-inter ml-1">
                Rol del Sistema
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ShieldCheck className="h-5 w-5 text-[#737686]" />
                </div>
                <select
                  required
                  className="block w-full pl-10 pr-3 py-3 bg-[#f7f9fb] border-b-2 border-transparent focus:border-[#004ac6] focus:bg-white transition-all duration-200 outline-none font-inter text-[#191c1e] appearance-none"
                  value={values.rol || ""}
                  onChange={(e) =>
                    setValues({ ...values, rol: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Seleccione un rol
                  </option>
                  <option value="admin">Administrador</option>
                  <option value="empleado">Empleado</option>
                </select>
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
              form="usuario-form"
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#004ac6] to-[#2563eb] text-white font-semibold shadow-lg shadow-[#004ac6]/20 hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUsuarios;
