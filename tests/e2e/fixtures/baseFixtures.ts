import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ServicosPage } from '../pages/ServicosPage';
import { EquipePage } from '../pages/EquipePage';
import { FaqPage } from '../pages/FaqPage';
import { ContatoPage } from '../pages/ContatoPage';

/**
 * Custom fixtures for page objects
 * Automatically instantiate page objects for each test
 */
type PageFixtures = {
  homePage: HomePage;
  servicosPage: ServicosPage;
  equipePage: EquipePage;
  faqPage: FaqPage;
  contatoPage: ContatoPage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  servicosPage: async ({ page }, use) => {
    const servicosPage = new ServicosPage(page);
    await use(servicosPage);
  },

  equipePage: async ({ page }, use) => {
    const equipePage = new EquipePage(page);
    await use(equipePage);
  },

  faqPage: async ({ page }, use) => {
    const faqPage = new FaqPage(page);
    await use(faqPage);
  },

  contatoPage: async ({ page }, use) => {
    const contatoPage = new ContatoPage(page);
    await use(contatoPage);
  },
});

export { expect } from '@playwright/test';
