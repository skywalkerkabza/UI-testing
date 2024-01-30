// sportsArticles.test.js

const { test, expect } = require('@playwright/test');
const BBCSportPage = require('../pages/bbcSportPage');

test('Read and output sports articles headings', async ({ page }) => {
    const bbcSportPage = new BBCSportPage(page);
    const { firstHeading, lastHeading } = await bbcSportPage.getFirstAndLastSportsArticleHeadings();

    console.log("First sports article heading:", firstHeading);
    console.log("Last sports article heading:", lastHeading);

    expect(firstHeading).toBeDefined();
    expect(lastHeading).toBeDefined();
});
