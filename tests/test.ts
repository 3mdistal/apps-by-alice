import { expect, test } from '@playwright/test';

test('home page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toBeVisible();
});

test('Blog receives correct data from Notion.', async ({ page }) => {
	await page.goto('/blog/on-launching-this-site');
	await expect(
		page.getByRole('heading', { name: 'On launching (officially) this site' })
	).toBeVisible();
});
