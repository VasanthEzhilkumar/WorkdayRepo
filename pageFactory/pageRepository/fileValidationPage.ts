import { Page, BrowserContext, Locator, expect, FrameLocator } from '@playwright/test';

export class fileValidationPage {
  readonly page: Page;
  readonly searchboxHome: Locator;
  readonly hireEmployeetask: Locator;
  readonly createpoistion: Locator;
  readonly searchIcon: Locator;
  readonly moreCategories: Locator;
  readonly allCategories: Locator;
  readonly lnkIntegration: Locator;
  readonly lnkCZIntegrationTitle: Locator;
  readonly lnkRelatedOptions: Locator;
  readonly lnkProcessTitle: Locator;
  readonly INT030UKSAPOutboundCDPECIOptions: Locator;
  readonly Integration: Locator;
  readonly launch: Locator;
  readonly btnOK: Locator;
  readonly txtPayGroup: Locator;
  readonly txtPayGroupMembers: Locator;
  readonly txtLastSuccesssfulRunDate: Locator;
  readonly txtLastSuccesssfulRunTime: Locator;
  readonly lblOverallStatus: Locator;
  readonly lnkXMLFile: Locator;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.searchboxHome = page.locator('[aria-label="Search Workday "]');
    this.hireEmployeetask = page.locator('text=Hire Employee >> nth=1');
    this.searchIcon = page.locator('#wd-searchInput div svg[role="presentation"]');
    this.createpoistion = page.getByRole('link', { name: 'Create Position' });
    this.moreCategories = page.locator('//span[text()="More Categories"]/parent::button');
    this.allCategories = page.locator('//div[text()="All Categories"]');
    this.lnkIntegration = page.locator('//span[contains(text(),"Integration")]');
    this.lnkCZIntegrationTitle = page.locator('//a[text()="INT030 Czech (Payroll Sdworx) Outbound CD New"]');
    this.lnkRelatedOptions = page.locator('//span[@title="View Integration System"]/parent::h1/following-sibling::div//div[@data-automation-id="relatedIconContainer"]');
    this.lnkProcessTitle = page.locator('//label[text()="Overall Process"]/parent::div/following-sibling::div//div[@data-automation-id="promptOption"]');
    this.INT030UKSAPOutboundCDPECIOptions = page.locator('//button[@aria-label="Related Actions INT030 UK(SAP) Outbound CD PECI"]');
    // this.Integration = page.locator('//div[@data-automation-label="Integration"]');
    this.Integration = page.locator('//div[text()="Integration"]');
    this.launch = page.locator('//div[@data-automation-label="Launch / Schedule"]');
    this.btnOK = page.locator('//button[@title="OK"]');
    // this.txtPayGroup = page.locator('(//input[@data-uxi-widget-type="selectinput"])[1]');
    // this.txtPayGroup = page.locator('tr').filter({ hasText: 'Pay GroupSpecify ValueSpecify Value selected0 items selected' }).getByPlaceholder('Search')
    // this.txtPayGroup = page.locator('((//div[text()="Pay Group"]/ancestor::td/following-sibling::td/ancestor::div)[17]//input)[1]');
    this.txtPayGroup = page.locator('((//div[@id="workdayApplicationFrame"]//div[text()="Pay Group"])[2]/ancestor::td/following-sibling::td)[3]//input');
    this.txtPayGroupMembers = page.locator('((//div[text()="Pay Group"]/ancestor::td/following-sibling::td/ancestor::div)[17]//input)[2]');
    // this.txtPayGroupMembers = page.locator('tr').filter({ hasText: 'Pay Group MembersSpecify' }).getByPlaceholder('Search')
    this.txtLastSuccesssfulRunDate = page.locator('//input[@data-automation-id="dateSectionDay-input"]');
    this.txtLastSuccesssfulRunTime = page.locator('//span[@data-automation-id="timeSectionHour"]/preceding-sibling::input');
    this.lblOverallStatus = page.locator('//label[text()="Overall Status"]/parent::div/following-sibling::div//div[@data-automation-id="textView"]');
    this.lnkXMLFile = page.locator('(//div[@title="Deliverable"]/ancestor::td/preceding-sibling::td)[2]//div[@data-automation-id="promptOption"]/span');
  }
  /**
   * Creating a new Account
   * @param search 
   * @param password 
   * @param confirmPassword 
   * @param firstName 
   * @param lastName 
   * @param phoneNumber 
   * @param country 
   * @param city 
   * @param address 
   * @param state 
   * @param postalCode 
   * @param allowOffersPromotion 
   * @returns 
   */


  async searchIntegrationTitle() {
    // await this.searchboxHome.fill('Hire Employee');
    // await this.searchboxHome.fill('int030 cd peci outbound');
    await this.searchboxHome.fill('INT030 Czech (Payroll Sdworx) Outbound CD New');
    await this.searchboxHome.press('Enter');
    // await this.hireEmployeetask.click();
    await this.page.waitForTimeout(2000)
  }

  async clickMoreCategories() {
    await this.moreCategories.click();
    await this.page.waitForTimeout(2000)
  }

  async launchINT030UKSAPOutboundCDPECI() {
    await this.INT030UKSAPOutboundCDPECIOptions.click();
    await this.page.waitForTimeout(2000)
    await this.Integration.hover();
    await this.launch.click();
    await this.btnOK.click();
    await this.page.waitForTimeout(2000)
  }

  async launchCZIntegration() {
    await this.allCategories.click();
    await this.page.waitForTimeout(3000)
    await this.lnkIntegration.click();
    await this.lnkCZIntegrationTitle.click();
    await this.lnkRelatedOptions.click();
    await this.page.waitForTimeout(2000)
    await this.Integration.hover();
    await this.launch.click();
    await this.btnOK.click();
    await this.page.waitForTimeout(2000)
  }

  async setIntegrationCriteria() {
    await this.page.waitForTimeout(2000)
    await this.txtPayGroup.focus();
    //await this.txtPayGroup.click();
    //await this.txtPayGroup.fill("CZ Monthly");
    await this.page.keyboard.type("CZ Monthly");
    await this.txtPayGroup.press("Enter");
    // await this.page.keyboard.press('Enter');

    await this.txtPayGroupMembers.fill("10656093");
    await this.txtPayGroupMembers.press("Enter");

    await this.txtLastSuccesssfulRunDate.fill("23/09/2024");
    await this.txtLastSuccesssfulRunTime.fill("00:00:00");

    await this.btnOK.click();
    await this.page.waitForTimeout(2000)
  }

  async downloadXML() {

    do {
      await this.lnkProcessTitle.click();
    }while(!(await this.lblOverallStatus.innerText()).includes("Completed"));
    console.log("XML generated succesfully!")

    const downloadPromise = this.page.waitForEvent("download");
    await this.page.waitForTimeout(2000)
    this.lnkXMLFile.click();
    const download = await downloadPromise;
    await this.page.waitForTimeout(2000)
    await download.saveAs('H:\WorkDaySuite_Playwright\Data'+ download.suggestedFilename());
    console.log("XML downloaded succesfully!")

  }

  //   async CreatePoistion() {

  //     await this.searchboxHome.fill('Create Position');
  //     await this.searchboxHome.press('Enter');
  //     await this.createpoistion.click();
  //     await this.page.waitForTimeout(2000)
  //   }

  //   async searchHireEmployeeMgr() {

  //     // await this.searchboxHome.fill('Hire Employee');
  //     // await this.searchboxHome.press('Enter');
  //     await this.hireEmployeetask.click();
  //     await this.page.waitForTimeout(2000)
  //   }
}