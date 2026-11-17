import { test, expect } from '@playwright/test';

test('renders in English by default without runtime errors or horizontal overflow', async ({ page }, testInfo) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Turning ideas');
  await expect(page.locator('.project-card')).toHaveCount(6);
  await expect(page.locator('footer')).toBeAttached();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
  await page.screenshot({ path: testInfo.outputPath('home.png') });
});

test('filters projects and opens a detail route', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Systems', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(2);
  await page.getByRole('link', { name: 'View details' }).first().click();
  await expect(page).toHaveURL(/proyectos\/inventario/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Fixed Assets & Barcode System');
  await page.reload();
  await expect(page.getByText('Key features')).toBeVisible();
});

test('switches to Spanish and persists language and theme preferences', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Cambiar a español' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Transformo ideas');
  await page.getByRole('button', { name: 'Cambiar tema' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('validates contact fields and prepares email delivery when submitted', async ({ page }) => {
  await page.goto('/#contacto');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.locator('.field-error')).toHaveCount(4);
  await expect(page.getByLabel('Name', { exact: false })).toBeFocused();
  await page.getByLabel('Name', { exact: false }).fill('Test Recruiter');
  await page.getByLabel('Email address', { exact: false }).fill('recruiter@example.com');
  await page.getByLabel('Subject', { exact: false }).fill('Full Stack Opportunity');
  await page.getByLabel('Message', { exact: false }).fill('Hi Edgar, I would like to discuss a software engineering role with you.');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.locator('.form-status')).toContainText('Your email app was requested to open');
  await expect(page.locator('.field-error')).toHaveCount(0);
});

test('handles unknown routes and mobile navigation', async ({ page }, testInfo) => {
  await page.goto('/ruta-inexistente');
  await expect(page.getByText('404', { exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Back home' }).click();
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.getByRole('navigation').getByRole('link', { name: 'Stack', exact: true }).click();
    await expect(page).toHaveURL(/#stack/);
    await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  }
});

test('fits small phones and tablets in Spanish and light mode', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Cambiar a español' }).click();
  await page.getByRole('button', { name: 'Cambiar tema' }).click();
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `overflow at ${width}px`).toBe(true);
  }
});
