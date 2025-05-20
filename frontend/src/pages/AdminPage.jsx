import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminPanel from "../components/AdminPanel";
import Members from "../components/Members";
import Gallery from "../components/Galler";
import Blog from "../components/Blog";
import Upcoming from "../components/Upcoming";
import Recent from "../components/Recent";

const AdminPage = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminPanel />}>
        {/* Redirect /admin to /admin/members */}
        <Route index element={<Navigate to="members" replace />} />
        <Route path="members" element={<Members />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="blog" element={<Blog />} />
        <Route path="upcoming" element={<Upcoming />} />
        <Route path="recent" element={<Recent />} />
      </Route>
    </Routes>
  );
};

export default AdminPage;
