import {username, password} from '../../fixtures.js'

describe('Lekce 3 - cviceni 1', async () => {

    it('should open login page', async () => {

        await browser.reloadSession();

        await browser.url('/prihlaseni');
    });

    it('should interactate with web page - LEKCE 3', async () => {
        
        //2
        const elementEmail = await $('#email')
        const elementPsw = await $('#password');
        //3
        console.log( 'Je elementEmail viditelný? ' + await elementEmail.isDisplayed() );
        console.log( 'Je elementEmail zprovozneny? ' + await elementEmail.isEnabled() );

        console.log( 'Je elementPsw viditelný? ' + await elementPsw.isDisplayed() );
        console.log( 'Je elementPsw zprovozneny? ' + await elementPsw.isEnabled() );

        //4
        const elementTlacitko = await $('.btn=Přihlásit');
        console.log( 'Text tlačítka Piihlasit je:  ' + await elementTlacitko.getText() );
        //5
        const elementZapomenuteHeslo = await $('.btn*=Zapomněli');
        console.log( 'Odkaz při zapomenuti hesla je:  ' + await elementZapomenuteHeslo.getAttribute('href') );
       //6
       await elementEmail.setValue(username);
       await elementPsw.setValue(password);
       await elementTlacitko.click();

       const jmenoPrihlaseneho = $('.dropdown-toggle').$('strong').getText();
       console.log(await 'Jméno přihlášeného uživatele: '+ await jmenoPrihlaseneho);

        //Cvičení 2
        await $('=Přihlášky').click();
        await browser.pause(1000);

        const rows= await $('#DataTables_Table_0').$('tbody').$$('tr');

        console.log('V tabulce je ' + rows.length + ' řádků.');
        /* for (const row of rows) {
            const rowText = await row.getText()
            console.log(rowText); }*/
        console.log('Výpis řádku tabulky: ');
         rows.forEach(async (row) => {
            console.log(await row.getText());  
        }); 

        //BONUS 3
        const hledej= await $('input[type="search"]').setValue('ga')
        await browser.pause(1000);
        await $('#DataTables_Table_0_processing').waitForDisplayed({ reverse: true });

        const filteredRows = await $('.dataTable').$('tbody').$$('tr')
        console.log('V tabulce je po vyfiltrování ' + filteredRows.length + ' řádků.');
        console.log('Výpis řádku tabulky po vyfiltrování: ');
        filteredRows.forEach(async (row) => {
           console.log(await row.getText());  
       }); 

 /*       for (const row of filteredRows) {
        console.log(await row.getText());
        } */



    });

});
