class LoginPage {

    constructor() {
        this.url = '/prihlaseni';
    }
 
    // add page object functions here
    //gettry
    get emailField() { return $('#email'); }
    get passwordField() { return $('#password'); }
    get loginButton () {return $('.btn-primary'); }
    get navbarRight() {return $('.navbar-right'); }
    get userNameDropdown() { return this.navbarRight.$('[data-toggle="dropdown"]'); }
    get toastMessage() {return $('.toast-message'); }
    get fieldError() {return $('.invalid-feedback'); } 
    get logoutLink() {return $('#logout-link'); }
    
    //funkce pro otevreni stranky
    async openLoginPage() {
        await browser.reloadSession();
        await browser.url(this.url);
    }
    //funkce pro prihlaseni
    async logInto (username, password) {
        await this.emailField.setValue(username);
        await this.passwordField.setValue(password);
        await this.loginButton.click(); 
    }
 
    async logOut() {
        await this.userNameDropdown.click();
        await this.logoutLink.click();
    }
 
    async getCurrentUser() {
        return await this.userNameDropdown.getText();
    }
 }
 
 export default new LoginPage();
 