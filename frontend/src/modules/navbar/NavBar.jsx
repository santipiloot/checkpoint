import React from "react";
import { Link, Outlet, useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext.jsx";

function NavBar() {
  const { isAuthenticated, logout, nombre } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Proveedores", path: "/proveedores" },
    { name: "Usuarios", path: "/usuarios" },
    { name: "Movimientos", path: "/movimientos" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-surface font-inter text-on-surface">
      <aside className="w-72 bg-surface-container-low flex flex-col fixed h-full shadow-sm z-10 transition-all duration-300">
        <div className="p-8 pb-12">
          <Link to="/" className="group flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-primary to-primary-container rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-white font-manrope font-black text-xl">
                CP
              </span>
            </div>
            <h1 className="font-manrope text-2xl font-extrabold tracking-tight text-on-surface group-hover:text-primary transition-colors">
              Checkpoint
            </h1>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3.5 rounded-xl font-medium transition-all duration-200 group ${
                isActive(item.path)
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              }`}
            >
              <span className="relative">
                {item.name}
                {isActive(item.path) && (
                  <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-4 bg-white/40 rounded-full" />
                )}
              </span>
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-ambient space-y-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-on-surface truncate">
                      {nombre || "Usuario"}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider font-black text-on-surface-variant/60">
                      Administrador
                    </p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="w-full py-2.5 px-4 bg-surface-container-high hover:bg-red-50 hover:text-red-600 text-on-surface-variant text-sm font-bold rounded-xl transition-all duration-200"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="w-full flex items-center justify-center py-3 px-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </aside>

      <main className="flex-1 ml-72 min-h-screen">
        <div className="p-8 md:p-12 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default NavBar;
