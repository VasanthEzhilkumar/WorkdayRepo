import { Page, BrowserContext, Locator, expect } from "@playwright/test";
import { stat } from "fs";

export class hireEmpUSPage {

    readonly page:Page
    readonly fName: Locator;
    readonly lName: Locator;
    readonly addressStreet: Locator;
    readonly addressPostalCode: Locator;
    readonly addressCity: Locator;
    readonly addressState: Locator;
    readonly addressType: Locator;
    readonly addAddress: Locator;


    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.fName = page.getByLabel('First Name');
        this.lName = page.getByLabel('Last Name');
        this.addAddress = page.locator('[aria-label="Add Address"]');

        this.addressStreet = page.getByLabel('Address Line 1')//page.locator('label:has-text("Street Name")');// page.locator('[id="\\35 6\\$34052--uid45-input"]');//page.locator('label:has-text("Street Name")');//page.locator('[id="\\35 6\\$34052--uid45-input"]');//text=StreetStreet
        this.addressPostalCode = page.getByLabel('Postal Code');//page.locator('label:has-text("Postal Code")');//page.locator('[id="\\35 6\\$34052--uid52-input"]');
        this.addressCity = page.getByLabel('City');//page.locator('label:has-text("City/Town or Post Office")');//page.locator('[id="\\35 6\\$34052--uid53-input"]');//page.locator('label:has-text("City/Town or Post Office")');//page.locator('[id="\\35 6\\$34052--uid53-input"]');
        this.addressState = page.getByLabel('State', { exact: true })
    
        this.addressType = page.getByLabel('Address', { exact: true }).getByLabel('Type');
        
    }


    async legalInfo(fname: string, lname: string) {
        
      await  this.fName.type(fname);
       await this.lName.type(lname);
    }


    async contactInfoUS(address: string, PostalCode: number, city: string,state: string , addressType: string) {
        await this.page.waitForTimeout(500);
        await this.addAddress.click();
        await this.addressStreet.fill(address);
        await this.addressState.fill(state);
        await this.addressPostalCode.fill(PostalCode.toString());
        await this.addressCity.fill(city);
        await this.addressType.click()
        await this.page.getByLabel('' + addressType + ' checkbox Not Checked').getByRole('checkbox').check();
    
      }


}

