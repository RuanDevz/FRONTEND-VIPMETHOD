import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading/Loading'; // Importando o componente de loading
import { FaUsers, FaRegStar, FaClipboardList, FaCalendarAlt, FaPercent } from 'react-icons/fa';  // Usando ícones de FontAwesome

const ViewStats: React.FC = () => {
  // State para armazenar as estatísticas
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVIPs: 0,
    totalContentRecommendations: 0,
    usersLastMonth: 0, 
    vipPercentage: 0, 
  });
  
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);  

      try {
        const response = await fetch(`https://backend-vip.vercel.app/api/stats`);
        const data = await response.json();
        setStats(data);  
      } catch (error) {
        console.error("Erro ao buscar as estatísticas:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchStats(); 
  }, []); 

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Website Statistics</h1>
      <div className="bg-white p-6 rounded-xl shadow-xl">
        {loading ? (
          <Loading /> 
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="stat-item p-6 bg-blue-50 rounded-lg shadow-lg flex items-center space-x-4">
              <div className="p-4 bg-blue-100 rounded-full">
                <FaUsers size={32} className="text-blue-600" />
              </div>
              <div>
                <h2 className="font-medium text-xl text-gray-800">Total Users</h2>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>

            <div className="stat-item p-6 bg-green-50 rounded-lg shadow-lg flex items-center space-x-4">
              <div className="p-4 bg-green-100 rounded-full">
                <FaRegStar size={32} className="text-green-600" />
              </div>
              <div>
  <h2 className="font-medium text-xl text-gray-800">Total VIP Users</h2>
  <p className="text-2xl font-bold text-gray-900">{stats.totalVIPs}</p>
  {/* {stats.totalVIPs} */}
</div>
            </div>

            
            <div className="stat-item p-6 bg-purple-50 rounded-lg shadow-lg flex items-center space-x-4">
              <div className="p-4 bg-purple-100 rounded-full">
                <FaCalendarAlt size={32} className="text-purple-600" />
              </div>
              <div>
                <h2 className="font-medium text-xl text-gray-800">Users Last Month</h2>
                <p className="text-2xl font-bold text-gray-900">{stats.usersLastMonth}</p>
              </div>
            </div>

            <div className="stat-item p-6 bg-pink-50 rounded-lg shadow-lg flex items-center space-x-4">
              <div className="p-4 bg-pink-100 rounded-full">
                <FaPercent size={32} className="text-pink-600" />
              </div>
              <div>
                <h2 className="font-medium text-xl text-gray-800">VIP Percentage</h2>
                <p className="text-2xl font-bold text-gray-900">{stats.vipPercentage}%</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewStats;
