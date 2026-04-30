import React from "react";
import TablaUsuarios from "./TablaUsuarios.jsx";
import { Outlet } from "react-router";

function UsuariosLayout() {
  return (
    <div className="relative">
      <TablaUsuarios />
      <Outlet />
    </div>
  );
}

export default UsuariosLayout;
