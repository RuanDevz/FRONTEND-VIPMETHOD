import React, { useEffect } from 'react';

declare global {
  interface Window {
    linkvertise: (id: number, options: { whitelist: string[]; blacklist: string[] }) => void;
  }
}

const LinkvertiseScriptLoader: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://publisher.linkvertise.com/cdn/linkvertise.js';
    script.async = true;

    // Tipagem do evento de carregamento do script
    script.onload = () => {
      try {
        // Verifica se a função `linkvertise` está disponível no objeto `window`
        if (window.linkvertise) {
          window.linkvertise(518238, { whitelist: [], blacklist: ["mega.nz", "pixeldrain.com"] });
          console.log('Script do Linkvertise carregado com sucesso!');
        } else {
          console.error('A função linkvertise não está definida no window.');
        }
      } catch (error) {
        console.error('Erro ao inicializar o Linkvertise:', error);
      }
    };

    // Tipagem do evento de erro do script
    script.onerror = () => {
      console.error('Erro ao carregar o script do Linkvertise.');
    };

    // Adiciona o script ao corpo da página
    document.body.appendChild(script);

    // Limpeza ao desmontar o componente
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default LinkvertiseScriptLoader;
