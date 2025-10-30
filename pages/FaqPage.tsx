
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedElement from '../components/AnimatedElement';
import PageHeader from '../components/PageHeader';
import FaqItem from '../components/FaqItem';
import { SupportIcon } from '../assets/icons';

const FaqPage: React.FC = () => {
  const faqs = [
    {
      question: "O que exatamente faz a Assessoria Parlamentar?",
      answer: "Nós simplificamos o cenário político para você. Acompanhamos projetos de lei, analisamos seus impactos e criamos relatórios claros para ajudar na sua tomada de decisão. Além disso, facilitamos o diálogo com figuras políticas importantes."
    },
    {
      question: "Para quem são os serviços de vocês?",
      answer: "Nossos serviços são ideais para empresas, associações, ONGs e qualquer organização que precise entender e navegar pelo ambiente legislativo. Se as decisões políticas impactam seu setor, nós podemos ajudar."
    },
    {
      question: "Como posso acompanhar o andamento de um projeto de lei do meu interesse?",
      answer: "Oferecemos um serviço de monitoramento contínuo. Você receberá atualizações e relatórios periódicos sobre os projetos de lei que são importantes para você, desde a apresentação até a votação final."
    },
    {
      question: "Os relatórios são fáceis de entender para quem não é da área jurídica ou política?",
      answer: "Sim, esse é um dos nossos maiores diferenciais. Traduzimos o 'politiquês' e o 'juridiquês' para uma linguagem clara e objetiva, focando no que realmente importa para você e seu negócio."
    },
    {
        question: "Como a assessoria pode me ajudar a defender meus interesses?",
        answer: "Atuamos de forma estratégica e transparente para garantir que sua voz seja ouvida. Mapeamos os atores-chave, agendamos reuniões e preparamos os argumentos para que suas pautas sejam apresentadas de forma eficaz e profissional."
    }
  ];

  return (
    <>
      <PageHeader title="Perguntas Frequentes" subtitle="Respostas claras para as dúvidas mais comuns sobre nossos serviços." />
      
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} delay={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-azul py-20 lg:py-24 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <AnimatedElement animation="fade" as="h2" className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Ainda tem dúvidas?
          </AnimatedElement>
          <AnimatedElement animation="fade" delay={1} as="p" className="text-lg text-white/80 mb-8">
            Nossa equipe de especialistas está pronta para conversar com você.
          </AnimatedElement>
          <AnimatedElement delay={2} animation="up">
            <Link 
              to="/contato" 
              className="inline-flex items-center gap-3 bg-[#b9932d] text-white font-semibold py-3 px-8 rounded-md hover:bg-[#a08026] transition-colors duration-300 transform hover:scale-105 text-base"
            >
              <SupportIcon className="w-5 h-5" />
              Fale Conosco - Suporte Personalizado
            </Link>
          </AnimatedElement>
        </div>
      </section>
    </>
  );
};

export default FaqPage;