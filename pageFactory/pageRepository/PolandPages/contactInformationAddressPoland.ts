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
        this.houseNumber = page.getByLabel('House Number');
        this.Municipality = page.getByLabel('Municipality');
        this.District = page.getByLabel('District');
        this.Province = page.getByLabel('Voivodeship / Province');
        this.city = page.getByLabel('City');
        this.postalCode = page.getByLabel('Postal Code');
        this.addressType = page.getByLabel('Address', { exact: true }).getByLabel('Type');
        this.addressUseFor = page.locator('//h2[text()="Address"]/parent::div/parent::div//label[text()="Use For"]/parent::div/following-sibling::div//span[@data-automation-id="promptIcon"]');

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
        await this.Municipality.fill(Municipality.toString());
        await this.District.fill(District.toString());
        await this.Province.fill(Province.toString());
        await this.addressType.click();
        await this.page.getByLabel('' + addressType + ' checkbox Not Checked').getByRole('checkbox').check();
        await this.page.keyboard.press('Tab');
        await this.addressUseFor.click();
        await this.page.locator('//div[@data-automation-label="'+useFor+'"]').click();

    }




}