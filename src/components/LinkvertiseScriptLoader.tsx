import React, { useEffect } from 'react';

declare global {
  interface Window {
    linkvertise?: (id: number, options: { whitelist: string[]; blacklist: string[] }) => void;
  }
}

const LinkvertiseScriptLoader: React.FC = () => {
  useEffect(() => {
    const scriptUrl = 'https://publisher.linkvertise.com/cdn/linkvertise.js';
    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);

    const initializeLinkvertise = () => {
      if (typeof window.linkvertise === 'function') {
        window.linkvertise(518238, {
          whitelist: [],
          blacklist: ["mega.nz", "pixeldrain.com"],
        });
        console.log('Script do Linkvertise reexecutado com sucesso!');
      } else {
        console.error('A função linkvertise não está definida no window.');
      }
    };

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;

      script.onload = () => initializeLinkvertise();
      script.onerror = () => console.error('Erro ao carregar o script do Linkvertise.');

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    } else {
      initializeLinkvertise();
    }
  }, []);

  useEffect(() => {
    // Reexecuta o script do Linkvertise após cada atualização de DOM
    const observer = new MutationObserver(() => {
      if (window.linkvertise) {
        window.linkvertise(518238, {
          whitelist: [],
          blacklist: ["mega.nz", "pixeldrain.com"],
        });
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
};

export default LinkvertiseScriptLoader;
