import React from 'react';
import { LinkedInIcon, TwitterIcon, FacebookIcon } from '../assets/social-icons';

const socialLinks = [
  { name: 'LinkedIn', href: '#', icon: <LinkedInIcon className="w-6 h-6" /> },
  { name: 'Twitter', href: '#', icon: <TwitterIcon className="w-6 h-6" /> },
  { name: 'Facebook', href: '#', icon: <FacebookIcon className="w-6 h-6" /> },
];


const Footer: React.FC = () => {
  return (
    <footer className="bg-azul text-white/70 py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Siga-nos no ${link.name}`}
              className="text-white/70 hover:text-white transition-colors duration-300"
            >
              {link.icon}
            </a>
          ))}
        </div>
        <p>&copy; {new Date().getFullYear()} Assessoria Parlamentar — Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;