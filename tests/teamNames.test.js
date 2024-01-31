/**
 Feature: As a business user, I would like to make a record of all teams which are
playing today
Scenario: Output all team names with a match today. If there are no matches today,
output a message to convey this.
 */
const { test, expect } = require('@playwright/test');
const BBCSportPage = require('../pages/bbcSportPage');

test('Output team names playing today', async ({ page }) => {
    const bbcSportPage = new BBCSportPage(page);
    const teamNames = await bbcSportPage.getTeamNamesPlayingToday();
    
    if (teamNames.length > 0) {
        console.log("Team names playing today:");
        console.log(teamNames);
    } else {
        console.log("No matches today.");
    }

    expect(teamNames.length).toBeGreaterThan(0); 
});
