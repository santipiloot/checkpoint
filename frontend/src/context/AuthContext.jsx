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
    return <h2>No iniciaste sesion</h2>;
  }

  return children;
};
