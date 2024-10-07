import { Page, BrowserContext, Locator, expect } from '@playwright/test';

export class homepage {
  readonly page: Page;
  readonly searchboxHome: Locator;
  readonly hireEmployeetask: Locator;
  readonly createpoistion: Locator;
  readonly searchIcon: Locator;


  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.searchboxHome = page.locator('[aria-label="Search Workday "]');
    this.hireEmployeetask = page.locator('text=Hire Employee >> nth=1');
    this.searchIcon = page.locator('#wd-searchInput div svg[role="presentation"]');
    this.createpoistion = page.getByRole('link', { name: 'Create Position' });
  }
 


  async searchHireEmployee() {

    await this.searchboxHome.fill('Hire Employee');
    // await this.searchboxHome.fill('int030 cd peci outbound ');
    await this.searchboxHome.press('Enter');
    await this.hireEmployeetask.click();
    await this.page.waitForTimeout(2000)
  }

  async CreatePoistion() {

    await this.searchboxHome.fill('Create Position');
    await this.searchboxHome.press('Enter');
    await this.createpoistion.click();
    await this.page.waitForTimeout(2000)
  }

  async searchHireEmployeeMgr() {

    // await this.searchboxHome.fill('Hire Employee');
    // await this.searchboxHome.press('Enter');
    await this.hireEmployeetask.click();
    await this.page.waitForTimeout(2000)
  }
  async searchEmp(strEmp: string): Promise<void> {

    await this.searchboxHome.fill(strEmp);
    await this.searchboxHome.press('Enter');

  }
}
