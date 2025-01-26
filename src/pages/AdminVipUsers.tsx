import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the User type
interface User {
  id: string;
  name: string;
  email: string;
  vipExpirationDate: string | null;
}

const AdminVipUsers: React.FC = () => {
  const [vipUsers, setVipUsers] = useState<User[]>([]); // Inicializa como array vazio
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Estado para carregamento
  const [error, setError] = useState<string | null>(null); // Estado para erros

  useEffect(() => {
    fetchVipUsers();
  }, []);

  const fetchVipUsers = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get<User[]>(`https://backend-vip.vercel.app/auth/vip-users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
      });

      if (Array.isArray(response.data)) {
        setVipUsers(response.data);
      } else {
        setError("Dados inválidos recebidos da API.");
        setVipUsers([]); // Define como array vazio em caso de dados inválidos
      }
    } catch (error) {
      console.error("Error fetching VIP users:", error);
      setError("Erro ao carregar usuários VIP."); // Define uma mensagem de erro
      setVipUsers([]); // Define como array vazio em caso de erro
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  // Check if the VIP has expired
  const isVipExpired = (expirationDate: string | null): boolean => {
    if (!expirationDate || expirationDate === "Not defined") return true;
    return new Date(expirationDate) < new Date();
  };

  // Remove VIP from a single user
  const removeVip = async (email: string): Promise<void> => {
    try {
      await axios.put(`https://backend-vip.vercel.app/auth/remove-vip/${email}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
      });
      fetchVipUsers(); // Atualiza a lista após a remoção
    } catch (error) {
      console.error("Error removing VIP:", error);
      setError("Erro ao remover VIP.");
    }
  };

  // Remove VIP from all expired users
  const removeAllExpiredVip = async (): Promise<void> => {
    try {
      await axios.put(`https://backend-vip.vercel.app/auth/remove-all-expired-vip`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
      });
      fetchVipUsers(); // Atualiza a lista após a remoção
      setShowConfirmation(false); // Fecha o popup de confirmação
    } catch (error) {
      console.error("Error removing expired VIPs:", error);
      setError("Erro ao remover VIPs expirados."); // Define uma mensagem de erro
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">VIP Users</h1>

      {/* Exibe mensagem de erro, se houver */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Exibe mensagem de carregamento */}
      {loading && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6">
          Carregando usuários VIP...
        </div>
      )}

      {/* Botão para remover VIP de todos os usuários expirados */}
      <button
        onClick={() => setShowConfirmation(true)}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 mb-6"
      >
        Remove VIP from All Expired Users
      </button>

      {/* Tabela de Usuários VIP */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                VIP Expiration Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {vipUsers.map((user) => (
              <tr
                key={user.email}
                className={`${
                  isVipExpired(user.vipExpirationDate)
                    ? "bg-red-50"
                    : "bg-green-50"
                } hover:bg-gray-50 transition duration-200`}
              >
                <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {user.vipExpirationDate || "Not defined"}
                </td>
                <td className="px-6 py-4 text-sm">
                  {isVipExpired(user.vipExpirationDate) && (
                    <button
                      onClick={() => removeVip(user.email)} // Passa o email aqui
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Remove VIP
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup de Confirmação */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg text-gray-800 mb-4">
              Are you sure you want to remove VIP from all expired users?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={removeAllExpiredVip}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVipUsers;