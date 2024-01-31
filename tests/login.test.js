const { test, expect } = require('@playwright/test');
const BBCSportPage = require('../pages/bbcSportPage');

test.describe('Login Functionality', () => {
    let page;
    let bbcSportPage;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        bbcSportPage = new BBCSportPage(page);
    });

    test.afterEach(async () => {
        await page.close();
    });

    test('Should display error message for invalid login', async () => {
        await bbcSportPage.signIn('invalid_username');
        const errorMessage = await bbcSportPage.getErrorMessage();
        expect(errorMessage).toContain('We don’t recognise that email or username. You can try again or register for an account');
    });
});
