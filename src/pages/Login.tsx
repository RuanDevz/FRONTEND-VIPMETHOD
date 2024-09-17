import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../components/input";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });

      const token = response.data.token;
      const name = response.data.name;

      localStorage.setItem("Token", token);
      localStorage.setItem("name", name);

      console.log("Logged in successfully with token:", token);
      console.log("User name:", name);

      window.location.href = "/";
    } catch (err) {
      console.log(err);
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded mt-4 hover:bg-gray-800 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p>
            Don't have an account?
            <Link className="text-blue-500 hover:underline" to="/register">
               Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
