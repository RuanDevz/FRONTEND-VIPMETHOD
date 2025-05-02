import React, { useRef, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Edit2, Trash2, LinkIcon, ExternalLink } from "lucide-react";
import { LinkItem } from "../../utils/index";

interface AdminLinkListProps {
  links: LinkItem[];
  isLoading: boolean;
  handleEditLink: (id: number) => void;
  handleDeleteLink: (id: number) => void;
  hasMore: boolean;
  loadMore: () => void;
}

const AdminLinkList: React.FC<AdminLinkListProps> = ({
  links,
  isLoading,
  handleEditLink,
  handleDeleteLink,
  hasMore,
  loadMore
}) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: links.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => 200, []),
    overscan: 5
  });

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (
      target.scrollHeight - target.scrollTop <= target.clientHeight * 1.5 &&
      hasMore &&
      !isLoading
    ) {
      loadMore();
    }
  }, [hasMore, isLoading, loadMore]);

  if (isLoading && links.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      onScroll={handleScroll}
      className="h-[600px] overflow-auto"
      style={{
        contain: "strict"
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative"
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const link = links[virtualRow.index];
          return (
            <div
              key={link.id}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`
              }}
            >
              <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4 m-2">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{link.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                        {link.category}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {new Date(link.postDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditLink(link.id!)}
                      className="p-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteLink(link.id!)}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <LinkIcon className="w-4 h-4" />
                    <span className="truncate">{link.link}</span>
                    <a 
                      href={link.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-1 hover:bg-gray-600 rounded-full transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  
                  {link.linkP && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <LinkIcon className="w-4 h-4" />
                      <span className="text-xs">P:</span>
                      <span className="truncate">{link.linkP}</span>
                    </div>
                  )}
                  
                  {link.linkG && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <LinkIcon className="w-4 h-4" />
                      <span className="text-xs">G:</span>
                      <span className="truncate">{link.linkG}</span>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {link.linkMV1 && (
                      <div className="flex items-center gap-1 text-gray-300 text-xs">
                        <span>MV1:</span>
                        <span className="truncate">{link.linkMV1}</span>
                      </div>
                    )}
                    {link.linkMV2 && (
                      <div className="flex items-center gap-1 text-gray-300 text-xs">
                        <span>MV2:</span>
                        <span className="truncate">{link.linkMV2}</span>
                      </div>
                    )}
                    {link.linkMV3 && (
                      <div className="flex items-center gap-1 text-gray-300 text-xs">
                        <span>MV3:</span>
                        <span className="truncate">{link.linkMV3}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {isLoading && links.length > 0 && (
        <div className="flex justify-center py-4">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      )}
      {!isLoading && !hasMore && links.length > 0 && (
        <div className="text-center py-4 text-gray-400">
          No more content to load
        </div>
      )}
      {links.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No content found
        </div>
      )}
    </div>
  );
};

export default React.memo(AdminLinkList);