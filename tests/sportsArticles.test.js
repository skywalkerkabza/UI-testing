/*
Feature: As a sports user, I would like to read about all articles related to sports
Scenario: Use the search option to find all articles related to ‘sports’. Output the first
heading and the last heading returned on the page.*/

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
