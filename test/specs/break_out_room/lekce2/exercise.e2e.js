import {username, password} from './fixtures.js'
// import LoginPage from '../pageobjects/login.page'
// import ApplicationsPage from '../pageobjects/applications.page'

describe('Czechitas Login Page', async () => {
//describe(nazev funkce, to co vykona)
    it('should open login page - LEKCE 1', async () => {
        //tohle je anonymni lambda funkce
        //await znamena, ze je asynchronni - kdyby tam await, tak by mi vyjelo jen PROMISE
        await browser.reloadSession(); //otevre se nove okno prohlizec
        //otevre stranku prihlaseni
        await browser.url('/prihlaseni'); //na tu base url doplni /prihlaseni'

        //await browser.saveScreenshot('login.png')

    //     //velikost okna prohlizece
    //     const windowSize = await browser.getWindowSize();
    //     console.log('Velikost okna: ',windowSize);
    //     //udelat screenshot a ulozit ho do slozky screenshot
    //     await browser.saveScreenshot('./screenshots/login_page_firefox.png');
    //    //Zapauzujte vykonávání testu a 5 vteřin
    //     await browser.pause(5000); //tohle se mi otevre a zustane stat 5 vterin
    //     //console.log('Vypis neco')

        });
/*
    it('should select different elements - LEKCE 2', async () => {
    // //cviceni1 - podle tagu -najde to vzdy prvni vyskytujici se
    //a.
     console.log('Tady je 1.a');
      const element_form = await  $('form').getHTML();
      console.log(element_form);
    //b.
      console.log('Tady je 1.b');
      const element_input  = await  $('input').getHTML();
      console.log(element_input);
    //c.
    console.log('Tady je 1.c');
    const element_btn  = await  $('button').getHTML();
    console.log(element_btn);

    // //cviceni 2 - podle ID
       console.log('Tady je 2.a');
        const email =await $('#email').getHTML();
       console.log(email);

       console.log('Tady je 2.b');
         const password =await $('#password ').getHTML();
       console.log(password ); 
  

     //cviceni 3 podle třídy
    console.log('Tady je 3.a - talčítko na odeslání formuláře pomocí třídy');
        const btnOdesli =await $('.btn-primary ').getHTML();
    console.log(btnOdesli ); 

    console.log('Tady je 3.b.	políčko email podle atributu name');
        const fieldEmail =await $('[name="email"]').getHTML();
    console.log(fieldEmail);

    //cviceni 4 podle atributu
    console.log('Tady je 4.a - políčko password podle attributu type');
        const fieldPassword =await $('[type="password"]').getHTML();
    console.log(fieldPassword ); 

    console.log('Tady je 4.b. - políčko podle atributu jehož honota obsahuje “ass”');
        const atrAss =await $('[type*="ass"]').getHTML();
    console.log(atrAss);

    console.log('Tady je 4.c - políčko podle atributu jehož honota končí na na “word”');
        const atrWord =await $('[type$="word"]').getHTML();
    console.log(atrWord);

    console.log('Tady je 4.d.	políčko podle atributu jehož honota začíná na “pass”');
        const atrPass =await $('[type^="pass"]').getHTML();
    console.log(atrPass);

    //cviceni 5 kombinace
    console.log('Tady je 5.a.	podle kombinovaného selektoru pro tag input a id email');
        const tagAndid  = await  $('input#email').getHTML();
    console.log(tagAndid);

    console.log('Tady je 5.b.	podle kombinovaného selektoru pro tag input a atribut type s hodnotou password');
        const tagAndtype = await  $('input[type="password"]').getHTML();
    console.log(tagAndtype);

    console.log('Tady je 5.c.	podle kombinovaného selektoru pro tag button a třídu btn-primary');
        const tagAndclass = await  $('button.btn-primary').getHTML();
    console.log(tagAndclass);

    //cviceni 6 řetězení selektorů
    console.log('Tady je 6.	vytvoř řetězení $ pro tag div > form > input[type$="word"]');
        const retezeni = await  $('div').$('form').$('input[type$="word"]').getHTML();
    console.log(retezeni);

    //cviceni 7 7.	WDIO selektory
    console.log('Tady je 7.	najdi element podle textu "Zapomněli jste své heslo?"');
        let WDIO = await $('.btn=Zapomněli jste své heslo?')
    await expect(WDIO).toHaveText('Zapomněli jste své heslo?')
    console.log(WDIO);


    });
 */

    it('should interactate with web page - LEKCE 3', async () => {
             //************** lekce 3 ***********
    const buttons = await $$('button');

    buttons.forEach(async (button) => {
        console.log(await button.getHTML());  
    });

    
    for await (const button of buttons) {
        console.log(await button.getHTML());
    } 

    const emailField =await $('#email');
    const passwordField =await $('#password');
    const loginkButton =await $('.btn-primary');
    const forgotPasswordLink = await $('=Zapomněli jste své heslo?');

    console.log(await loginkButton.isEnabled());
    console.log(await loginkButton.isDisplayed());
    console.log(await loginkButton.getText());
//    console.log(await loginkButton.getAttribute());
    console.log(await forgotPasswordLink.getAttribute('href'));
    console.log(await loginkButton.isExisting());

    await emailField.setValue('hanka.peroutkova@centrum.cz');
    await passwordField.setValue('hanka.peroutkova@centrum.cz');
    await loginkButton.click();

    await browser.pause(2000);

    const toastMessage =await $('.toast-message');
    await toastMessage.waitForExist();
    console.log('Objevil se!'); 


    await emailField.clearValue();
    await emailField.setValue(username);

    await passwordField.clearValue();
    await passwordField.setValue(password);

    await loginkButton.click();

   

    //await browser.pause(2000);

    });



});

//sipka nahoru dolu mi ukaze v cmd posledni napsane prikazy
// pokud chci testy zapisovat do logu: npm run wdio > test1.log
// pokud chci testy jak do okna tak i do logu: npm run wdio 2>&1 | tee test2.log