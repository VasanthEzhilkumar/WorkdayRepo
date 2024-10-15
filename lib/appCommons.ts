import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActionsPage } from './WebActionPage';



export class appCommons extends WebActionsPage {
  readonly page: Page;
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




  constructor(page: Page, context: BrowserContext) {
    super(page);
    this.page = page;
    this.inboxtitle = page.getByLabel('My Tasks Items');
    this.searchboxhome = page.locator('[aria-label="Search Workday "]');
    this.successEvent = page.locator('h2:has-text("Success! Event submitted")');
    this.eventApproved = page.locator('text=Success! Event approved');
    this.successClose = page.locator('[aria-label="Close"] >> nth=2');
    this.refreshButton = page.locator('button:has-text("Refresh")');
    this.clearSearch = page.locator('[aria-label="clear search"]');
    this.eventSubmitted = page.getByRole('heading', { name: 'You have submitted' });
    this.markedcompleted = page.locator('text=You have marked as Complete');
    this.Archive = page.getByRole('button', { name: 'Archive' });
    this.process = page.getByRole('tablist').getByText('Process');
    this.fullscreen = page.getByRole('button', { name: 'Toggle Fullscreen Viewing Mode' });
    this.lblPopUpWelcomeToMyTask = page.locator("//*[contains(text(),'Welcome to My Tasks!')]//ancestor::div[@data-automation-id='tour-modal']//button[@data-automation-id='closeButton']");
    this.txtItemsPerPage = page.locator("//label[contains(text(),'Items per page')]/parent::div//descendant::input[@placeholder='Choose an option' and not(contains(@value,'All'))]");
    this.listSelectAll = page.locator("/*[@data-automation-id='paginationSelectMenu']/div//ul/*[@data-id='All']");
    this.lblHrDetails2 = page.locator("((//div[contains(text(),'Awaiting Action')]//ancestor::td//following-sibling::td)[3])[1]");
    this.btnMyTaskCollapse = page.locator("//section[@data-automation-id='navPanel']/button[@aria-expanded='true' and @data-automation-id='navPanelToggleButton']");
  }

  async ClickInbox() {
    await this.inboxtitle.click();
  }



  async Searchbox(searchtext: string) {
    if (await this.clearSearch.isVisible()) {
      await this.clearSearch.click();
    }
    //await this.searchboxhome.clear();
    await this.page.waitForTimeout(700);
    await this.searchboxhome.fill(searchtext);
    await this.searchboxhome.press('Enter');
  }

  async SearchboxEmp(searchtext: string) {
    await this.page.waitForTimeout(500);
    await this.searchboxhome.clear();
    await this.searchboxhome.fill(searchtext);
    await this.searchboxhome.press('Enter');
  }

  async SearchClickLink(searchtext: string) {
    await super.setTextWithEnter(this.searchboxhome,searchtext);
    await super.click(this.page.locator("(//*[@data-automation-id='pex-search-result-header']//a)[1]"));
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
    //await this.page.waitForTimeout(2000);
    if (await this.btnMyTaskCollapse.isVisible()) {
      await super.click(this.btnMyTaskCollapse);
    }

  }

  async MyTasks() {
    if (await this.page.locator("//*[contains(@aria-label,'Close notification')]").isVisible()){
       await super.click( this.page.locator("//*[contains(@aria-label,'Close notification 1')]"));
    }
    await super.click(this.page.getByLabel('My Tasks Items'));
    //await super.click(this.page.locator('//*[@aria-label="My Tasks"]//button)').first());
    await this.clickCollpaseMyTasks();
    await this.clickXifWelcomeToMyTaskExists();
  }

  async checkWaningAlerts() {
    await super.checkExistsOrIsVisible(this.page.getByLabel('My Tasks Items'));
  }


  async clickXifWelcomeToMyTaskExists() {
    // Check if the element exists
    if (await this.lblPopUpWelcomeToMyTask.isVisible() && await !this.lblPopUpWelcomeToMyTask.isHidden && await this.lblPopUpWelcomeToMyTask.count() > 0) {
      await this.lblPopUpWelcomeToMyTask.click();
    }
  }

  async getHRpartnerID(givenname: string, familyname: string) {

    await this.MyTasks();
    await this.Archive.click();
    await this.page.waitForTimeout(10000);
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
    // Check if the field exists
    if (await this.txtItemsPerPage.isVisible() && await this.txtItemsPerPage.count() > 0) {
      await this.txtItemsPerPage.waitFor;
      await this.txtItemsPerPage.click();
      await this.listSelectAll.click();
    }

    // Wait for 3 seconds (consider using a more dynamic wait if possible)
    await this.page.waitForTimeout(5000);
    const HrDetails: string = await this.getInnerText1(this.page, this.lblHrDetails2);
    const HrID2 = this.getNumbersFromString(HrDetails);
    return HrID2;
  }


  async getInnerText1(page: Page, fieldSelector: Locator): Promise<string> {
    await fieldSelector.waitFor;
    await fieldSelector.scrollIntoViewIfNeeded();
    await expect(fieldSelector).toBeVisible();
    return await fieldSelector.textContent();
  }

  // Example implementation of getNumbers function
  async getNumbersFromString(input: string): Promise<string> {
    const matches = input.match(/\d+/g); // Extract numbers from the input
    return matches ? matches.join('') : '';
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
