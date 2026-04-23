import React from "react";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useAuth } from "../../context/AuthContext";

function TablaUsuarios() {
  const { fetchAuth } = useAuth();
  const [usuarios, setUsuarios] = useState([]);

  const handleDesactivar = async (id) => {
    //Hacer modal de confirmacion mejor a la vista
    if (window.confirm("Estas seguro en desactivar a este usuario?")) {
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

    if (!response.ok) {
      console.log("Hubo un error: ", data.error);
      return;
    }
    console.log("Proveedores muestra: ", data);

    setUsuarios(data.data);
  });

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  return (
    <div>
      <div>Tabla de usuarios</div>
      <Link to="/usuarios/crear">Agregar Usuario</Link>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rol}</td>
              <td>{usuario.activo}</td>
              <td>
                <Link to={`/usuarios/${usuario.id}`}>Ver</Link>
                <Link to={`/usuarios/editar/${usuario.id}`}>Editar</Link>
                <button onClick={() => handleDesactivar(usuario.id)}>
                  Desactivar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaUsuarios;
