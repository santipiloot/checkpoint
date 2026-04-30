import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext.jsx";

function FormProveedores() {
  const navigate = useNavigate();
  const { fetchAuth } = useAuth();

  const initialValues = {
    nombre: "",
    email: "",
    telefono: "",
    notas: "",
  };

  const [values, setValues] = useState(initialValues);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetchAuth("http://localhost:3000/proveedores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      if (response.status === 400) {
        console.log("Hubo un error: ", data.error);
      }
    }

    setValues(initialValues);
    navigate("/proveedores");
  };

  const inputClasses =
    "w-full bg-surface-container-highest border-b-2 border-transparent focus:border-primary outline-none py-3 px-4 font-inter text-on-surface transition-all duration-200 placeholder:text-on-surface-variant/40";
  const labelClasses =
    "block font-inter text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1";

  return (
    <div className="max-w-2xl mx-auto p-8">
      <header className="mb-10">
        <h2 className="font-manrope text-3xl font-bold text-on-surface">
          Nuevo Proveedor
        </h2>
        <p className="font-inter text-on-surface-variant mt-2">
          Registra un nuevo contacto en la red de suministros.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-surface-container-lowest p-10 rounded-xl shadow-ambient space-y-8"
      >
        <div className="space-y-6">
          <div>
            <label className={labelClasses}>Nombre del Proveedor</label>
            <input
              required
              placeholder="Ej: Global Logistics S.A."
              className={inputClasses}
              value={values.nombre}
              onChange={(e) => setValues({ ...values, nombre: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Email</label>
              <input
                required
                type="email"
                placeholder="contacto@correo.com"
                className={inputClasses}
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className={labelClasses}>Teléfono</label>
              <input
                required
                placeholder="+54 3804216728"
                className={inputClasses}
                value={values.telefono}
                onChange={(e) =>
                  setValues({ ...values, telefono: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className={labelClasses}>Notas Adicionales</label>
            <textarea
              placeholder="Detalles"
              className={`${inputClasses} min-h-[120px] resize-none`}
              value={values.notas}
              onChange={(e) => setValues({ ...values, notas: e.target.value })}
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-primary text-white font-manrope font-bold py-4 rounded-xl shadow-lg hover:bg-primary-container transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Guardar Proveedor
          </button>
          <Link to="/proveedores" className="flex-1">
            <button
              type="button"
              className="w-full bg-surface-container-high text-on-surface font-manrope font-bold py-4 rounded-xl hover:bg-surface-container-highest transition-all duration-200"
            >
              Cancelar
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default FormProveedores;
