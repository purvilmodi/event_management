import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./components/index";
import Gallery from "./components/Ugallery";
import Blog from "./components/Ublog";
import Upcoming from "./components/Uupcoming";
import Recent from "./components/Urecent";
import Members from "./components/Umembers";
import Login from "./components/Login";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (default 400ms)
      easing: "ease-in-out", // Easing option
      once: true, // Whether animation should happen only once
    });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/upcoming" element={<Upcoming />} />
      <Route path="/recent" element={<Recent />} />
      <Route path="/members" element={<Members />} />

      
      <Route path="/admin" element={<Login />} />
      <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
              }
             />
</Routes>
  );
};

export default App;
