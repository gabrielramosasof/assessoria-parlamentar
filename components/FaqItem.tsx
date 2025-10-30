import React, { useState } from 'react';
import AnimatedElement from './AnimatedElement';
import { PlusIcon, MinusIcon } from '../assets/icons';

interface FaqItemProps {
  question: string;
  answer: string;
  delay: number;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, delay }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AnimatedElement delay={delay} className="bg-white rounded-lg shadow-md overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 text-left transition-transform duration-300 ease-in-out hover:scale-[1.02]"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold font-playfair text-azul">{question}</h3>
        <div className="text-dourado flex-shrink-0 ml-4">
            {isOpen ? <MinusIcon className="w-6 h-6" /> : <PlusIcon className="w-6 h-6" />}
        </div>
      </button>
      <div
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 text-gray-600">
            <p>{answer}</p>
          </div>
        </div>
      </div>
    </AnimatedElement>
  );
};

export default FaqItem;