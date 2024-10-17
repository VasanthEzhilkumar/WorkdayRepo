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
    await this.searchboxHome.clear();
    await this.searchboxHome.fill('Hire Employee');
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
  
  async searchEmp(strEmp: any): Promise<void> {
    await this.page.waitForTimeout(5000)
    // Wait until the searchboxHome is visible
    await this.searchboxHome.waitFor({ state: 'visible' });
    // Fill the search box
    await this.searchboxHome.fill(strEmp.toString());
    // Press Enter
    await this.searchboxHome.press('Enter');
    // await this.searchboxHome.fill(strEmp.toString());
    // await this.searchboxHome.press('Enter');
    await this.page.waitForTimeout(3000)
}

  async getEmpName(strEmp: any): Promise < string > {
  // Assume the employee ID is known
  let employeeID = strEmp;

  // Locate the link element by matching the ID within the name attribute
  const element = await this.page.getByRole('link', { name: new RegExp(`\\(${employeeID}\\)`) });

  // Extract the text content from the element
  const name = await element.textContent();

  // Assuming the text is in the format 'First Given (ID)'
  if(name) {
    // Split the name by spaces and parentheses
    const splitName = name.split(' ');

    // Extract first name (first part) and given name (second part)
    const firstName = splitName[0];
    const givenName = splitName[1];
    // Extract the ID (last part inside parentheses)
    const id = splitName[splitName.length - 1].replace(/[()]/g, '');
    console.log(`${firstName} ${givenName}`);
    await element.click()
    return `${firstName} ${givenName}`;

  }



}
}
