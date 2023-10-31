import {username, password} from '../../fixtures.js'
// import LoginPage from '../pageobjects/login.page'
// import ApplicationsPage from '../pageobjects/applications.page'

describe('Czechitas Login Page', async () => {
    beforeEach(async () => {
        //1
            await browser.reloadSession(); //otevre se nove okno prohlizec
            //otevre stranku prihlaseni
            await browser.url('/prihlaseni'); //na tu base url doplni /prihlasen
    })

    //describe(nazev funkce, to co vykona)
        it('zkontroluje, ze jsme na prihlasovaci strance', async () => {
            
            //3.	Zkontroluj, že uživatel nepříhlásil
            const emailField =await $('#email');
            const passwordField =await $('#password');
            const loginButton = $('.btn-primary');

            console.log('Je policko pro vyplneni emailu videitelne?'+ await emailField.isDisplayed())
            console.log('Je policko pro vyplneni hesla videitelne?'+ await passwordField.isDisplayed())
            console.log('Je tlacitko pro prihlaseni zmacknutelne?'+ await loginButton.isEnabled())
            console.log('Login button text is: ' + await loginButton.getText());
        })

        it('chybné přihlášení', async () => {
            const emailField = $('#email');
            const passwordField = $('#password');
            const loginButton = $('.btn-primary');
            const fieldError = $('.invalid-feedback');
            //4.	Vyplň správný email a nesprávné heslo
            await emailField.setValue(username);
            await passwordField.setValue('xxxxxxx');
            //5.	Klikni na Přihlásit
            await loginButton.click();
            //6.	Zkontroluj, že se objevila chyba a uživatel se nepřihlásil
            const toastMessage =await $('.toast-message');
            await toastMessage.waitForExist();
            console.log('Vyskytla se chyba:' + await toastMessage.getText());
            console.log('Kde je chyba?:' + await fieldError.getText());
            console.log('Email field is dislayed: ' + await emailField.isDisplayed());
            console.log('Password field is dislayed: ' + await passwordField.isDisplayed());
            console.log('Login button is dislayed: ' + await loginButton.isDisplayed());
        })

        it('validní přihlášení', async () => {
            const emailField = $('#email');
            const passwordField = $('#password');
            const loginButton = $('.btn-primary');
            //7.	Vyplň správný email a správné heslo
            await emailField.setValue(username);
            await passwordField.setValue(password);
            //8.	Klikni na Přihlásit
            await loginButton.click();
           // 9.	Zkontroluj, že se uživatel přihlásil ¨¨
           const prihlasenyUzivatel =$('.navbar-right').$('[data-toggle="dropdown"]');;
           console.log('Jméno přihlášeného uživatele: ' + await prihlasenyUzivatel.getText());
        })

        it('odhlášení', async () => {
           //nejdriv se prihlasim a pak odhlasim
            const emailField = $('#email');
            const passwordField = $('#password');
            const loginButton = $('.btn-primary');
            //7.	Vyplň správný email a správné heslo
            await emailField.setValue(username);
            await passwordField.setValue(password);
            //8.	Klikni na Přihlásit
            await loginButton.click();
           // 9.	Zkontroluj, že se uživatel přihlásil ¨¨
           const prihlasenyUzivatel =$('.navbar-right').$('[data-toggle="dropdown"]');;
           console.log('Jméno přihlášeného uživatele: ' + await prihlasenyUzivatel.getText());
           
            // 14.	Odhlaš se a zkontroluj, že jsi byl/a odhlášen/a
            const rozeviraciSeznamOdhlaseni = await $('.dropdown-toggle');
            rozeviraciSeznamOdhlaseni.click();
            const btnOdhlasit = await $('#logout-link');
            btnOdhlasit.click();
            const jmenoP = await $('.navbar-right');
            console.log('Jméno přihlášeného uživatele: ' + await jmenoP.getText());
        })
    })

describe('Stránka přihlášky', async () => {

    beforeEach(async () => {
        await browser.reloadSession();
        await browser.url('/prihlaseni');
        await $('#email').setValue(username);
        await $('#password').setValue(password);
        await $('.btn-primary').click();
        await $('=Přihlášky').click();
        await browser.pause(1000);
        });

        it('Výpis všech přihlášek', async () => {
           console.log('Název stránky: '+ await $('h1').getText())
           //11.	Vypiš všechny řádky tabulky
           const radkyTabulky = await $('.dataTable').$('tbody').$$('tr');
           console.log('V tabulce je: '+ radkyTabulky.length+' řádků.');
           console.log('Výpis řádku tabulky: ');
                radkyTabulky.forEach(async (row) => {
                console.log(await row.getText());  
                }); 
        });

        it('Filtrováno v přihláškách', async () => {
           //12.	Zadej něco do políčka pro filtrování tabulky
           const hledej = await $('input[type="search"]');
           await hledej.setValue('bill');
           await browser.pause(1000);
           await $('#DataTables_Table_0_processing').waitForDisplayed({ reverse: true });

            //   13. Zkontroluj, že se stránka profiltrovala
           const filteredRows = await $('.dataTable').$('tbody').$$('tr')
           console.log('V tabulce je po vyfiltrování ' + filteredRows.length + ' řádků.');
           console.log('Výpis řádku tabulky po vyfiltrování: ');
           for (const row of filteredRows) {
            console.log(await row.getText());
            }

        });
    });
