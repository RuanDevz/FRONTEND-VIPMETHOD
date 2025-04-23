import React from 'react';

type EmojiConfig = {
  name: string;
  src: string;
  label: string;
};

type EmojiReactionMenuProps = {
  emojiConfig: EmojiConfig[];
  onReaction: (emojiName: string) => void;
  position?: 'top' | 'bottom';
  theme: 'dark' | 'light';
};

const EmojiReactionMenu: React.FC<EmojiReactionMenuProps> = ({
  emojiConfig,
  onReaction,
  position = 'top',
  theme
}) => {
  return (
    <div 
      className={`absolute ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} left-0 z-50 flex items-center p-2 rounded-full shadow-lg border transition-all transform origin-bottom-left scale-100 opacity-100 animate-fade-in ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex space-x-1 px-1">
        {emojiConfig.map(({ name, src, label }) => (
          <button
            key={name}
            onClick={() => onReaction(name)}
            className="p-1.5 rounded-full transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 transform hover:scale-125 focus:outline-none"
            title={label}
          >
            <img 
              src={src} 
              alt={label}
              className="w-7 h-7 object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiReactionMenu;