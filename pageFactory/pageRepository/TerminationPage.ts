import { WebActionsPage } from '@lib/WebActionPage';
import { BrowserContext, Locator, Page } from '@playwright/test';

export class TerminationPage extends WebActionsPage {

    readonly page: Page;
    readonly btnSave: Locator;
    readonly btnEdit: Locator;
    readonly btnSubmit: Locator;

    readonly lblReason: Locator;
    readonly editReason: Locator;
    readonly txtPrimaryReason: Locator;
    readonly txtSecondaryReason: Locator;
    readonly txtLocalTerminationReason: Locator;
    readonly btnSaveReason: Locator;

    readonly txtTerminationDate: Locator;
    readonly txtLastDayOfWork: Locator;
    readonly txtPayThroughDate: Locator;
    readonly txtResignationDate: Locator;

    readonly lblPositionDetails: Locator;
    readonly btnEditClosePosition: Locator;
    readonly btnSaveClosePosition: Locator;
    readonly chkClosePosition: Locator;

    readonly contractType: Locator;
    readonly DEmployerSigned: Locator;
    readonly contractReason: Locator;
    readonly contractStatus: Locator;
    readonly contract: Locator;
    readonly DEmployeSigned: Locator;
    readonly contractEndate: Locator;
    readonly contractDateEmployeeSigned: Locator;
    readonly contractDateEmployerSigned: Locator;

    readonly WarningAlert: Locator;

    readonly manageBusinessProcesses: Locator;

    constructor(page: Page, givenname: string, FamilyName: string, context: BrowserContext) {
        super(page);
        this.page = page;
        this.btnSave = page.locator('(//button[@aria-label="Save"])[1]');
        this.btnEdit = page.locator('//button[@aria-label="Edit"]');
        this.btnSubmit = page.locator('//button[@title="Submit"]');

        this.btnSaveReason = page.getByRole('button', { name: 'Save', exact: true })
        this.lblReason = page.locator('//h2[contains(.,"Reason")]');
        this.editReason = page.locator('//button[@aria-label="Edit Primary Reason"]');
        this.txtPrimaryReason = page.locator('//label[text()="Primary Reason"]/parent::div/following-sibling::div//input');
        this.txtSecondaryReason = page.locator('//label[text()="Secondary Reasons"]/parent::div/following-sibling::div//input');
        this.txtLocalTerminationReason = page.locator('//label[text()="Local Termination Reason"]/parent::div/following-sibling::div//input');

        this.txtTerminationDate = page.locator('//label[text()="Termination Date"]/parent::div/following-sibling::div//input[@aria-label="Day"]');
        this.txtLastDayOfWork = page.locator('//label[text()="Last Day of Work"]/parent::div/following-sibling::div//input[@aria-label="Day"]');
        this.txtPayThroughDate = page.locator('//label[text()="Pay Through Date"]/parent::div/following-sibling::div//input[@aria-label="Day"]');
        this.txtResignationDate = page.locator('//label[text()="Resignation Date"]/parent::div/following-sibling::div//input[@aria-label="Day"]');

        this.lblPositionDetails = page.locator("//h2[contains(.,'Position Details')]");
        this.btnEditClosePosition = page.locator("//button[contains(@aria-label,'Edit Close Position')]");
        this.btnSaveClosePosition = page.locator("//label[contains(text(),'Close Position')]/ancestor::div/following-sibling::div[@data-automation-id='activelistToolBar']/div[@title='Save']/button");
        // this.chkClosePosition = page.locator("//input[contains(@type,'checkbox')]");
        this.chkClosePosition = page.locator('//div[@data-automation-id="checkbox"]');

        this.contract = page.locator('//div[@data-automation-id="titleText" and contains(text(),"Contract: ' + givenname + ' ' + FamilyName + '")]');
        this.contractReason = page.getByLabel('Reason').first();//locator('text=ReasonReason0 items selected >> [placeholder="Search"]');
        this.contractStatus = page.getByLabel('Status').first();//page.locator('text=StatusStatus0 items selected >> [placeholder="Search"]');
        this.contractType = page.getByLabel('Contract Type', { exact: true }).first();//page.locator('text=Contract TypeContract Type0 items selected >> [placeholder="Search"]');
        this.DEmployerSigned = page.getByLabel('Date Employer Signed').getByPlaceholder('DD').first();
        this.DEmployeSigned = page.locator("//label[contains(.,'Date Employee Signed')]/parent::div/following-sibling::div/descendant::input[@data-automation-id='dateSectionDay-input']");
        this.contractEndate = page.locator("//label[contains(.,'Contract End Date')]/parent::div/following-sibling::div/descendant::input[@data-automation-id='dateSectionDay-input']");
        this.WarningAlert = this.page.locator('//div[@role="button"]//div[@data-automation-id="errorWidgetBarMessageCountCanvas"]').first();

        this.manageBusinessProcesses = page.locator('//div[@data-automation-id="titleText" and contains(text(),"Terminate: ' + givenname + ' ' + FamilyName + '")]');
    }


    async setReason(PrimaryReason: string, SecondaryReason: string, LocalTerminationReason: string) {
        await this.page.waitForTimeout(2000);
        await this.editReason.click();
        await super.setTextWithEnter2(this.txtPrimaryReason, PrimaryReason);
        await this.lblReason.click();
        await super.setTextWithEnter2(this.txtSecondaryReason, SecondaryReason);
        await this.lblReason.click();
        await super.setTextWithEnter2(this.txtLocalTerminationReason, LocalTerminationReason);
        await this.lblReason.click();
        // await this.btnSave.click();
    }

    async setDates(TerminationDate: string, LastDayOfWork: string, PayThroughDate: string) {
        await this.page.waitForTimeout(2000);
        await this.btnEdit.click();
        await this.txtTerminationDate.click();
        // await this.page.keyboard.type(TerminationDate);
        // await this.page.keyboard.press('Tab');
        await super.setTextWithType(this.txtTerminationDate, TerminationDate);
        await this.page.waitForTimeout(2000);
        await this.lblReason.click();
        await this.page.waitForTimeout(2000);
        // await this.btnSave.click();
    }

    async managePosition() {
        if (await this.lblPositionDetails.count() > 0 && await this.btnEditClosePosition.count() > 0) {
            await this.btnEditClosePosition.click();
            await this.chkClosePosition.click();
            await this.btnSaveClosePosition.click();
        }
    }

    async setmanageBusinessProcesses() {
        await this.page.waitForTimeout(500);
        await this.page.waitForLoadState();
        await this.manageBusinessProcesses.waitFor({ state: 'visible' });
        if (await this.manageBusinessProcesses.count() > 0) {
            await super.click(this.manageBusinessProcesses);
            await this.page.waitForLoadState();
            await this.btnSubmit.click();
        }
        await this.page.waitForTimeout(2000);
        if (await this.WarningAlert.isVisible() && (await this.WarningAlert.textContent()).includes('Alert') && this.manageBusinessProcesses.isVisible()) {
            await super.click(this.btnSubmit);
        }
        await this.page.waitForTimeout(4000);
        if (await this.WarningAlert.isVisible() && (await this.WarningAlert.textContent()).includes('Alert') && this.manageBusinessProcesses.isVisible()) {
            await super.click(this.btnSubmit);
        }
    }

    async setContractDetails(contractType: string, contractStatus: string,
        DEmpsigned: string, DEmplyersigned: string, contractEnddate: string, reason: string, empType: string) {
        await this.page.waitForTimeout(3000);
        await this.page.waitForLoadState();
        await this.contract.waitFor({ state: 'visible' });
        if (await this.contract.count() > 0) {

            await super.click(this.contract);
            await this.page.waitForLoadState();
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
                await this.page.waitForTimeout(200);
                await super.setTextWithEnter(this.contractStatus, contractStatus);
            }

            if (await DEmpsigned !== 'N/A' && await DEmpsigned !== 'NaN' && await DEmpsigned !== undefined) {
                await super.click(this.DEmployeSigned);
                await super.setTextWithType(this.DEmployeSigned, DEmpsigned);
                await this.page.keyboard.press("Tab");
            }

            if (await DEmplyersigned !== 'N/A' && await DEmplyersigned !== 'NaN' && await DEmplyersigned !== undefined) {
                await super.click(this.DEmployerSigned);
                await super.setTextWithType(this.DEmployerSigned, DEmplyersigned);
                await this.page.keyboard.press("Tab");
            }

            if (await contractEnddate !== 'N/A' && await contractEnddate !== 'NaN' && await contractEnddate !== undefined) {
                await super.click(this.contractEndate);
                await super.setTextWithType(this.contractEndate, contractEnddate);
                await this.page.keyboard.press("Tab");
            }

            //If Employee Type is Permanant then remove End Contract Date
            // if (empType.includes("Permanant")) {
            //     await super.click(this.contractEndate);
            //     await super.setTextWithType(this.contractEndate, "__/__/____");
            //     await this.page.keyboard.press("Tab");
            // }

            await super.click(this.btnSubmit);
            await this.page.waitForTimeout(2000);
            if (await this.WarningAlert.isVisible() && (await this.WarningAlert.textContent()).includes('Alert') && this.contract.isVisible()) {
                await super.click(this.btnSubmit);
            }
            await this.page.waitForTimeout(2000);
            if (await this.WarningAlert.isVisible() && (await this.WarningAlert.textContent()).includes('Alert') && this.contract.isVisible()) {
                await super.click(this.btnSubmit);
            }
        } else {
            console.log("Contract Page is missing for This job profiles.");
        }

    }

    async clickSubmit() {
        await this.page.waitForTimeout(2000);
        await this.btnSubmit.click();
    }

}