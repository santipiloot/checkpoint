import React from "react";
import { Link, Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext.jsx";

function NavBar() {
  const { isAuthenticated, logout, rol } = useAuth();

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/proveedores">Proveedores</Link>
          </li>
          {isAuthenticated ? (
            <li>
              <button onClick={logout}>Cerrar Sesión</button>
            </li>
          ) : (
            <li>
              <Link to="/login">Iniciar Sesion</Link>
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
