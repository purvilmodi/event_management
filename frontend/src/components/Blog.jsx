import { useState, useEffect } from "react";
import axios from "axios";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", image: null });
  const [editId, setEditId] = useState(null);
  const [expandedBlogIds, setExpandedBlogIds] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/blogs").then((res) => setBlogs(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    if (formData.image) formDataToSend.append("image", formData.image);

    if (editId) {
      await axios.put(`http://localhost:5000/api/blogs/${editId}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      await axios.post("http://localhost:5000/api/blogs", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
    setShowModal(false);
    window.location.reload();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/blogs/${id}`);
    setBlogs(blogs.filter(blog => blog._id !== id));
  };

  const handleEdit = (blog) => {
    setFormData({ title: blog.title, description: blog.description, image: null });
    setEditId(blog._id);
    setShowModal(true);
  };

  const handleToggleDescription = (id) => {
    if (expandedBlogIds.includes(id)) {
      setExpandedBlogIds(expandedBlogIds.filter(blogId => blogId !== id));
    } else {
      setExpandedBlogIds([...expandedBlogIds, id]);
    }
  };

  return (
    <div className="p-4 lg:p-10 max-w-7xl mx-auto">
      <button 
        className="bg-gray-800 text-white px-6 py-3 rounded-lg mb-8 hover:bg-black transition-all"
        onClick={() => setShowModal(true)}
      >
        Add New Blog
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog._id} className="relative group">
            <div className="relative overflow-hidden rounded-xl aspect-square">
              <img 
                src={`http://localhost:5000${blog.image}`} 
                alt={blog.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity duration-300">
                <button 
                  className="bg-white/90 text-black px-5 py-2 rounded-full hover:bg-white transition-colors"
                  onClick={() => handleEdit(blog)}
                >
                  Edit
                </button>
                <button 
                  className="bg-red-500/90 text-white px-5 py-2 rounded-full hover:bg-red-600 transition-colors"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="font-serif text-2xl font-bold mb-2">{blog.title}</h3>
              <div className={`text-gray-600 mb-3 ${expandedBlogIds.includes(blog._id) ? "" : "truncate"} transition-all break-words`}>
  {expandedBlogIds.includes(blog._id) ? blog.description : `${blog.description.substring(0, 100)}...`}
</div>

              <button 
                className="text-sm font-semibold hover:text-gray-600 transition-colors"
                onClick={() => handleToggleDescription(blog._id)}
              >
                {expandedBlogIds.includes(blog._id) ? "READ LESS" : "READ MORE"} →
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="font-serif text-2xl font-bold mb-6">
              {editId ? "Edit Post" : "Create New Post"}
            </h3>
            
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <input
                type="text"
                name="title"
                placeholder="Post Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              
              <textarea
                name="description"
                placeholder="Post Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 mb-4 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-black"
              />
              
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="w-full mb-6 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black/5 file:hover:bg-black/10"
              />
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  {editId ? "Update Post" : "Create Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
