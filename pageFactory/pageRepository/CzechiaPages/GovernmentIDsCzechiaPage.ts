import { BrowserContext, Locator, Page } from '@playwright/test';
import { WebActionsPage } from 'lib/WebActionPage';


export class GovernmentsIDPageCzechia extends WebActionsPage {

  readonly page: Page;
  readonly context: BrowserContext;
  readonly hrassignPaygroup: Locator;
  readonly hrSubmit: Locator;
  readonly validatePayGroup: Locator;
  readonly idChange: Locator;
  readonly addId: Locator;
  readonly GCountry: Locator;
  readonly GNationalIDType: Locator;
  readonly GID: Locator;
  readonly GExpirationDate: Locator;
  readonly GIssuedDate: Locator;
  readonly IssuedBy: Locator;
  readonly PerIssuedDate: Locator;
  readonly PerExpirationDate: Locator;
  readonly series: Locator;
  readonly Approve: Locator;
  readonly fillAmount: Locator;
  readonly saveSalary: Locator;
  readonly submit: Locator;
  readonly govIds: Locator;
  readonly govIDsEdit2: Locator;
  readonly addROWNationalIDs: Locator;
  readonly addROWadditionalGovernmentIDs: Locator;
  readonly addGovtID: Locator;
  readonly checkWarningAndAlert: Locator;
  readonly idChangeTitle: Locator;

  EmployeeNumber: string[];
  readonly GnationalID: Locator;

  constructor(page: Page, givenname: string, FamilyName: string, context: BrowserContext) {
    super(page);
    this.page = page;
    this.context = context;
    this.hrSubmit = page.locator('button:has-text("Submit")');
    this.idChange = page.locator('//div[@data-automation-id="titleText" and text()="Change/Update My Government IDs"]').first();
    this.addId = page.locator('tbody').filter({ hasText: '*Country*National ID' }).getByLabel('Add Row')//page.locator('text=*Country*National ID TypeCurrent IDAdd/Edit IDIssued DateExpiration DateIssued B >> [aria-label="Add Row"]');
    this.addROWNationalIDs = page.locator("(//button[@aria-label='Add Row' and @role='button'])[1]");
    this.addROWadditionalGovernmentIDs = page.locator("(//button[@aria-label='Add Row' and @role='button'])[2]");
    this.GCountry = page.getByLabel('Country', { exact: true })//page.locator('[id="selectInputId-56\\$63401"]');
    this.GNationalIDType = page.getByLabel('National ID Type', { exact: true });//page.locator('[id="selectInputId-56\\$63406"]');
    this.GID = page.locator('input[role="textbox"]');
    this.submit = page.getByRole('button', { name: 'Submit' });
    this.GnationalID = page.locator('text=1 item selected, CzechiaCzechia1 item selected, Identity Card NumberIdentity Car >> [id="\\35 6\\$533359"] input[role="textbox"]');
    this.checkWarningAndAlert = this.page.locator('(//div[@role="button"]//div[@data-automation-id="errorWidgetBarMessageCountCanvas"])[1]');

    this.GExpirationDate = page.locator("//table[@class='mainTable']/tbody/tr/td[8]/descendant::input[@placeholder='DD']");
    this.GIssuedDate = page.locator("//table[@class='mainTable']/tbody/tr/td[7]/descendant::input[@placeholder='DD']");
    this.IssuedBy = page.locator("(//div[@data-automation-id='textInput' or contains(title,'Issued')])[2]/input");
    this.series = page.locator("(//div[@data-automation-id='textInput' or contains(title,'Issued')])[3]/input");

    this.PerIssuedDate = page.locator('text=DD >> nth=1');
    this.PerExpirationDate = page.locator('text=DD >> nth=3');
    this.Approve = page.locator('button:has-text("Approve")');
    // this.govIds = page.getByLabel('Content Area').locator('input[type="text"]')
    this.govIds = page.locator('(//div[@data-automation-id="textInput"])[1]/input');
    // this.govIDsEdit2 = page.locator("//div[@data-automation-id='textInput']//input[@size='7' and  @ role='textbox']");
    this.govIDsEdit2 = page.locator('(//div[@data-automation-id="textInput"])[1]/input');
    this.addGovtID = page.locator('//button[@title="Change My Government IDs"]');
    this.idChangeTitle = this.page.locator('//div[@data-automation-id="titleText" and contains(text(),"ID Change: ' + givenname + ' ' + FamilyName + '")]');
    
  }


  async clickGovernmentandSubmit() {
    await super.click(this.idChange);
    await super.click(this.submit);
  }

  async setGovernmentIDsCzechia(
    country1: string,
    Country2: string,
    NationalIDType1: string,
    NationalIDType2: string,
    AddEditID1: string,
    AddEditID2: string,
    IssuedDate1: string,
    IssuedDate2: string,
    ExpirationDate1: string,
    ExpirationDate2: string,
    IssuedBy2: string,
    series2: string,

  ) {

    await super.click(this.idChange);
    await super.click(this.addGovtID);
    // await super.click(this.addId);
    //await this.addId.click();
    //await this.idChange.click();
    await super.click(this.addROWNationalIDs);
    await this.fillGovIDDetails(country1, NationalIDType1, AddEditID1, IssuedDate1, ExpirationDate1, true);

    if (!country1.includes("Slovakia") && !country1.includes("Slovenia") && !country1.includes("France")) {
      // Adding second ID
      // await this.page.waitForTimeout(500);
      // await this.addId.click();
      await super.click(this.addROWNationalIDs);
      await this.fillGovIDDetails(Country2, NationalIDType2, AddEditID2, IssuedDate2, ExpirationDate2, false);
    }
    if (Country2.includes("Slovenia")) {
      await super.click(this.page.locator('tr').filter({ hasText: '*Country*Government ID' }).getByLabel('Add Row'));
      await this.setGovernmentIdsSlovenia(Country2, NationalIDType2, AddEditID2, IssuedDate2, ExpirationDate2);
    }


    await super.click(this.submit); // last step
    // await this.page.waitForTimeout(500);
    // if (await this.checkWarningAndAlert && await this.idChange) {
    //await super.click(this.submit);
    // }
    //await this.submit.click();
  }
  async setGovernmentIdsSlovenia(
    country: string,
    nationalIDType: string,
    idNumber: string,
    issuedDate: string,
    expirationDate: string,
  ) {
    await super.setTextWithEnter(this.page.getByRole('row', { name: 'Remove Row Country Government' }).getByLabel('Country'), country);
    await super.selectFromCustomDropDrown(this.page.getByLabel('Government ID Type', { exact: true }), String(nationalIDType));
    await super.setText(this.page.getByRole('table', { name: 'Government IDs' }).locator('input[type="text"]'), String(idNumber));
    await this.page.keyboard.press('Tab');
    await super.setTextWithType(this.page.getByPlaceholder('DD').nth(2), issuedDate);
    await super.setTextWithType(this.page.getByPlaceholder('DD').nth(3), expirationDate);
    if (await this.IssuedBy.isVisible()) {
      await super.setText(this.IssuedBy, String('Test'));
    }

    if (await this.series.isVisible()) {
      await super.setText(this.series, String('Test'));
    }
  }


  ///National IDs
  async setGovernmentIDsUK(
    country1: string,
    NationalIDType1: string,
    AddEditID1: string,
    IssuedDate1: string,
    ExpirationDate1: string,
  ) {

    await super.click(this.idChange);
    await super.click(this.addGovtID);
    await super.click(this.addROWNationalIDs);
    await this.fillGovIDDetails(country1, NationalIDType1, AddEditID1, IssuedDate1, ExpirationDate1, true);
    await this.page.waitForTimeout(1000);
    await super.click(this.submit); // last step 
    //await this.submit.click();
  }

  async setGovernmentIDsSpainHr(
    country1: string,
    Country2: string,
    NationalIDType1: string,
    NationalIDType2: string,
    AddEditID1: string,
    AddEditID2: string,
    IssuedDate1: string,
    IssuedDate2: string,
    ExpirationDate1: string,
    ExpirationDate2: string,
    IssuedBy2: string,
    series2: string,

  ) {

    await super.click(this.idChangeTitle);
    // await super.click(this.addGovtID);
    // await super.click(this.addId);
    //await this.addId.click();
    //await this.idChange.click();
    await super.click(this.addROWNationalIDs);
    await this.fillGovIDDetails(country1, NationalIDType1, AddEditID1, IssuedDate1, ExpirationDate1, true);

    if (!country1.includes("Slovakia") && !country1.includes("Slovenia") && !country1.includes("France")) {
      // Adding second ID
      // await this.page.waitForTimeout(500);
      // await this.addId.click();
      await super.click(this.addROWNationalIDs);
      await this.fillGovIDDetails(Country2, NationalIDType2, AddEditID2, IssuedDate2, ExpirationDate2, false);
    }
    if (Country2.includes("Slovenia")) {
      await super.click(this.page.locator('tr').filter({ hasText: '*Country*Government ID' }).getByLabel('Add Row'));
      await this.setGovernmentIdsSlovenia(Country2, NationalIDType2, AddEditID2, IssuedDate2, ExpirationDate2);
    }
    await super.click(this.submit); // last step 
    //await this.submit.click();
  }


  ///National IDs
  async fillGovIDDetails(
    country: string,
    nationalIDType: string,
    idNumber: string,
    issuedDate: string,
    expirationDate: string,
    isFirstID: boolean
  ) {
    await super.selectFromCustomDropDrown(this.GCountry, country);
    await this.page.waitForTimeout(2000);
    await super.selectFromCustomDropDrownBySliptAndEnter(this.GNationalIDType, String(nationalIDType));
    await this.page.waitForTimeout(1000);

    if (isFirstID) {
      await super.setText(this.govIds, String(idNumber));
      await this.page.keyboard.press('Tab');
      await this.page.waitForTimeout(1000);
    } else {
      await super.setText(this.govIDsEdit2, String(idNumber));
      await this.page.keyboard.press('Tab');
    }
    if (!isFirstID) {
      await this.page.keyboard.press('Tab');
      // await this.page.waitForTimeout(500);
      // await this.GIssuedDate.click();
      if (issuedDate !== "NaN" && issuedDate !== undefined && issuedDate !== "") {
        await super.click(this.GIssuedDate);
        await super.setTextWithType(this.GIssuedDate, String(issuedDate));
      }
      //await this.GIssuedDate.type(issuedDate);
      if (expirationDate !== "" && expirationDate !== undefined && expirationDate !== "NaN") {
        await super.click(this.GExpirationDate);
        await super.setTextWithType(this.GExpirationDate, String(expirationDate));
      }
      if (await this.IssuedBy.isVisible()) {
        await super.setText(this.IssuedBy, String('Test'));
      }

      if (await this.series.isVisible()) {
        await super.setText(this.series, String('Test'));
      }
    }
  }

}


