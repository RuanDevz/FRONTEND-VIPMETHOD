import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const addLinkvertiseScript = () => {
  const script = document.createElement('script');
  script.src = "https://publisher.linkvertise.com/cdn/linkvertise.js";
  script.async = true;

  // Tipo de função linkvertise
  const linkvertise = (id: number, options: { whitelist: string[], blacklist: string[] }) => {
    // Aqui é onde a função linkvertise seria chamada
    // Se o script for carregado corretamente, ela será executada
    console.log("Linkvertise script carregado!", id, options);
  };

  script.onload = () => {
    linkvertise(518238, { whitelist: [], blacklist: ["mega.nz", "pixeldrain.com"] });
  };

  document.body.appendChild(script);
};

const Root = () => {
  useEffect(() => {
    addLinkvertiseScript(); // Chama a função para adicionar o script do Linkvertise

    // Limpeza: Se necessário, você pode remover o script aqui quando o componente for desmontado
    return () => {
      const script = document.querySelector('script[src="https://publisher.linkvertise.com/cdn/linkvertise.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []); // O array vazio garante que isso será executado uma vez, após a montagem

  return <App />;
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
