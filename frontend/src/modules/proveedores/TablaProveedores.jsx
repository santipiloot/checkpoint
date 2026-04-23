import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import TarjetaProveedores from "./TarjetaProveedores.jsx";
import { Link } from "react-router";

function TablaProveedores() {
  const { fetchAuth } = useAuth();
  const [proveedores, setProveedores] = useState([]);

  const fetchProveedores = useCallback(async () => {
    try {
      const response = await fetchAuth("http://localhost:3000/proveedores");

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
  }, [fetchAuth]);

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
            Gestiona la red de suministros y contactos de tu inventario con precisión arquitectónica.
          </p>
        </div>
        
        <Link to="/proveedores/crear">
          <button className="bg-primary text-white font-manrope font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-primary-container transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Agregar Proveedor
          </button>
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proveedores.length > 0 ? (
          proveedores.map((p) => (
            <TarjetaProveedores key={p.id} proveedor={p} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="font-inter text-on-surface-variant italic">No hay proveedores registrados aún.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TablaProveedores;

