describe('Homework', async () => {

    it('should open page and create screenshot', async () => {

        // sem vypracuj domácí úkol
        await browser.reloadSession();
        await browser.url('/registrace'); 
        await browser.saveScreenshot('./screenshots/homework1.png');
        
    });

});
