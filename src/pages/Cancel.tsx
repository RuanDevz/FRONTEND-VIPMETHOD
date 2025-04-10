import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle, AlertTriangle, ArrowLeft, RefreshCw, MessageCircle } from "lucide-react";

export default function Cancel() {
  const troubleshootingSteps = [
    {
      icon: RefreshCw,
      title: "Try Again",
      description: "You can attempt the payment process again"
    },
    {
      icon: AlertTriangle,
      title: "Check Details",
      description: "Verify your payment information is correct"
    },
    {
      icon: MessageCircle,
      title: "Contact Support",
      description: "We're here to help if you need assistance"
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
            className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <XCircle className="w-12 h-12 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl font-bold mb-4">Payment Canceled</h1>
            <p className="text-xl text-gray-300 mb-8">
              Don't worry! Your payment was not processed and you haven't been charged.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {troubleshootingSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-red-600/20 via-red-500/20 to-red-600/20 border border-red-500/30 p-8 rounded-2xl mb-8"
          >
            <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Need Help?</h2>
            <p className="text-gray-300">
              If you're experiencing issues with the payment process, our support team is ready to assist you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/plans"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors duration-200"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-600 transition-colors duration-200"
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