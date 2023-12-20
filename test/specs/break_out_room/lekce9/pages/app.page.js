class AppPage {
    constructor(url) {
        this._url = url;
    }

    get navbarRight() {return $('.navbar-right'); }
    get userNameDropdown() { return this.navbarRight.$('[data-toggle="dropdown"]'); }
    get toastMessage() {return $('.toast-message'); }
    get logoutLink() {return $('#logout-link'); }


async open() {
        await browser.open('/');
    }
//a.	funkce pro získání jména přihlášeného uživatele
async getCurrentUser() {
        return await this.userNameDropdown.getText();
    }
//b.	funkce pro logout
    async logOut() {
        await this.userNameDropdown.click();
        await this.logoutLink.click();
    } 
//c.	funkce pro získání textu toast message (dá se předpokládat, že toast bude taky bežný pro celou aplikaci)
    async getToastMessage() {
        return await this.toast.getText();
    }

}

export default AppPage;
