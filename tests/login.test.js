// login.test.js

const { test, expect } = require('@playwright/test');
const BBCSportPage = require('../pages/bbcSportPage');

test('Verify negative login scenarios', async ({ page }) => {
    const bbcSportPage = new BBCSportPage(page);
    await bbcSportPage.signIn('invalidusername', 'invalidpassword');

    const errorMessage = await bbcSportPage.getErrorMessage();
    console.log("Error message:", errorMessage);

    expect(errorMessage).toContain('Expected error message');
});
