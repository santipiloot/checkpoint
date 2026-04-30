import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [email, setEmail] = useState(null);
  const [rol, setRol] = useState(null);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const session = await response.json();

      if (!response.ok) {
        throw new Error(session.message || session.error);
      }
      console.log(session)
      setToken(session.token);
      setNombre(session.usuario.nombre);
      setEmail(session.usuario.email);
      setRol(session.usuario.rol);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false };
    }
  };

  const logout = () => {
    setToken(null);
    setNombre(null);
    setEmail(null);
    setRol(null);
  };

  const fetchAuth = async (url, options = {}) => {
    if (!token) {
      throw new Error("La sesion no esta iniciada");
    }

    return fetch(url, {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${token}` },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        nombre,
        email,
        rol,
        login,
        logout,
        isAuthenticated: !!token,
        fetchAuth,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthPage = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f7f9fb] flex flex-col items-center justify-center p-8 font-inter">
        <div className="bg-white p-10 rounded-3xl shadow-xl shadow-blue-100 border border-[#eceef0] text-center max-w-md">
          <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-[#004ac6]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#191c1e] mb-4 font-manrope">
            Acceso restringido
          </h1>
          <p className="text-[#737686] mb-8 leading-relaxed">
            Debes iniciar sesion para poder acceder
          </p>
          <a
            href="/login"
            className="inline-block bg-[#004ac6] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-[#003da5] transition-all transform hover:-translate-y-0.5"
          >
            Ir al Login
          </a>
        </div>
      </div>
    );
  }

  return children;
};
