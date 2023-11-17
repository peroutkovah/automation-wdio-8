/**
 * Lesson 7: login
 */
import {username, password, userFullName, expectedApplicationsPageRows} from '../../fixtures.js'

async function openLoginPage() {
    await browser.reloadSession();
    await browser.url('/prihlaseni');
}

function getEmailField() {
    return $('#email');
 }

 function getpasswordField () {
    return $('#password');
 }

 function getloginButton () {
    return $('.btn-primary');
 }

function getuserNameDropdown() {
    return $('.navbar-right').$('[data-toggle="dropdown"]');
}

function gettoastMessage() {
    return $('.toast-message');
}

function getfieldError() {
   return $('.invalid-feedback'); 
} 

function getnavbarRight() {
    return $('.navbar-right'); 
}
  

function getlogoutLink() {
    return $('#logout-link');
}


describe('Login Page', async () => {

    beforeEach(async () => {
        await openLoginPage();
    });

    it('should show login form', async () => {

        const emailField = await getEmailField();
        await expect(emailField).toBeDisplayed();
        await expect(emailField).toBeEnabled();

        const passwordField = await getpasswordField(); // awaited once, used result on twice
        await expect(passwordField).toBeDisplayed();
        await expect(passwordField).toBeEnabled();

        const loginButton = await getloginButton(); // did not await element here
        await expect(await loginButton.getText()).toEqual('Přihlásit'); // awaited getText() which resolved the whole chain
    });

    it('should login with valid credentials', async () => {
        const emailField = await getEmailField();
        const passwordField = await getpasswordField();
        const loginButton = await getloginButton();
        const userNameDropdown = await getuserNameDropdown();

        await emailField.setValue(username);
        await passwordField.setValue(password);
        await loginButton.click();

        await expect(await userNameDropdown.getText()).toEqual(userFullName);
    });

    it('should not login with invalid credentials', async () => {
        const emailField = await getEmailField();
        const passwordField = await getpasswordField();
        const loginButton = await getloginButton();
        const toastMessage = await gettoastMessage();
        const fieldError = await getfieldError();

        await emailField.setValue(username);
        await passwordField.setValue('invalid');
        await loginButton.click();

        // toast message is visiblae
        await expect(await toastMessage.getText()).toEqual('Některé pole obsahuje špatně zadanou hodnotu');

        // validation message in the form is visible as well
        await expect(await fieldError.getText()).toEqual('Tyto přihlašovací údaje neodpovídají žadnému záznamu.');

        // and we still see login form
        await expect(await emailField).toBeDisplayed();
        await expect(await passwordField).toBeDisplayed();
        await expect(await loginButton).toBeDisplayed();
    });

    it('should logout', async () => {
        const emailField = await getEmailField();
        const passwordField = await getpasswordField();
        const loginButton = await getloginButton();
        const navbarRight = await getnavbarRight();
        const userNameDropdown = getuserNameDropdown();
        const logoutLink = getlogoutLink();

        await emailField.setValue(username);
        await passwordField.setValue(password);
        await loginButton.click();

        // assert we are logged in, without it, the test would be invalid
        await expect(await userNameDropdown.getText()).toEqual(userFullName);

        await userNameDropdown.click();
        await logoutLink.click();

        await expect(await userNameDropdown.isDisplayed()).toBeFalsy();
        await expect(await navbarRight.getText()).toEqual('Přihlásit');
    });
});

