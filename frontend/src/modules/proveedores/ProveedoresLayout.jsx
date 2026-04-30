import React from "react";
import TablaProveedores from "./TablaProveedores";
import { Outlet } from "react-router";

function ProveedoresLayout() {
  return (
    <div className="min-h-screen bg-surface">
      <TablaProveedores />
      <Outlet />
    </div>
  );
}

export default ProveedoresLayout;

