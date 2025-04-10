import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Lock, Mail, Loader2, AlertCircle } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext"; // Verifique se o caminho está correto

const Register = () => {
    // Use the theme from the context
    const { theme } = useTheme();

    const [name, setName] = useState(""); // Added state for name
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`https://backend-vip.vercel.app/auth/register`, {
                name,
                email,
                password,
                vip: false,
            });
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("email", email);

            const loginResponse = await axios.post(
                `https://backend-vip.vercel.app/auth/login`,
                {
                    email,
                    password,
                }
            );

            const token = loginResponse.data.token;
            localStorage.setItem("Token", token);
            console.log("Logged in successfully with token:", token);

            window.location.href = "/";
        } catch (err: any) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage("There was an error registering. Please try again.");
            }
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
                    Create an Account
                </h2>
                <p className={`text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
                    Please fill in the details to create a new account
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

                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                            Username
                        </label>
                        <div className="relative">
                            <LogIn className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`block w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${theme === 'dark' ? 'bg-gray-800 text-gray-200 placeholder-gray-400 border-gray-700' : 'bg-white text-gray-900 placeholder-gray-500 border-gray-200'}`}
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                    </div>

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

                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`block w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${theme === 'dark' ? 'bg-gray-800 text-gray-200 placeholder-gray-400 border-gray-700' : 'bg-white text-gray-900 placeholder-gray-500 border-gray-200'}`}
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
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
                                Creating account...
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </motion.button>
                </form>

                <div className="mt-8 text-center">
                    <p className={`text-gray-400 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className={`font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} hover:text-blue-600 transition-colors`}
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;