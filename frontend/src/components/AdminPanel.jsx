import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "./Navbar";

const AdminPanel = () => {
  // Moved inside the component to check on every render
  const isAuthenticated = localStorage.getItem("token") !== null;

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div>
      <Navbar />
      <div className="md:ml-64">
        <div className="p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;