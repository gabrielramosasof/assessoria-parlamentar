
import React, { useLayoutEffect, lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';

import Nav from './components/Nav';
import Footer from './components/Footer';

const HomePage = lazy(() => import('./pages/HomePage'));
const ServicosPage = lazy(() => import('./pages/ServicosPage'));
const EquipePage = lazy(() => import('./pages/EquipePage'));
const ContatoPage = lazy(() => import('./pages/ContatoPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="text-xl font-semibold text-azul">Carregando...</div>
  </div>
);

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Nav />
        <main className="flex-grow">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/servicos" element={<ServicosPage />} />
              <Route path="/equipe" element={<EquipePage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/contato" element={<ContatoPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;