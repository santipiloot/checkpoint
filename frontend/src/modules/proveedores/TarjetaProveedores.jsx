import React from "react";
import { Link } from "react-router";

export default function TarjetaProveedores({ proveedor }) {
  const deleteProveedor = async () => {};

  return (
    <div 
      key={proveedor.id}
      className="bg-surface-container-lowest p-8 rounded-lg shadow-ambient flex flex-col gap-4 group transition-all duration-300 hover:scale-[1.01]"
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-manrope text-xl font-bold text-on-surface">
            {proveedor.nombre}
          </h2>
          <p className="font-inter text-sm text-on-surface-variant mt-1">
            {proveedor.email}
          </p>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link to={`/proveedores/editar/${proveedor.id}`}>
            <button className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
          </Link>
          <button 
            onClick={() => deleteProveedor(proveedor.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="flex flex-col">
          <span className="font-inter text-[10px] uppercase tracking-wider text-on-surface-variant/60 font-bold">
            Teléfono
          </span>
          <span className="font-inter text-sm text-on-surface">
            {proveedor.telefono || "No especificado"}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-inter text-[10px] uppercase tracking-wider text-on-surface-variant/60 font-bold">
            Notas
          </span>
          <span className="font-inter text-sm text-on-surface line-clamp-1">
            {proveedor.notas || "Sin notas"}
          </span>
        </div>
      </div>
    </div>
  );
}

