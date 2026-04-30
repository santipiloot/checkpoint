import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import TarjetaProveedores from "./TarjetaProveedores.jsx";
import { Link } from "react-router";
import { Plus } from "lucide-react";

function TablaProveedores() {
  const { fetchAuth } = useAuth();
  const [proveedores, setProveedores] = useState([]);
  const [filtro, setFiltro] = useState("activos"); // 'activos' o 'inactivos'

  const fetchProveedores = useCallback(async () => {
    try {
      const url = `http://localhost:3000/proveedores${filtro === "inactivos" ? "?inactivos=true" : ""}`;
      const response = await fetchAuth(url);

      if (!response.ok) {
        const text = await response.text();
        console.error("Error en la petición: ", text);
        return;
      }

      const data = await response.json();
      setProveedores(data.data);
    } catch (error) {
      console.error("Error al buscar proveedores:", error);
    }
  }, [fetchAuth, filtro]);

  useEffect(() => {
    fetchProveedores();
  }, [fetchProveedores]);

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="font-manrope text-5xl font-extrabold tracking-tight text-on-surface">
            Proveedores
          </h1>
          <p className="font-inter text-on-surface-variant max-w-md">
            Gestiona la red de suministros y contactos de tu inventario con
            precisión arquitectónica.
          </p>
        </div>

        <Link to="/proveedores/crear">
          <button className="bg-primary text-white font-manrope font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-primary-container transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Agregar Proveedor
          </button>
        </Link>
      </header>

      <div className="flex items-center gap-4 p-1 bg-surface-container-low rounded-2xl w-fit">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proveedores.length > 0 ? (
          proveedores.map((p) => (
            <TarjetaProveedores
              key={p.id}
              proveedor={p}
              onUpdate={fetchProveedores}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="font-inter text-on-surface-variant italic">
              No hay proveedores registrados aún.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TablaProveedores;
