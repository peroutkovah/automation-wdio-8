/**
 * Lekce 7: Aplikace
 */
import {username, password, userFullName, expectedApplicationsPageRows} from '../../fixtures.js'

async function openLoginPage() {
    await browser.reloadSession();
    await browser.url('/prihlaseni');
}

async function login (name, psw) {
    await $('#email').setValue(name);
    await $('#password').setValue(psw);
    await $('.btn-primary').click();
}

async function goToApplications() {
    await $('=Přihlášky').click();
}

async function waitForTableToLoad() {
    await browser.pause(1000);
    await $('#DataTables_Table_0_processing').waitForDisplayed({ reverse: true});
}

async function searchInTable(searchText) {
    await $('input[type="search"]').setValue(searchText);
}

async function getTableRows() {
    await waitForTableToLoad(); // functions can call other functions
    return await $('.dataTable').$('tbody').$$('tr');
}


describe('Applications Page', async () => {

    beforeEach(async () => {
        await openLoginPage();
        await login (username, password);
        await goToApplications();
        await browser.pause(1000);
    });

    it('should list all applications', async () => {
        const rows = getTableRows();

        await expect(await $('h1')).toHaveText('Přihlášky');
        await expect(rows.length).toEqual(expectedApplicationsPageRows);

        for (const row of rows) {
            console.log(await row.getText());
            const cols = await row.$$('td');
            await expect(cols[0]).toHaveText(/^(?!\s*$).+/);
            await expect(cols[1]).toHaveText(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
            await expect(cols[2]).toHaveText(/(Bankovní převod|FKSP|Hotově|Složenka)/);
            // nebo
            await expect(cols[2]).toHaveText(['Bankovní převod', 'FKSP', 'Hotově', 'Složenka']);
            await expect(cols[3]).toHaveText(/\d{1,3}(| \d{0,3}) Kč/);
        }
    });

    it('should filter in applications', async () => {
        const searchText = 'mar';

        const unfilteredRows = await getTableRows();
        const unfilteredRowsCount = await unfilteredRows.length;

        await searchInTable(searchText);

        const filteredRows = await getTableRows();
        const filteredRowsCount = await filteredRows.length;

        await expect(filteredRowsCount).toBeLessThanOrEqual(unfilteredRowsCount);

        for (const row of filteredRows) {
            console.log(await row.getText());
            const cols = await row.$$('td');
            await expect(cols[0]).toHaveTextContaining(searchText, { ignoreCase: true });
        }
    });
});
