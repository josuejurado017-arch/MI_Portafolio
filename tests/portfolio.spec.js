import { test, expect } from '@playwright/test';

test('renders without runtime errors or horizontal overflow', async ({ page }, testInfo) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Transformo ideas');
  await expect(page.locator('.project-card')).toHaveCount(6);
  await expect(page.locator('footer')).toBeAttached();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
  await page.screenshot({ path: testInfo.outputPath('home.png') });
});

test('filters projects and opens a detail route', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Sistemas', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(2);
  await page.getByRole('link', { name: 'Ver detalles' }).first().click();
  await expect(page).toHaveURL(/proyectos\/inventario/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Sistema de Activos Fijos');
  await page.reload();
  await expect(page.getByText('Funcionalidades principales')).toBeVisible();
});

test('persists language and theme preferences', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch to English' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Turning ideas');
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('validates contact fields and prepares email delivery when submitted', async ({ page }) => {
  await page.goto('/#contacto');
  await page.getByRole('button', { name: 'Enviar mensaje' }).click();
  await expect(page.locator('.field-error')).toHaveCount(4);
  await expect(page.getByLabel('Nombre', { exact: false })).toBeFocused();
  await page.getByLabel('Nombre', { exact: false }).fill('Test Recruiter');
  await page.getByLabel('Correo electrónico', { exact: false }).fill('recruiter@example.com');
  await page.getByLabel('Asunto', { exact: false }).fill('Oportunidad Full Stack');
  await page.getByLabel('Mensaje', { exact: false }).fill('Hola Edgar, me gustaría conversar sobre una oportunidad.');
  await page.getByRole('button', { name: 'Enviar mensaje' }).click();
  await expect(page.locator('.form-status')).toContainText('Se solicitó abrir tu aplicación de correo');
  await expect(page.locator('.field-error')).toHaveCount(0);
});

test('handles unknown routes and mobile navigation', async ({ page }, testInfo) => {
  await page.goto('/ruta-inexistente');
  await expect(page.getByText('404', { exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Volver al inicio' }).click();
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Abrir menú' }).click();
    await page.getByRole('navigation').getByRole('link', { name: 'Stack', exact: true }).click();
    await expect(page).toHaveURL(/#stack/);
    await expect(page.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false');
  }
});

test('fits small phones and tablets in English and light mode', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch to English' }).click();
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `overflow at ${width}px`).toBe(true);
  }
});
