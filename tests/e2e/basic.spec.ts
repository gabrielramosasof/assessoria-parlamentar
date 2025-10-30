import { test, expect } from "@playwright/test";

test.describe("Assessoria Parlamentar E2E", () => {
  test("deve carregar a página inicial", async ({ page }) => {
    await page.goto("/");

    // Verifica se o título principal está visível
    await expect(page.locator("text=ASSESSORIA PARLAMENTAR")).toBeVisible();

    // Verifica se há o link para serviços
    await expect(page.locator("text=Conheça nossos serviços")).toBeVisible();

    // Verifica se a navegação está presente
    await expect(page.locator("text=Home")).toBeVisible();
    await expect(page.locator("text=Serviços")).toBeVisible();
    await expect(page.locator("text=Equipe")).toBeVisible();
    await expect(page.locator("text=FAQ")).toBeVisible();
    await expect(page.locator("text=Contato")).toBeVisible();
  });

  test("deve navegar entre as páginas", async ({ page }) => {
    await page.goto("/");

    // Testa navegação para Serviços
    await page.click("text=Serviços");
    await expect(page.url()).toContain("/servicos");

    // Volta para home
    await page.click("text=Home");
    await expect(page.url()).toBe("http://localhost:5173/");

    // Testa navegação para Equipe
    await page.click("text=Equipe");
    await expect(page.url()).toContain("/equipe");

    // Volta para home
    await page.click("text=Home");
    await expect(page.url()).toBe("http://localhost:5173/");

    // Testa navegação para FAQ
    await page.click("text=FAQ");
    await expect(page.url()).toContain("/faq");

    // Volta para home
    await page.click("text=Home");
    await expect(page.url()).toBe("http://localhost:5173/");

    // Testa navegação para Contato
    await page.click("text=Contato");
    await expect(page.url()).toContain("/contato");
  });

  test("deve expandir/contrair FAQ", async ({ page }) => {
    await page.goto("/faq");

    // Espera os componentes FAQ carregarem
    await page.waitForSelector("button[aria-expanded]");

    // Clica na primeira pergunta FAQ
    const firstFaqButton = page.locator("button[aria-expanded]").first();
    await firstFaqButton.click();

    // Verifica se o botão agora tem aria-expanded="true"
    await expect(firstFaqButton).toHaveAttribute("aria-expanded", "true");

    // Verifica se há uma resposta visível após o clique
    const faqContent = page.locator("button[aria-expanded]").first().locator("xpath=following-sibling::*");
    await expect(faqContent).toBeVisible();

    // Clica novamente para fechar
    await firstFaqButton.click();
    await expect(firstFaqButton).toHaveAttribute("aria-expanded", "false");
  });

  test("deve carregar páginas individuais", async ({ page }) => {
    // Testa página de serviços
    await page.goto("/servicos");
    await expect(page.locator("text=Serviços")).toBeVisible();

    // Testa página de equipe
    await page.goto("/equipe");
    await expect(page.locator("text=Equipe")).toBeVisible();

    // Testa página de contato
    await page.goto("/contato");
    await expect(page.locator("text=Contato")).toBeVisible();

    // Testa página de FAQ
    await page.goto("/faq");
    await expect(page.locator("text=FAQ")).toBeVisible();
  });

  test("deve funcionar em dispositivos móveis", async ({ page }) => {
    // Simula viewport móvel
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto("/");

    // Verifica se o menu hamburguer está visível
    await expect(page.locator("button[aria-label='Abrir menu']")).toBeVisible();

    // Clica no menu hamburguer
    await page.click("button[aria-label='Abrir menu']");

    // Verifica se o menu mobile está aberto
    await expect(page.locator("text=Home").nth(1)).toBeVisible();
    await expect(page.locator("text=Serviços").nth(1)).toBeVisible();
  });
});
