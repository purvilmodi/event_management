import React, { useState, useEffect } from "react";
import Navbar from './Unavbar'
import Footer from './Ufooter'
import { motion } from 'framer-motion';
import { FaTimes} from 'react-icons/fa';

const Urecent  = () => {
  const [recentEvents, setRecentEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newMedia, setNewMedia] = useState(null);
  const [mediaType, setMediaType] = useState("image");

  useEffect(() => {
      fetch("http://localhost:5000/api/recent-events")
        .then((res) => res.json())
        .then(setRecentEvents)
        .catch(console.error);
    }, []);
  
    const closeModal = () => {
      setSelectedEvent(null);
      setNewMedia(null);
      setMediaType("image");
    };
    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) closeModal();
    };

  return (
    <div>
      <Navbar />
      <section className="px-4 py-12 bg-gray-50">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8 text-gray-800"
        >
          Recent Events
        </motion.h2>

        <div className="max-w-7xl mx-auto">
          <div data-aos="zoom-in" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
            {recentEvents.map((event) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={`http://localhost:5000/${event.mainImage}`}
                  alt={event.title}
                  className="w-full h-48 object-cover cursor-pointer hover:scale-150 duration-300"
                  onClick={() => setSelectedEvent(event)}
                />
                <div className="p-4">
                  <h5 className="text-lg font-semibold text-gray-800 mb-2">
                    {event.title}
                  </h5>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <span className="mr-2"><i class="ri-map-pin-2-fill"></i></span>
                    {event.place}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <span className="mr-2"><i class="ri-calendar-fill"></i></span>
                    {event.eventDate}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Events Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 backdrop-blur-md bg-black/50 flex items-center justify-center z-50"
            onClick={handleBackdropClick}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedEvent.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FaTimes className="text-2xl" />
                </button>
              </div>

              {/* Media Grid */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {selectedEvent.media?.map((media) => (
                    <div key={media._id} className="group relative rounded-lg overflow-hidden aspect-square">
                      {media.type === "image" ? (
                        <img
                          src={`http://localhost:5000/${media.url}`}
                          alt="Event media"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={`http://localhost:5000/${media.url}`}
                          controls
                          className="w-full h-full object-cover"
                        />
                      )}
                      
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  )
}

export default Urecent