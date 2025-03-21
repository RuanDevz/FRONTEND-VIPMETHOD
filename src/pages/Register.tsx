import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // Importa o framer-motion
import { LogIn, Lock, Mail, Loader2, AlertCircle } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length < 3) {
      errors.name = "Name must be at least 3 characters long.";
    }

    if (!emailPattern.test(email)) {
      errors.email = "Invalid email address.";
    }

    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear any previous errors

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const registerResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        {
          name,
          email,
          password,
          vip: false,
        }
      );

      console.log("User registered successfully:", registerResponse.data);

      localStorage.setItem("name", registerResponse.data.name);
      localStorage.setItem("email", registerResponse.data.email);

      const loginResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      const token = loginResponse.data.token;
      localStorage.setItem("Token", token);
      console.log("Logged in successfully with token:", token);

      window.location.href = "/"; // Redireciona para a página principal após o login
    } catch (err: any) {
      if (err.response && err.response.status === 409) {
        setError("The email is already registered.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl p-8 border border-gray-700"
      >
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-500 rounded-2xl p-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-white mb-4">Create Account</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-6">
          Please enter your details to create an account.
        </p>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 text-red-700 p-4 rounded-xl mb-6 flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full pl-4 pr-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                placeholder="Enter your name"
                required
              />
              {formErrors.name && (
                <div className="text-red-600 text-sm">{formErrors.name}</div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                placeholder="Enter your email"
                required
              />
              {formErrors.email && (
                <div className="text-red-600 text-sm">{formErrors.email}</div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                placeholder="Enter your password"
                required
              />
              {formErrors.password && (
                <div className="text-red-600 text-sm">{formErrors.password}</div>
              )}
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 border border-transparent rounded-xl text-white font-medium ${
              isLoading
                ? "bg-blue-500/60 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            } transition-all`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Registering...
              </>
            ) : (
              "Register"
            )}
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <a
              href="#/login"
              className="font-medium text-blue-400 hover:text-blue-500 transition-colors"
            >
              Log in
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
