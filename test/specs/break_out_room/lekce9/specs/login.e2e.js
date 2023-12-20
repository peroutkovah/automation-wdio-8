/**
 * Lekce9: login
 */
import {username, password, userFullName} from '../../../fixtures.js'
import LoginPage from '../pages/login.page.js'


describe('Login Page', async () => {

    beforeEach(async () => {
        await LoginPage.openLoginPage();
    });

    it('should show login form', async () => {
        await expect(await LoginPage.emailField).toBeDisplayed();
        await expect(await LoginPage.emailField).toBeEnabled();
        await expect(await LoginPage.passwordField).toBeDisplayed();
        await expect(await LoginPage.passwordField).toBeEnabled();
        await expect(await LoginPage.loginButton.getText()).toEqual('Přihlásit'); // awaited getText() which resolved the whole chain
    });

    it('should login with valid credentials', async () => {
        await LoginPage.logInto(username,password);
        await expect(await LoginPage.getCurrentUser()).toEqual(userFullName);
    });

    it('should not login with invalid credentials', async () => {
        await LoginPage.logInto(username,'invalid');
        // toast message is visiblae
        await expect(await LoginPage.toastMessage.getText()).toEqual('Některé pole obsahuje špatně zadanou hodnotu');

        // validation message in the form is visible as well
        await expect(await LoginPage.fieldError.getText()).toEqual('Tyto přihlašovací údaje neodpovídají žadnému záznamu.');

        // and we still see login form
        await expect(await LoginPage.emailField).toBeDisplayed();
        await expect(await LoginPage.passwordField).toBeDisplayed();
        await expect(await LoginPage.loginButton).toBeDisplayed();
    });

    it('should logout', async () => {
        await LoginPage.logInto(username, password);

        // zkontrolujeme, že jsme přihlášeni, jinak by test byl nevalidní
        await expect(await LoginPage.getCurrentUser()).toEqual(userFullName);

        await LoginPage.logOut();

        await expect(await LoginPage.userNameDropdown.isDisplayed()).toBeFalsy();
        await expect(await LoginPage.navbarRight.getText()).toEqual('Přihlásit');
    });
});

