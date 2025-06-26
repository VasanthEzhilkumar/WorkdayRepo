import { BrowserContext, Locator, Page } from '@playwright/test';

export class contactInformationAddressPoland {
    
    

    readonly page: Page;
    readonly street: Locator;
    readonly city: Locator;
    readonly addAddress: Locator;
    readonly addressType: Locator;
    readonly postalCode: Locator;
    readonly county: Locator;
    readonly streetName: Locator;
    readonly buildingNumber: Locator;
    readonly houseNumber: Locator;
    readonly Municipality: Locator;
    readonly District: Locator;
    readonly Province: Locator;
    readonly addressUseFor: Locator;

    constructor(page: Page, context: BrowserContext) {
        //super(page:Page, context: BrowserContext);
        this.page = page;
        this.street = page.getByLabel('Street', { exact: true })
        this.addAddress = page.locator('[aria-label="Add Address"]');
        this.streetName = page.getByLabel('Street Name');
        this.houseNumber = page.getByLabel('House Number').first();
        this.Municipality = page.getByLabel('Municipality');
        this.District = page.getByLabel('District');
        this.Province = page.locator("(//label[contains(./text(),'Province')]/parent::div/following-sibling::div/descendant::div//*[@placeholder='Search'])[1]")
        this.city = page.getByLabel('City');
        this.postalCode = page.getByLabel('Postal Code');
        this.addressType = page.getByLabel('Address', { exact: true }).getByLabel('Type');
        this.addressUseFor = page.locator('//h2[text()="Address"]/parent::div/parent::div//label[text()="Use For"]/parent::div/following-sibling::div//input');

    }
 async contactInformationAddress(StreetName: string, houseNumber: string, Municipality: string, District: string, Province: string, PostalCode: number, city: string, addressType: string, useFor: string) {
        //await super.click(this.addAddress);
        await this.page.waitForTimeout(500);
        await this.addAddress.click();
        await this.streetName.fill(StreetName);
        await this.houseNumber.fill(houseNumber.toString());
        await this.city.fill(PostalCode.toString());
        await this.city.fill(city);
        await this.postalCode.fill(PostalCode.toString());
        if (Municipality !== "N/A" && Municipality !== "NaN" && Municipality !== undefined && Municipality !== "") {
            await this.Municipality.fill(Municipality.toString());
        }
        if (District !== "N/A" && District !== "NaN" && District !== undefined && District !== "") {
            await this.District.fill(District.toString());
        }

        await this.Province.fill(Province.toString());
        await this.addressType.click();
        //commented
        // await this.page.getByLabel('' + addressType + ' checkbox Not Checked').getByRole('checkbox').check();
        // await this.page.keyboard.press('Tab');
        // await this.addressUseFor.click();
        // await this.page.locator('//div[@data-automation-label="'+useFor+'"]').click();


        await this.page.getByLabel('' + addressType + ' checkbox Not Checked').getByRole('checkbox').check();
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('Tab');
        await this.page.waitForTimeout(1000);
        await this.page.locator('//h2[text()="Address"]/parent::div/parent::div//label[text()="Use For"]/parent::div/following-sibling::div//span[@data-automation-id="promptSearchButton"]').click();
        await this.addressUseFor.click();
        await this.page.waitForTimeout(2000);
        const selectedOpt = await this.page.locator('//div[@data-automation-id="promptOption"]/parent::div[@data-automation-id="promptLeafNode" and @data-automation-checked="Checked"]').count();
        for (let i = 1; i <= selectedOpt; i++) {
            await this.page.waitForTimeout(1000);
            await this.page.locator('(//div[@data-automation-id="promptOption"]/parent::div[@data-automation-id="promptLeafNode" and @data-automation-checked="Checked"])[' + i + ']').click();
            await this.page.waitForTimeout(1000);
        }
        await this.page.locator('//div[@data-automation-label="' + useFor + '"]').click();

    }
    
    async contactInformationAddressPK14(StreetName: string, houseNumber: string, Municipality: string, District: string, Province: string, PostalCode: number, city: string, addressType: string, useFor: string) {
        //await super.click(this.addAddress);
        await this.page.waitForTimeout(500);
        await this.addAddress.click();
        await this.streetName.fill(StreetName);
        await this.houseNumber.fill(houseNumber.toString());
        await this.city.fill(PostalCode.toString());
        await this.city.fill(city);
        await this.postalCode.fill(PostalCode.toString());
        await this.Municipality.fill(Municipality.toString());
        await this.District.fill(District.toString());
        await this.Province.fill(Province.toString());
        await this.addressType.click();
        await this.page.getByLabel('' + addressType + ' checkbox Not Checked').getByRole('checkbox').check();
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('Tab');
        await this.page.waitForTimeout(1000);
        await this.page.locator('//h2[text()="Address"]/parent::div/parent::div//label[text()="Use For"]/parent::div/following-sibling::div//span[@data-automation-id="promptSearchButton"]').click();
        await this.addressUseFor.click();
        await this.page.waitForTimeout(2000);
        const selectedOpt = await this.page.locator('//div[@data-automation-id="promptOption"]/parent::div[@data-automation-id="promptLeafNode" and @data-automation-checked="Checked"]').count();
        for (let i = 1; i <= selectedOpt; i++) {
            await this.page.waitForTimeout(1000);
            await this.page.locator('(//div[@data-automation-id="promptOption"]/parent::div[@data-automation-id="promptLeafNode" and @data-automation-checked="Checked"])[' + i + ']').click();
            await this.page.waitForTimeout(1000);
        }
        await this.page.locator('//div[@data-automation-label="' + useFor + '"]').click();

    }




}