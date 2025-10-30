/**
 * Test Data Fixtures
 * Centralized test data for consistent testing
 */

export const testData = {
  // Contact form test data
  contactForm: {
    valid: {
      name: 'João Silva',
      email: 'joao.silva@example.com',
      message: 'Gostaria de obter mais informações sobre os serviços de assessoria parlamentar.',
    },
    invalid: {
      name: '',
      email: 'invalid-email',
      message: '',
    },
  },

  // Navigation paths
  paths: {
    home: '/',
    servicos: '/servicos',
    equipe: '/equipe',
    faq: '/faq',
    contato: '/contato',
  },

  // Expected page titles
  pageTitles: {
    home: 'ASSESSORIA PARLAMENTAR',
    servicos: 'Serviços',
    equipe: 'Equipe',
    faq: 'FAQ',
    contato: 'Contato',
  },

  // Mobile viewport sizes
  viewports: {
    mobile: {
      width: 375,
      height: 667,
    },
    mobileLandscape: {
      width: 667,
      height: 375,
    },
    tablet: {
      width: 768,
      height: 1024,
    },
    desktop: {
      width: 1920,
      height: 1080,
    },
  },

  // Test timeouts
  timeouts: {
    short: 3000,
    medium: 5000,
    long: 10000,
  },
};

export const testUsers = {
  standard: {
    name: 'Test User',
    email: 'test@example.com',
  },
};
