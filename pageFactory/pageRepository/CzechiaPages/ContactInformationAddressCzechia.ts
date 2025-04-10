import { BrowserContext, Locator, Page } from '@playwright/test';

export class contactInformationAddressCzechia {

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
    readonly txtStreetNameAndType: Locator;
    readonly txtDepartment: Locator;
    readonly streetNumber: Locator;
    readonly txtAdditionalAddress: Locator;

    constructor(page: Page, context: BrowserContext) {
        //super(page:Page, context: BrowserContext);
        this.page = page;
        this.street = page.getByLabel('Street', { exact: true })
        this.addAddress = page.locator('[aria-label="Add Address"]');
        this.city = page.getByLabel('City');
        this.addressType = page.getByLabel('Address', { exact: true }).getByLabel('Type', { exact: true }).first();
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
        this.txtStreetNameAndType = page.getByLabel('Street Name and Type');
        this.txtDepartment = page.getByLabel('Department');
        this.streetNumber = page.getByLabel('Street Number');
        this.txtAdditionalAddress = page.locator("(//label[contains(./text(),'Additional Address')]/parent::div)[1]/following-sibling::div/descendant::div[@data-automation-id='textInput']//input")
    }

    async contactInformationAddress(StreetName: string, PostalCode: number, city: string, County: string, addressType: string, houseNumber: string, referenceNumber: string, locality: string, region: string, useFor: string) {

        await this.page.waitForTimeout(500);
        await this.addAddress.click();
        await this.streetName.fill(StreetName);
        await this.houseNumber.fill(houseNumber.toString());
        await this.referenceNumber.fill(referenceNumber.toString());
        await this.locality.fill(locality);
        //await this.city.fill(PostalCode.toString());26401
        // await this.postalCode.fill(PostalCode.toString());
        await this.postalCode.fill(String(PostalCode));
        await this.city.fill(city);
        await this.region.fill(region);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(500);

        // await this.county.fill(County);
        // await this.county.press('Enter');

        await this.addressType.click()
        await this.page.getByLabel('' + addressType + ' checkbox Not Checked').getByRole('checkbox').check();
        await this.useFor.fill(useFor);
        await this.page.keyboard.press('Enter');
    }


    async contactInformationAddressFrance(StreetNameAndType: string, Department: any, PostalCode: number, city: string, addressType1: string, useFor: string) {
        await this.page.waitForTimeout(500);
        await this.addAddress.click();
        await this.txtStreetNameAndType.fill(StreetNameAndType);
        await this.streetNumber.first().fill("05");
        await this.txtAdditionalAddress.first().fill("Test");
        await this.txtDepartment.fill(Department.toString());
        await this.postalCode.fill(String(PostalCode));
        await this.city.fill(city);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(500);
        await this.addressType.scrollIntoViewIfNeeded();
        await this.addressType.click()
        await this.page.getByLabel('' + addressType1 + ' checkbox Not Checked').getByRole('checkbox').check();
        await this.useFor.fill(useFor);
        await this.page.keyboard.press('Enter');
    }

    async contactInformationAddressSlovenia(County: string, AddressLine1: string, AddressLine2: string, PostalCode: string, City: string, Type: string, UseFor: string) {

        await this.page.waitForTimeout(500);
        await this.addAddress.click();
        await this.addressLine1.fill(AddressLine1);
        await this.addressLine2.fill(AddressLine2);
        await this.city.fill(City);
        // await this.county.fill(County);
        // await this.page.keyboard.press('Enter');
        await this.postalCode.fill(String(PostalCode));
        await this.addressType.click()
        await this.page.getByLabel('' + Type + ' checkbox Not Checked').getByRole('checkbox').check();
        await this.useFor.fill(UseFor);
        await this.page.keyboard.press('Enter');
    }

    async contactInformationAddressIreland(
        AddressLine1: string,
        AddressLine2: string,
        City: string,
        County: string,
        PostalCode: string,
        Type: string,
        UseFor: string
    ) {
        await this.page.waitForTimeout(500);
        await this.addAddress.click();
        await this.addressLine1.fill(AddressLine1);
        await this.addressLine2.fill(AddressLine2.toString());
        await this.city.fill(City);
        await this.county.fill(County);
        await this.page.keyboard.press('Enter');

        await this.postalCode.fill(String(PostalCode));
        await this.addressType.click();
        await this.page.getByLabel('' + Type + ' checkbox Not Checked').getByRole('checkbox').check();
        await this.useFor.fill(UseFor);
        await this.page.keyboard.press('Enter');
    }



    async contactInformationAddressUK(EffectiveDate: string, Country: string, County: string, AddressLine1: string, AddressLine2: string, AddressLine3: string, PostalCode: string, City: string, Type: string, UseFor: string) {

        await this.page.waitForTimeout(500);
        await this.addAddress.click();

        // await this.country.fill(Country);
        // await this.page.keyboard.press('Enter');

        await this.addressLine1.fill(AddressLine1);
        await this.addressLine2.fill(AddressLine2);
        await this.addressLine3.fill(AddressLine3);
        await this.city.fill(City);
        await this.county.fill(County);
        await this.page.keyboard.press('Enter');
        await this.postalCode.fill(String(PostalCode));
        await this.page.keyboard.press('Tab');
        await this.addressType.click()
        await this.page.getByLabel('' + Type + ' checkbox Not Checked').getByRole('checkbox').check();
        await this.useFor.fill(UseFor);
        await this.page.keyboard.press('Enter');
    }

}