import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, AlertCircle, ClipboardList } from 'lucide-react';
import Loading from '../components/Loading/Loading';

interface Recommendation {
  id: number;
  title: string;
  description: string;
  email: string;
  status: string;
  createdAt: string;
}

const ViewRequests: React.FC = () => {
  const [requests, setRequests] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recommendations`);
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }
        const data = await response.json();
        setRequests(data);
        setError('');
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setError('Failed to load recommendations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recommendations/${id}/approve`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to approve recommendation');
      }
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: 'approved' } : request
        )
      );
    } catch (error) {
      console.error('Error approving recommendation:', error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recommendations/${id}/reject`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to reject recommendation');
      }
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: 'rejected' } : request
        )
      );
    } catch (error) {
      console.error('Error rejecting recommendation:', error);
    }
  };

  const getStatusDetails = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          icon: CheckCircle,
          classes: 'bg-green-500/10 text-green-400 border-green-500/20',
        };
      case 'rejected':
        return {
          icon: XCircle,
          classes: 'bg-red-500/10 text-red-400 border-red-500/20',
        };
      default:
        return {
          icon: Clock,
          classes: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        };
    }
  };

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime()) 
      ? 'Invalid Date' 
      : parsedDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <ClipboardList className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 mb-2">
            Content Requests
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Manage and review user content recommendations
          </p>

          {error && (
            <motion.div 
              className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-400">{error}</span>
            </motion.div>
          )}

          <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
            {loading ? (
              <div className="p-8">
                <Loading />
              </div>
            ) : requests.length === 0 ? (
              <div className="p-8 text-center">
                <ClipboardList className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No requests found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Title</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Description</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {requests.map((request) => {
                      const statusDetails = getStatusDetails(request.status);
                      const StatusIcon = statusDetails.icon;
                      
                      return (
                        <tr key={request.id} className="hover:bg-gray-700/50 transition-colors">
                          <td className="px-6 py-4 text-gray-200">{request.title}</td>
                          <td className="px-6 py-4 text-gray-300">{request.description}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusDetails.classes}`}>
                              <StatusIcon className="w-3.5 h-3.5" />
                              {request.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-400">{formatDate(request.createdAt)}</td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleApprove(request.id)}
                                disabled={request.status !== 'pending'}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                  request.status === 'pending'
                                    ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20'
                                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                }`}
                              >
                                Approve
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleReject(request.id)}
                                disabled={request.status !== 'pending'}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                  request.status === 'pending'
                                    ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20'
                                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                }`}
                              >
                                Reject
                              </motion.button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ViewRequests;