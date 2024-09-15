import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {

      const registerResponse = await axios.post("http://localhost:3001/auth/register", {
        name: name,
        email: email,
        password: password,
        vip: false,
      });

      console.log("User registered successfully:", registerResponse.data);

      localStorage.setItem('name', registerResponse.data.name)
      localStorage.setItem('email', registerResponse.data.email)


      const loginResponse = await axios.post("http://localhost:3001/auth/login", {
        email: email,
        password: password,
      });

      const token = loginResponse.data.token;
      localStorage.setItem("Token", token);  
      console.log("Logged in successfully with token:", token);

      window.location.href = "/";
    } catch (err) {
      console.error("Error during registration or login:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-black text-white p-2 rounded mt-4 transition duration-300 ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
