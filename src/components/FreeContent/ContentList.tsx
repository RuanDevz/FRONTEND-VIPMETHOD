import React from 'react';
import { Search } from 'lucide-react';
import { LinkItem } from './types/index';
import { ContentItem } from './ContentItem';

interface ContentListProps {
  theme: string;
  loading: boolean;
  groupedLinks: { [key: string]: LinkItem[] };
  recentLinks: LinkItem[];
  onEmojiReaction: (linkId: number, emojiName: string) => void;
  openEmojiMenu: number | null;
  setOpenEmojiMenu: (id: number | null) => void;
  userReactions: { [linkId: number]: string }; // 👈 esta linha deve existir
}

export const ContentList: React.FC<ContentListProps> = ({
  theme,
  loading,
  groupedLinks,
  recentLinks,
  onEmojiReaction,
  openEmojiMenu,
  setOpenEmojiMenu,
}) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (Object.keys(groupedLinks).length === 0) {
    return (
      <div className={`text-center py-16 rounded-3xl border ${
        theme === 'dark'
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      }`}>
        <div className="text-gray-400 mb-6">
          <Search className="w-16 h-16 mx-auto" />
        </div>
        <h3 className={`text-2xl font-bold mb-3 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          No Content Found
        </h3>
        <p className="text-gray-400">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedLinks).map(([date, links]) => (
        <div 
          key={date} 
          className={`${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          } rounded-3xl shadow-2xl overflow-hidden border`}
        >
          <div className={`${
            theme === 'dark'
              ? 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-gray-700'
              : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-gray-200'
          } px-8 py-4 border-b`}>
            <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {date}
            </h3>
          </div>
          <div className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {links.map((link) => (
              <ContentItem
                key={link.id}
                link={link}
                theme={theme}
                isRecent={recentLinks.includes(link)}
                onEmojiReaction={onEmojiReaction}
                openEmojiMenu={openEmojiMenu}
                setOpenEmojiMenu={setOpenEmojiMenu}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};