import React, { useState } from 'react';
import EmojiReactionMenu from './EmojiReactionMenu';

type EmojiConfig = {
  name: string;
  src: string;
  label: string;
};

type ReactionButtonProps = {
  emojiConfig: EmojiConfig[];
  onReaction: (emojiName: string, linkId: string) => void;
  linkId: string;
  theme: 'dark' | 'light';
};

const ReactionButton: React.FC<ReactionButtonProps> = ({
  emojiConfig,
  onReaction,
  linkId,
  theme
}) => {
  const [showEmojiMenu, setShowEmojiMenu] = useState(false);
  
  const handleReaction = (emojiName: string) => {
    onReaction(emojiName, linkId);
    setShowEmojiMenu(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowEmojiMenu(!showEmojiMenu)}
        onMouseEnter={() => setShowEmojiMenu(true)}
        onMouseLeave={() => setShowEmojiMenu(false)}
        className={`text-sm font-medium px-3 py-1.5 rounded-full transition-colors duration-200 ${
          theme === 'dark'
            ? 'text-gray-300 hover:text-white hover:bg-gray-700'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        React
      </button>
      
      {showEmojiMenu && (
        <div
          onMouseEnter={() => setShowEmojiMenu(true)}
          onMouseLeave={() => setShowEmojiMenu(false)}
        >
          <EmojiReactionMenu
            emojiConfig={emojiConfig}
            onReaction={(emojiName) => handleReaction(emojiName)}
            theme={theme}
          />
        </div>
      )}
    </div>
  );
};

export default ReactionButton;