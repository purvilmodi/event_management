import React, { useState, useEffect } from 'react';
import Navbar from './Unavbar';
import Footer from './Ufooter';

const Ugallery = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
      fetch('http://localhost:5000/api/gallery')
        .then((response) => response.json())
        .then((data) => setItems(data))
        .catch((error) => console.error('Error fetching gallery items:', error));
    }, []);

  return (
    <div>
      <Navbar />
      <div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8 mt-8 text-gray-800"
        >
          Gallery
        </div>

      <div className="p-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <div data-aos="flip-up" key={item._id} className="rounded-xl overflow-hidden shadow-lg">
          {item.mediaType === 'image' ? (
                <img
                  src={`http://localhost:5000${item.mediaUrl}`}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <video controls className="w-full h-48 object-cover">
                  <source src={`http://localhost:5000${item.mediaUrl}`} type="video/mp4" />
                </video>
              )}
          <div className="p-2">
            <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
      <Footer />
    </div>
  )
}

export default Ugallery