
import React from 'react';
import AnimatedElement from './AnimatedElement';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => (
  <header className="bg-gradient-to-br from-azul to-[#0f2746] text-white text-center py-28 md:py-36">
    <div className="container mx-auto px-4">
      <AnimatedElement as="h1" animation="up" className="font-playfair text-4xl md:text-5xl font-bold mb-3">
        {title}
      </AnimatedElement>
      <AnimatedElement as="p" delay={1} animation="up" className="text-lg text-white/80 max-w-2xl mx-auto">
        {subtitle}
      </AnimatedElement>
    </div>
  </header>
);

export default PageHeader;
