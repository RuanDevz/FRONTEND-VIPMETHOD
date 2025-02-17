import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Calendar, AlertCircle, CheckCircle2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  vipExpirationDate: string | null;
  vipDisabled?: boolean; // flag para indicar se o VIP foi desativado manualmente
}

interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ title, message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
);

const SuccessModal: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <CheckCircle2 className="w-6 h-6 text-green-500 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900">Sucesso</h3>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>
      <p className="text-gray-600 mb-4">{message}</p>
    </div>
  </div>
);

const AdminVipUsers: React.FC = () => {
  const [vipUsers, setVipUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchVipUsers();
  }, []);

  useEffect(() => {
    const filtered = vipUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, vipUsers]);

  const fetchVipUsers = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get<User[]>(
        `https://backend-vip.vercel.app/auth/vip-users`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
        }
      );

      if (Array.isArray(response.data)) {
        // Se a API não retornar a flag vipDisabled, definimos como false por padrão
        const usersWithStatus = response.data.map((user) => ({
          ...user,
          vipDisabled: user.vipDisabled ?? false,
        }));
        setVipUsers(usersWithStatus);
        setFilteredUsers(usersWithStatus);
      } else {
        setError("Dados inválidos recebidos da API.");
        setVipUsers([]);
        setFilteredUsers([]);
      }
    } catch (error) {
      console.error("Error fetching VIP users:", error);
      setError("Erro ao carregar usuários VIP.");
      setVipUsers([]);
      setFilteredUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null): string => {
    if (!dateString || dateString === "Not defined") return "Não definido";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isVipExpired = (expirationDate: string | null): boolean => {
    if (!expirationDate || expirationDate === "Not defined") return true;
    return new Date(expirationDate) < new Date();
  };

  const disableVip = async (email: string): Promise<void> => {
    setConfirmAction({
      title: "Desativar VIP",
      message: `Tem certeza que deseja desativar o VIP do usuário ${email}?`,
      onConfirm: async () => {
        try {
          await axios.put(
            `https://backend-vip.vercel.app/auth/disable-user/${email}`,
            {},
            { headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` } }
          );
          setSuccessMessage("VIP desativado com sucesso!");
          setShowSuccessModal(true);
          fetchVipUsers();
        } catch (error) {
          console.error("Error disabling VIP:", error);
          setError("Erro ao desativar VIP.");
        }
        setConfirmAction(null);
      },
    });
  };

  // Função para renovar o VIP (30 dias ou 1 ano)
  const renewVip = async (email: string, period: "30days" | "1year"): Promise<void> => {
    const periodText = period === "30days" ? "30 dias" : "1 ano";
    setConfirmAction({
      title: "Renovar VIP",
      message: `Deseja renovar o VIP do usuário ${email} por ${periodText}?`,
      onConfirm: async () => {
        try {
          const endpoint =
            period === "30days"
              ? `https://backend-vip.vercel.app/auth/renew-vip/${email}`
              : `https://backend-vip.vercel.app/auth/renew-vip-year/${email}`;
          const response = await axios.put(
            endpoint,
            {},
            { headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` } }
          );
          setSuccessMessage(response.data.message);
          setShowSuccessModal(true);
          fetchVipUsers();
        } catch (error) {
          console.error("Error renewing VIP:", error);
          setError("Erro ao renovar VIP.");
        }
        setConfirmAction(null);
      },
    });
  };

  // Ordena os usuários pela data de expiração (pode ser ajustado conforme sua necessidade)
  const sortedVipUsers = filteredUsers.sort((a, b) => {
    const dateA = a.vipExpirationDate ? new Date(a.vipExpirationDate).getTime() : 0;
    const dateB = b.vipExpirationDate ? new Date(b.vipExpirationDate).getTime() : 0;
    if (isVipExpired(a.vipExpirationDate) && !isVipExpired(b.vipExpirationDate)) return -1;
    if (!isVipExpired(a.vipExpirationDate) && isVipExpired(b.vipExpirationDate)) return 1;
    return dateA - dateB;
  });

  const newLocal = "bg-gray-200";
  // Exclui alguns usuários, se necessário
  // const filteredVipUsers = sortedVipUsers.filter(
  //   (user) =>
  //     user.email !== "vjacex@gmail.com" &&
  //     user.email !== "jvstintimberlake@gmail.com"
  // );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cabeçalho com o título e o botão para redirecionar para usuários desabilitados */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de VIP</h1>
          <button
            onClick={() => navigate("/admin-vip-disabled")}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Ver usuários VIP desabilitados
          </button>
        </div>
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data de Expiração
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user: any) => (
                    <tr
                      key={user.email}
                      className={`${
                        user.vipDisabled
                          ? newLocal // Se o VIP foi desativado, fundo cinza
                          : isVipExpired(user.vipExpirationDate)
                          ? "bg-red-50" // Se estiver expirado (mas não desativado), fundo vermelho
                          : "bg-green-50" // Se estiver ativo, fundo verde
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          {formatDate(user.vipExpirationDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          {user.vipDisabled ? (
                            // Se o usuário teve o VIP desativado, mostra apenas os botões de renovação
                            <>
                              <button
                                onClick={() => renewVip(user.email, "30days")}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                              >
                                VIP 30 dias
                              </button>
                              <button
                                onClick={() => renewVip(user.email, "1year")}
                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                              >
                                VIP 1 ano
                              </button>
                            </>
                          ) : isVipExpired(user.vipExpirationDate) ? (
                            // Se o VIP está expirado e não foi desativado, exibe os três botões (renovar e desativar)
                            <>
                              <button
                                onClick={() => renewVip(user.email, "30days")}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                              >
                                VIP 30 dias
                              </button>
                              <button
                                onClick={() => renewVip(user.email, "1year")}
                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                              >
                                VIP 1 ano
                              </button>
                              <button
                                onClick={() => disableVip(user.email)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                              >
                                Desativar VIP
                              </button>
                            </>
                          ) : (
                            // Se o usuário está ativo (VIP válido e não desativado), exibe apenas o botão para desativar
                            <button
                              onClick={() => disableVip(user.email)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                            >
                              Desativar VIP
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

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
      </div>
    </div>
  );
};

export default AdminVipUsers;
