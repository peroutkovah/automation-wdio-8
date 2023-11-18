describe('Homework registration age', async () => {

    beforeEach(async () => {

        // sem vypracuj domácí úkol
        await browser.reloadSession();
        await browser.url('/registrace'); 
        await browser.saveScreenshot('./screenshots/homework1.png');

    });

    xit('check if registration page have all components', async () => {

        // ●	Políčko pro jméno a příjmení
        console.log('Tady je Políčko pro jméno a příjmení');
        const fldJmenoPrijmeni = await  $('[name="name"][type="text"]');
        console.log(await fldJmenoPrijmeni.getHTML());
        console.log('Je policko pro vyplneni jména a příjmení videitelne? '+ await fldJmenoPrijmeni.isDisplayed())

        // ●	Políčko pro email
        console.log('Tady je ●	Políčko pro email');
        const fldEmail = await  $('[name="email"][type="email"]');
        console.log(await fldEmail.getHTML());
        console.log('Je policko pro vyplneni emailu videitelne? '+ await fldEmail.isDisplayed())


        // ●	Políčko pro zadání hesla
        console.log('Tady je ●	Políčko pro zadání hesla');
        const fldHeslo = await  $('[name="password"][type="password"]');
        console.log(await fldHeslo.getHTML());
        console.log('Je policko pro zadání hesla videitelne? '+ await fldHeslo.isDisplayed())

        // ●	Políčko pro kontrolu zadaného hesla
        console.log('Tady je ●	Políčko pro kontrolu zadaného hesla');
        const fldHesloPotvrzeni = await  $('#password-confirm');
        console.log(await fldHesloPotvrzeni.getHTML());
        console.log('Je policko pro kontrolu zadaného hesla videitelne? '+ await fldHesloPotvrzeni.isDisplayed())

        // ●	Tlačítko na registraci
        console.log('Je možné zmáčknout  ●	Tlačítko na registraci?');
        const btnRegistraceIsEnabled = await  $('[type="submit"].btn').isEnabled();
        console.log(btnRegistraceIsEnabled);
    });

    it('should make valid registration and check it', async () => {       
        const fldJmenoPrijmeni = await  $('[name="name"][type="text"]');
        const fldEmail = await  $('[name="email"][type="email"]');
        const fldHeslo = await  $('[name="password"][type="password"]');
        const fldHesloPotvrzeni = await  $('#password-confirm');
        const btnRegistrace = await  $('[type="submit"].btn');

         fldJmenoPrijmeni.setValue('Hana Poseroutkova');
         fldEmail.setValue('abcdefghij@centrum.cz');
         fldHeslo.setValue('Eproutka1');
         fldHesloPotvrzeni.setValue('Eproutka1');

        await browser.pause(1000);
        await $('#DataTables_Table_0_wrapper').waitForDisplayed({ reverse: true});


        console.log( await  btnRegistrace.isEnabled());
        await btnRegistrace.click();
        const prihlasenyUzivatel =$('.navbar-right').$('[title="Hana Poseroutkova"]');

           console.log('Jméno přihlášeného uživatele: ' + await prihlasenyUzivatel.getText());
    });  


    xit('should make invalid registration for already existing user', async () => {       
        const fldJmenoPrijmeni = await  $('[name="name"][type="text"]');
        const fldEmail = await  $('[name="email"][type="email"]');
        const fldHeslo = await  $('[name="password"][type="password"]');
        const fldHesloPotvrzeni = await  $('#password-confirm');
        const btnRegistrace = await  $('[type="submit"].btn')

         fldJmenoPrijmeni.setValue('Hana Poseroutkova');
         fldEmail.setValue('hhh@centrum.cz');
         fldHeslo.setValue('Eproutka1');
         fldHesloPotvrzeni.setValue('Eproutka1');
         await btnRegistrace.click();

         await browser.pause(500);

        const invalidMSg = await $$('.invalid-feedback');
        console.log('Na stránce existuje ' + invalidMSg.length + ' špatných feedbacků.');
        console.log('Tady je jejich výis: ');
        invalidMSg.forEach(async (invalidMSg) => {
           console.log(await invalidMSg.getText());  
       }); 
    }); 

    xit('should make invalid registration because of nonadequete psw', async () => {       
        const fldJmenoPrijmeni = await  $('[name="name"][type="text"]');
        const fldEmail = await  $('[name="email"][type="email"]');
        const fldHeslo = await  $('[name="password"][type="password"]');
        const fldHesloPotvrzeni = await  $('#password-confirm');
        const btnRegistrace = await  $('[type="submit"].btn')

         fldJmenoPrijmeni.setValue('Hana Poseroutkova');
         fldEmail.setValue('abcedefghijk@centrum.cz');
         fldHeslo.setValue('111111111111');
         fldHesloPotvrzeni.setValue('111111111111');
         await btnRegistrace.click();

         await browser.pause(500);

        const invalidMSg = await $$('.invalid-feedback');
        console.log('Na stránce existuje ' + invalidMSg.length + ' špatných feedbacků.');
        console.log('Tady je jejich výis: ');
        invalidMSg.forEach(async (invalidMSg) => {
           console.log(await invalidMSg.getText());  
       }); 
           
    });  

});  


