import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Mobile Menu Toggle */}
      {!isOpen && (
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 fixed top-4 right-4 z-50 text-black rounded-full"
        >
          <i className="ri-menu-line text-2xl"></i>
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white transform transition-transform duration-300 ${
          isOpen
            ? 'translate-x-0 fixed inset-y-0 left-0 w-64 z-40'
            : '-translate-x-full fixed inset-y-0 left-0 w-64 z-40'
        } md:translate-x-0 md:fixed md:inset-y-0 md:left-0 md:w-64 md:z-40`}
      >
        {/* Close Toggle */}
        {isOpen && (
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 absolute top-2 right-2 z-50 text-white rounded-full"
          >
            <i className="ri-close-line text-2xl"></i> {/* Close icon */}
          </button>
        )}

        <h2 className="text-3xl p-4 bg-gray-900">Admin Panel</h2>
        <nav className="h-full overflow-y-auto">
          <Link to="/admin/members" className="block py-2.5 px-4 hover:bg-gray-700">
            Members
          </Link>
          <Link to="/admin/gallery" className="block py-2.5 px-4 hover:bg-gray-700">
            Gallery
          </Link>
          <Link to="/admin/blog" className="block py-2.5 px-4 hover:bg-gray-700">
            Blog
          </Link>
          <Link to="/admin/upcoming" className="block py-2.5 px-4 hover:bg-gray-700">
            Upcoming Events
          </Link>
          <Link to="/admin/recent" className="block py-2.5 px-4 hover:bg-gray-700">
            Recent Events
          </Link>
          {/* Add more links as needed */}
        </nav>
      </div>

      {/* Backdrop for Mobile Menu */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        ></div>
      )}
    </div>
  );
};

export default Navbar;
