import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading/Loading'; // Importando o componente de loading
import { FaUsers, FaRegStar, FaClipboardList, FaCalendarAlt, FaPercent } from 'react-icons/fa';  // Usando ícones de FontAwesome

const ViewStats: React.FC = () => {
  // State para armazenar as estatísticas
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVIPs: 0,
    totalContentRecommendations: 0,
    usersLastMonth: 0, // Novo dado: Usuários no último mês
    vipPercentage: 0,  // Novo dado: Percentual de VIPs
  });
  
  const [loading, setLoading] = useState<boolean>(true);  // Para controlar o estado de loading

  // Effect para buscar as estatísticas quando o componente for montado
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);  // Inicia o loading

      try {
        // Fazendo a chamada para a API de stats
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/stats`);
        const data = await response.json();
        setStats(data);  // Atualiza o estado com os dados da API
      } catch (error) {
        console.error("Erro ao buscar as estatísticas:", error); // Em caso de erro
      } finally {
        setLoading(false);  // Finaliza o loading, seja sucesso ou erro
      }
    };

    fetchStats(); // Chama a função para buscar os dados
  }, []);  // O array vazio significa que o effect só rodará uma vez quando o componente for montado

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Website Statistics</h1>
      <div className="bg-white p-6 rounded-xl shadow-xl">
        {loading ? (
          <Loading />  // Exibe o componente de loading enquanto os dados são carregados
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Total Users Card */}
            <div className="stat-item p-6 bg-blue-50 rounded-lg shadow-lg flex items-center space-x-4">
              <div className="p-4 bg-blue-100 rounded-full">
                <FaUsers size={32} className="text-blue-600" />
              </div>
              <div>
                <h2 className="font-medium text-xl text-gray-800">Total Users</h2>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>

            {/* Total VIP Users Card */}
            <div className="stat-item p-6 bg-green-50 rounded-lg shadow-lg flex items-center space-x-4">
              <div className="p-4 bg-green-100 rounded-full">
                <FaRegStar size={32} className="text-green-600" />
              </div>
              <div>
                <h2 className="font-medium text-xl text-gray-800">Total VIP Users</h2>
                <p className="text-2xl font-bold text-gray-900">{stats.totalVIPs}</p>
              </div>
            </div>

            {/* Content Recommendations Card */}
            <div className="stat-item p-6 bg-yellow-50 rounded-lg shadow-lg flex items-center space-x-4">
              <div className="p-4 bg-yellow-100 rounded-full">
                <FaClipboardList size={32} className="text-yellow-600" />
              </div>
              <div>
                <h2 className="font-medium text-xl text-gray-800">Content Recommendations</h2>
                <p className="text-2xl font-bold text-gray-900">{stats.totalContentRecommendations}</p>
              </div>
            </div>

            {/* Users Last Month Card */}
            <div className="stat-item p-6 bg-purple-50 rounded-lg shadow-lg flex items-center space-x-4">
              <div className="p-4 bg-purple-100 rounded-full">
                <FaCalendarAlt size={32} className="text-purple-600" />
              </div>
              <div>
                <h2 className="font-medium text-xl text-gray-800">Users Last Month</h2>
                <p className="text-2xl font-bold text-gray-900">{stats.usersLastMonth}</p>
              </div>
            </div>

            {/* VIP Percentage Card */}
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
