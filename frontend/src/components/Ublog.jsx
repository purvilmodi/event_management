import { useState, useEffect } from "react";
import Navbar from './Unavbar'
import Footer from './Ufooter'
import axios from "axios";

const Ublog = () =>{
  const [blogs, setBlogs] = useState([]);
  const [expandedBlogIds, setExpandedBlogIds] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/blogs").then((res) => setBlogs(res.data));
  }, []);

  const handleToggleDescription = (id) => {
    if (expandedBlogIds.includes(id)) {
      setExpandedBlogIds(expandedBlogIds.filter(blogId => blogId !== id));
    } else {
      setExpandedBlogIds([...expandedBlogIds, id]);
    }
  };

  return (
    <div>
      <Navbar />
      <div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8 mt-8 text-gray-800"
        >
          Blogs
        </div>
      <div data-aos="zoom-out-up" className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl transition-transform transform ">
        {blogs.map((blog) => (
          <div className="md:flex hover:scale-105 duration-300 mb-5 mt-5" key={blog._id}>
            <div className="md:shrink-0">
              <img 
                className="h-48 w-full object-cover md:h-full md:w-48 rounded-3xl" 
                src={`http://localhost:5000${blog.image}`} 
                alt="Blog" 
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">#TECHNOLOGY</div>
              <h2 className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                {blog.title}
              </h2>
              <div className={`text-gray-600 mb-3 ${expandedBlogIds.includes(blog._id) ? "" : "truncate"} transition-all break-words`} style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
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
      <Footer />
    </div>
  );
}

export default Ublog;
