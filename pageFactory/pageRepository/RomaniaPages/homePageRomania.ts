import { WebActions } from '@lib/WebActions';
import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { count } from 'console';

export class homePageRomania {

    readonly page: Page;
    readonly street: Locator;
    readonly city: Locator;
    readonly addAddress: Locator;
    readonly addressType: Locator;
    readonly postalCode: Locator;
    readonly county: Locator;
    readonly streetNumber: Locator;
    readonly buildingNumber: Locator;



    constructor(page: Page, context: BrowserContext) {
        //super(page:Page, context: BrowserContext);
        this.page = page;
        this.street = page.getByLabel('Street', { exact: true })
        this.addAddress = page.locator('[aria-label="Add Address"]');
        this.city = page.getByLabel('City');
        this.addressType = page.getByLabel('Address', { exact: true }).getByLabel('Type');//locator('text=UsageTypeType0 items selectedPrimary WorkPrimary WorkPrimary HomePrimary HomeUse >> [placeholder="Search"]');//page.locator('text=TypeType0 items selected >> [placeholder="Search"]');//
        this.county = page.locator("//h2[contains(./text(),'Address')]/ancestor::div[@data-automation-id='panelSet']/descendant::label[contains(./text(),'County')]/parent::div/following-sibling::div/descendant::input[@placeholder='Search']");
        this.streetNumber = page.locator("(//label[contains(./text(),'Street Number')]/ancestor::li)[2]/descendant::div[@data-automation-id='textInput']//input");
        this.buildingNumber = page.locator("(//label[contains(./text(),'Building Number')]/ancestor::li)[2]/descendant::div[@data-automation-id='textInput']//input")
        this.postalCode = page.locator("(//label[contains(./text(),'Postal Code')]/ancestor::li)[2]/descendant::div[@data-automation-id='textInput']//input")
    
    } 

    async contactInformationAddress(StreetNumber: string, PostalCode: number, city: string, County: string, addressType: string, BuildingNumber:string) {
       
        await this.page.waitForTimeout(500);
        await this.addAddress.click();
        await this.street.fill(StreetNumber);
        //await this.city.fill(PostalCode.toString());
        await this.city.fill(city);
        await this.postalCode.fill(PostalCode.toString());
        await this.buildingNumber.fill(BuildingNumber.toString());
        await this.county.fill(County);
        await this.county.press('Enter');
        await this.addressType.click()
        await this.page.getByLabel('' + addressType + ' checkbox Not Checked').getByRole('checkbox').check();

    }



}