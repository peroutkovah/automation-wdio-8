import RegistrationPage from '../pages/registration.page.js'
import {getRandomEmail} from '../../fixtures.js'

describe('Homework registration page', async () => {

    beforeEach(async () => {
        await RegistrationPage.open(); 
        await browser.saveScreenshot('./screenshots/homework1.png');
    });

    it('check if registration page have all components', async () => {

        // ●	Políčko pro jméno a příjmení
        await expect(await RegistrationPage.fldJmenoPrijmeni).toBeDisplayed();
        console.log('Je policko pro vyplneni jména a příjmení viditelne? '+ await RegistrationPage.fldJmenoPrijmeni.isDisplayed());

        // ●	Políčko pro email
        await expect(await RegistrationPage.fldEmail).toBeDisplayed();
        console.log('Je policko pro vyplneni emailu viditelne? '+ await RegistrationPage.fldEmail.isDisplayed());

        // ●	Políčko pro zadání hesla
        await expect(await RegistrationPage.fldHeslo).toBeDisplayed();
        console.log('Je policko pro zadání hesla viditelne? '+ await RegistrationPage.fldHeslo.isDisplayed());

        // ●	Políčko pro kontrolu zadaného hesla
        await expect(await RegistrationPage.fldHesloPotvrzeni).toBeDisplayed();
        console.log('Je policko pro kontrolu zadaného hesla viditelne? '+ await RegistrationPage.fldHesloPotvrzeni.isDisplayed());

        // ●	Tlačítko na registraci
        await expect(await RegistrationPage.btnRegistrace).toBeClickable();
        console.log('Je možné zmáčknout  ●	Tlačítko na registraci?   ' + await  RegistrationPage.btnRegistrace.isEnabled());
    });

    it('should make valid registration and check it', async () => {       

        RegistrationPage.fldJmenoPrijmeni.setValue('Hana Poseroutkova');
        RegistrationPage.fldEmail.setValue(getRandomEmail());
        RegistrationPage.fldHeslo.setValue('Eproutka1');
        RegistrationPage.fldHesloPotvrzeni.setValue('Eproutka1');

        await browser.pause(1000);
        await $('#DataTables_Table_0_wrapper').waitForDisplayed({ reverse: true});

        await expect(await RegistrationPage.btnRegistrace).toBeExisting();
        await RegistrationPage.btnRegistrace.click();

        console.log('Jmneno rihlaseneho uzivatele: ' + await  RegistrationPage.getCurrentUser());
        await expect(await RegistrationPage.getCurrentUser()).toEqual('Hana Poseroutkova');
    });  

    it('should make invalid registration for already existing user', async () => {       

        RegistrationPage.fldJmenoPrijmeni.setValue('Hana Poseroutkova');
        RegistrationPage.fldEmail.setValue('aaab@centrum.cz');
        RegistrationPage.fldHeslo.setValue('Eproutka1');
        RegistrationPage.fldHesloPotvrzeni.setValue('Eproutka1');

        const invalidMSgs = await RegistrationPage.getInvalidFeedback();
       
        await expect(invalidMSgs).toBeExisting( { message: 'Neobjevila se hlaska o jiz existujicim uzivateli!' });

        await RegistrationPage.InvalidFeedbackReview(invalidMSgs);
    }); 

    it('should make invalid registration because of nonadequete psw', async () => {       

        RegistrationPage.fldJmenoPrijmeni.setValue('Hana Poseroutkova');
        RegistrationPage.fldEmail.setValue('abcedefghijk@centrum.cz');
        RegistrationPage.fldHeslo.setValue('111111111111');
        RegistrationPage.fldHesloPotvrzeni.setValue('111111111111');
         
        const invalidMSgs = await RegistrationPage.getInvalidFeedback();
        
        await expect(invalidMSgs).toBeExisting({ message: 'Neobjevila se hlaska o spatne zvolenenm heslu!' });
        
        await RegistrationPage.InvalidFeedbackReview(invalidMSgs);           
    });  

});  


