import React, { useEffect, useState } from "react";
import axios from "axios";

// Definindo a interface para o conteúdo
interface Content {
  id: number;
  name: string; // Tipagem para name como string
  link: string; // Tipagem para link como string
}

const FreeContent: React.FC = () => {
  const [content, setContent] = useState<Content[]>([]); // Tipando o estado como um array de Content
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Função para buscar o conteúdo gratuito da API usando Axios
    const fetchFreeContent = async () => {
      try {
        const response = await axios.get<Content[]>("https://localhost:3001/freecontent");
        setContent(response.data); 
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFreeContent();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black p-8">
      <h1 className="text-2xl font-bold mb-6">Free Content</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {content.length > 0 ? (
          content.map((item) => (
            <div key={item.id} className="bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
              <a
                href={item.link}
                className="text-blue-500 hover:underline mt-4 block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar Conteúdo
              </a>
            </div>
          ))
        ) : (
          <p>Nenhum conteúdo gratuito disponível no momento.</p>
        )}
      </div>
    </div>
  );
};

export default FreeContent;
