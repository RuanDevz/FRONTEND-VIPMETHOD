import React, { useEffect, useState } from "react";
import axios from "axios";

// Definindo a interface para o conteúdo
interface Content {
  id: number;
  name: string; // Nome do conteúdo
  link: string; // Link do conteúdo
  author: string; // Autor do conteúdo
}

const FreeContent: React.FC = () => {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6; // Número de itens por página

  useEffect(() => {
    const fetchFreeContent = async () => {
      try {
        const response = await axios.get<Content[]>("http://localhost:3001/freecontent");
        setContent(response.data.sort((a, b) => b.id - a.id)); // Ordena os conteúdos por id decrescente
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFreeContent();
  }, []);

  // Função para filtrar os conteúdos com base no termo de pesquisa
  const filteredContent = content.filter(item =>
    item.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular os conteúdos a serem exibidos na página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContent.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular o número total de páginas
  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black p-8">
      <h1 className="text-2xl font-bold mb-6">Free Content</h1>
      
      {/* Barra de pesquisa */}
      <input
        type="text"
        placeholder="Search by author..."
        className="border rounded p-2 mb-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div key={item.id} className="bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
              <p className="text-sm mb-4">Author: {item.author}</p>
              <a
                href={item.link}
                className="text-blue-500 hover:underline mt-4 block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Access Content
              </a>
            </div>
          ))
        ) : (
          <p>No free content available at this time.</p>
        )}
      </div>

      {/* Botões de Paginação */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FreeContent;
