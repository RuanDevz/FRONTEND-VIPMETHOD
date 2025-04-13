import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  AlertCircle,
  CheckCircle2,
  X,
  Users,
  Clock,
  Shield,
  ShieldCheck,
  Loader2,
  RefreshCw,
  Filter,
  ChevronDown
} from "lucide-react";

// Types
interface User {
  id: string;
  name: string;
  email: string;
  vipExpirationDate: string | null;
}

interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

// Modals
const ConfirmModal: React.FC<ConfirmModalProps> = ({ title, message, onConfirm, onCancel }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors rounded-lg hover:bg-gray-100"
        >
          Cancel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onConfirm}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Confirm
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
);

const SuccessModal: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-green-500" />
          <h3 className="text-xl font-bold text-gray-900">Success</h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>
      <p className="text-gray-600 mb-4">{message}</p>
    </motion.div>
  </motion.div>
);

// Main Component
const AdminDisabledVipUsers: React.FC = () => {
  const [disabledUsers, setDisabledUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [sortBy, setSortBy] = useState<"name" | "date">("date");

  const navigate = useNavigate();

  useEffect(() => {
    fetchDisabledVipUsers();
  }, []);

  useEffect(() => {
    const filtered = disabledUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return new Date(b.vipExpirationDate || 0).getTime() - new Date(a.vipExpirationDate || 0).getTime();
    });
    
    setFilteredUsers(sorted);
  }, [searchTerm, disabledUsers, sortBy]);

  const fetchDisabledVipUsers = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<User[]>(
        `${import.meta.env.VITE_BACKEND_URL}/auth/vip-disabled-users`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
        }
      );
      setDisabledUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching disabled VIP users:", error);
      setError("Failed to load disabled VIP users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null): string => {
    if (!dateString || dateString === "Not defined") return "Not defined";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renewVip = async (email: string, period: "30days" | "1year"): Promise<void> => {
    const periodText = period === "30days" ? "30 days" : "1 year";
    setConfirmAction({
      title: "Renew VIP Access",
      message: `Are you sure you want to renew VIP access for ${email} for ${periodText}?`,
      onConfirm: async () => {
        try {
          setLoading(true);
          const endpoint = period === "30days"
            ? `${import.meta.env.VITE_BACKEND_URL}/auth/renew-vip/${email}`
            : `${import.meta.env.VITE_BACKEND_URL}/auth/renew-vip-year/${email}`;
          
          const response = await axios.put(
            endpoint,
            {},
            { headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` } }
          );
          setSuccessMessage(response.data.message || "VIP access renewed successfully!");
          setShowSuccessModal(true);
          await fetchDisabledVipUsers();
        } catch (error) {
          console.error("Error renewing VIP:", error);
          setError("Failed to renew VIP access. Please try again.");
        } finally {
          setLoading(false);
          setConfirmAction(null);
        }
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Disabled VIP Users</h1>
            <p className="text-gray-400 mt-2">Manage users with disabled VIP access</p>
          </div>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/admin-vip-users")}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <Users className="w-5 h-5" />
              Back to VIP Users
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={fetchDisabledVipUsers}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh
            </motion.button>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6 flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            {error}
          </motion.div>
        )}

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                />
              </div>
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "name" | "date")}
                className="pl-10 pr-8 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white appearance-none"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last VIP Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <AnimatePresence>
                  {loading ? (
                    <tr>
                      <td colSpan={4}>
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                        </div>
                      </td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={4}>
                        <div className="text-center py-8 text-gray-400">
                          No disabled VIP users found
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-gray-700/20"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-400">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-red-500" />
                            <span className="text-red-500">Disabled</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{formatDate(user.vipExpirationDate)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => renewVip(user.email, "30days")}
                              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
                            >
                              30 Days
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => renewVip(user.email, "1year")}
                              className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-sm"
                            >
                              1 Year
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {confirmAction && (
          <ConfirmModal
            title={confirmAction.title}
            message={confirmAction.message}
            onConfirm={confirmAction.onConfirm}
            onCancel={() => setConfirmAction(null)}
          />
        )}

        {showSuccessModal && (
          <SuccessModal
            message={successMessage}
            onClose={() => setShowSuccessModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDisabledVipUsers;