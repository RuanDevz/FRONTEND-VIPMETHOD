import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Crown, Star, Sparkles, ArrowLeft, Shield } from "lucide-react";

export default function Success() {
  const benefits = [
    {
      icon: Crown,
      title: "Premium Content",
      description: "Access exclusive VIP content and features"
    },
    {
      icon: Star,
      title: "Ad-Free Experience",
      description: "Enjoy all content without interruptions"
    },
    {
      icon: Shield,
      title: "Priority Support",
      description: "Get dedicated support when you need it"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl font-bold mb-4">Welcome to VIP Access!</h1>
            <p className="text-xl text-gray-300 mb-8">
              Your payment was successful. Get ready for an exclusive experience!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 p-8 rounded-2xl mb-8"
          >
            <Sparkles className="w-8 h-8 text-white/80 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your VIP Journey Begins Now</h2>
            <p className="text-gray-100">
              Explore premium content, enjoy ad-free viewing, and experience exclusive features.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Homepage
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}