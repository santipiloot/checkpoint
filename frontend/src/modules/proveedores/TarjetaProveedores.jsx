import React from "react";
import { Link, useNavigate } from "react-router";
import { Pencil, Trash2 } from "lucide-react";

export default function TarjetaProveedores({ proveedor }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/proveedores/${proveedor.id}`);
  };

  const handleEliminar = () => {};

  return (
    <div
      key={proveedor.id}
      onClick={handleCardClick}
      className="bg-surface-container-lowest p-8 rounded-lg shadow-ambient flex flex-col gap-4 group transition-all duration-300 hover:scale-[1.01] cursor-pointer"
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
        <div
          className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <Link to={`/proveedores/editar/${proveedor.id}`}>
            <button className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors">
              <Pencil className="w-5 h-5" />
            </button>
          </Link>
          <button
            onClick={() => handleEliminar(proveedor.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 className="w-5 h-5" />
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
