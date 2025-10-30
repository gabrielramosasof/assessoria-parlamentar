import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedElement from '../components/AnimatedElement';

const HomePage: React.FC = () => {
  return (
    <>
      {/* HERO SECTION */}
      <header className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(https://storage.googleapis.com/aistudio-hosting/prompts/images/1722300057134_congresso-nacional-01.jpeg)` }}></div>
        <div className="absolute top-0 left-0 w-full h-full bg-azul opacity-70"></div>
        <div className="relative z-10 px-4">
          <AnimatedElement as="h1" animation="up" className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            ASSESSORIA<br />PARLAMENTAR
          </AnimatedElement>
          <AnimatedElement as="p" delay={1} animation="up" className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-white/80">
            Ajudamos você a entender e navegar no mundo das leis e da política.
          </AnimatedElement>
          <AnimatedElement delay={2} animation="up">
            <Link to="/servicos" className="inline-block mt-8 bg-[#b9932d] text-white font-semibold py-3 px-8 rounded-md hover:bg-[#a08026] transition-colors duration-300 transform hover:scale-105">
              Conheça nossos serviços
            </Link>
          </AnimatedElement>
        </div>
      </header>
      
      {/* SOBRE SECTION */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <AnimatedElement animation="fade" as="h2" className="text-3xl md:text-4xl font-playfair font-bold text-azul mb-6">
            Quem Somos
          </AnimatedElement>
          <AnimatedElement animation="fade" delay={1} as="p" className="text-lg text-gray-600 leading-relaxed mb-8">
            Há mais de 10 anos, a <strong>Assessoria Parlamentar</strong> simplifica o universo político para nossos clientes. Com ética e precisão, transformamos desafios legislativos em oportunidades, garantindo que sua voz seja ouvida.
          </AnimatedElement>
          <AnimatedElement delay={2} animation="up">
            <Link to="/equipe" className="inline-block border-2 border-dourado text-dourado font-semibold py-3 px-8 rounded-md hover:bg-dourado hover:text-white transition-colors duration-300">
              Conheça nossa equipe
            </Link>
          </AnimatedElement>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gray-800 py-20 lg:py-24 text-white text-center bg-cover bg-center" style={{backgroundImage: 'linear-gradient(rgba(10, 25, 47, 0.8), rgba(10, 25, 47, 0.8)), url(https://storage.googleapis.com/aistudio-hosting/prompts/images/1722300057142_congresso-nacional-02.jpeg)'}}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <AnimatedElement animation="fade" as="h2" className="text-3xl md:text-4xl font-playfair font-bold mb-8">
            Precisa de ajuda com decisões políticas? Fale com a gente.
          </AnimatedElement>
          <AnimatedElement delay={1} animation="up">
            <Link to="/contato" className="inline-block bg-[#b9932d] text-white font-semibold py-3 px-8 rounded-md hover:bg-[#a08026] transition-colors duration-300 transform hover:scale-105">
              Entre em contato
            </Link>
          </AnimatedElement>
        </div>
      </section>
    </>
  );
};

export default HomePage;