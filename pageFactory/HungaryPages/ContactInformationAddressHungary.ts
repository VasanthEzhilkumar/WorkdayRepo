import { WebActions } from '@lib/WebActions';
import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { count } from 'console';

export class contactInformationAddressHungary {

    readonly page: Page;
    readonly city: Locator;
    readonly addAddress: Locator;
    readonly addressType: Locator;
    readonly postalCode: Locator;
    readonly county: Locator;
    readonly streetNumber: Locator;
    readonly buildingNumber: Locator;
    readonly streetOrPlaceName:Locator;
    readonly streetOrPlaceType:Locator;
    readonly addressUseFor:Locator;
    readonly useFor:Locator;




    constructor(page: Page, context: BrowserContext) {
        //super(page:Page, context: BrowserContext);
        this.page = page;
        this.addAddress = page.locator('[aria-label="Add Address"]');
        this.city = page.getByLabel('City', { exact: true });
        this.addressType = page.getByLabel('Address', { exact: true }).getByLabel('Type', { exact: true });
        this.county = page.locator("//h2[contains(./text(),'Address')]/ancestor::div[@data-automation-id='panelSet']/descendant::label[contains(./text(),'County')]/parent::div/following-sibling::div/descendant::input[@placeholder='Search']");
        this.streetNumber = page.getByLabel('Street Number');
        this.postalCode = page.getByLabel('Postal Code');
        this.streetOrPlaceName=page.getByLabel('Street or Place Name');
        this.streetOrPlaceType=page.getByLabel('Street or Place Type');
         this.addressUseFor = page.locator('//h2[text()="Address"]/parent::div/parent::div//label[text()="Use For"]/parent::div/following-sibling::div//span[@data-automation-id="promptIcon"]');
          this.useFor = page.locator("(//label[contains(./text(),'Use For')]/ancestor::div/following-sibling::div//input)[1]");

    
    } 

    async contactInformationAddress(StreetNumber: number, PostalCode: number, city: string, County: string, addressType: string,StreetOrPlaceName:string,StreetOrPlaceType:string,useFor:string) {
       
        await this.page.waitForTimeout(500);
        await this.addAddress.click();
        await this.county.fill(County);
        await this.county.press('Enter');
        await this.city.fill(city);
        await this.streetOrPlaceName.fill(StreetOrPlaceName);
        await this.streetOrPlaceType.fill(StreetOrPlaceType);
        await this.page.waitForTimeout(500);
        await this.streetNumber.fill(StreetNumber.toString());
        await this.postalCode.fill(PostalCode.toString());
        await this.page.keyboard.press('Tab');
        await this.addressType.click()
        await this.page.waitForTimeout(500);
        await this.page.getByLabel('' + addressType + ' checkbox Not Checked').getByRole('checkbox').check();
        await this.useFor.fill(useFor);
        await this.page.keyboard.press('Enter');

    }



}