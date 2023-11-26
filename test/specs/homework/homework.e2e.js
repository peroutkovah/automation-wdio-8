async function openLoginPage() {
    await browser.reloadSession();
    await browser.url('/registrace');
}

function getFldJmenoPrijmeni() {
    return $('[name="name"][type="text"]');
}

function getFldEmail() {
    return $('[name="email"][type="email"]');
}

function getFldHeslo() {
    return  $('[name="password"][type="password"]');
}

function getFldHesloPotvrzeni() {
    return  $('#password-confirm');
}

function getBtnRegistrace() {
    return $('[type="submit"].btn');
}

async function waitForInvalidFeedback() {
    await browser.pause(1000);
    await $('.invalid-feedback').waitForDisplayed({ reverse: true});
}

async function getInvalidFeedback() {
    await  waitForInvalidFeedback();
    await  getBtnRegistrace().click(); 
    return await $$('.invalid-feedback');
}

async function InvalidFeedbackReview(InvalidFeedback) {
        console.log('Na stránce existuje ' + InvalidFeedback.length + ' špatných feedbacků.');
        console.log('Tady je jejich výpis: ');

        InvalidFeedback.forEach(async (invalidMSg) => {
           console.log(await invalidMSg.getText());

       }); 
    }


describe('Homework registration page', async () => {

    beforeEach(async () => {

        await openLoginPage(); 
        await browser.saveScreenshot('./screenshots/homework1.png');

    });

    it('check if registration page have all components', async () => {

        // ●	Políčko pro jméno a příjmení
        const fldJmenoPrijmeni = await getFldJmenoPrijmeni();
        await expect(fldJmenoPrijmeni).toBeDisplayed();
        console.log('Je policko pro vyplneni jména a příjmení viditelne? '+ await fldJmenoPrijmeni.isDisplayed());

        // ●	Políčko pro email
        const fldEmail = await  getFldEmail();
        await expect(fldEmail).toBeDisplayed();
        console.log('Je policko pro vyplneni emailu viditelne? '+ await fldEmail.isDisplayed());

        // ●	Políčko pro zadání hesla
        const fldHeslo = await  getFldHeslo();
        await expect(fldHeslo).toBeDisplayed();
        console.log('Je policko pro zadání hesla viditelne? '+ await fldHeslo.isDisplayed());

        // ●	Políčko pro kontrolu zadaného hesla
        const fldHesloPotvrzeni = await  getFldHesloPotvrzeni();
        await expect(fldHesloPotvrzeni).toBeDisplayed();
        console.log('Je policko pro kontrolu zadaného hesla viditelne? '+ await fldHesloPotvrzeni.isDisplayed());

        // ●	Tlačítko na registraci
        const btnRegistrace = await getBtnRegistrace();
        await expect(btnRegistrace).toBeClickable();
        console.log('Je možné zmáčknout  ●	Tlačítko na registraci?   ' + await  $('[type="submit"].btn').isEnabled());
    });

    it('should make valid registration and check it', async () => {       
        const fldJmenoPrijmeni = await  getFldJmenoPrijmeni();
        const fldEmail = await   getFldEmail();
        const fldHeslo = await   getFldHeslo();
        const fldHesloPotvrzeni = await  getFldHesloPotvrzeni();
        const btnRegistrace = await  getBtnRegistrace() ;

        fldJmenoPrijmeni.setValue('Hana Poseroutkova');
        fldEmail.setValue('abcdefghijklmn@centrum.cz');
        fldHeslo.setValue('Eproutka1');
        fldHesloPotvrzeni.setValue('Eproutka1');

        await browser.pause(1000);
        await $('#DataTables_Table_0_wrapper').waitForDisplayed({ reverse: true});


        //console.log( await  btnRegistrace.isEnabled());
        await expect(btnRegistrace).toBeExisting();
        await btnRegistrace.click();
        const prihlasenyUzivatel =$('.navbar-right').$('[title="Hana Poseroutkova"]');

        await expect(prihlasenyUzivatel).toHaveText('Hana Poseroutkova', { message: 'Jmeno prihlaseneho uzivatele je blbe!' });
        //console.log('Jméno přihlášeného uživatele: ' + await prihlasenyUzivatel.getText());
    });  


    it('should make invalid registration for already existing user', async () => {       
        const fldJmenoPrijmeni = await  getFldJmenoPrijmeni();
        const fldEmail = await   getFldEmail();
        const fldHeslo = await   getFldHeslo();
        const fldHesloPotvrzeni = await  getFldHesloPotvrzeni();

        fldJmenoPrijmeni.setValue('Hana Poseroutkova');
        fldEmail.setValue('abcdefghijk@centrum.cz');
        fldHeslo.setValue('Eproutka1');
        fldHesloPotvrzeni.setValue('Eproutka1');

        const invalidMSgs = await getInvalidFeedback();
       
        await expect(invalidMSgs).toBeExisting( { message: 'Neobjevila se hlaska o jiz existujicim uzivateli!' });

        await InvalidFeedbackReview(invalidMSgs)
    }); 

    it('should make invalid registration because of nonadequete psw', async () => {       
        const fldJmenoPrijmeni = await  getFldJmenoPrijmeni();
        const fldEmail = await   getFldEmail();
        const fldHeslo = await   getFldHeslo();
        const fldHesloPotvrzeni = await  getFldHesloPotvrzeni();

        fldJmenoPrijmeni.setValue('Hana Poseroutkova');
        fldEmail.setValue('abcedefghijk@centrum.cz');
        fldHeslo.setValue('111111111111');
        fldHesloPotvrzeni.setValue('111111111111');
         
        const invalidMSgs = await getInvalidFeedback();
        
        await expect(invalidMSgs).toBeExisting({ message: 'Neobjevila se hlaska o spatne zvolenenm heslu!' });
        
        await InvalidFeedbackReview(invalidMSgs)
           
    });  

});  


