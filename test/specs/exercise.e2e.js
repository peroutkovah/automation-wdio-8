import {username, password} from './fixtures.js'
// import LoginPage from '../pageobjects/login.page'
// import ApplicationsPage from '../pageobjects/applications.page'

describe('Czechitas Login Page', async () => {

    it('should open login page', async () => {

        await browser.reloadSession(); //otevre se nove okno prohlizec
        //otevre stranku prihlaseni
        await browser.url('/prihlaseni'); //na tu base url doplni /prihlaseni'

        //await browser.saveScreenshot('login.png')

        //velikost okna prohlizece
        const windowSize = await browser.getWindowSize();
        console.log('Velikost okna: ',windowSize);
        //udelat screenshot a ulozit ho do slozky screenshot
        await browser.saveScreenshot('./screenshots/login_page_firefox.png');
       //Zapauzujte vykonávání testu a 5 vteřin
        await browser.pause(5000); //tohle se mi otevre a zustane stat 5 vterin
        //console.log('Vypis neco')
        
    });

});

//sipka nahoru dolu mi ukaze v cmd posledni napsane prikazy
// pokud chci testy zapisovat do logu: npm run wdio > test1.log
// pokud chci testy jak do okna tak i do logu: npm run wdio 2>&1 | tee test2.log