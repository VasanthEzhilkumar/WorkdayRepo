import { BrowserContext, Locator, Page } from '@playwright/test';
import { WebActionsPage } from 'lib/WebActionPage';

/*
@Author      : @ Madhukar Kirkan
*/
export class MaintainContractPage extends WebActionsPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly hrSubmit: Locator;
    readonly Approve: Locator;
    readonly contractType: Locator;
    readonly DEmployerSigned: Locator;
    readonly contractReason: Locator;
    readonly contractStatus: Locator;
    readonly contract: Locator;
    readonly DEmployeSigned: Locator;
    readonly contractEndate: Locator;
    readonly contractAddendum: Locator;
    readonly contractAddendumtext: Locator;
    readonly submit: Locator;
    readonly contractDateEmployeeSigned: Locator;
    readonly contractDateEmployerSigned: Locator;
    readonly contractWarningAlert: Locator;
    readonly contractHun: Locator;



    EmployeeNumber: string[];

    constructor(page: Page, givenname: string, FamilyName: string, context: BrowserContext) {
        super(page)
        this.page = page;
        this.context = context;
        this.hrSubmit = page.locator('button:has-text("Submit")');
        this.submit = page.getByRole('button', { name: 'Submit' });
        this.Approve = page.locator('button:has-text("Approve")');
        this.contract = page.getByRole('button', { name: 'Contract: ' + givenname + ' ' + FamilyName + '', exact: true });
        this.contractHun = page.getByRole('button', { name: 'Contract: ' + FamilyName + ' ' + givenname + '', exact: true });
        //this.contract = page.locator('[aria-label="Inbox Items"] >> text=Contract:' + ' ' + givenname + ' ' + FamilyName + '');
        this.contractReason = page.getByLabel('Reason').first();//locator('text=ReasonReason0 items selected >> [placeholder="Search"]');
        this.contractStatus = page.getByLabel('Status').first();//page.locator('text=StatusStatus0 items selected >> [placeholder="Search"]');
        this.contractType = page.getByLabel('Contract Type', { exact: true }).first();//page.locator('text=Contract TypeContract Type0 items selected >> [placeholder="Search"]');
        //this.DEmployerSigned = page.locator("//label[contains(.,'Date Employer Signed')]/parent::div/following-sibling::div/descendant::input[@data-automation-id='dateSectionMonth-input']");
        this.DEmployerSigned = page.getByLabel('Date Employer Signed').getByPlaceholder('DD').first();
        this.DEmployeSigned = page.locator("//label[contains(.,'Date Employee Signed')]/parent::div/following-sibling::div/descendant::input[@data-automation-id='dateSectionDay-input']");
        this.contractEndate = page.locator("//label[contains(.,'Contract End Date')]/parent::div/following-sibling::div/descendant::input[@data-automation-id='dateSectionDay-input']");
        this.contractAddendum = page.locator('[aria-label="Inbox Items"] >> text=Contract:' + ' ' + givenname + ' ' + FamilyName + '');
        this.contractAddendumtext = page.locator('h3:has-text("Romania Contract Addendum Info")');
        this.contractWarningAlert = this.page.locator('//div[@role="button"]//div[@data-automation-id="errorWidgetBarMessageCountCanvas"]').first();
    }

    /*
    @Description : This method is used to set Contract Details on contract page.
    @Author      : @Madhukar Kirkan
    @Param       :  required data such as contract type, contract reason, contractenddate..etc.
    */

    async setContractDetails(contractType: string, contractStatus: string,
        DEmpsigned: string, DEmplyersigned: string, contractEnddate: string, reason: string) {
        await this.page.waitForTimeout(2000);
        if (await this.contract.count() > 0) {

            await super.click(this.contract);
            //await super.click(this.page.locator('[aria-label="Main checkbox Not Checked"] >> text=Main')); 
            if (await reason !== 'N/A' && await reason !== 'NaN' && await reason !== undefined) {
                await super.click(this.contractReason);
                await super.setTextWithEnter(this.contractReason, reason.toString().trim());
            }
            if (await contractType !== 'N/A' && await contractType !== 'NaN' && await contractType !== undefined) {
                await super.selectFromCustomDropDrown(this.contractType, contractType);
            }
            await this.contractType.press('Tab');
            if (await contractStatus !== 'N/A' && await contractStatus !== 'NaN' && await contractStatus !== undefined) {
                await super.setTextWithEnter(this.contractStatus, contractStatus);
            }

            if (await DEmpsigned !== 'N/A' && await DEmpsigned !== 'NaN' && await DEmpsigned !== undefined) {
                await super.click(this.DEmployeSigned);
                await super.setTextWithType(this.DEmployeSigned, DEmpsigned);
            }

            if (await DEmplyersigned !== 'N/A' && await DEmplyersigned !== 'NaN' && await DEmplyersigned !== undefined) {
                await super.click(this.DEmployerSigned);
                await super.setTextWithType(this.DEmployerSigned, DEmplyersigned);
            }

            if (await contractEnddate !== 'N/A' && await contractEnddate !== 'NaN' && await contractEnddate !== undefined) {
                await super.click(this.contractEndate);
                await super.setTextWithType(this.contractEndate, contractEnddate);
            }
            await super.click(this.hrSubmit);
            await this.page.waitForTimeout(2000);
            if (await this.contractWarningAlert.isVisible() && (await this.contractWarningAlert.textContent()).includes('Alert')) {
                await super.click(this.hrSubmit);
            }
            await this.page.waitForTimeout(2000);
            if (await this.contractWarningAlert.isVisible() && (await this.contractWarningAlert.textContent()).includes('Alert')) {
                await super.click(this.hrSubmit);
            }
        } else {
            console.log("Contract Page is missing for This job profiles.");
        }

    }

    //@ added for Hungary "By Gayatri"
    async setContractDetailsHungary(contractType: string, contractStatus: string,
        DEmpsigned: string, DEmplyersigned: string, contractEnddate: string, reason: string) {
        await super.click(this.contractHun);

        //await super.click(this.page.locator('[aria-label="Main checkbox Not Checked"] >> text=Main')); 
        if (await reason !== 'N/A' && await reason !== 'NaN' && await reason !== undefined) {
            await super.click(this.contractReason);
            await super.setTextWithEnter(this.contractReason, reason.toString().trim());
        }
        if (await contractType !== 'N/A' && await contractType !== 'NaN' && await contractType !== undefined) {
            await super.selectFromCustomDropDrown(this.contractType, contractType);
        }

        if (await contractStatus !== 'N/A' && await contractStatus !== 'NaN' && await contractStatus !== undefined) {
            await super.setTextWithEnter(this.contractStatus, contractStatus);
        }

        if (await DEmpsigned !== 'N/A' && await DEmpsigned !== 'NaN' && await DEmpsigned !== undefined) {
            await super.click(this.DEmployeSigned);
            await super.setTextWithType(this.DEmployeSigned, DEmpsigned);
        }

        if (await DEmplyersigned !== 'N/A' && await DEmplyersigned !== 'NaN' && await DEmplyersigned !== undefined) {
            await super.click(this.DEmployerSigned);
            await super.setTextWithType(this.DEmployerSigned, DEmplyersigned);
        }

        if (await contractEnddate !== 'N/A' && await contractEnddate !== 'NaN' && await contractEnddate !== undefined) {
            await super.click(this.contractEndate);
            await super.setTextWithType(this.contractEndate, contractEnddate);
        }
        await super.click(this.hrSubmit);
        await this.page.waitForTimeout(2000);
        if (await this.contractWarningAlert.isVisible() && (await this.contractWarningAlert.textContent()).includes('Alert')) {
            await super.click(this.hrSubmit);
        }
        await this.page.waitForTimeout(2000);
        if (await this.contractWarningAlert.isVisible() && (await this.contractWarningAlert.textContent()).includes('Alert')) {
            await super.click(this.hrSubmit);
        }

    }

    async setContractDetailsPT(contractType: string, contractStatus: string,
        DEmpsigned: string, DEmplyersigned: string, contractEnddate: string, reason: string) {
        if (await this.contract.count() > 0) {

            await super.click(this.contract);
            //await super.click(this.page.locator('[aria-label="Main checkbox Not Checked"] >> text=Main')); 
            if (await reason !== 'N/A' && await reason !== 'NaN' && await reason !== undefined) {
                await super.click(this.contractReason);
                await super.selectFromCustomDropDrown(this.contractReason, reason.toString().trim());
            }
            if (await contractType !== 'N/A' && await contractType !== 'NaN' && await contractType !== undefined) {
                await super.selectFromCustomDropDrown(this.contractType, contractType);
            }
            await this.contractType.press('Tab');
            if (await contractStatus !== 'N/A' && await contractStatus !== 'NaN' && await contractStatus !== undefined) {
                await super.setTextWithEnter(this.contractStatus, contractStatus);
            }

            if (await DEmpsigned !== 'N/A' && await DEmpsigned !== 'NaN' && await DEmpsigned !== undefined) {
                await super.click(this.DEmployeSigned);
                await super.setTextWithType(this.DEmployeSigned, DEmpsigned);
            }

            if (await DEmplyersigned !== 'N/A' && await DEmplyersigned !== 'NaN' && await DEmplyersigned !== undefined) {
                await super.click(this.DEmployerSigned);
                await super.setTextWithType(this.DEmployerSigned, DEmplyersigned);
            }

            if (await contractEnddate !== 'N/A' && await contractEnddate !== 'NaN' && await contractEnddate !== undefined) {
                await super.click(this.contractEndate);
                await super.setTextWithType(this.contractEndate, contractEnddate);
            }
            await super.click(this.hrSubmit);
            await this.page.waitForTimeout(2000);
            if (await this.contractWarningAlert.isVisible() && (await this.contractWarningAlert.textContent()).includes('Alert')) {
                await super.click(this.hrSubmit);
            }
            await this.page.waitForTimeout(2000);
            if (await this.contractWarningAlert.isVisible() && (await this.contractWarningAlert.textContent()).includes('Alert')) {
                await super.click(this.hrSubmit);
            }
        } else {
            console.log("Contract Page is missing for This job profiles.");
        }

    }

}
