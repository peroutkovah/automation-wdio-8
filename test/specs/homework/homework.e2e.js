describe('Homework', async () => {

    it('should open page and create screenshot - HM 1', async () => {

        // sem vypracuj domácí úkol
        await browser.reloadSession();
        await browser.url('/registrace'); 
        await browser.saveScreenshot('./screenshots/homework1.png');

    });

    it('should select different elemnts in page - HM 2', async () => {

        // ●	Políčko pro jméno a příjmení
        console.log('Tady je Políčko pro jméno a příjmení');
        const fldJmenoPrijmeni = await  $('[name="name"][type="text"]').getHTML();
        console.log(fldJmenoPrijmeni);

        // ●	Políčko pro email
        console.log('Tady je ●	Políčko pro email');
        const fldEmail = await  $('[name="email"][type="email"]').getHTML();
        console.log(fldEmail);

        // ●	Políčko pro zadání hesla
        console.log('Tady je ●	Políčko pro zadání hesla');
        const fldHeslo = await  $('[name="password"][type="password"]').getHTML();
        console.log(fldHeslo);

        // ●	Políčko pro kontrolu zadaného hesla
        console.log('Tady je ●	Políčko pro kontrolu zadaného hesla');
        const fldHesloPotvrzeni = await  $('#password-confirm').getHTML();
        console.log(fldHesloPotvrzeni);

        // ●	Tlačítko na registraci
        console.log('Tady je ●	Tlačítko na registraci');
        const btnRegistrace = await  $('[type="submit"].btn').getHTML();
        console.log(btnRegistrace);
    });

    it('should interate with page - HM 3', async () => {
        
        const fldJmenoPrijmeni = await  $('[name="name"][type="text"]').setValue('Poseroutkova');
        const fldEmail = await  $('[name="email"][type="email"]').setValue('hanka.peroutkova@centrum.cz');
        const fldHeslo = await  $('[name="password"][type="password"]').setValue('Eproutka1');
        const fldHesloPotvrzeni = await  $('#password-confirm').setValue('Eproutka1');
        const btnRegistrace = await  $('[type="submit"].btn').click();
        await browser.pause(1000);
    });  


});
