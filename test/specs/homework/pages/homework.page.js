class RegistrationPage {

    constructor() {
        this.url = '/registrace';
    }


    get fldJmenoPrijmeni() {return $('[name="name"][type="text"]');}    
    get fldEmail() {return $('[name="email"][type="email"]');}  
    get fldHeslo() {return  $('[name="password"][type="password"]');}  
    get fldHesloPotvrzeni() {return  $('#password-confirm');}   
    get btnRegistrace() {return $('[type="submit"].btn');}
    
    get prihlasenyUzivatel() {return $('.navbar-right').$('[data-toggle="dropdown"]');}

    
    async open() {
        await browser.reloadSession();
        await browser.url(this.url);
    }
    
    async getCurrentUser() {
        return await this.prihlasenyUzivatel.getText();
    }

    async waitForInvalidFeedback() {
        await browser.pause(1000);
        await $('.invalid-feedback').waitForDisplayed({ reverse: true});
    }
    
    async getInvalidFeedback() {
        await  this.waitForInvalidFeedback();
        await  this.btnRegistrace.click(); 
        return await $$('.invalid-feedback');
    }

    async InvalidFeedbackReview(invalidMSgs) {
        console.log('Na stránce existuje ' + invalidMSgs.length + ' špatných feedbacků.');
        console.log('Tady je jejich výpis: ');

        /* tohle mi delalo vyis jen do VS Studia, ale ne do allure
        InvalidFeedback.forEach(async (invalidMSg) => {
           console.log(await invalidMSg.getText());

       });  */

       for (const invalidMSg of invalidMSgs) {
        console.log(await invalidMSg.getText());
    }
    }

}

export default new RegistrationPage();