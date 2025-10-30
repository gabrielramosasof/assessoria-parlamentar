import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Nav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/servicos', text: 'Serviços' },
    { to: '/equipe', text: 'Equipe' },
    { to: '/faq', text: 'FAQ' },
    { to: '/contato', text: 'Contato' },
  ];

  const linkClasses = "text-white/80 hover:text-white transition-colors duration-300";
  const activeLinkClasses = "text-white font-semibold";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-azul shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <NavLink to="/" className="text-2xl font-playfair font-bold text-white">
            Assessoria<span className="text-dourado">Parlamentar</span>
          </NavLink>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => isActive ? activeLinkClasses : linkClasses}>
                {link.text}
              </NavLink>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
              aria-label="Abrir menu"
            >
              <div className="space-y-2">
                  <span className={`block w-8 h-0.5 bg-white transition-transform duration-300 ease-in-out ${isMenuOpen ? "rotate-45 translate-y-2.5" : ""}`}></span>
                  <span className={`block w-8 h-0.5 bg-white transition-opacity duration-300 ease-in-out ${isMenuOpen ? "opacity-0" : ""}`}></span>
                  <span className={`block w-8 h-0.5 bg-white transition-transform duration-300 ease-in-out ${isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-azul py-4">
          <ul className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink 
                  to={link.to} 
                  className={({ isActive }) => isActive ? activeLinkClasses : linkClasses}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Nav;