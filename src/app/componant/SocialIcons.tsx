'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faTelegram , faFacebook} from '@fortawesome/free-brands-svg-icons';
import styleAnimation from './style/SocialIcons.module.css';

const SocialIcons = () => {
  return (
    <div className="fixed top-1/2 left-4 flex flex-col space-y-4 dark:bg-[#432] bg-[#fffefe] p-4 rounded-lg shadow-lg z-10">

      <span className={`absolute inset-0 border-2 border-transparent animate-spin-light bg-[#00ff2a] w-2 h-2 ${styleAnimation.spinLight}`}></span>

      <a
        href="https://www.faFacebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform duration-300 hover:scale-110 text-gray-600 dark:text-gray-300"
      >
        <FontAwesomeIcon icon={faFacebook} className="w-8 h-8 text-[#0145ff]" />
      </a>
      <a
        href="https://www.behance.net"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform duration-300 hover:scale-110 text-gray-600 dark:text-gray-300"
      >
        <FontAwesomeIcon icon={faWhatsapp} className="w-8 h-8 text-[#00ff15]" />
      </a>
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform duration-300 hover:scale-110 text-gray-600 dark:text-gray-300"
      >
        <FontAwesomeIcon icon={faTelegram} className="w-8 h-8 text-[#258fd6]" />
      </a>
    </div>
  );
};

export default SocialIcons;