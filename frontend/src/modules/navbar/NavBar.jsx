import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  LayoutDashboard,
  Package,
  Truck,
  Tags,
  Users,
  ArrowLeftRight,
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  LogIn,
} from "lucide-react";

function NavBar() {
  const { isAuthenticated, logout, nombre, rol } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems =
    rol === "admin"
      ? [
          { name: "Dashboard", path: "/", icon: LayoutDashboard },
          { name: "Productos", path: "/productos", icon: Package },
          { name: "Proveedores", path: "/proveedores", icon: Truck },
          { name: "Categorías", path: "/categorias", icon: Tags },
          { name: "Usuarios", path: "/usuarios", icon: Users },
          { name: "Movimientos", path: "/movimientos", icon: ArrowLeftRight },
          { name: "Reportes", path: "/reportes", icon: BarChart3 },
        ]
      : [{ name: "Productos", path: "/productos", icon: Package }];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-surface font-inter text-on-surface">
      <aside
        className={`${
          isCollapsed ? "w-20" : "w-72"
        } bg-surface-container-low flex flex-col fixed h-full shadow-sm z-20 transition-all duration-300 ease-in-out`}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-10 bg-primary text-white p-1 rounded-full shadow-lg hover:scale-110 transition-transform z-30"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        <div className={`p-6 ${isCollapsed ? "px-4" : "pb-12"}`}>
          <Link to="/" className="group flex items-center space-x-3">
            <div className="w-10 h-10 min-w-[40px] bg-gradient-to-tr from-primary to-primary-container rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-white font-manrope font-black text-xl">
                CP
              </span>
            </div>
            {!isCollapsed && (
              <h1 className="font-manrope text-2xl font-extrabold tracking-tight text-on-surface group-hover:text-primary transition-colors truncate">
                Checkpoint
              </h1>
            )}
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto overflow-x-hidden">
          {isAuthenticated &&
            navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  title={isCollapsed ? item.name : ""}
                  className={`flex items-center ${
                    isCollapsed ? "justify-center" : "px-4"
                  } py-3.5 rounded-xl font-medium transition-all duration-200 group relative ${
                    isActive(item.path)
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  <Icon size={22} className={`${!isCollapsed && "mr-3"}`} />
                  {!isCollapsed && (
                    <span className="truncate">{item.name}</span>
                  )}
                  {isActive(item.path) && !isCollapsed && (
                    <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-4 bg-white/40 rounded-full" />
                  )}
                  {isActive(item.path) && isCollapsed && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white/40 rounded-r-full" />
                  )}
                </Link>
              );
            })}
        </nav>

        <div className="p-3 mt-auto">
          <div
            className={`bg-surface-container-lowest rounded-2xl ${isCollapsed ? "p-2" : "p-4"} shadow-ambient space-y-4 overflow-hidden`}
          >
            {isAuthenticated ? (
              <>
                <div
                  className={`flex items-center ${isCollapsed ? "justify-center" : "space-x-3"}`}
                >
                  <div
                    className={`w-10 h-10 min-w-[40px] rounded-full bg-surface-container-high flex items-center justify-center text-primary`}
                  >
                    <User size={20} />
                  </div>
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-on-surface truncate">
                        {nombre.charAt(0).toUpperCase() + nombre.slice(1)}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider font-black text-on-surface-variant/60 truncate">
                        {rol.charAt(0).toUpperCase() + rol.slice(1)}
                      </p>
                    </div>
                  )}
                </div>
                <button
                  onClick={logout}
                  title={isCollapsed ? "Cerrar Sesión" : ""}
                  className={`w-full flex items-center ${
                    isCollapsed ? "justify-center px-2" : "px-4"
                  } py-2.5 bg-surface-container-high hover:bg-red-50 hover:text-red-600 text-on-surface-variant text-sm font-bold rounded-xl transition-all duration-200`}
                >
                  <LogOut size={18} className={`${!isCollapsed && "mr-2"}`} />
                  {!isCollapsed && <span>Cerrar Sesión</span>}
                </button>
              </>
            ) : (
              <Link
                to="/login"
                title={isCollapsed ? "Iniciar Sesión" : ""}
                className={`w-full flex items-center justify-center ${
                  isCollapsed ? "py-3 px-2" : "py-3 px-4"
                } bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all`}
              >
                <LogIn size={20} className={`${!isCollapsed && "mr-2"}`} />
                {!isCollapsed && <span>Iniciar Sesión</span>}
              </Link>
            )}
          </div>
        </div>
      </aside>

      <main
        className={`flex-1 ${
          isCollapsed ? "ml-20" : "ml-72"
        } min-h-screen transition-all duration-300 ease-in-out`}
      >
        <div className="p-8 md:p-12 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default NavBar;
