import React, { useState, useEffect } from 'react';

const Galler = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);


  useEffect(() => {
    fetch('http://localhost:5000/api/gallery')
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error('Error fetching gallery items:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('media', mediaFile);
    formData.append('mediaType', mediaFile.type.startsWith('image/') ? 'image' : 'video');

    try {
      const response = await fetch('http://localhost:5000/api/gallery', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const newItem = await response.json();
      setItems([newItem, ...items]);
      setTitle('');
      setMediaFile(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding gallery item:', error);
      setError('Error adding gallery item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    console.log('Attempting to delete item with id:', id);
  
    if (!window.confirm('Are you sure you want to delete this item?')) return;
  
    const deleteURL = `http://localhost:5000/api/gallery/${id}`;
    console.log('Delete URL:', deleteURL);
  
    try {
      const response = await fetch(deleteURL, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response status:', response.status);
        console.error('Response body:', errorText);
        throw new Error(`Failed to delete item: ${response.status} - ${errorText}`);
      }
  
      console.log('Item deleted successfully:', id);
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      alert(`Failed to delete item: ${error.message}`);
    }
  };
  
  const handleUpdateClick = (item) => {
    setEditItem(item);
    setIsEditModalOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editItem) return;
  
    const formData = new FormData();
    formData.append('title', editItem.title);
  
    if (editItem.newMedia) {
      formData.append('media', editItem.newMedia);
      formData.append('mediaType', editItem.newMedia.type.startsWith('image/') ? 'image' : 'video');
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/gallery/${editItem._id}`, {
        method: 'PUT',
        body: formData,
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to update: ${errorMessage}`);
      }
  
      const updatedItem = await response.json();
      setItems((prevItems) =>
        prevItems.map((item) => (item._id === updatedItem._id ? updatedItem : item))
      );
  
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating gallery item:', error);
      alert(`Error: ${error.message}`);
    }
  };
  
  
 
  return (
    <div className={`w-full min-h-screen bg-stone-50 px-4 py-6 transition-all duration-300 ${isModalOpen ? 'bg-blur-md' : ''}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gallery</h1>
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-900 transition"
          onClick={() => setIsModalOpen(true)}
        >
          Upload Media
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item._id} className="relative group">
              <div className="relative overflow-hidden rounded-xl aspect-square">

              {item.mediaType === 'image' ? (
                <img
                  src={`http://localhost:5000${item.mediaUrl}`}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <video controls className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
                  <source src={`http://localhost:5000${item.mediaUrl}`} type="video/mp4" />
                </video>
              )}
              <button onClick={() => handleDelete(item._id)} className="absolute top-2 right-2 bg-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                <i className="ri-delete-bin-6-line"></i>
              </button>
              <button onClick={() => handleUpdateClick(item)}
                className="absolute top-2 left-2 bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer "
               ><i className="ri-edit-2-line"></i> 
               </button>
              </div>
              <h5 className="mt-2 text-2xl font-semibold">{item.title}</h5>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-lg text-gray-500">
            No media uploaded yet. Click "Upload Media" to get started!
          </p>
        )}
      </div>

       {/* Upload Modal */}
       {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h2 className="text-xl font-bold mb-4">Upload Media</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Media File</label>
                <input
                  type="file"
                  onChange={(e) => setMediaFile(e.target.files[0])}
                  required
                  accept="image/*,video/*"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-blue-300"
                >
                  {loading ? 'Uploading...' : 'Submit'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

{isEditModalOpen && (
  <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
    <div
      className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative"
      onClick={(e) => e.stopPropagation()} // Prevent modal close on click inside
    >
      <h2 className="text-xl font-bold mb-4">Edit Media</h2>
      <form onSubmit={handleUpdateSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={editItem.title}
            onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">New Media (optional)</label>
          <input
            type="file"
            onChange={(e) => setEditItem({ ...editItem, newMedia: e.target.files[0] })}
            accept="image/*,video/*"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition">
            Save Changes
          </button>
          <button onClick={() => setIsEditModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default Galler;
