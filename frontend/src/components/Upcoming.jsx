import { useEffect, useState } from "react";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    place: "",
    mainImage: null,
  });

  // Fetch events
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
  
  
  // Open popup for adding/editing
  const openPopup = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        description: event.description,
        eventDate: event.eventDate ? event.eventDate.split("T")[0] : "",
        place: event.place,
        mainImage: event.mainImage, // Preserve existing image
      });
    } else {
      setEditingEvent(null);
      setFormData({ title: "", description: "", eventDate: "", place: "", mainImage: null });
    }
    setShowPopup(true);
  };
  

  // Handle input changes
  const handleChange = (e) => {
    if (e.target.name === "mainImage") {
      setFormData({ ...formData, mainImage: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Submit form (Add or Edit Event)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("eventDate", formData.eventDate);
    formDataToSend.append("place", formData.place);
  
    if (formData.mainImage instanceof File) {
      formDataToSend.append("mainImage", formData.mainImage); // Send new image
    } else if (editingEvent && editingEvent.mainImage) {
      formDataToSend.append("mainImage", editingEvent.mainImage); // Keep old image
    }
  
    try {
      const url = editingEvent
        ? `http://localhost:5000/api/upcoming-events/${editingEvent._id}`
        : "http://localhost:5000/api/add-event";
  
      const method = editingEvent ? "PUT" : "POST";
  
      const res = await fetch(url, { method, body: formDataToSend });
  
      if (res.ok) {
        setShowPopup(false);
        window.location.reload();
      } else {
        console.error("Error saving event:", res.statusText);
      }
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };
  
  

  // Delete event
  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/upcoming-events/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setEvents(events.filter((event) => event._id !== id));
      } else {
        console.error("Error deleting event:", res.statusText);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Upcoming Events</h1>
      <button onClick={() => openPopup()} className="bg-gray-600 hover:bg-gray-900 text-white px-4 py-2 rounded-lg mb-6">+ Add Event</button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={`http://localhost:5000/${event.mainImage}`} alt={event.title} className="w-full h-48 object-cover " />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-gray-500 text-sm">Date: {new Date(event.eventDate).toISOString().split("T")[0]}</p>
              <p className="text-gray-500 text-sm">Place: {event.place}</p>
              <div className="mt-4 flex justify-between">
                <button onClick={() => openPopup(event)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                <button onClick={() => deleteEvent(event._id)} className="bg-red-700 text-white px-3 py-1 rounded">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl mb-4">{editingEvent ? "Edit Event" : "Add Event"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Title" required />
              <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Description" required />
              <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} className="w-full p-2 border rounded" required />
              <input type="text" name="place" value={formData.place} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Place" required />
              <input type="file" name="mainImage" onChange={handleChange} className="w-full p-2 border rounded" />
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editingEvent ? "Update" : "Add"} Event</button>
                <button type="button" onClick={() => setShowPopup(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
