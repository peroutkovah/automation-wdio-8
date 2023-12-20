
import AppPage from './app.page.js';

class TableData {
   constructor(name, date, paymentType, remainsToPay) {
    this.name=name;
    this.date=date;
    this.paymentType =paymentType;
    this.remainsToPay=remainsToPay;
   }

}

class ApplicationsPage extends AppPage {

     constructor() {
       super();
       this.url = '/admin/prihlasky';
    }

    //tady jsou getry
     //a.	getter pro tabulku
    get table() { return $('.dataTable'); }
     // b.	getter pro řádky tabulky
    get tableRows() { return this.table.$('tbody').$$('tr'); }
     // c.	getter pro políčko vyhledávání
    get searchField() { return $('input[type="search"]'); }

     // d.	metodu pro otevření stránky, pamatuj ale že tento PO neví kde se uživatel nachází takže navigace by měla být univerzální
     async open() {
        await browser.url(this.url);
    } 

    
     
    async goToApplications() {
        await $('=Přihlášky').click();
    }
      //f.	(dobrovolné) metoda čekání na načtení tabulky může být zvlášť a metoda pro získání řádků tabulky ji může volat
    async  waitForTableToLoad() {
        await browser.pause(1000);
        await $('#DataTables_Table_0_processing').waitForDisplayed({ reverse: true});
    }
      //e.	metodu pro získání řádků tabulky - tato metoda by měla počkat na načtení tabulky
    async getTableRows() {
      let data=[]

      await this.waitForTableToLoad(); // functions can call other functions
      const rows = await  this.tableRows;

      for (const row of rows) {
          //console.log(await row.getText());
          const cols = await row.$$('td');

          /*pred  tim nez nadefinuju tridu*/
          /*const rowData = {
              name: await cols[0].getText(),
              date: await cols[1].getText(),
              paymentType: await cols[2].getText(),
              remainsToPay: await cols[3].getText()
          } */

          const rowData =new TableData(
            await cols[0].getText(),
            await cols[1].getText(),
            await cols[2].getText(),
            await cols[3].getText()
          )
          data.push(rowData);
      }

        return data;

    }
      //g.	metodu pro vyhledávání v tabulce
    async  searchInTable(searchText) {
        await this.searchField.setValue(searchText);
    }

 }
 
 export default new ApplicationsPage();
 
 