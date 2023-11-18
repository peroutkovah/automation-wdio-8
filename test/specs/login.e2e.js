import {username, password} from './fixtures.js'


describe('Login Page', async () => {

    beforeEach(async () => {
        await browser.reloadSession();
        await browser.url('/prihlaseni');
    });

    it('should show login form', async () => {
        const emailField = $('#email');

        console.log('Email field is dislayed: ' + await emailField.isDisplayed());
        console.log('Email field is dislayed: ' + await emailField.isEnabled());

        const passwordField = $('#password');
        console.log('Password field is dislayed: ' + await passwordField.isDisplayed());
        console.log('Password field is dislayed: ' + await passwordField.isEnabled());

        const loginButton = $('.btn-primary');
        console.log('Login button is dislayed: ' + await loginButton.isDisplayed());
        console.log('Login button text is: ' + await loginButton.getText());

        //browser.saveScreenshot('should_show_login_form.png');
    });

    it('should login with valid credentials', async () => {
        const emailField = $('#email');
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');

        await emailField.setValue(username);
        await passwordField.setValue(password);
        await loginButton.click();

        const userNameDropdown = $('.navbar-right').$('[data-toggle="dropdown"]');
        console.log('User currently logged in: ' + await userNameDropdown.getText());

       // browser.saveScreenshot('should_login_with_valid_credentials.png');
    });

    it('should not login with invalid credentials', async () => {

        const emailField = $('#email');
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');

        await emailField.setValue(username);
        await passwordField.setValue('invalid');
        await loginButton.click();

        const toastMessage = $('.toast-message');
        console.log('Error: ' + await toastMessage.getText());

        const fieldError = $('.invalid-feedback');
        console.log('Field error: ' + await fieldError.getText());

        console.log('Email field is dislayed: ' + await emailField.isDisplayed());
        console.log('Password field is dislayed: ' + await passwordField.isDisplayed());
        console.log('Login button is dislayed: ' + await loginButton.isDisplayed());

       // browser.saveScreenshot('should_not_login_with_invalid_credentials.png');
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

        console.log('User currently logged in: ' + await userNameDropdown.getText());

        await userNameDropdown.click();
        await logoutLink.click();

        console.log('User is logged in: ' + await userNameDropdown.isDisplayed());
        console.log('Navbar text: ' + await navbarRight.getText());

       // browser.saveScreenshot('should_logout.png');
    });
});
