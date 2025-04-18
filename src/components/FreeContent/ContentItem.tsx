import React from 'react';
import { Smile } from 'lucide-react';
import { LinkItem } from '../FreeContent/types/index';
import { emojiOptions } from './types/constants';

interface ContentItemProps {
  link: LinkItem;
  theme: string;
  isRecent: boolean;
  onEmojiReaction: (linkId: number, emojiName: string) => void;
  openEmojiMenu: number | null;
  setOpenEmojiMenu: (id: number | null) => void;
  userReaction?: string; // nova prop
}

export const ContentItem: React.FC<ContentItemProps> = ({
  link,
  theme,
  isRecent,
  onEmojiReaction,
  openEmojiMenu,
  setOpenEmojiMenu,
  userReaction,
}) => {
  return (
    <div
      className={`px-6 py-4 transition-colors duration-200 ${
        theme === 'dark' ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center justify-between group">
        <a
          href={link.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-lg transition-colors duration-200 ${
            theme === 'dark'
              ? 'text-gray-200 group-hover:text-blue-400'
              : 'text-gray-700 group-hover:text-blue-600'
          }`}
        >
          {link.name}
        </a>

        <div className="flex items-center space-x-2">
          {/* Reações exibidas */}
          <div className="flex items-center flex-wrap gap-1">
            {Object.entries(link.reactions || {})
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([emojiName, count]) => (
                <button
                  key={emojiName}
                  onClick={() => onEmojiReaction(link.id, emojiName)}
                  className={`flex items-center rounded-full px-2 py-1 transition
                    ${emojiName === userReaction
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-white ring-2 ring-blue-400'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  title={emojiName}
                >
                  <img
                    src={emojiOptions.find((e) => e.name === emojiName)?.src}
                    alt={emojiName}
                    className="w-4 h-4"
                  />
                  <span className="ml-1 text-xs">{count}</span>
                </button>
              ))}
          </div>

          {/* Botão de menu de emojis */}
          <div className="relative">
            <button
              onClick={() => setOpenEmojiMenu(openEmojiMenu === link.id ? null : link.id)}
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors emoji-button ${
                openEmojiMenu === link.id ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
            >
              <Smile className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>

            {openEmojiMenu === link.id && (
              <div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 z-[60] emoji-menu"
                style={{ width: '500px', maxHeight: '400px' }}
              >
                <div className="grid grid-cols-8 gap-2 overflow-y-auto">
                  {emojiOptions.map((emoji) => (
                    <button
                      key={emoji.name}
                      onClick={() => onEmojiReaction(link.id, emoji.name)}
                      className={`p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        emoji.name === userReaction
                          ? 'bg-blue-100 dark:bg-blue-800 ring-2 ring-blue-400'
                          : ''
                      }`}
                      title={emoji.name}
                    >
                      <img src={emoji.src} alt={emoji.name} className="w-8 h-8" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {isRecent && (
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
              NEW
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
