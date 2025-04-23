import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface DownloadButtonProps {
  url?: string;
  fallbackUrl?: string;
  label: string;
  icon: string;
  bgColor: string;
  hoverColor: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  url,
  fallbackUrl,
  label,
  icon,
  bgColor,
  hoverColor
}) => {
  const { theme } = useTheme();
  const finalUrl = url || fallbackUrl;

  if (!finalUrl) return null;

  return (
    <a
      href={finalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${bgColor} text-white ${hoverColor}`}
    >
      <img src={icon} alt={label} className="w-5 h-5" />
      <span>{label}</span>
      <ExternalLink className="w-4 h-4 ml-1" />
    </a>
  );
};

export default DownloadButton;