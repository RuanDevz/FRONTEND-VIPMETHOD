import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { motion } from "framer-motion"; // Importa o framer-motion

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Inicia o carregamento
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("Token", response.data.token);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("email", email);

      // Navega para a página principal
      navigate("/");
    } catch (err) {
      console.log(err);
      setErrorMessage("Invalid email or password. Please try again.");
    } finally {
      setLoading(false); // Termina o carregamento
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Button className="w-full py-2" type="submit" disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-3 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      d="M22 12A10 10 0 0 1 12 22"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                "Login"
              )}
            </Button>
          </motion.div>
        </form>

        <div className="text-center mt-4">
          <p>
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot your password?
            </Link>
          </p>
          <p>
            Don't have an account?{" "}
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
