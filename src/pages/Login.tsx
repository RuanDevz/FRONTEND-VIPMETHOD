import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Lock, Mail, Loader2, AlertCircle } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext"; // Make sure the path is correct

const Login = () => {
  // Use the theme from the context
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("Token", response.data.token);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("email", email);

       window.location.href = '/'
    } catch (err) {
      console.error(err);
      setErrorMessage("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md rounded-2xl shadow-xl p-8 border ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}
      >
        <div className="flex justify-center mb-8">
          <div className={`rounded-2xl p-4 ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'}`}>
            <LogIn className="w-8 h-8 text-white" />
          </div>
        </div>

        <h2 className={`text-3xl font-bold text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>
          Welcome Back
        </h2>
        <p className={`text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
          Please enter your details to sign in
        </p>

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-red-50 text-red-700 p-4 rounded-xl mb-6 flex items-center gap-2 ${theme === 'dark' ? 'bg-red-500 text-white' : ''}`}
          >
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">{errorMessage}</p>
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
              Email
            </label>
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`block w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${theme === 'dark' ? 'bg-gray-800 text-gray-200 placeholder-gray-400 border-gray-700' : 'bg-white text-gray-900 placeholder-gray-500 border-gray-200'}`}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
              Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${theme === 'dark' ? 'bg-gray-800 text-gray-200 placeholder-gray-400 border-gray-700' : 'bg-white text-gray-900 placeholder-gray-500 border-gray-200'}`}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className={`flex items-center ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
              <span className={`ml-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className={`text-sm font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} hover:text-blue-600 transition-colors`}
            >
              Forgot password?
            </Link>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl text-white font-medium transition-colors ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <p className={`text-gray-400 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Don't have an account?{" "}
            <Link
              to="/register"
              className={`font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} hover:text-blue-600 transition-colors`}
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
