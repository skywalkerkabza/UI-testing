class BBCSportPage {
    constructor(page) {
        this.page = page;
    }

    async navigateToFootballScoresAndFixtures() {
        try {
            await this.page.goto('https://www.bbc.co.uk/sport/football/scores-fixtures');
        } catch (error) {
            console.error("Error navigating to football scores and fixtures:", error);
            throw error;
        }
    }

    async getTeamNamesPlayingToday() {
        try {
            await this.navigateToFootballScoresAndFixtures();
            await this.page.waitForSelector('.qa-match-block', { state: 'attached' });

            const teamNames = await this.page.evaluate(() => {
                const teamElements = document.querySelectorAll('.qa-match-block .sp-c-fixture__team-name');
                return Array.from(teamElements).map(team => team.textContent.trim());
            });

            return teamNames;
        } catch (error) {
            console.error("Error getting team names playing today:", error);
            throw error;
        }
    }

    async searchForSportsArticles() {
        try {
            await this.page.goto('https://www.bbc.co.uk/sport');
            await this.page.waitForSelector('input#orb-search-q');
            await this.page.click('input#orb-search-q');
            await this.page.fill('input#orb-search-q', 'sports');
            await this.page.press('input#orb-search-q', 'Enter');
            await this.page.waitForNavigation();
        } catch (error) {
            console.error("Error searching for sports articles:", error);
            throw error;
        }
    }

    async getFirstAndLastSportsArticleHeadings() {
        try {
            await this.searchForSportsArticles();
            await this.page.waitForSelector('.sp-c-top-stories');

            const headings = await this.page.evaluate(() => {
                const articleHeadings = document.querySelectorAll('.sp-c-top-stories h3');
                const firstHeading = articleHeadings[0].textContent.trim();
                const lastHeading = articleHeadings[articleHeadings.length - 1].textContent.trim();
                return { firstHeading, lastHeading };
            });

            return headings;
        } catch (error) {
            console.error("Error getting first and last sports article headings:", error);
            throw error;
        }
    }

    async clickSignIn() {
        try {
            await this.page.goto('https://www.bbc.co.uk/sport');
            await this.page.waitForSelector('.ssrcss-qgttmg-AccountText');
            await this.page.click('.ssrcss-qgttmg-AccountText');
        } catch (error) {
            console.error("Error clicking Sign In:", error);
            throw error; // Rethrow the error to notify the caller
        }
    }

    async signIn(username) {
        try {
            await this.clickSignIn();
            await this.page.waitForSelector('#user-identifier-input');
            await this.page.fill('#user-identifier-input', username);
            await this.page.click('#submit-button');
            await this.page.waitForSelector('.sb-form-message--error');
        } catch (error) {
            console.error("Error signing in:", error);
            throw error;
        }
    }

    async getErrorMessage() {
        try {
            await this.page.waitForSelector('.sb-form-message__text');
            const errorMessage = await this.page.textContent('.sb-form-message__text');
            return errorMessage; 
        } catch (error) {
            console.error("Error getting error message:", error);
            throw error;
        }
    }
}

module.exports = BBCSportPage;
