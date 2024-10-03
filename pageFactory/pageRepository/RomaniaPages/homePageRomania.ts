import { Page, BrowserContext, Locator, expect } from '@playwright/test';

export class homePageRomania {

    readonly page: Page;
    readonly street: Locator;
    readonly city: Locator;
    readonly addAddress: Locator;
    readonly addressType: Locator;


    constructor(page: Page, context: BrowserContext) {


        this.page = page;
        this.street = page.getByLabel('Street', { exact: true })
        this.addAddress = page.locator('[aria-label="Add Address"]');
        this.city = page.getByLabel('City');
        this.addressType = page.getByLabel('Address', { exact: true }).getByLabel('Type');//locator('text=UsageTypeType0 items selectedPrimary WorkPrimary WorkPrimary HomePrimary HomeUse >> [placeholder="Search"]');//page.locator('text=TypeType0 items selected >> [placeholder="Search"]');//

    }

    async contactInformationAddress(StreetNumber: string, PostalCode: number, city: string, County: string, addressType: string) {
        await this.page.waitForTimeout(500);
        await this.addAddress.click();
        await this.street.fill(StreetNumber);
        //await this.city.fill(PostalCode.toString());
        await this.city.fill(city);
        if (!city.includes('Bratislava')) {
            //  await this.addressCounty.fill(County);
        }
        await this.addressType.click()

        await this.page.getByLabel('' + addressType + ' checkbox Not Checked').getByRole('checkbox').check();

    }



}