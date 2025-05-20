import React, { useState, useEffect } from "react";
import { FaTimes, FaTrash, FaUpload, FaImage, FaVideo } from "react-icons/fa";

const RecentEvents = () => {
 
  const [events, setEvents] = useState([]); 
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newMedia, setNewMedia] = useState(null);
  const [mediaType, setMediaType] = useState("image");

  // Keep your existing useEffect for data fetching
  useEffect(() => {
    fetch("http://localhost:5000/api/recent-events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching recent events:", error));
  }, []);

  // Improved modal close handler
  const closeModal = () => {
    setSelectedEvent(null);
    setNewMedia(null);
    setMediaType("image");
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  const handleMediaUpload = async (eventId) => {
    if (!newMedia) return;

    const formData = new FormData();
    formData.append("eventId", eventId);
    formData.append("type", mediaType);
    formData.append("file", newMedia);

    const response = await fetch("http://localhost:5000/api/add-media", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      window.location.reload();
    }
  };

  const handleDeleteMedia = async (mediaId) => {
    const response = await fetch(`http://localhost:5000/api/delete-media/${mediaId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      window.location.reload();
    }
  };
  
  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Recent Events</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event._id}
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
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-500 col-span-full py-8">
            No past events found.
          </p>
        )}
      </div>

      {selectedEvent && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
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
                {selectedEvent.media.map((media) => (
                  <div
                    key={media._id}
                    className="group relative rounded-lg overflow-hidden aspect-square"
                  >
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
                    <button
                      onClick={() => handleDeleteMedia(media._id)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete media"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Upload Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Add New Media</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setMediaType("image")}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                        mediaType === "image"
                          ? "bg-gray-500 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <FaImage /> Image
                    </button>
                    <button
                      onClick={() => setMediaType("video")}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                        mediaType === "video"
                          ? "bg-gray-500 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <FaVideo /> Video
                    </button>
                  </div>

                  <label className="flex-1 cursor-pointer">
                    <input
                      type="file"
                      onChange={(e) => setNewMedia(e.target.files[0])}
                      className="hidden"
                      accept={mediaType === "image" ? "image/*" : "video/*"}
                    />
                    <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors flex items-center justify-center gap-2 text-gray-500">
                      <FaUpload />
                      <span>
                        {newMedia
                          ? newMedia.name
                          : `Click to select ${mediaType}`}
                      </span>
                    </div>
                  </label>

                  <button
                    onClick={() => handleMediaUpload(selectedEvent._id)}
                    disabled={!newMedia}
                    className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    <FaUpload /> Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentEvents;