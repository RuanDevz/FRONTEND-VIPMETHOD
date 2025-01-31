import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the User type
interface User {
  id: string;
  name: string;
  email: string;
  vipExpirationDate: string | null;
}

// Modal Component
const SuccessModal: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <p className="text-lg text-gray-800 mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminVipUsers: React.FC = () => {
  const [vipUsers, setVipUsers] = useState<User[]>([]);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        setVipUsers([]);
      }
    } catch (error) {
      console.error("Error fetching VIP users:", error);
      setError("Erro ao carregar usuários VIP.");
      setVipUsers([]);
    } finally {
      setLoading(false);
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
      fetchVipUsers();
    } catch (error) {
      console.error("Error removing VIP:", error);
      setError("Erro ao remover VIP.");
    }
  };

  // Renew VIP for a single user
  const renewVip = async (email: string): Promise<void> => {
    try {
      const response = await axios.put(
        `https://backend-vip.vercel.app/auth/renew-vip/${email}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
        }
      );

      if (response.status === 200) {
        setSuccessMessage(response.data.message); // Define a mensagem de sucesso
        setShowSuccessModal(true); // Exibe o modal de sucesso
        fetchVipUsers(); // Atualiza a lista de usuários
      }
    } catch (error) {
      console.error("Error renewing VIP:", error);
      setError("Erro ao renovar VIP.");
    }
  };

  // Ordena os usuários VIP: vencidos no topo, depois os não vencidos
  const sortedVipUsers = vipUsers.sort((a, b) => {
    const dateA = a.vipExpirationDate ? new Date(a.vipExpirationDate).getTime() : 0;
    const dateB = b.vipExpirationDate ? new Date(b.vipExpirationDate).getTime() : 0;

    if (isVipExpired(a.vipExpirationDate) && !isVipExpired(b.vipExpirationDate)) {
      return -1;
    }
    if (!isVipExpired(a.vipExpirationDate) && isVipExpired(b.vipExpirationDate)) {
      return 1;
    }
    return dateA - dateB;
  });

  // Filtra os usuários VIP para remover os emails específicos
  const filteredVipUsers = sortedVipUsers.filter(
    (user) => user.email !== "vjacex@gmail.com" && user.email !== "jvstintimberlake@gmail.com"
  );

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
            {filteredVipUsers.map((user) => (
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
                    <>
                      <button
                        onClick={() => removeVip(user.email)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300 mr-2"
                      >
                        Remove VIP
                      </button>
                      <button
                        onClick={() => renewVip(user.email)}
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-300"
                      >
                        Renew VIP
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup de Sucesso para Renovação de VIP */}
      {showSuccessModal && (
        <SuccessModal
          message={successMessage}
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </div>
  );
};

export default AdminVipUsers;