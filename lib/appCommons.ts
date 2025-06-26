import { BrowserContext, Locator, Page, expect } from '@playwright/test';
import { WebActionsPage } from './WebActionPage';



export class appCommons extends WebActionsPage {


  readonly page: Page;
  readonly context: BrowserContext;
  readonly inboxtitle: Locator;
  readonly searchboxhome: Locator;
  readonly successEvent: Locator;
  readonly successClose: Locator;
  readonly refreshButton: Locator;
  readonly clearSearch: Locator;
  readonly eventApproved: Locator;
  readonly eventSubmitted: Locator;
  readonly markedcompleted: Locator;
  readonly Archive: Locator;
  readonly process: Locator;
  readonly fullscreen: Locator;
  readonly lblPopUpWelcomeToMyTask: Locator;
  readonly txtItemsPerPage: Locator;
  readonly listSelectAll: Locator;
  readonly lblHrDetails2: Locator;
  readonly btnMyTaskCollapse: Locator;
  readonly btnPay: Locator;
  readonly tbWorkerHistroy: Locator;
  readonly btnJob: Locator;
  readonly txtPayGroup: Locator;
  readonly lnkViewDetails: Locator;
  readonly successOpen: Locator;
  readonly hrPartnerSecondXpath: Locator;

  constructor(page: Page, context: BrowserContext) {
    super(page);
    this.page = page;
    this.context = context;
    this.inboxtitle = page.getByLabel('My Tasks Items');
    this.searchboxhome = page.locator('[aria-label="Search Workday "]');
    this.successEvent = page.locator('h2:has-text("Success! Event submitted")');
    this.successOpen = page.getByRole('button', { name: 'Open' });
    this.eventApproved = page.locator('text=Success! Event approved');
    this.successClose = page.locator('[aria-label="Close"] >> nth=2');
    this.refreshButton = page.locator('button:has-text("Refresh")');
    this.clearSearch = page.locator('[aria-label="clear search"]');
    this.eventSubmitted = page.getByRole('heading', { name: 'You have submitted' });
    this.markedcompleted = page.locator('text=You have marked as Complete');
    this.Archive = page.getByRole('button', { name: 'Archive' });
    this.process = page.getByRole('tablist').getByText('Process', { exact: true }).first();
    this.fullscreen = page.getByRole('button', { name: 'Toggle Fullscreen Viewing Mode' });
    this.lblPopUpWelcomeToMyTask = page.locator("//*[contains(text(),'Welcome to My Tasks!')]//ancestor::div[@data-automation-id='tour-modal']//button[@data-automation-id='closeButton']");
    this.txtItemsPerPage = page.locator("//label[contains(text(),'Items per page')]/parent::div//descendant::input[@placeholder='Choose an option' and not(contains(@value,'All'))]");
    this.listSelectAll = page.locator("/*[@data-automation-id='paginationSelectMenu']/div//ul/*[@data-id='All']");
    this.lblHrDetails2 = page.locator("((//div[contains(text(),'Awaiting Action')]//ancestor::td//following-sibling::td)[3])[1]");
    this.hrPartnerSecondXpath = page.locator('(//div[contains(@data-automation-id,"selectedItem")]//div[contains(@data-automation-label,"HR Partner")])[2]');
    this.btnMyTaskCollapse = page.locator("//section[@data-automation-id='navPanel']/button[@aria-expanded='true' and @data-automation-id='navPanelToggleButton']").first();
    this.btnPay = page.getByRole('link', { name: 'Pay' });
    //this.btnPay = page.locator("//div[@data-automation-id='workerProfileMenuItemWrapper']/div[contains(.,'Pay')]");
    this.btnJob = page.locator("//div[@data-automation-id='workerProfileMenuItemWrapper']/div[contains(.,'Job')]").first();
    this.tbWorkerHistroy = page.locator("//ul[@data-automation-id='tabBar']/li[@role='tab']/div/div[contains(text(),'Worker History') and  @data-automation-id='tabLabel']").first();
    this.txtPayGroup = page.locator("//label[contains(text(),'Pay Group')]//parent::div//following-sibling::div//descendant ::div[@data-automation-id='promptOption']");
    this.lnkViewDetails = page.locator("(//button[contains(.,'View Details')])[1]");
  }

  async ClickInbox() {
    // await this.inboxtitle.click({'force':true});
    await this.inboxtitle.click();
  }


  /*
  @description : used to set or apply static wait in second to the script.
  */
  async staticWait(waitInsecond) {
    await this.page.waitForTimeout(waitInsecond * 1000);
  }



  async Searchbox(searchtext: string) {
    if (await this.clearSearch.isVisible()) {
      await this.clearSearch.first().click();
    }
    //await this.searchboxhome.clear();
    await this.page.waitForTimeout(700);
    await this.searchboxhome.fill(searchtext);
    await this.page.waitForTimeout(500);
    await this.searchboxhome.press('Enter');
  }

  async SearchboxEmp(searchtext: string) {
    await this.page.waitForTimeout(500);
    await this.searchboxhome.clear();
    await this.searchboxhome.fill(searchtext);
    await this.searchboxhome.press('Enter');
  }


  async getEmployeeGivenNameAndFamilyName(searchtext: string): Promise<[string, string]> {

    const locator = this.page.locator(`(//*[@data-automation-id='workerProfileDetailsPanelName']//*[contains(text(),'${searchtext.trim()}')])[1]`);
    await locator.waitFor();
    const givenAndFamilyName = await super.getInnerText(locator);
    const givenName = givenAndFamilyName.split(" ")[0];
    const familyName = givenAndFamilyName.split(" ")[1];
    // const [givenName, familyName] = givenAndFamilyName.split(" ");
    return [givenName, familyName];
  }

  async SuccessEventHandleJobChange() {
    await this.page.waitForTimeout(2000);
    if (await this.successEvent.isVisible()) {
      await super.click(this.successClose);
    } else if (await this.eventApproved.isVisible()) {
      await super.click(this.successClose);
    } else if (await this.eventSubmitted.isVisible()) {
      //await super.click(this.successClose);
      await super.click(this.successOpen);
    } else if (await this.markedcompleted.isVisible()) {
      await super.click(this.successClose);
    }

  }


  async SearchClickLink(searchtext: string) {
    // await this.page.waitForLoadState();
    await this.searchboxhome.focus();
    await super.setTextWithEnter(this.searchboxhome, searchtext.toString());
    await super.click(this.page.locator("(//*[@data-automation-id='pex-search-result-header']//a[contains(text(),'" + searchtext.toString().trim() + "')])[1]"));
  }

  async checkUpNextCompensationParnterApproval(): Promise<boolean> {
    return await this.page.getByLabel('Compensation Partner |').isVisible();
  }

  async SuccessEventHandle() {
    await this.page.waitForTimeout(2000);
    if (await this.successEvent.isVisible()) {
      await super.click(this.successClose);
    } else if (await this.eventApproved.isVisible()) {
      await super.click(this.successClose);
    } else if (await this.eventSubmitted.isVisible()) {
      await super.click(this.successClose);
    } else if (await this.markedcompleted.isVisible()) {
      await super.click(this.successClose);
    }


  }

  async refreshInbox() {
    if (await this.refreshButton.isVisible()) {
      await super.click(this.refreshButton);
    }
  }

  async clickCollpaseMyTasks() {
    if (await this.btnMyTaskCollapse.count() > 0) {
      await super.click(this.btnMyTaskCollapse);
    }

  }

  async MyTasks() {
    let j = 0;
    const txtNotificationCloseButton = await this.page.locator('//button[@data-automation-id="asyncNotificationCloseButton" and contains(@aria-label,"Close notification")]');
    if (await txtNotificationCloseButton.first().count() > 0) {
      await super.click(txtNotificationCloseButton.first());
    }
    await super.click(this.page.locator('//div[@data-automation-id="tooltipsWrapper"]/button[@data-automation-id="inbox_preview"]').nth(0));
    while (!await this.page.getByLabel('Advanced Search').isVisible() && j < 3) {
      await super.click(this.page.locator('//div[@data-automation-id="tooltipsWrapper"]/button[@data-automation-id="inbox_preview"]').nth(0));
      j = j + 1;
    }
    if (await this.page.locator('//button[@data-automation-id="tour-skip-button"]').nth(0).count() > 0) {
      await super.click(this.page.locator('//button[@data-automation-id="tour-skip-button"]').first());
    }
    await this.clickCollpaseMyTasks();
    await this.clickXifWelcomeToMyTaskExists();
    await this.page.getByLabel('All Items').first().click({ 'force': true });

  }


  async clickXifWelcomeToMyTaskExists() {
    // Check if the element exists
    if (await this.lblPopUpWelcomeToMyTask.isVisible() && await !this.lblPopUpWelcomeToMyTask.isHidden() && await this.lblPopUpWelcomeToMyTask.count() > 0) {
      await this.lblPopUpWelcomeToMyTask.click();
    }

  }

  /*
  Author: Madhukar Kirkan
  Description: This method allows us to extract the HR partner from the Employee Worker History.
  Parameters: 1.employeeID : The ID of the employee.
              2.taskName : The task from which we are extracting the HR partner ID.
  */
  async getHRpartnerIDFromEmployeeWorkerHistory(employeeID: string, taskName: string) {

    await this.SearchClickLink(employeeID);
    await super.click(this.btnJob);
    await super.click(this.tbWorkerHistroy);
    const lblHrByTaskname = await this.page.locator("(//div[contains(.,'" + taskName + "')]/ancestor::td/following-sibling::td/descendant::div[contains(text(),'In Progress')]/ancestor::td/following-sibling::td/descendant::div[@data-automation-id='promptOption'])[1]");
    // Wait for 3 seconds (consider using a more dynamic wait if possible)
    await this.page.waitForTimeout(1000);
    const HrDetails: string = await super.getInnerText(lblHrByTaskname.first());
    const HrID = await this.getNumbersFromString(HrDetails);
    return HrID;

  }


  async getHRpartnerID(givenname: string, familyname: string) {

    await this.MyTasks();
    await super.click(this.Archive);
    await this.page.waitForTimeout(6000);
    await this.page.waitForSelector(`button:has-text('Hire: ${givenname} ${familyname}')`);
    const buttons = await this.page.locator(`button:has-text('Hire: ${givenname} ${familyname}')`);
    // Iterate over the found buttons and click the one that starts with 'Hire'
    for (let i = 0; i < await buttons.count(); i++) {
      const buttonText = await buttons.nth(i).textContent();
      if (buttonText?.startsWith('Hire')) {
        await this.page.waitForTimeout(400);
        //await buttons.nth(i).click();
        await super.click(buttons.nth(i));
      }
    }
    await this.page.waitForTimeout(3000);
    await this.process.click({ 'force': true });
    // Check if the field exists
    if (await this.txtItemsPerPage.isVisible() && await this.txtItemsPerPage.count() > 0) {
      //await this.txtItemsPerPage.waitFor;
      // await this.txtItemsPerPage.click();
      await super.click(this.txtItemsPerPage);
      await super.click(this.listSelectAll);
      // await this.listSelectAll.click();
    }

    // Wait for 3 seconds (consider using a more dynamic wait if possible)
    await this.page.waitForTimeout(1000);
    const HrDetails: string = await this.getInnerText1(this.lblHrDetails2);
    const HrID2 = this.getNumbersFromString(HrDetails);
    return HrID2;
    // } catch (error) {
    //   console.error("HR locator is not present in the DOM; therefore, the HR partner was not found.");
    // }
  }

  async getJobChangesHRpartnerID(givenname: any, familyname: any) {

    await this.MyTasks();
    await super.click(this.Archive);
    await this.page.waitForTimeout(6000);
    const buttons = await this.page.locator(`button:has-text('Promotion: ${givenname} ${familyname}')`).first().or(this.page.locator(`button:has-text('Data Change: ${givenname} ${familyname}')`).first());
    // await this.page.waitForSelector(buttons);
    await buttons.scrollIntoViewIfNeeded();
    // const buttons = await this.page.locator(`button:has-text('Hire: ${givenname} ${familyname}')`);
    // Iterate over the found buttons and click the one that starts with 'Hire'
    for (let i = 0; i < await buttons.count(); i++) {

      const buttonText = await buttons.nth(i).textContent();
      if (buttonText?.startsWith('Data Change')) {
        await this.page.waitForTimeout(400);
        //await buttons.nth(i).click();
        await super.click(buttons.nth(i));
      } else if (buttonText?.startsWith('Promotion')) {
        await this.page.waitForTimeout(400);
        //await buttons.nth(i).click();
        await super.click(buttons.nth(i));
      }
    }
    await this.page.waitForTimeout(3000);
    await this.process.click({ 'force': true });
    // Check if the field exists
    if (await this.txtItemsPerPage.isVisible() && await this.txtItemsPerPage.count() > 0) {
      //await this.txtItemsPerPage.waitFor;
      // await this.txtItemsPerPage.click();
      await super.click(this.txtItemsPerPage);
      await super.click(this.listSelectAll);
      // await this.listSelectAll.click();
    }

    // Wait for 3 seconds (consider using a more dynamic wait if possible)
    await this.page.waitForTimeout(1000);
    const FirstHRparnter: string = await this.getInnerText1(this.lblHrDetails2);
    const SecondHRparnter = await this.getInnerText1(this.hrPartnerSecondXpath);
    const HrIDFirst = this.getNumbersFromString(FirstHRparnter);
    const HrIDSecond = this.getNumbersFromString(SecondHRparnter);
    if ((await HrIDFirst).toString().startsWith('0', 0)) {
      return HrIDSecond;
    } else {
      return HrIDFirst;
    }
  }

  async getCompensationHRpartnerID() {

    await super.click(this.lnkViewDetails);
    await this.page.waitForTimeout(1000);
    await this.page.locator('//h2/span[@title="Details and Process"]').click();
    await this.page.waitForTimeout(1000);
    await this.page.locator('(//div[@data-automation-id="tabLabel" and text()="Process"])[1]').click();
    await this.process.click();
    // Check if the field exists
    if (await this.txtItemsPerPage.isVisible() && await this.txtItemsPerPage.count() > 0) {
      await this.txtItemsPerPage.waitFor;
      await this.txtItemsPerPage.click();
      await this.listSelectAll.click();
    }

    // Wait for 3 seconds (consider using a more dynamic wait if possible)
    await this.page.waitForTimeout(1000);
    const HrDetails: string = await this.getInnerText1(this.lblHrDetails2);
    const HrID2 = this.getNumbersFromString(HrDetails);
    return HrID2;
  }


  async getInnerText1(fieldSelector: Locator): Promise<string> {
    await fieldSelector.waitFor;
    //await fieldSelector.scrollIntoViewIfNeeded();
    await expect(fieldSelector).toBeVisible();
    return await fieldSelector.textContent();
  }


  // Example implementation of getNumbers function
  // async getNumbersFromString(input: string): Promise<string> {
  //   const matches = input.match(/\d+/g); // Extract numbers from the input
  //   return matches ? matches.join('') : '';
  // }

  async getNumbersFromString(input: string): Promise<string> {
    const matches = input.match(/\d+/g); // Extract numbers from the input
    //if (matches) {
    // Join all the numbers together and take the last 8 digits
    const allNumbers = matches.join('');
    return allNumbers.slice(-8); // Get the last 8 digits
    // }// 
    // return '';
  }

  async tearDown() {
    // expect("Close").toEqual("Close");
    this.page.close();
    this.context.clearCookies();
    this.context.close();

  }

  async assignPaygroupValidation(PayGroup: string) {
    await this.page.waitForTimeout(500);
    await this.btnPay.click();
    await this.page.waitForTimeout(500);
    await this.page.getByRole('tablist').getByText('Pay Group').click();
    let actulValue = await super.getAllInnerText(this.txtPayGroup);
    await this.page.screenshot()
    await expect(String(actulValue[0].trim())).toEqual(PayGroup.trim());
  }



  async clickHRPartnerLink(givenname: string, familyname: string): Promise<string | null> {


    await this.Archive.click();

    await this.page.waitForSelector(`button:has-text('Hire: ${givenname} ${familyname}')`);

    const buttons = await this.page.locator(`button:has-text('Hire: ${givenname} ${familyname}')`);

    // Iterate over the found buttons and click the one that starts with 'Hire'
    for (let i = 0; i < await buttons.count(); i++) {
      const buttonText = await buttons.nth(i).textContent();
      if (buttonText?.startsWith('Hire')) {
        await this.page.waitForTimeout(500);
        await buttons.nth(i).click();

      }
    }

    // await this.page.getByRole('button', { name: 'Hire:'+' '+givenname+' '+familyname+' '}).first().click();

    await this.process.click();

    await this.fullscreen.click();

    // Locate the cell containing "HR Partner" and extract the text content
    const hrPartnerCell = await this.page.locator('text=HR Partner').first();

    // Ensure the cell is visible
    await expect(hrPartnerCell).toBeVisible();

    // Extract the text content from the cell
    const cellText = await hrPartnerCell.textContent();

    // Use a regular expression to extract the dynamic number
    const match = cellText?.match(/\((\d+)\)/);
    const dynamicNumber = match ? match[1] : null;

    if (dynamicNumber) {
      console.log(`Extracted dynamic number: ${dynamicNumber}`);

      // Locate the link using the extracted dynamic number
      const dynamicLink = this.page.getByRole('cell', { name: new RegExp(`\\(${dynamicNumber}.*HR.*\\)`) });

      // Ensure the link is visible
      await expect(dynamicLink).toBeVisible();

      await this.fullscreen.click();


      // Return the dynamic number
      return dynamicNumber;
    } else {
      console.error('Failed to extract dynamic number from the text content.');
      return null;
    }
  }
}
