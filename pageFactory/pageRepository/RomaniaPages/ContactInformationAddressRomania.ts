import { WebActionsPage } from '@lib/WebActionPage';
import { BrowserContext, Locator, Page } from '@playwright/test';

export class contactInformationAddressRomania extends WebActionsPage {

    readonly page: Page;
    readonly street: Locator;
    readonly city: Locator;
    readonly addAddress: Locator;
    readonly addressType: Locator;
    readonly postalCode: Locator;
    readonly county: Locator;
    readonly streetNumber: Locator;
    readonly buildingNumber: Locator;
    readonly txtProvince: Locator;
    readonly txtStreetNameandType: Locator;
    readonly txtDepartment: Locator;
    readonly txtStreetOrPlaceType: Locator;
    readonly txtStreetOrPlaceName: Locator;
    readonly addressType1: Locator;
    constructor(page: Page, context: BrowserContext) {
        super(page);
        this.page = page;
        this.street = page.getByLabel('Street', { exact: true })
        this.addAddress = page.locator('[aria-label="Add Address"]');
        this.city = page.getByLabel('City');
        this.addressType = page.getByLabel('Address', { exact: true }).getByLabel('Type');
        this.addressType1 = page.getByLabel('Address', { exact: true }).getByLabel('Type', { exact: true })
        //locator('text=UsageTypeType0 items selectedPrimary WorkPrimary WorkPrimary HomePrimary HomeUse >> [placeholder="Search"]');//page.locator('text=TypeType0 items selected >> [placeholder="Search"]');//
        this.county = page.locator("//h2[contains(./text(),'Address')]/ancestor::div[@data-automation-id='panelSet']/descendant::label[contains(./text(),'County')]/parent::div/following-sibling::div/descendant::input[@placeholder='Search']");
        this.streetNumber = page.locator("(//label[contains(./text(),'Street Number')]/ancestor::li)[2]/descendant::div[@data-automation-id='textInput']//input");
        this.buildingNumber = page.locator("(//label[contains(./text(),'Building Number')]/ancestor::li)[2]/descendant::div[@data-automation-id='textInput']//input")
        this.postalCode = page.locator("(//label[contains(./text(),'Postal Code')]/ancestor::li)[2]/descendant::div[@data-automation-id='textInput']//input")
        this.txtProvince = page.locator("//label[contains(./text(),'Province')]/parent::div/following-sibling::div/descendant::div[@data-automation-id='multiselectInputContainer']//input");

        this.txtStreetNameandType = page.locator("(//label[contains(./text(),'Street Name')]/ancestor::li)[2]/descendant::div[@data-automation-id='textInput']//input");
        this.txtDepartment = page.locator("(//label[contains(./text(),'Department')]/ancestor::li)[2]//input");
        this.txtStreetOrPlaceType = page.locator("(//label[contains(./text(),'Street or Place Type')]/ancestor::li)[2]/descendant::div[@data-automation-id='textInput']//input");
        this.txtStreetOrPlaceName = page.getByLabel('Street or Place Name');
    }

    async contactInformationAddress(StreetNumber: string, PostalCode: number, city: string, County: string, addressType: string, BuildingNumber: string) {

        await this.page.waitForTimeout(500);
        await this.addAddress.click();
        await this.street.fill(StreetNumber);
        await this.city.fill(PostalCode.toString());
        await this.city.fill(city);
        await this.postalCode.fill(PostalCode.toString());
        await this.buildingNumber.fill(BuildingNumber.toString());
        await this.county.fill(County);
        await this.county.press('Enter');
        await this.addressType.click()
        await this.page.getByLabel('' + addressType + ' checkbox Not Checked').getByRole('checkbox').check();

    }


    async contactInformationAddressItaly(Street: string, StreetOrPlaceName: string, StreetNumber: string, PostalCode: number, city: string, County: string, addressType: string, Province: string) {
        await this.page.waitForTimeout(500);
        await this.addAddress.click();
        await super.setText(this.txtStreetOrPlaceType, Street);
        await super.setText(this.txtStreetOrPlaceName, StreetOrPlaceName);
        await super.setText(this.streetNumber, StreetNumber);
        await this.city.fill(city);
        await this.postalCode.fill(PostalCode.toString());
        await super.selectFromCustomDropDrown(this.txtProvince, Province.toString());
        await this.addressType1.click()
        await this.page.getByLabel('' + addressType + ' checkbox Not Checked').getByRole('checkbox').check();
    }



}