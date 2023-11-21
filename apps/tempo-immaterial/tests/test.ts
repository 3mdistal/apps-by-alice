import { expect, test } from '@playwright/test';

test('Blog receives correct data from Notion.', async ({ page }) => {
	await page.goto('/blog/on-launching-this-site');
	await expect(
		page.getByRole('heading', { name: 'On launching (officially) this site' })
	).toBeVisible();
});
