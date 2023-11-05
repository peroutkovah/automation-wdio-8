/**
 * Lesson 5: Asertace
 */
import {username, password, userFullName} from '../../fixtures.js'

describe('Login Page', async () => {

    beforeEach(async () => {
        await browser.reloadSession();
        await browser.url('/prihlaseni');
    });

    it('should show login form', async () => {
        const emailField = $('#email');

        await expect(emailField).toBeDisplayed();
        await expect(emailField).toBeEnabled();

        const passwordField = $('#password');
        await expect(passwordField).toBeDisplayed();
        await expect(passwordField).toBeEnabled();

        const loginButton = $('.btn-primary');
        await expect(loginButton).toBeDisplayed();
        await expect(loginButton).toHaveText('Přihlásit');

        //vlastni poznamka: await expect(loginButton).toHaveText('Login', { message: 'Text tlacitka je blbe!' });
        //negace: await expect(loginButton).not.toHaveText('Login');
    });

    it('should show that link for forgotten password is right', async () => {
        const forgottenPsw = $('.btn-link');
        await expect(forgottenPsw).toHaveHref('https://team8-2022brno.herokuapp.com/zapomenute-heslo');
    });

    it('should login with valid credentials', async () => {
        const emailField = $('#email');
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');

        await emailField.setValue(username);
        await passwordField.setValue(password);
        await loginButton.click();

        const userNameDropdown = $('.navbar-right').$('[data-toggle="dropdown"]');
        await expect(userNameDropdown).toHaveText(userFullName);
    });

    it('should not login with invalid credentials', async () => {

        const emailField = $('#email');
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');

        await emailField.setValue(username);
        await passwordField.setValue('invalid');
        await loginButton.click();

        const toastMessage = $('.toast-message');
        await expect(toastMessage).toBeDisplayed;
        await expect(toastMessage).toHaveTextContaining('špatně zadanou hodnotu');
        //console.log('Error: ' + await toastMessage.getText());

        const fieldError = $('.invalid-feedback');
        //console.log('Field error: ' + await fieldError.getText()); 
        await expect(fieldError).toHaveText('Tyto přihlašovací údaje neodpovídají žadnému záznamu.');
 
        await expect(emailField).toBeDisplayed();
        await expect(passwordField).toBeDisplayed();
        await expect(loginButton).toBeDisplayed();

    });

    it('should logout', async () => {
        const emailField = $('#email');
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');
        const navbarRight = $('.navbar-right')
        const userNameDropdown = navbarRight.$('[data-toggle="dropdown"]');
        const logoutLink = $('#logout-link');

        await emailField.setValue(username);
        await passwordField.setValue(password);
        await loginButton.click();

        await expect(userNameDropdown).toBeDisplayed({ message: 'Uzivatel je prihlaseny!' });
        //console.log('User currently logged in: ' + await userNameDropdown.getText());

        await userNameDropdown.click();
        await logoutLink.click();

        await expect(userNameDropdown).not.toBeDisplayed();
        //console.log('Navbar text: ' + await navbarRight.getText());
    });
});

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
        //console.log('Page title is: ' + await $('h1').getText());
        
        await expect($('h1')).toHaveText('Přihlášky');


        const rows =
         await $('.dataTable').$('tbody').$$('tr');

        //console.log('There are ' + rows.length + ' rows in the table');
        await expect(rows).toBeElementsArrayOfSize(30);

        for (const row of rows) {
            const rowText = await row.getText()
            const cols = row.$$('td');
            expect(cols[0]).toHaveText(/[a-zA-Z]{3,}/);
            expect(cols[1]).toHaveText(/(Python|JavaScript|Automatizované testování)/);
            expect(cols[2]).toHaveText(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
            expect(cols[3]).toHaveText(/\d{1,3}(| \d{0,3}) Kč/);
        }
    });

    it('should filter in applications', async () => {
        const searchInput = $('input[type="search"]');
        const table = $('.dataTable').$('tbody');
        const loading = $('#DataTables_Table_0_processing');
        const searchText = 'mar';

        const unfilteredRowsCount = await table.$$('tr').length;

        await searchInput.setValue(searchText);
        await browser.pause(1000);
        await loading.waitForDisplayed({ reverse: true});

        const filteredRows = await $('.dataTable').$('tbody').$$('tr')
        await expect(filteredRows.length).toBeLessThan(unfilteredRowsCount);

        for (const row of filteredRows) {
            console.log(await row.getText());
            const cols = await row.$$('td');
            await expect(cols[0]).toHaveTextContaining(searchText, { ignoreCase: true });
        }

    });
});
