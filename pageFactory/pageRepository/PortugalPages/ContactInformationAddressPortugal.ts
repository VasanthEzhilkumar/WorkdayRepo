import { WebActions } from '@lib/WebActions';
import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { count } from 'console';

export class contactInformationAddressPortugal {

    readonly page: Page;
    readonly street: Locator;
    readonly city: Locator;
    readonly addAddress: Locator;
    readonly addressType: Locator;
    readonly postalCode: Locator;
    readonly country: Locator;
    readonly county: Locator;
    readonly streetName: Locator;
    readonly houseNumber: Locator;
    readonly referenceNumber: Locator;
    readonly locality: Locator;
    readonly region: Locator;
    readonly useFor: Locator;
    readonly addressLine1: Locator;
    readonly addressLine2: Locator;
    readonly addressLine3: Locator;
    readonly district: Locator;

    constructor(page: Page, context: BrowserContext) {
        //super(page:Page, context: BrowserContext);
        this.page = page;
        this.street = page.getByLabel('Street', { exact: true })
        this.addAddress = page.locator('[aria-label="Add Address"]');
        this.city = page.getByLabel('City');
        this.addressType = page.getByLabel('Address', { exact: true }).getByLabel('Type');//locator('text=UsageTypeType0 items selectedPrimary WorkPrimary WorkPrimary HomePrimary HomeUse >> [placeholder="Search"]');//page.locator('text=TypeType0 items selected >> [placeholder="Search"]');//
        this.county = page.locator("//h2[contains(./text(),'Address')]/ancestor::div[@data-automation-id='panelSet']/descendant::label[contains(./text(),'County')]/parent::div/following-sibling::div/descendant::input[@placeholder='Search']");
        this.country = page.locator("getByRole('textbox', { name: 'Country', exact: true })");
        this.streetName = page.locator("(//label[contains(./text(),'Street or Place Name')]/ancestor::li)[2]/descendant::div[@data-automation-id='textInput']//input");
        this.houseNumber = page.locator("(//label[contains(./text(),'House Number')]/ancestor::li)[2]/descendant::div[@data-automation-id='textInput']//input");
        this.postalCode = page.locator("(//label[contains(./text(),'Postal Code')]/ancestor::li)[2]/descendant::div[@data-automation-id='textInput']//input");
        this.referenceNumber = page.locator("(//label[contains(./text(),'Reference Number')]/ancestor::li)[2]/descendant::div[@data-automation-id='textInput']//input");
        this.locality = page.locator("(//label[contains(./text(),'Locality')]/ancestor::li)[2]/descendant::div[@data-automation-id='textInput']//input");
        this.region = page.locator("(//label[contains(./text(),'Region')]/ancestor::div/following-sibling::div//input)[1]");
        this.useFor = page.locator("(//label[contains(./text(),'Use For')]/ancestor::div/following-sibling::div//input)[1]");
        this.addressLine1 = page.locator('//label[text()="Address Line 1"]/parent::div/following-sibling::div//input');
        this.addressLine2 = page.locator('//label[text()="Address Line 2"]/parent::div/following-sibling::div//input');
        this.addressLine3 = page.locator('//label[text()="Address Line 3"]/parent::div/following-sibling::div//input');
        this.district = page.locator('//label[text()="District"]/parent::div/following-sibling::div//input');
        
    } 

    async contactInformationAddress(EffectiveDate: string, Country: string, AddressLine1: string, PostalCode: string, District: string, Type:string, UseFor:string) {
       
        await this.page.waitForTimeout(500);
        await this.addAddress.click();

        await this.addressLine1.fill(AddressLine1);
        await this.postalCode.fill(String(PostalCode));
        await this.page.keyboard.press('Tab');
        await this.district.fill(District);
        await this.page.keyboard.press('Tab');
        await this.addressType.click()
        await this.page.getByLabel('' + Type + ' checkbox Not Checked').getByRole('checkbox').check();
        await this.useFor.fill(UseFor);
        await this.page.keyboard.press('Enter');
    }

}