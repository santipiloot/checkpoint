import React from "react";
import { AuthPage, AuthProvider } from "./context/AuthContext.jsx";
import { Routes, Route, Form } from "react-router";
import { Toaster } from "react-hot-toast";
import Login from "./modules/login/Login.jsx";
import NavBar from "./modules/navbar/NavBar.jsx";
import Home from "./modules/home/Home.jsx";
import ProductosLayout from "./modules/productos/ProductosLayout.jsx";
import UsuariosLayout from "./modules/usuarios/UsuariosLayout.jsx";
import FormUsuario from "./modules/usuarios/FormUsuario.jsx";
// import DetallesUsuario from "./modules/usuarios/DetallesUsuario.jsx";
import ProveedoresLayout from "./modules/proveedores/ProveedoresLayout.jsx";
import FormProveedores from "./modules/proveedores/FormProveedores.jsx";
import MovimientosLayout from "./modules/movimientos/MovimientosLayout.jsx";
import ReportesLayout from "./modules/reportes/ReportesLayout.jsx";
import CategoriasLayout from "./modules/categorias/CategoriasLayout.jsx";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#fff",
              color: "#191c1e",
              borderRadius: "16px",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              padding: "16px",
              fontSize: "14px",
              fontWeight: "500",
              fontFamily: "'Inter', sans-serif",
            },
            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />

            {/* ZONA ADMIN */}
            {/* Zona Productos */}
            <Route
              path="productos"
              element={
                <AuthPage>
                  <ProductosLayout />
                </AuthPage>
              }
            />

            {/* Zona Categorias */}
            <Route
              path="categorias"
              element={
                <AuthPage>
                  <CategoriasLayout />
                </AuthPage>
              }
            />

            {/* Zona Usuarios */}
            <Route
              path="usuarios"
              element={
                <AuthPage>
                  <UsuariosLayout />
                </AuthPage>
              }
            />

            {/* <Route
              path="usuarios/:id"
              element={
                <AuthPage>
                  <DetallesUsuario />
                </AuthPage>
              }
            /> */}

            <Route
              path="usuarios/crear"
              element={
                <AuthPage>
                  <FormUsuario />
                </AuthPage>
              }
            />

            <Route
              path="usuarios/editar/:id"
              element={
                <AuthPage>
                  <UsuariosLayout />
                </AuthPage>
              }
            />

            {/* Zona Proveedores */}
            <Route
              path="proveedores"
              element={
                <AuthPage>
                  <ProveedoresLayout />
                </AuthPage>
              }
            />

            <Route
              path="proveedores/crear"
              element={
                <AuthPage>
                  <FormProveedores />
                </AuthPage>
              }
            />

            <Route
              path="proveedores/editar/:id"
              element={
                <AuthPage>
                  <ProveedoresLayout />
                </AuthPage>
              }
            />

            {/* Zona Movimientos */}
            <Route
              path="movimientos"
              element={
                <AuthPage>
                  <MovimientosLayout />
                </AuthPage>
              }
            />

            {/* Zona Reportes */}
            <Route
              path="reportes"
              element={
                <AuthPage>
                  <ReportesLayout />
                </AuthPage>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}
