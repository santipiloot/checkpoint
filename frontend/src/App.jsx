import React from "react";
import { AuthPage, AuthProvider } from "./context/AuthContext.jsx";
import { Routes, Route, Form } from "react-router";
import Login from "./modules/login/Login.jsx";
import NavBar from "./modules/navbar/NavBar.jsx";
import Home from "./modules/home/Home.jsx";
import ProductosEmpLayout from "./modules/productos/ProductosEmpLayout.jsx";
import ProductosLayout from "./modules/productos/ProductosLayout.jsx";
import UsuariosLayout from "./modules/usuarios/UsuariosLayout.jsx";
import FormUsuario from "./modules/usuarios/FormUsuario.jsx";
// import DetallesUsuario from "./modules/usuarios/DetallesUsuario.jsx";
import EditUsuarios from "./modules/usuarios/EditUsuarios.jsx";
import ProveedoresLayout from "./modules/proveedores/ProveedoresLayout.jsx";
import FormProveedores from "./modules/proveedores/FormProveedores.jsx";
import MovimientosLayout from "./modules/movimientos/MovimientosLayout.jsx";
import ReportesLayout from "./modules/reportes/ReportesLayout.jsx";
import CategoriasLayout from "./modules/categorias/CategoriasLayout.jsx";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />

            {/* Zona Empleado (Marcar movimientos nomas) */}
            <Route
              path="productos/emp"
              element={
                <AuthPage>
                  <ProductosEmpLayout />
                </AuthPage>
              }
            />

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

            <Route
              path="productos/:id"
              element={
                <AuthPage>
                  <ProductosLayout />
                </AuthPage>
              }
            />

            <Route
              path="productos/crear"
              element={
                <AuthPage>
                  <ProductosLayout />
                </AuthPage>
              }
            />

            {/* Editar Producto */}
            <Route
              path="productos/editar/:id"
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
                  <EditUsuarios />
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
