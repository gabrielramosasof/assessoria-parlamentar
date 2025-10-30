
import React from 'react';
import AnimatedElement from '../components/AnimatedElement';
import PageHeader from '../components/PageHeader';

interface TeamMemberProps {
  imgSrc: string;
  name: string;
  role: string;
  description: string;
  delay: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({ imgSrc, name, role, description, delay }) => (
  <AnimatedElement delay={delay} className="bg-white rounded-lg shadow-lg overflow-hidden text-center transition-transform duration-300 hover:-translate-y-2 flex flex-col">
    <img 
      src={imgSrc} 
      alt={`Foto de ${name}`} 
      className="w-full h-80 object-cover" 
      loading="lazy"
      decoding="async"
    />
    <div className="p-6 flex-grow flex flex-col">
      <h3 className="text-xl font-bold font-playfair text-azul">{name}</h3>
      <p className="text-gray-500 mt-1">{role}</p>
      <p className="text-gray-600 mt-4 text-sm flex-grow">{description}</p>
    </div>
  </AnimatedElement>
);

const EquipePage: React.FC = () => {
  const team = [
    {
      imgSrc: "https://picsum.photos/400/500?random=1",
      name: "Maria Silva",
      role: "Consultora Legislativa Sênior",
      description: "Lidera nossa equipe com mais de 15 anos de experiência, transformando complexidade em clareza."
    },
    {
      imgSrc: "https://picsum.photos/400/500?random=2",
      name: "João Pereira",
      role: "Especialista em Estratégia Política",
      description: "Especialista em criar pontes, garantindo que as melhores estratégias políticas sejam executadas."
    },
    {
      imgSrc: "https://picsum.photos/400/500?random=3",
      name: "Laura Martins",
      role: "Analista de Políticas Públicas",
      description: "Nossa mente analítica, dedicada a pesquisar e entender o impacto de cada política pública."
    },
  ];

  return (
    <>
      <PageHeader title="Nossa Equipe" subtitle="Conheça quem faz a diferença no cenário político." />

      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <TeamMember key={index} {...member} delay={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default EquipePage;