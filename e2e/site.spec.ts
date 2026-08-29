import { expect, test } from '@playwright/test';

const browserErrors = new WeakMap<object, string[]>();

test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  browserErrors.set(page, errors);
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
});

test.afterEach(async ({ page }) => {
  expect(browserErrors.get(page) ?? []).toEqual([]);
});

test('product navigation and language survive a direct route', async ({ page }, testInfo) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'echo-agent' })).toBeVisible();

  await page.getByRole('tab', { name: 'EKO' }).click();
  await expect(page).toHaveURL(/\/eko$/);
  await expect(page.getByRole('heading', { level: 1, name: 'EKO' })).toBeVisible();
  const structuredData = await page
    .locator('script[type="application/ld+json"]')
    .evaluate((script) => JSON.parse(script.textContent ?? '{}'));
  const structuredTypes = structuredData['@graph'].map(
    (entry: { '@type': string }) => entry['@type'],
  );
  expect(structuredTypes).toContain('SoftwareApplication');
  expect(structuredTypes).not.toContain('SoftwareSourceCode');

  await page.getByRole('button', { name: '切换到英文' }).click();
  await expect(page).toHaveURL(/\/en\/eko$/);
  await expect(page.getByText('One capable agent, built for your own machine.')).toBeVisible();
  await expect(
    page.getByRole('main').getByRole('link', { name: 'Read EKO docs' }).first(),
  ).toHaveAttribute('href', '/en/eko/docs');
  await expect(page.getByRole('img', { name: 'EKO application icon' })).toHaveAttribute(
    'src',
    '/eko-icon.png',
  );

  const pageWidth = await page.evaluate(() => ({
    document: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
  expect(pageWidth.document).toBeLessThanOrEqual(pageWidth.viewport);

  const nextSectionTop = await page
    .locator('#product-evidence-heading')
    .evaluate((element) => element.getBoundingClientRect().top);
  const viewportHeight = await page.evaluate(() => window.innerHeight);
  expect(nextSectionTop).toBeLessThan(viewportHeight);
  await page.screenshot({ path: testInfo.outputPath('eko-home-final.png'), fullPage: false });
});

test('legacy English query redirects to the independent English path', async ({ page }) => {
  await page.goto('/eko?lang=en');
  await expect(page).toHaveURL(/\/en\/eko$/);
  await expect(page.getByText('One capable agent, built for your own machine.')).toBeVisible();
});

test('language switching preserves documentation query and deep anchor', async ({ page }) => {
  await page.goto('/en/eko/docs/capabilities?source=qa#long-horizon-tasks');
  await expect(page.getByRole('heading', { name: 'Long-horizon tasks' })).toBeVisible();
  await page.getByRole('button', { name: 'Switch to Chinese' }).click();
  await expect(page).toHaveURL(/\/eko\/docs\/capabilities\?source=qa#long-horizon-tasks$/);
  const heading = page.getByRole('heading', { name: 'Long-horizon tasks' });
  await expect(heading).toBeVisible();
  const headingTop = await heading.evaluate((element) => element.getBoundingClientRect().top);
  expect(headingTop).toBeGreaterThanOrEqual(0);
  expect(headingTop).toBeLessThan(844);
});

test('source and directory links leave the site through authoritative GitHub URLs', async ({
  page,
}) => {
  await page.goto('/en/docs/getting-started');
  await expect(page.getByRole('link', { name: 'examples/' })).toHaveAttribute(
    'href',
    'https://github.com/EchoYue-lp/echo-agent/tree/main/echo-agent-learning/examples/',
  );

  await page.goto('/en/docs/chat');
  await expect(page.getByRole('link', { name: 'RuntimeStateStore' })).toHaveAttribute(
    'href',
    'https://github.com/EchoYue-lp/echo-agent/blob/main/src/state/mod.rs',
  );
});

test('framework Markdown links resolve to site slugs and survive refresh', async ({ page }) => {
  await page.goto('/en/docs/overview');
  await expect(
    page.getByRole('heading', { level: 1, name: 'echo-agent Documentation' }),
  ).toBeVisible();

  await page.getByRole('link', { name: /02 - Tool System/ }).click();
  await expect(page).toHaveURL(/\/en\/docs\/tools$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Tool System' })).toBeVisible();

  await page.reload();
  await expect(page.getByRole('heading', { level: 1, name: 'Tool System' })).toBeVisible();

  await page.goto('/en/docs/overview');
  await page.getByRole('link', { name: /41 - Persistence Concepts/ }).click();
  await expect(page).toHaveURL(/\/en\/docs\/persistence-concepts$/);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Store, Journal, Checkpoint, and Trace' }),
  ).toBeVisible();
});

test('EKO documentation uses the product route without the home footer', async ({ page }) => {
  await page.goto('/en/eko/docs/getting-started');
  await expect(page.getByRole('heading', { level: 1, name: 'EKO Getting Started' })).toBeVisible();
  await expect(page.getByText('cargo gui-dev', { exact: true })).toBeVisible();
  await expect(page.getByRole('contentinfo')).toHaveCount(0);
  await expect(page.getByRole('tab', { name: 'EKO' })).toHaveAttribute('aria-selected', 'true');
});

test('unknown routes and unknown documentation slugs have explicit not-found states', async ({
  page,
}) => {
  const missingPage = await page.goto('/en/missing-page');
  expect(missingPage?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible();

  const missingDoc = await page.goto('/en/docs/missing-doc');
  expect(missingDoc?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);

  const errors = browserErrors.get(page) ?? [];
  expect(errors).toHaveLength(2);
  expect(
    errors.every(
      (error) =>
        error === 'Failed to load resource: the server responded with a status of 404 (Not Found)',
    ),
  ).toBe(true);
  errors.length = 0;
});

test('mobile documentation navigation opens, changes pages, and closes', async ({
  page,
}, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('mobile'), 'Mobile-only interaction');
  await page.goto('/en/eko/docs/overview');
  await page.getByRole('button', { name: 'Open documentation navigation' }).click();
  await expect(page.getByRole('button', { name: 'Getting Started' })).toBeVisible();
  await page.getByRole('button', { name: 'Getting Started' }).click();
  await expect(page).toHaveURL(/\/en\/eko\/docs\/getting-started$/);
  await expect(page.getByRole('heading', { level: 1, name: 'EKO Getting Started' })).toBeVisible();
});
