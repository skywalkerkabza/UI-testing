// bbcSportPage.js

class BBCSportPage {
    constructor(page) {
        this.page = page;
    }

    async navigateToFootballScoresAndFixtures() {
        await this.page.goto('https://www.bbc.co.uk/sport/football/scores-fixtures');
    }

    async getTeamNamesPlayingToday() {
        await this.navigateToFootballScoresAndFixtures();
        await this.page.waitForSelector('.qa-match-block', { state: 'attached' });

        const teamNames = await this.page.evaluate(() => {
            const teamElements = document.querySelectorAll('.qa-match-block .sp-c-fixture__team-name');
            return Array.from(teamElements).map(team => team.textContent.trim());
        });

        return teamNames;
    }

    async searchForSportsArticles() {
        await this.page.goto('https://www.bbc.co.uk/sport');
        await this.page.click('input#orb-search-q');
        await this.page.fill('input#orb-search-q', 'sports');
        await this.page.press('input#orb-search-q', 'Enter');
        await this.page.waitForNavigation();
    }

    async getFirstAndLastSportsArticleHeadings() {
        await this.searchForSportsArticles();
        await this.page.waitForSelector('.sp-c-top-stories');
        
        const headings = await this.page.evaluate(() => {
            const articleHeadings = document.querySelectorAll('.sp-c-top-stories h3');
            const firstHeading = articleHeadings[0].textContent.trim();
            const lastHeading = articleHeadings[articleHeadings.length - 1].textContent.trim();
            return { firstHeading, lastHeading };
        });

        return headings;
    }

    async clickSignIn() {
        try {
            await this.page.waitForSelector('.ssrcss-qgttmg-AccountText', { visible: true });
            await this.page.click('.ssrcss-qgttmg-AccountText');
        } catch (error) {
            console.error("Error clicking Sign In:", error);
        }
    
    }

    async signIn(username) {
        try {
            await this.clickSignIn();
            await this.page.waitForSelector('#user-identifier-input', { state: 'attached' });
            await this.page.fill('#user-identifier-input', username);
            await this.page.click('#submit-button');
            
            // Wait for the error message to appear
            await this.page.waitForSelector('.sb-form-message--error', { visible: true });
    
            // Get the error message text
            const errorMessage = await this.page.textContent('.sb-form-message__text');
            console.log('Error Message:', errorMessage);
            
            // Check if the error message contains the specific text
            if (errorMessage.includes('We don’t recognise that email or username')) { 
                // Handle the error
                console.error('Username not recognized.');
                // You can add additional error handling logic here
            } else {
                console.error('Unexpected error message:', errorMessage);
                // You can handle unexpected error messages here
            }
    
        } catch (error) {
            console.error("Error signing in:", error);
        }
    }
    
}

module.exports = BBCSportPage;
