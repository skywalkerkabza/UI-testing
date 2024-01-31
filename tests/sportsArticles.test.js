const { test, expect } = require('@playwright/test');
const BBCSportPage = require('../pages/bbcSportPage');

test.describe('Sports Articles Functionality', () => {
    let page;
    let bbcSportPage;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        bbcSportPage = new BBCSportPage(page);
    });

    test.afterEach(async () => {
        await page.close();
    });

    test('Should retrieve first and last sports article headings', async () => {
        const headings = await bbcSportPage.getFirstAndLastSportsArticleHeadings();
        expect(headings).toHaveProperty('firstHeading');
        expect(headings).toHaveProperty('lastHeading');
    });
});
