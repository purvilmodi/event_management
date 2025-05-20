import React from 'react'
import { Link } from 'react-router-dom';

function Unavbar() {
  return (
    <div><nav className="flex flex-col md:flex-row justify-between items-center p-2 md:p-4 bg-orange-500 text-white shadow-md sticky top-0 z-50">
    <h1 className="text-xl md:text-2xl font-bold mb-2 md:mb-0">EventHub</h1>
    <div data-aos="fade-left" className="flex space-x-2 md:space-x-4 overflow-x-auto text-sm md:text-base">
      <Link to="/" className="hover:text-gray-200">Home</Link>
      <Link to="/gallery" className="hover:text-gray-200">Gallery</Link>
      <Link to="/blog" className="hover:text-gray-200">Blog</Link>
      <Link to="/upcoming" className="hover:text-gray-200">Upcoming</Link>
      <Link to="/recent" className="hover:text-gray-200">Recent</Link>
      <Link to="/members" className="hover:text-gray-200">Members</Link>
    </div>
  </nav></div>
  )
}

export default Unavbar