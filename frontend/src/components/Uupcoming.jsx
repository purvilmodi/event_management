import React,{ useEffect, useState } from "react";
import Navbar from './Unavbar'
import Footer from './Ufooter'

const Uupcoming = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/upcoming-events")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched events:", data);
        setEvents(data);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);


  return (
    <div>
      <Navbar />
      <div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8 mt-8 text-gray-800"
        >
          Upcoming Events
        </div>
      <div className="container mx-auto p-4">
      {events.map((event) => (
      <div data-aos="fade-up" className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden mb-4">
        <div className="w-full md:w-1/2 p-4">
    <img
      className="hover:scale-120 duration-300 md:w-2/3 flex items-center justify-center bg-cover bg-center text-white p-4"
      src={`http://localhost:5000/${event.mainImage}`} alt={event.title}
    />
      
    </div>
    <div className="p-4 md:w-2/3">
      <div className="text-xl font-bold">{event.title}</div>
      <div className="text-sm text-gray-600 mt-2">{event.description}</div>
    </div>
    <div className="bg-orange-500 bg-opacity-75 p-5 rounded-lg">
        <div className="text-md font-semibold text-gray-800">Date : {event.eventDate}</div>
        <div className="text-md font-lightbold text-gray-800">Place : {event.place}</div>
      </div>
  </div>
      ))}
      </div>
      <Footer />
    </div>
  )
}

export default Uupcoming