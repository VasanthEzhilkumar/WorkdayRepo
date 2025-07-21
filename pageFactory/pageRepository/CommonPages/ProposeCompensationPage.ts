import { WebActionsPage } from '@lib/WebActionPage';
import { BrowserContext, Locator, Page } from '@playwright/test';

/*
@Author      : @ Madhukar Kirkan
*/
export class ProposeCompensationPage extends WebActionsPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly hrassignPaygroup: Locator;
    readonly hrSubmit: Locator;
    readonly Approve: Locator;
    readonly proposeCompensation: Locator;
    readonly editNoticePeriod: Locator;
    readonly editSalary: Locator;
    readonly getsalaryProposition: Locator;
    readonly fillAmount: Locator;
    readonly saveSalary: Locator;
    readonly submit: Locator;
    readonly lblEditNoticePeriod: Locator;
    readonly lnkViewDetails: Locator;
    readonly lblEditNoticeforHire: Locator;
    readonly lblprocessCompletedSuccessfully: Locator;
    readonly btnDone: Locator;
    readonly contractWarningAlert: Locator;
    readonly checkWarningAndAlert: Locator;
    readonly lblGradeProfile: Locator;
    readonly lblBasePayRange: Locator;
    readonly lblProratedAmount: Locator;
    readonly txtStep: Locator;
    //readonly txtStep1: Locator;
    readonly txtSalaryAmount: Locator;

    readonly txtJobChangeSalaryAmount: Locator;
    readonly btnEditSalary: Locator;
    readonly btnSaveSalary: Locator;
    readonly btnEditHourly: Locator;
    readonly btnSaveHourly: Locator;
    readonly txtGradeProfile: Locator;
    readonly btnMainErrorBar1: Locator;
    readonly btnSideErrorBar1: Locator;

    readonly btnEditAllowance: Locator;
    readonly btnSaveAllowance: Locator;
    readonly txtAllowanceAmount: Locator;

    readonly givenName1: string;
    readonly fimilyName1: string;
    readonly btnDeleteallowance: Locator;
    readonly btnDeletePopup: Locator;
    readonly btnDeletePopupslovenia: Locator;
    readonly btnDeleteallowanceSlovenia: Locator;

    EmployeeNumber: string[];

    constructor(page: Page, givenname: string, FamilyName: string, context: BrowserContext) {
        super(page);
        this.page = page;
        this.context = context;
        this.givenName1 = givenname;
        this.fimilyName1 = FamilyName;
        this.lblGradeProfile = page.locator("//label[contains(.,'Grade Profile')]");
        this.lblBasePayRange = page.locator("(//label[contains(.,'Total Base Pay Range')]/parent::div/following-sibling::div//div[@data-automation-id='promptOption'])[1]");
        this.lblProratedAmount = page.locator("//label[contains(.,'Prorated Amount')]/parent::div/following-sibling::div//div[@data-automation-id='numericText']");
        this.txtGradeProfile = page.locator("//label[contains(.,'Grade Profile')]/parent::div/following-sibling::div//input[@placeholder='Search']");
        this.txtStep = page.locator("//label[contains(.,'Step')]/parent::div/following-sibling::div//input[@placeholder='Search']");
        //this.txtStep1 = page.locator("//div[@data-automation-checked='Not Checked']/div[contains(text(),'')]");
        this.txtSalaryAmount = page.locator("//div[@title='Enter an amount.']/input[@type='text' and @aria-required='true']");
        this.txtJobChangeSalaryAmount = page.locator("//div[@title='Enter an amount.']/input[@type='text']");
        this.btnEditSalary = page.locator("//button[@aria-label='Edit Salary']");
        this.btnSaveSalary = page.locator("//button[@aria-label='Save Salary']");

        this.btnEditAllowance = page.locator("//button[@aria-label='Edit Allowance']");
        this.btnSaveAllowance = page.locator("//button[@aria-label='Save Allowance']");
        this.txtAllowanceAmount = page.locator("//label[text()='Amount']/parent::div/following-sibling::div//input");

        this.btnEditHourly = page.locator("//button[@aria-label='Edit Hourly']");
        this.btnSaveHourly = page.locator("//button[@aria-label='Save Hourly']");

        this.lblEditNoticePeriod = page.locator("//h2/span[contains(.,'Edit Notice Periods for')]");
        this.contractWarningAlert = this.page.locator('//div[@role="button"]//div[@data-automation-id="errorWidgetBarMessageCountCanvas"]').first();
        this.checkWarningAndAlert = this.page.locator('(//div[@role="button"]//div[@data-automation-id="errorWidgetBarMessageCountCanvas"])[1]');

        this.lnkViewDetails = page.locator("//button[contains(.,'View Details')]");
        this.lblEditNoticeforHire = page.locator("//span[contains(text(),'Success!')]/parent::h1/following-sibling::div/descendant::div[contains(text(),'Edit Notice Periods for')]");
        this.lblprocessCompletedSuccessfully = page.locator("//div[@data-automation-id='textView' or contains(text(),'Process Successfully Completed')]");
        this.btnDone = page.locator("//span[contains(.,'Done')]/ancestor::button[@title='Done']");
        this.hrSubmit = page.locator('button:has-text("Submit")');
        this.submit = page.getByRole('button', { name: 'Submit' });
        this.Approve = page.locator('button:has-text("Approve")');
        this.proposeCompensation = page.locator('text=Propose Compensation Hire: ' + ' ' + givenname + ' ' + FamilyName).first().or(page.locator('text=Compensation Change:' + ' ' + givenname + ' ' + FamilyName).first());
        this.editNoticePeriod = page.locator('text=Edit Notice Periods for Hire:' + ' ' + givenname + ' ' + FamilyName);
        this.editSalary = page.getByRole('button', { name: 'Edit Salary' });
        this.getsalaryProposition = page.locator('[id="\\35 6\\$530701"]');
        this.fillAmount = page.getByLabel('Amount');
        this.saveSalary = page.getByRole('button', { name: 'Save Salary' });
        //this.btnDeleteallowance = page.getByLabel('Delete Allowance');
        //this.btnDeletePopup =page.getByRole('button', { name: 'Delete' })
        this.btnDeletePopup = page.locator("//span[text()='Delete']/parent::button[@title='Delete']").first();
        this.btnDeleteallowance = page.locator("(//button[@title = 'Delete' and @aria-label='Delete Allowance'])[1]");
        this.btnDeletePopupslovenia = page.locator("//span[text()='Delete']/parent::button[@title='Delete']");
        this.btnDeleteallowanceSlovenia = page.locator("(//button[@title = 'Delete' and contains(@aria-label,'Delete Allowance')])");
        this.btnMainErrorBar1 = this.page.locator("(//div[@data-automation-id='errorWidgetBarViewAllCanvas']//ancestor::div//descendant::div[contains(@title,'" + givenname + " " + FamilyName + "')])[1]");
        this.btnSideErrorBar1 = this.page.locator("(//div[@data-automation-id='errorWidgetBarCanvas']//ancestor::div//descendant::div[contains(@title,'" + givenname + " " + FamilyName + "')])[1]");

    }



    async clickDeletePopupbtn(): Promise<void> {

        //if (await this.btnDeleteallowance.count()> 0 ) {
        await this.btnDeleteallowance.click();
        await this.page.waitForTimeout(500);
        await this.btnDeletePopup.click();
        //}
    }


    /*
    @Author      : @ Madhukar Kirkan
    @Description : This generic method is used to set salary amount, Grade profile and step if required on Propse Compensation Page.
    @Param       :  required test data such as GradeProfile, step etc
    @updated on 25th Oct'24 by  : @ Ramchandra Desai - added Allowance Amount argument to make it more generic 
  */
    async setProposeCompensationHire(GradeProfile: string, Step: string, Salary: String, Country: string, AllowanceAmount: string) {
        await this.page.waitForTimeout(1500);
        await super.click(this.proposeCompensation);
        if (await GradeProfile !== "N/A" && await GradeProfile !== "NaN" && await GradeProfile !== undefined && await GradeProfile.toLowerCase() !== "defaulted") {
            await super.click(this.lblGradeProfile);
            await super.setTextWithDoubleEnter(this.txtGradeProfile, GradeProfile);
            await this.page.waitForTimeout(1500);
            if (await Step !== "N/A" && await Step !== "NaN" && await Step !== undefined && await Step.toLowerCase() !== "defaulted" && (await this.txtStep.isVisible())) {
                //await super.click(this.txtStep);
                await super.setTextWithDoubleEnter(this.txtStep, Step);
            }
            await super.click(this.page.getByLabel('Save Guidelines'));
        }
        await this.page.waitForTimeout(5000);
        if (Salary !== "N/A" && Salary !== "NaN" && Salary !== undefined && Salary !== "Defaulted") {
            if (await this.btnEditSalary.isVisible()) {
                await super.click(this.btnEditSalary);
                await this.page.waitForTimeout(500);
                if (await this.txtSalaryAmount.count() > 0) {
                    await super.setText(this.txtSalaryAmount, Salary.toString());
                }
                await super.click(this.btnSaveSalary);
            }
            if (await this.btnEditHourly.isVisible()) {
                await super.click(this.btnEditHourly);
                //await this.page.waitForTimeout(1500);
                if (await this.txtSalaryAmount.isVisible()) {
                    await super.setText(this.txtSalaryAmount, Salary.toString());
                }
                await super.click(this.btnSaveHourly);
            }
        } else {
            await this.page.waitForTimeout(1000);
            let strTotalBasePayRangeValue: string = await super.getInnerText(this.lblBasePayRange);
            // if(strTotalBasePayRangeValue != undefined && strTotalBasePayRangeValue != 'NaN'){
            let strTotalBasePayRangeValueArray: string[] = strTotalBasePayRangeValue.split(" ");
            console.log("strTotalBasePayRangeValueArray - " + strTotalBasePayRangeValueArray);
            const strLow = strTotalBasePayRangeValueArray[0];
            // const strHingh = strTotalBasePayRangeValueArray[2];
            console.log("strLow - " + strLow);
            //await this.page.waitForTimeout(1500);
            if (await this.btnEditSalary.count() > 0) {
                await super.click(this.btnEditSalary);
                //if (await this.editSalary.count() > 0) {
                await this.page.waitForTimeout(4000);
                if (await this.txtSalaryAmount.isVisible()) {
                    await super.setText(this.txtSalaryAmount, strLow.toString());
                }
                // }
                await super.click(this.btnSaveSalary);
            }

            if (await this.btnEditHourly.isVisible()) {
                await super.click(this.btnEditHourly);
                await this.page.waitForTimeout(1500);
                if (await this.txtSalaryAmount.isVisible()) {
                    await super.setText(this.txtSalaryAmount, strLow.toString());
                }
                await super.click(this.btnSaveHourly);
            }
            //}
        }
        //@added by Gayatri if allowance btn need to be deleted
        if (await Country === "Hungary") {
            //this.clickDeletePopupbtn();
            await this.btnDeleteallowance.click();
            await this.page.waitForTimeout(500);
            await this.btnDeletePopup.click();
        }
        //@added by Gayatri if allowance btn need to be deleted
        //updated by @Madhukar for Slovenia need to delete first and fourth allowance.
        if (await Country === "Slovenia") {
            await this.btnDeleteallowanceSlovenia.nth(3).click();
            await this.page.waitForTimeout(700);
            await this.btnDeletePopupslovenia.first().click({ 'force': true });
            await this.page.waitForTimeout(1000);
            // this.clickDeletePopupbtn();
            await this.btnDeleteallowanceSlovenia.nth(0).click();
            await this.page.waitForTimeout(500);
            await this.btnDeletePopupslovenia.first().click();
        }
        await this.page.waitForTimeout(2500);
        if (AllowanceAmount !== "N/A" && AllowanceAmount !== "NaN" && AllowanceAmount !== undefined && AllowanceAmount !== "Defaulted") {
            if (await this.btnEditAllowance.isVisible()) {
                //  && await this.editSalary.isVisible()) {
                await super.click(this.btnEditAllowance);
                if (this.txtAllowanceAmount.isVisible()) {
                    await super.setText(this.txtAllowanceAmount, AllowanceAmount.toString());
                }
                await super.click(this.btnSaveAllowance);
            }
        }

        await this.hrSubmit.click();
        await this.page.waitForTimeout(5000);
        if (await this.checkWarningAndAlert.isVisible() && await this.proposeCompensation.isVisible()) {
            if ((await this.btnMainErrorBar1.isVisible() || await this.btnSideErrorBar1.isVisible())) {
                await super.click(this.hrSubmit);
            }
        }
        // await this.page.waitForTimeout(5000);
        // if (await this.checkWarningAndAlert.isVisible() && await this.proposeCompensation.isVisible()) {
        //     if ((await this.btnMainErrorBar1.isVisible() || await this.btnSideErrorBar1.isVisible())) {
        //         await super.click(this.hrSubmit);
        //     }
        // }
        await this.page.waitForTimeout(3000);
    }
}
