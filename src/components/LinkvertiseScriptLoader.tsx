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

    script.onload = () => {
      try {
       
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

    script.onerror = () => {
      console.error('Erro ao carregar o script do Linkvertise.');
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default LinkvertiseScriptLoader;
