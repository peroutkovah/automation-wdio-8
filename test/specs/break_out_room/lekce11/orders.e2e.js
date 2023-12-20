

/* 1.	Aplikace umožňuje uživateli v menu Pro učitele vytvoření nové Objednávky pro MŠ/ZŠ
2.	Po kliknutí na Pro učitele > Objednávka pro MŠ/ZŠ se otevře formulář, kde může uživatel vyplnit detail objednávky
3.	Po vyplnění IČO do formuláře objednávky se automaticky načte jméno odběratele a adresa odběratele z ARESu
4.	Uživatel může odeslat vyplněnou objednávku na příměstský tábor
5.	Objednávku nelze odeslat pokud není řádně vyplněna */

describe('Objednávka pro MŠ/ZŠ', async () => {

    beforeEach(async () => {
        await browser.reloadSession();
        await browser.url('/');
    });

    it('1.	Aplikace umožňuje uživateli v menu Pro učitele vytvoření nové Objednávky pro MŠ/ZŠ', async () => {
        const forTeacher=$('*=Pro učitelé');
        await expect(forTeacher).toBeDisplayed();

        

    });


    xit('2.	Po kliknutí na Pro učitele > Objednávka pro MŠ/ZŠ se otevře formulář, kde může uživatel vyplnit detail objednávky', async () => {
        
    });

    xit('3.	Po vyplnění IČO do formuláře objednávky se automaticky načte jméno odběratele a adresa odběratele z ARESu', async () => {
        
    });

    xit('4.	Uživatel může odeslat vyplněnou objednávku na příměstský tábor', async () => {
        
    });

    xit('5.	Objednávku nelze odeslat pokud není řádně vyplněna', async () => {
        
    });



})