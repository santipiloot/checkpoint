import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { error, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface font-inter text-on-surface p-6">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-lg shadow-ambient p-8 md:p-12 space-y-10">
        <div className="space-y-2">
          <h1 className="font-manrope text-4xl font-extrabold tracking-tight text-on-surface">
            Checkpoint
          </h1>
          <p className="text-on-surface-variant font-medium">
            Accede al sistema de gestión de stock
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-on-surface-variant ml-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@correo.com"
                className="w-full bg-surface-container-highest px-4 py-3 rounded-t-lg border-b-2 border-transparent focus:border-primary focus:outline-none transition-all placeholder:text-on-surface-variant/40"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-on-surface-variant ml-1">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface-container-highest px-4 py-3 rounded-t-lg border-b-2 border-transparent focus:border-primary focus:outline-none transition-all placeholder:text-on-surface-variant/40"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm font-medium animate-pulse">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-primary-container text-white py-4 px-6 rounded-xl font-manrope font-bold text-lg shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="pt-4 text-center">
          <p className="text-sm text-on-surface-variant">
            ¿Necesitas ayuda?{" "}
            <span className="text-primary font-semibold cursor-pointer hover:underline">
              Contactar soporte
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
