import React, { useState } from 'react';
import AnimatedElement from '../components/AnimatedElement';
import PageHeader from '../components/PageHeader';
import ProgressSteps from '../components/ProgressSteps';

const ContatoPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: '',
  });

  const [errors, setErrors] = useState({
    nome: '',
    email: '',
    mensagem: '',
  });

  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | '' }>({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: string, value: string): boolean => {
    let error = '';
    switch (name) {
      case 'nome':
        if (!value.trim()) error = 'O nome é obrigatório.';
        break;
      case 'email':
        if (!value.trim()) {
          error = 'O e-mail é obrigatório.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Formato de e-mail inválido.';
        }
        break;
      case 'mensagem':
        if (!value.trim()) error = 'A mensagem é obrigatória.';
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return error === '';
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'telefone') {
      let input = value.replace(/\D/g, '');
      input = input.substring(0, 11);

      let formattedPhone = '';
      if (input.length > 10) {
        formattedPhone = `(${input.substring(0, 2)}) ${input.substring(2, 7)}-${input.substring(7, 11)}`;
      } else if (input.length > 6) {
        formattedPhone = `(${input.substring(0, 2)}) ${input.substring(2, 6)}-${input.substring(6, 10)}`;
      } else if (input.length > 2) {
        formattedPhone = `(${input.substring(0, 2)}) ${input.substring(2)}`;
      } else {
        formattedPhone = input.length > 0 ? `(${input}` : '';
      }
      
      setFormData(prev => ({ ...prev, [name]: formattedPhone }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      validateField(name, value);
    }
  };

  // FIX: Corrected form event type from HTMLFormEvent to HTMLFormElement
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const isNomeValid = validateField('nome', formData.nome);
    const isEmailValid = validateField('email', formData.email);
    const isMensagemValid = validateField('mensagem', formData.mensagem);

    if (!isNomeValid || !isEmailValid || !isMensagemValid) {
        setFeedback({ message: 'Ops! Verifique os campos em vermelho.', type: 'error' });
        setTimeout(() => setFeedback({ message: '', type: '' }), 5000);
        return;
    }
    
    setIsSubmitting(true);
    setFeedback({ message: 'Enviando...', type: '' });

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFeedback({ message: 'Obrigado! Sua mensagem foi enviada. Logo entraremos em contato.', type: 'success' });
      setFormData({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' });
      setErrors({ nome: '', email: '', mensagem: '' });
      
      setTimeout(() => setFeedback({ message: '', type: '' }), 5000);
    }, 2000);
  };

  return (
    <>
      <PageHeader title="Fale Conosco" subtitle="Vamos conversar? Mande sua dúvida e retornaremos logo." />
      
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <AnimatedElement animation="up" delay={2} className="bg-white p-8 md:p-12 rounded-lg shadow-xl">
            <ProgressSteps />
            <p className="text-center text-gray-600 mb-8">Preencha os campos abaixo. Responderemos o mais rápido possível.</p>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label htmlFor="nome" className="sr-only">Nome</label>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  placeholder="Seu nome"
                  required
                  value={formData.nome}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${errors.nome ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-dourado'}`}
                  aria-invalid={!!errors.nome}
                  aria-describedby="nome-error"
                />
                {errors.nome && <p id="nome-error" className="text-red-600 text-sm mt-1">{errors.nome}</p>}
              </div>
              <div>
                <label htmlFor="email" className="sr-only">E-mail</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Seu e-mail"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-dourado'}`}
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                />
                {errors.email && <p id="email-error" className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="telefone" className="sr-only">Telefone</label>
                <input
                  type="tel"
                  name="telefone"
                  id="telefone"
                  placeholder="Seu telefone (opcional)"
                  value={formData.telefone}
                  onChange={handleChange}
                  maxLength={15}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dourado"
                />
              </div>
              <div>
                <label htmlFor="assunto" className="sr-only">Assunto</label>
                <input
                  type="text"
                  name="assunto"
                  id="assunto"
                  placeholder="Assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dourado"
                />
              </div>
              <div>
                <label htmlFor="mensagem" className="sr-only">Mensagem</label>
                <textarea
                  name="mensagem"
                  id="mensagem"
                  rows={6}
                  placeholder="Sua mensagem"
                  required
                  value={formData.mensagem}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${errors.mensagem ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-dourado'}`}
                  aria-invalid={!!errors.mensagem}
                  aria-describedby="mensagem-error"
                ></textarea>
                {errors.mensagem && <p id="mensagem-error" className="text-red-600 text-sm mt-1">{errors.mensagem}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#b9932d] text-white font-semibold py-3 px-8 rounded-md hover:bg-[#a08026] transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
              {feedback.message && (
                <p className={`text-center mt-4 ${feedback.type === 'success' ? 'text-green-600' : feedback.type === 'error' ? 'text-red-600' : ''}`}>
                  {feedback.message}
                </p>
              )}
            </form>
          </AnimatedElement>
        </div>
      </section>
    </>
  );
};

export default ContatoPage;