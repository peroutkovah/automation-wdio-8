import AppPage from './app.page.js';

class LoginPage extends AppPage {

    constructor() {
        super();
        this.url = '/prihlaseni';
    }
 
    // add page object functions here
    //gettry
    get emailField() { return $('#email'); }
    get passwordField() { return $('#password'); }
    get loginButton () {return $('.btn-primary'); }
    get fieldError() {return $('.invalid-feedback'); } 
    
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
    
 }
 
 export default new LoginPage();
 