import { BrowserContext, Locator, Page } from '@playwright/test';

export class contactInformationAddressBelgium {

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

    constructor(page: Page, context: BrowserContext) {
        //super(page:Page, context: BrowserContext);
        this.page = page;
        this.street = page.getByLabel('Street', { exact: true })
        this.addAddress = page.locator('[aria-label="Add Address"]');
        this.streetName = page.getByLabel('Street Name');
        this.houseNumber = page.getByLabel('House Number');
        this.Municipality = page.getByLabel('Municipality');
        this.District = page.getByLabel('District');
        //this.Province = page.getByLabel('Voivodeship / Province');
        this.Province = page.locator("(//label[contains(./text(),'Province') or contains(./text(),'Voivodeship / Province')]/parent::div/following-sibling::div/descendant::div//*[@placeholder='Search'])[1]");
        this.city = page.getByLabel('City');
        this.postalCode = page.getByLabel('Postal Code');
        this.addressType = page.getByLabel('Address', { exact: true }).getByLabel('Type');
    }

    async contactInformationAddress(StreetName: string, houseNumber: string, Province: string, PostalCode: number, city: string, addressType: string): Promise<void> {
        //await super.click(this.addAddress);
        await this.page.waitForTimeout(500);
        await this.addAddress.click();
        await this.streetName.fill(StreetName);
        await this.houseNumber.fill(houseNumber.toString());
        await this.city.fill(city.toString());
        await this.postalCode.fill(PostalCode.toString());
        await this.Province.fill(Province.toString());
        await this.page.keyboard.press("Tab");
        await this.addressType.click();
        await this.page.getByLabel('' + addressType + ' checkbox Not Checked').getByRole('checkbox').check();
    }

}