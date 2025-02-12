import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Calendar, AlertCircle, CheckCircle2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Define a interface para os dados do usuário.
interface User {
  id: string;
  name: string;
  email: string;
  vipExpirationDate: string | null;
}

// Interface para o modal de confirmação.
interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

// Componente de modal de confirmação.
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

// Componente de modal de sucesso.
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

// Página para listar os usuários com VIP desabilitado.
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

  const navigate = useNavigate();

  // Busca os usuários VIP desabilitados na montagem do componente.
  useEffect(() => {
    fetchDisabledVipUsers();
  }, []);

  // Filtra os usuários de acordo com o termo de busca.
  useEffect(() => {
    const filtered = disabledUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, disabledUsers]);

  // Função para buscar os usuários com vipDisabled = true.
  const fetchDisabledVipUsers = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get<User[]>(
        `${import.meta.env.VITE_BACKEND_URL}/auth/vip-disabled-users`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
        }
      );
      setDisabledUsers(response.data);
      setFilteredUsers(response.data);
    } catch (err) {
      console.error("Erro ao buscar usuários VIP desabilitados", err);
      setError("Erro ao carregar usuários VIP desabilitados.");
    } finally {
      setLoading(false);
    }
  };

  // Função para formatar a data.
  const formatDate = (dateString: string | null): string => {
    if (!dateString || dateString === "Não definida") return "Não definida";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Função para renovar o VIP por 30 dias.
  const renewVip30 = async (email: string): Promise<void> => {
    setConfirmAction({
      title: "Renovar VIP",
      message: `Deseja renovar o VIP do usuário ${email} por 30 dias?`,
      onConfirm: async () => {
        try {
          const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/auth/renew-vip/${email}`,
            {},
            { headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` } }
          );
          setSuccessMessage(response.data.message || "VIP renovado por 30 dias!");
          setShowSuccessModal(true);
          fetchDisabledVipUsers();
        } catch (error) {
          console.error("Erro ao renovar VIP de 30 dias", error);
          setError("Erro ao renovar VIP de 30 dias.");
        }
        setConfirmAction(null);
      },
    });
  };

  // Função para renovar o VIP por 1 ano.
  const renewVip1Year = async (email: string): Promise<void> => {
    setConfirmAction({
      title: "Renovar VIP",
      message: `Deseja renovar o VIP do usuário ${email} por 1 ano?`,
      onConfirm: async () => {
        try {
          const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/auth/renew-vip-year/${email}`,
            {},
            { headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` } }
          );
          setSuccessMessage(response.data.message || "VIP renovado por 1 ano!");
          setShowSuccessModal(true);
          fetchDisabledVipUsers();
        } catch (error) {
          console.error("Erro ao renovar VIP de 1 ano", error);
          setError("Erro ao renovar VIP de 1 ano.");
        }
        setConfirmAction(null);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho com título e botão para voltar para /admin-vip-users */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Usuários VIP Desabilitados</h1>
          <button
            onClick={() => navigate("/admin-vip-users")}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Voltar para Usuários VIP
          </button>
        </div>
        <div className="mb-4 relative">
          <input 
            type="text"
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        </div>
        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500">
            <div className="flex items-center">
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
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Expiração</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.email} className="bg-gray-200">
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
                        <button
                          onClick={() => renewVip30(user.email)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                        >
                          VIP 30 dias
                        </button>
                        <button
                          onClick={() => renewVip1Year(user.email)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                        >
                          VIP 1 ano
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                      Nenhum usuário VIP desabilitado encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

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
  );
};

export default AdminDisabledVipUsers;
