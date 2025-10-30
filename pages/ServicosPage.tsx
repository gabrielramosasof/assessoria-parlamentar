
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedElement from '../components/AnimatedElement';
import { LawIcon, ProjectIcon, NegotiationIcon, ReportIcon, ExportIcon, IntegrationIcon, AnalysisIcon } from '../assets/icons';
import PageHeader from '../components/PageHeader';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, details, delay }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <AnimatedElement delay={delay} className="bg-white p-8 rounded-lg shadow-lg text-center transition-transform duration-300 hover:-translate-y-2 flex flex-col">
      <div className="flex justify-center mb-6">
        <div className="bg-dourado/10 p-4 rounded-full">
          {icon}
        </div>
      </div>
      <div className="flex-grow">
        <h3 className="text-xl font-bold font-playfair text-azul mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
      <div className="mt-6">
        <button 
          onClick={() => setShowDetails(!showDetails)} 
          className="text-dourado font-semibold hover:text-[#b9932d] transition-colors"
          aria-expanded={showDetails}
        >
          {showDetails ? 'Mostrar menos' : 'Saiba mais'}
        </button>
      </div>
      {showDetails && (
        <div className="mt-4 text-left text-sm text-gray-600 bg-gray-100 p-4 rounded-md border border-gray-200 transition-opacity duration-300 opacity-100">
          <p>{details}</p>
        </div>
      )}
    </AnimatedElement>
  );
};

const ActionCard: React.FC<{icon: React.ReactNode, title: string, description: string, delay: number}> = ({icon, title, description, delay}) => (
    <AnimatedElement delay={delay} as={Link} to="/contato" className="block bg-gray-50 p-8 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
      <div className="flex justify-center mb-4">
        <div className="bg-dourado/10 p-4 rounded-full">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-bold font-playfair text-azul mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
  </AnimatedElement>
);


const ServicosPage: React.FC = () => {
  const services = [
    {
      icon: <LawIcon className="w-8 h-8 text-dourado" />,
      title: "Análise de Leis",
      description: "Estudamos projetos de lei para você entender o que eles significam na prática.",
      details: "Nossa equipe avalia se uma lei é justa, seus pontos positivos e negativos, e como ela pode impactar sua vida ou negócio. Tudo para você decidir melhor.",
    },
    {
      icon: <ProjectIcon className="w-8 h-8 text-dourado" />,
      title: "Siga os Projetos",
      description: "Ficamos de olho em como os projetos de lei estão avançando e te mantemos informado.",
      details: "Acompanhamos cada passo de um projeto, desde a proposta até a votação final, com relatórios simples para você não perder nada.",
    },
    {
      icon: <NegotiationIcon className="w-8 h-8 text-dourado" />,
      title: "Conexões Estratégicas",
      description: "Ajudamos a levar suas ideias e interesses para as pessoas certas no governo.",
      details: "Conversamos com políticos e autoridades para garantir que suas necessidades sejam ouvidas e consideradas, sempre com transparência.",
    },
    {
      icon: <ReportIcon className="w-8 h-8 text-dourado" />,
      title: "Relatórios Claros",
      description: "Transformamos informações complicadas em relatórios fáceis de entender.",
      details: "Criamos documentos que explicam o cenário político, mostram os riscos e apontam oportunidades, tudo de forma clara e direta.",
    },
  ];

  const actions = [
      {
          icon: <ExportIcon className="w-8 h-8 text-dourado" />,
          title: "Exportar Resumo",
          description: "Leve um resumo dos nossos serviços para compartilhar com sua equipe."
      },
      {
          icon: <IntegrationIcon className="w-8 h-8 text-dourado" />,
          title: "Solicitar Integração",
          description: "Converse conosco sobre como integrar nossas análises aos seus sistemas."
      },
      {
          icon: <AnalysisIcon className="w-8 h-8 text-dourado" />,
          title: "Análise Personalizada",
          description: "Peça uma análise focada nos temas mais importantes para você."
      }
  ]

  return (
    <>
      <PageHeader title="Nossos Serviços" subtitle="Entenda como podemos ajudar com leis e projetos." />
      
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} delay={index} />
            ))}
          </div>
        </div>
      </section>

      {/* PAINEL DE RESULTADOS */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedElement as="div" className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-azul mb-4">Painel de Resultados</h2>
                <p className="text-lg text-gray-600">Centralize suas ações. A partir daqui, você pode solicitar informações detalhadas, análises ou integrações para facilitar sua tomada de decisão.</p>
            </AnimatedElement>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {actions.map((action, index) => (
                    <ActionCard key={index} {...action} delay={index} />
                ))}
            </div>
        </div>
      </section>

      <section className="bg-azul py-20 lg:py-24 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <AnimatedElement animation="fade" as="h2" className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Pronto para dar o próximo passo?
          </AnimatedElement>
          <AnimatedElement animation="fade" delay={1} as="p" className="text-lg text-white/80 mb-8">
            Nossa equipe está preparada para transformar desafios em oportunidades para você.
          </AnimatedElement>
          <AnimatedElement delay={2} animation="up">
            <Link to="/contato" className="inline-block bg-[#b9932d] text-white font-semibold py-3 px-8 rounded-md hover:bg-[#a08026] transition-colors duration-300 transform hover:scale-105">
              Fale com um Especialista
            </Link>
          </AnimatedElement>
        </div>
      </section>
    </>
  );
};

export default ServicosPage;