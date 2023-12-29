class AppPage {
    constructor(url) {
        this._url = url;
    }

    get navbarRight() {return $('.navbar-right'); }
    get prihlasenyUzivatel() { return this.navbarRight.$('[data-toggle="dropdown"]');}

    async open() {
        await browser.open('/');
    }

    async getCurrentUser() {
        return await this.prihlasenyUzivatel.getText();
    }
}

export default AppPage;