import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTimes} from 'react-icons/fa';
import Navbar from './Unavbar';
import Footer from './Ufooter';

const Index = () => {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);
  const [items, setItems] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newMedia, setNewMedia] = useState(null);
  const [mediaType, setMediaType] = useState("image");

  
  useEffect(() => {
    fetch("http://localhost:5000/api/upcoming-events")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
      fetch('http://localhost:5000/api/gallery')
        .then((response) => response.json())
        .then((data) => setItems(data))
        .catch((error) => console.error('Error fetching gallery items:', error));
    }, []);

    useEffect(() => {
    fetch("http://localhost:5000/api/recent-events")
      .then((res) => res.json())
      .then(setRecentEvents)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setSlidesToShow(1);
      else if (width < 1024) setSlidesToShow(2);
      else setSlidesToShow(3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + slidesToShow) % events.length);
      }, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [events, slidesToShow]); // Add slidesToShow to dependencies

  const displayedEvents = [];
  if (events.length > 0) {
    for (let i = 0; i < 9; i++) { // Changed to 9 events
      const index = (currentIndex + i) % events.length;
      displayedEvents.push(events[index]);
    }
  }

  const closeModal = () => {
    setSelectedEvent(null);
    setNewMedia(null);
    setMediaType("image");
  };
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };


  return (
    <div className='overflow-x-hidden'>
      <Navbar />
      <div className="relative w-full mt-5 h-[300px] md:h-[400px] lg:h-[500px]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            No upcoming events found
          </div>
        ) : (
          <>
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }}
            >
              {displayedEvents.map((event, index) => ( // Removed slice(0,6)
                event && (
                  <motion.div
                    key={event._id}
                    className="relative h-full"
                    style={{ minWidth: `${100 / slidesToShow}%` }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.3 }}
                  >
                    <div className="relative group h-full mx-1">
                      <img
                        src={`http://localhost:5000/${event.mainImage}`}
                        alt={event.title}
                        className="w-full h-full object-cover rounded-xl shadow-lg"
                      />
                      <div className="hover:backdrop-blur-md absolute inset-0 bg-opacity-30 flex flex-col justify-center items-center p-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-2 text-center">
                          {event.title}
                        </h2>
                        <p className="text-sm md:text-lg text-gray-300">
                          {new Date(event.eventDate).toISOString().split("T")[0]}
                        </p>
                        <p className="text-xs md:text-sm text-gray-300">{event.place}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 flex justify-between">
              <button
                onClick={() => setCurrentIndex((prev) => 
                  (prev - slidesToShow + events.length) % events.length
                )}
                className="backdrop-blur-md text-orange-500 p-2 md:p-3 rounded-full font-bold hover:bg-orange-500 hover:text-gray-100 transition"
              >
                <i className="ri-arrow-left-wide-line"></i>
              </button>
              <button
                onClick={() => setCurrentIndex((prev) => 
                  (prev + slidesToShow) % events.length
                )}
                className="backdrop-blur-md text-orange-500 p-2 md:p-3 rounded-full font-bold hover:bg-orange-500 hover:text-gray-100 transition"
              >
                <i className="ri-arrow-right-wide-line"></i>
              </button>
            </div>
          </>
        )}

        {/* Gallery Section */}
        <h2 className="text-2xl font-bold my-4 text-center">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.slice(0, 15).map((item, index) => (
            <div  data-aos="fade-up"  key={index} className="rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
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
              <div className="p-2 text-center">
                <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
        <section className="px-4 py-12 bg-gray-50">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8 text-gray-800"
        >
          Recent Events
        </motion.h2>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
            {recentEvents.slice(0,8).map((event) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={`http://localhost:5000/${event.mainImage}`}
                  alt={event.title}
                  className="w-full h-48 object-cover cursor-pointer"
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
                    <span className="mr-2">📍</span>
                    {event.place}
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
      </div>
  );
};

export default Index;
