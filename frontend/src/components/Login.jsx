import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token); 
      setMessage("Login successful!");
      navigate("/admin/members");
    } catch (error) {
      setMessage("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative z-10 bg-gradient-to-br from-blue-900 to-purple-900 p-6 md:p-8 rounded-lg shadow-lg w-11/12 sm:w-96 max-w-full">
        <h2 className="text-2xl md:text-3xl text-white font-semibold mb-2">ADMIN PANEL</h2>
        <p className="text-white mb-6">Control panel login</p>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-3 border border-gray-300 rounded bg-gray-100 text-gray-800"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded bg-gray-100 text-gray-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
          onClick={handleLogin}
        >
          Login
        </button>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
