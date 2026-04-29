import React from "react";
import { Link } from "react-router";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import FormUsuario from "./FormUsuario.jsx";
import {
  Users,
  UserPlus,
  MoreHorizontal,
  Edit3,
  Trash2,
  Eye,
} from "lucide-react";

function TablaUsuarios() {
  const { fetchAuth } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDesactivar = async (id) => {
    if (window.confirm("¿Está seguro de desactivar a este usuario?")) {
      const response = await fetchAuth(`http://localhost:3000/usuarios/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.log("Hubo un error: ", data.error);
        return;
      }

      await fetchUsuarios();
    }
  };

  const fetchUsuarios = useCallback(async () => {
    const response = await fetchAuth("http://localhost:3000/usuarios");
    const data = await response.json();

    console.log("Usuario log; ", data);

    if (!response.ok) {
      console.log("Hubo un error: ", data.error);
      return;
    }
    setUsuarios(data.data);
  }, [fetchAuth]);

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  return (
    <div className="min-h-screen bg-[#f7f9fb] p-8 font-inter">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold font-manrope text-[#191c1e] tracking-tight">
              Gestión de Usuarios
            </h1>
            <p className="text-[#434655] text-lg">
              Administre los accesos y roles del personal del sistema.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#004ac6] to-[#2563eb] text-white rounded-xl font-semibold shadow-lg shadow-[#004ac6]/20 hover:opacity-90 active:scale-[0.98] transition-all duration-200"
          >
            <UserPlus className="w-5 h-5" />
            Agregar Usuario
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(25,28,30,0.06)] overflow-hidden border border-[#eceef0]/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr className="bg-[#f7f9fb]/50">
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#434655] font-manrope">
                    Usuario
                  </th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#434655] font-manrope">
                    Rol del Sistema
                  </th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#434655] font-manrope">
                    Estado
                  </th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#434655] font-manrope text-right">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eceef0]/50">
                {usuarios.map((usuario) => (
                  <tr
                    key={usuario.id}
                    className="hover:bg-[#f7f9fb] transition-colors group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#dbe1ff] flex items-center justify-center text-[#004ac6] font-bold">
                          {usuario.nombre.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-[#191c1e]">
                            {usuario.nombre}
                          </div>
                          <div className="text-sm text-[#737686]">
                            {usuario.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight ${
                          usuario.rol === "admin"
                            ? "bg-[#d5e3fc] text-[#004ac6]"
                            : "bg-[#eceef0] text-[#515f74]"
                        }`}
                      >
                        {usuario.rol}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${usuario.activo ? "bg-green-500" : "bg-[#ba1a1a]"}`}
                        />
                        <span className="text-sm font-medium text-[#191c1e]">
                          {usuario.activo ? "Activo" : "Inactivo"}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right w-40">
                      <div className="flex justify-end items-center h-10 w-full">
                        <div className="hidden group-hover:flex items-center gap-2">
                          <Link
                            to={`/usuarios/${usuario.id}`}
                            className="p-2 text-[#737686] hover:text-[#004ac6] hover:bg-[#dbe1ff] rounded-lg transition-all"
                            title="Ver detalles"
                          >
                            <Eye className="w-5 h-5" />
                          </Link>
                          <Link
                            to={`/usuarios/editar/${usuario.id}`}
                            className="p-2 text-[#737686] hover:text-[#004ac6] hover:bg-[#dbe1ff] rounded-lg transition-all"
                            title="Editar usuario"
                          >
                            <Edit3 className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => handleDesactivar(usuario.id)}
                            className="p-2 text-[#737686] hover:text-[#ba1a1a] hover:bg-[#ffdad6] rounded-lg transition-all"
                            title="Desactivar"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
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

            {usuarios.length === 0 && (
              <div className="py-20 flex flex-col items-center justify-center text-[#737686] space-y-4">
                <Users className="w-16 h-16 opacity-20" />
                <p className="text-lg font-medium">
                  No se encontraron usuarios registrados.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <FormUsuario
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUserCreated={fetchUsuarios}
      />
    </div>
  );
}

export default TablaUsuarios;
