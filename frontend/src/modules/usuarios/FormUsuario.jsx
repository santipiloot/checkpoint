import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext.jsx";

function FormUsuario() {
  const navigate = useNavigate();
  const { fetchAuth } = useAuth();

  const initialValues = {
    nombre: "",
    email: "",
    rol: "",
    password: "",
  };

  const [values, setValues] = useState(initialValues);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetchAuth("http://localhost:3000/auth/register", {
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
    navigate("/usuarios");
  };

  return (
    <div>
      <h1>Agregar Usuario</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          value={values.nombre}
          onChange={(e) => setValues({ ...values, nombre: e.target.value })}
        />

        <label>Correo</label>
        <input
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />

        <label>Contraseña</label>
        <input
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
        />

        <label>Rol</label>
        <select
          value={values.rol}
          onChange={(e) => setValues({ ...values, rol: e.target.value })}
        >
          <option value="">Seleccione un rol</option>
          <option value="admin">Administrador</option>
          <option value="empleado">Empleado</option>
        </select>

        <button type="submit">Agregar</button>
        <Link to="/usuarios">Cancelar</Link>
      </form>
    </div>
  );
}

export default FormUsuario;
