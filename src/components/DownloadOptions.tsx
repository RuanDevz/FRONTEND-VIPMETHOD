import React from 'react';
import DownloadButton from './DownloadButton';
import MEGA from '../assets/MEGA.png';
import Pixeldrain from '../assets/pixeldrain.png';
import Gofile from '../assets/Gofile.jpg';

interface DownloadOptionsProps {
  primaryLinks: {
    mega?: string;
    pixeldrain?: string;
    gofile?: string;
  };
  mirrorLinks: {
    mega?: string;
    pixeldrain?: string;
    gofile?: string;
  };
}

const DownloadOptions: React.FC<DownloadOptionsProps> = ({ primaryLinks, mirrorLinks }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <DownloadButton
        url={primaryLinks.mega}
        fallbackUrl={mirrorLinks.mega}
        label="MEGA"
        icon={MEGA}
        bgColor="bg-red-600"
        hoverColor="hover:bg-red-700"
      />
      
      <DownloadButton
        url={primaryLinks.pixeldrain}
        fallbackUrl={mirrorLinks.pixeldrain}
        label="Pixeldrain"
        icon={Pixeldrain}
        bgColor="bg-black"
        hoverColor="hover:bg-gray-900"
      />
      
      <DownloadButton
        url={primaryLinks.gofile}
        fallbackUrl={mirrorLinks.gofile}
        label="Gofile"
        icon={Gofile}
        bgColor="bg-[#353a40]"
        hoverColor="hover:bg-[#454B52]"
      />
    </div>
  );
};

export default DownloadOptions;