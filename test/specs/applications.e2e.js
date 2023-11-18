import {username, password} from './fixtures.js'

describe('Applications Page', async () => {

    beforeEach(async () => {
        await browser.reloadSession();
        await browser.url('/prihlaseni');
        await $('#email').setValue(username);
        await $('#password').setValue(password);
        await $('.btn-primary').click();
        await $('=Přihlášky').click();
        await browser.pause(1000);
    });

    it('should list all applications', async () => {
        console.log('Page title is: ' + await $('h1').getText());

        const rows = await $('.dataTable').$('tbody').$$('tr');
        console.log('There are ' + rows.length + ' rows in the table');
        for (const row of rows) {
            const rowText = await row.getText()
            console.log(rowText);
        }
        browser.saveScreenshot('should_list_all_applications.png');

    });

    it('should filter in applications', async () => {
        const searchInput = $('input[type="search"]');
        const loading = $('#DataTables_Table_0_processing');
        const searchText = 'mar';

        await searchInput.setValue(searchText);
        await browser.pause(1000);
        await loading.waitForDisplayed({ reverse: true});

        const filteredRows = await $('.dataTable').$('tbody').$$('tr')
        console.log('There are ' + filteredRows.length + ' filtered rows in the table');
        for (const row of filteredRows) {
            console.log(await row.getText());
            const cols = await row.$$('td');
            await expect(cols[0]).toHaveTextContaining(searchText, { ignoreCase: true });
        }

        browser.saveScreenshot('should_filter_in_applications.png');

    });
});



//sipka nahoru dolu mi ukaze v cmd posledni napsane prikazy
// pokud chci testy zapisovat do logu: npm run wdio > test1.log
// pokud chci testy jak do okna tak i do logu: npm run wdio 2>&1 | tee test2.log