import React from 'react';

type EmojiData = {
  emojiName: string;
  count: number;
  linkId: string;
};

type EmojiConfig = {
  name: string;
  src: string;
  label: string;
};

type EmojiDisplayProps = {
  emojiConfig: EmojiConfig[];
  emojis: EmojiData[];
  linkId: string;
  onReaction: (emojiName: string, linkId: string) => void;
  loadingEmojis: { [key: string]: boolean };
};

const EmojiDisplay: React.FC<EmojiDisplayProps> = ({
  emojiConfig,
  emojis,
  linkId,
  onReaction,
  loadingEmojis
}) => {
  // Get only the emojis that have a count > 0 for this link
  const displayEmojis = emojiConfig.filter(emoji => {
    const found = emojis.find(e => e.emojiName === emoji.name && e.linkId === linkId);
    return found && found.count > 0;
  });

  // If no emojis have been reacted to, return null
  if (displayEmojis.length === 0) return null;

  return (
    <div className="flex items-center flex-wrap gap-1 mt-2">
      {displayEmojis.map(({ name, src, label }) => {
        const emojiData = emojis.find(e => e.emojiName === name && e.linkId === linkId);
        const count = emojiData?.count || 0;
        const isLoading = loadingEmojis[`${linkId}-${name}`];
        
        return (
          <button
            key={name}
            onClick={() => onReaction(name, linkId)}
            disabled={isLoading}
            className={`group flex items-center space-x-1 px-2 py-1 rounded-full transition-all duration-200
              bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800/40
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            title={label}
          >
            <img 
              src={src} 
              alt={label}
              className="w-5 h-5 object-contain"
            />
            {count > 0 && (
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default EmojiDisplay;