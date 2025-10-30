import React from 'react';

// FIX: Changed component definition to use React.FC with an interface for props.
// This aligns it with the project's coding style and resolves a TypeScript error
// related to the 'key' prop in list rendering.
interface StepProps {
  number: number;
  title: string;
  isLast: boolean;
}

const Step: React.FC<StepProps> = ({ number, title, isLast }) => (
  <div className={`flex items-center ${isLast ? '' : 'w-full'}`}>
    <div className="flex items-center text-dourado relative">
      <div className="rounded-full h-10 w-10 flex items-center justify-center border-2 border-dourado">
        <span className="font-bold">{number}</span>
      </div>
      <div className="absolute top-0 -ml-10 text-center mt-12 w-32 text-xs font-medium uppercase text-azul">{title}</div>
    </div>
    {!isLast && <div className="flex-auto border-t-2 border-dourado/50 transition duration-500 ease-in-out"></div>}
  </div>
);

const ProgressSteps: React.FC = () => {
  const steps = ["Seus Dados", "Envio", "Contato"];
  return (
    <div className="mb-20 max-w-xl mx-auto">
      <div className="flex items-center">
        {steps.map((step, i) => (
          <Step key={step} number={i + 1} title={step} isLast={i === steps.length - 1} />
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;
