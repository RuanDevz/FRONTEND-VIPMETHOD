import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recommendations`);
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Erro ao buscar recomendações:", error);
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
        throw new Error('Falha ao aprovar a recomendação');
      }
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: 'approved' } : request
        )
      );
    } catch (error) {
      console.error('Erro ao aprovar a recomendação:', error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recommendations/${id}/reject`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Falha ao rejeitar a recomendação');
      }
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: 'rejected' } : request
        )
      );
    } catch (error) {
      console.error('Erro ao rejeitar a recomendação:', error);
    }
  };

  const getStatusClass = (status: string) => {
    if (status === 'approved') return 'bg-green-100 text-green-700';
    if (status === 'rejected') return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-700'; // Para status pendente
  };

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime()) ? 'Invalid Date' : parsedDate.toLocaleString();
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">User Content Requests</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {loading ? (
          <Loading />
        ) : requests.length === 0 ? (
          <p className="text-center text-gray-600">No requests found.</p>
        ) : (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">Title</th>
                <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">Description</th>
                <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-4 text-gray-700 border-b">{request.title}</td>
                  <td className="px-4 py-4 text-gray-700 border-b">{request.description}</td>
                  <td className={`px-4 py-4 text-sm font-medium rounded-md border-b ${getStatusClass(request.status)}`}>
                    {request.status}
                  </td>
                  <td className="px-4 py-4 text-gray-500 border-b">{formatDate(request.createdAt)}</td>
                  <td className="px-4 py-4 flex space-x-2 border-b">
                    <button
                      onClick={() => handleApprove(request.id)}
                      disabled={request.status !== 'pending'}
                      className="bg-green-500 text-white py-1 px-3 rounded-md transition-transform transform hover:scale-105 active:scale-95 disabled:bg-gray-400"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      disabled={request.status !== 'pending'}
                      className="bg-red-500 text-white py-1 px-3 rounded-md transition-transform transform hover:scale-105 active:scale-95 disabled:bg-gray-400"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewRequests;
