/**
 * Lekce 7: Aplikace
 */
import {username, password, expectedApplicationsPageRows} from '../../../fixtures.js'
import LoginPage from '../pages/login.page.js'
import ApplicationsPage from '../pages/applications.page.js'

describe('Applications Page', async () => {

    beforeEach(async () => {
        //tady pouzivam funkce z loginu a applicationu, abych se dostala na tu spravnou stranku
        await LoginPage.openLoginPage();
        await LoginPage.logInto(username, password);
        await ApplicationsPage.goToApplications();
        await browser.pause(1000);
    });

    it('should list all applications', async () => {
        const rows = await ApplicationsPage.getTableRows();

        await expect(await $('h1')).toHaveText('Přihlášky');
        await expect(rows.length).toEqual(expectedApplicationsPageRows);
        
        console.log(rows);

        for (const row of rows) {
         
        await expect(row.name).toMatch(/^(?!\s*$).+/);
        await expect(row.date).toMatch(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
        //await expect(row.paymentType).toHaveTextContaining(['Bankovní převod', 'FKSP', 'Hotově', 'Složenka']);
        await expect(['Bankovní převod', 'FKSP', 'Hotově', 'Složenka'].includes(row.paymentType)).toBeTruthy();
        await expect(row.remainsToPay).toMatch(/\d{1,3}(| \d{0,3}) Kč/); 
        }
    });

    it('should filter in applications', async () => {
        const searchText = 'mar';

        const unfilteredRows = await ApplicationsPage.getTableRows();
        const unfilteredRowsCount = await unfilteredRows.length;

        await ApplicationsPage.searchInTable(searchText);

        const filteredRows = await ApplicationsPage.getTableRows();
        const filteredRowsCount = await filteredRows.length;

        await expect(filteredRowsCount).toBeLessThanOrEqual(unfilteredRowsCount);

        for (const row of filteredRows) {
         /*    console.log(await row.getText());
            const cols = await row.$$('td'); */
            await expect(row.name).toEqual(searchText, { ignoreCase: true });
        }
    });
});