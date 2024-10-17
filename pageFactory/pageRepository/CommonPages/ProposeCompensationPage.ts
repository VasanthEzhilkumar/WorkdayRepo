import { WebActionsPage } from '@lib/WebActionPage';
import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { UnexpectedResponseException } from 'pdfjs-dist-es5';

/*
@Author      : @ Madhukar Kirkan
*/
export class ProposeCompensationPage extends WebActionsPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly hrassignPaygroup: Locator;
    readonly hrSubmit: Locator;
    readonly validatePayGroup: Locator;
    readonly idChange: Locator;
    readonly addId: Locator;
    readonly GCountry: Locator;
    readonly GNationalIDType: Locator;
    readonly GID: Locator;
    readonly GExpirationDate: Locator;
    readonly GIssuedDate: Locator;
    readonly IssuedBy: Locator;
    readonly PerIssuedDate: Locator;
    readonly PerExpirationDate: Locator;
    readonly series: Locator;
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
    readonly hireAdditiondata: Locator;
    readonly medIns: Locator;
    readonly healthHouse: Locator;
    readonly hireadditiondatasub: Locator;
    readonly GnationalID: Locator;
    readonly manageProbation: Locator;
    readonly prbStartDate: Locator;
    readonly prbEndDate: Locator;
    readonly prbReviewDate: Locator;
    readonly proposeCompensation: Locator;
    readonly editNoticePeriod: Locator;
    readonly dependentDataText: Locator;
    readonly perInformation: Locator;
    readonly payElection: Locator;
    readonly upWorker: Locator;
    readonly addbank: Locator;
    readonly perInfochgn: Locator;
    readonly assignPaygroup: Locator;
    readonly assignPg: Locator;
    readonly assignPGApprove: Locator;
    readonly depedentChildName: Locator;
    readonly mealvoucher: Locator;
    readonly healthSK: Locator;
    readonly passportVisa: Locator;
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

    readonly givenName1: string;
    readonly fimilyName1: string;

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
        this.txtSalaryAmount = page.locator("//div[@title='Enter an amount.']/input[@type='text']");
        this.txtJobChangeSalaryAmount = page.locator("//div[@title='Enter an amount.']/input[@type='text']");
        this.btnEditSalary = page.locator("//button[@aria-label='Edit Salary']");
        this.btnSaveSalary = page.locator("//button[@aria-label='Save Salary']");

        this.btnEditHourly = page.locator("//button[@aria-label='Edit Hourly']");
        this.btnSaveHourly = page.locator("//button[@aria-label='Save Hourly']");

        this.lblEditNoticePeriod = page.locator("//h2/span[contains(.,'Edit Notice Periods for')]");
        this.contractWarningAlert = this.page.locator('//div[@role="button"]//div[@data-automation-id="errorWidgetBarMessageCountCanvas"]').first();
        this.checkWarningAndAlert = this.page.locator('//div[@role="button"]//div[@data-automation-id="errorWidgetBarMessageCountCanvas"]').first();

        this.lnkViewDetails = page.locator("//button[contains(.,'View Details')]");
        this.lblEditNoticeforHire = page.locator("//span[contains(text(),'Success!')]/parent::h1/following-sibling::div/descendant::div[contains(text(),'Edit Notice Periods for')]");
        this.lblprocessCompletedSuccessfully = page.locator("//div[@data-automation-id='textView' or contains(text(),'Process Successfully Completed')]");
        this.btnDone = page.locator("//span[contains(.,'Done')]/ancestor::button[@title='Done']");

        this.hrassignPaygroup = page.locator('text=Assign Pay Group for Hire: ' + givenname + ' ' + FamilyName + '');
        this.validatePayGroup = page.locator('text=Assign Pay Group for Hire: ' + givenname + ' ' + FamilyName + '');
        this.hrSubmit = page.locator('button:has-text("Submit")');
        this.idChange = page.locator('text=ID Change: ' + givenname + ' ' + FamilyName + '');
        this.addId = page.locator('tbody').filter({ hasText: '*Country*National ID' }).getByLabel('Add Row')//page.locator('text=*Country*National ID TypeCurrent IDAdd/Edit IDIssued DateExpiration DateIssued B >> [aria-label="Add Row"]');
        this.GCountry = page.getByLabel('Country', { exact: true })//page.locator('[id="selectInputId-56\\$63401"]');
        this.GNationalIDType = page.getByLabel('National ID Type', { exact: true })//page.locator('[id="selectInputId-56\\$63406"]');
        this.GID = page.locator('input[role="textbox"]');
        this.submit = page.getByRole('button', { name: 'Submit' });
        this.GnationalID = page.locator('text=1 item selected, RomaniaRomania1 item selected, Identity Card NumberIdentity Car >> [id="\\35 6\\$533359"] input[role="textbox"]');
        this.GExpirationDate = page.locator('[id="\\35 6\\$533362"] div[role="group"] div:has-text("DD") >> nth=1');
        this.GIssuedDate = page.locator('[id="\\35 6\\$533356"] div[role="group"] >> text=DD');
        this.IssuedBy = page.locator('text=1 item selected, RomaniaRomania1 item selected, Identity Card NumberIdentity Car >> [id="\\35 6\\$149635"] input[role="textbox"]');
        this.series = page.locator('text=1 item selected, RomaniaRomania1 item selected, Identity Card NumberIdentity Car >> [id="\\35 6\\$518467"] input[role="textbox"]');
        this.PerIssuedDate = page.locator('text=DD >> nth=1');
        this.PerExpirationDate = page.locator('text=DD >> nth=3');
        this.Approve = page.locator('button:has-text("Approve")');
        this.contract = page.getByRole('button', { name: 'Contract: ' + givenname + ' ' + FamilyName + '', exact: true });
        //this.contract = page.locator('[aria-label="Inbox Items"] >> text=Contract:' + ' ' + givenname + ' ' + FamilyName + '');
        this.contractReason = page.getByLabel('Reason')//locator('text=ReasonReason0 items selected >> [placeholder="Search"]');
        this.contractStatus = page.getByLabel('Status')//page.locator('text=StatusStatus0 items selected >> [placeholder="Search"]');
        this.contractType = page.getByLabel('Contract Type', { exact: true })//page.locator('text=Contract TypeContract Type0 items selected >> [placeholder="Search"]');
        this.DEmployerSigned = page.locator('text=Date Employer SignedDate Employer Signedcurrent value is DD/MM/YYYYDD/MM/YYYYuse >> [aria-label="Day"]');
        this.DEmployeSigned = page.locator('text=Date Employee SignedDate Employee Signedcurrent value is DD/MM/YYYYDD/MM/YYYYuse >> [aria-label="Day"]');
        this.contractEndate = page.locator('text=current value is DD/MM/YYYYDD/MM/YYYYuse right and left arrows to navigate spin  >> [aria-label="Day"]');
        this.contractAddendum = page.locator('[aria-label="Inbox Items"] >> text=Contract:' + ' ' + givenname + ' ' + FamilyName + '');
        this.contractAddendumtext = page.locator('h3:has-text("Romania Contract Addendum Info")');
        this.hireAdditiondata = page.locator(':nth-match(:text("Hire: ' + '' + givenname + ' ' + FamilyName + '"),2)');
        this.dependentDataText = page.locator('[aria-label="Click to view/edit grid preferences"]');
        this.depedentChildName = page.getByText('*Do not enter more than 6');
        this.medIns = page.locator('text=Medical/health insuranceMedical/health insurance0 items selected >> [placeholder="Search"]');
        this.healthHouse = page.locator('label:has-text("Health House")');
        this.mealvoucher = page.getByLabel('Meal Voucher')//page.locator('label:has-text("Meal Voucher")');
        this.healthSK = page.getByLabel('Health Insurance Type', { exact: true })//page.locator('label:has-text("Health Insurance Type")');
        this.hireadditiondatasub = page.locator(':nth-match(:text("Hire: ' + '' + givenname + ' ' + FamilyName + '"),1)');
        this.manageProbation = page.locator('text=Manage Probation Period: ' + ' ' + givenname + ' ' + FamilyName);
        this.prbStartDate = page.locator('label:has-text("Probation Start Date")');
        this.prbEndDate = page.locator('label:has-text("Probation End Date")');
        this.prbReviewDate = page.locator('label:has-text("Probation Review Date")');
        this.proposeCompensation = page.locator('text=Propose Compensation Hire: ' + ' ' + givenname + ' ' + FamilyName);
        this.editNoticePeriod = page.locator('text=Edit Notice Periods for Hire:' + ' ' + givenname + ' ' + FamilyName);
        this.perInformation = page.locator('text=Personal Information Change: ' + ' ' + givenname + ' ' + FamilyName);
        this.payElection = page.locator('[aria-label="Inbox Items"] >> text=Payment Election: ' + ' ' + givenname + ' ' + FamilyName);
        this.upWorker = page.locator('text=Update worker\'s contact information: Hire:' + ' ' + givenname + ' ' + FamilyName);
        this.addbank = page.locator('text=Add Worker\'s Bank Details: Hire:' + ' ' + givenname + ' ' + FamilyName);
        this.perInfochgn = page.locator('text=Personal Information Change: ' + ' ' + givenname + ' ' + FamilyName).first();
        this.assignPaygroup = page.locator('text=Assign Paygroup for Payroll: ' + ' ' + givenname + ' ' + FamilyName);
        this.assignPg = page.getByLabel('Proposed Pay Group', { exact: true })//locator('label:has-text("Proposed Pay Group")');
        this.assignPGApprove = page.locator('text=Assign Pay Group for Hire:' + ' ' + givenname + ' ' + FamilyName);
        this.passportVisa = page.locator('text=Passports and Visa Change: ' + ' ' + givenname + ' ' + FamilyName);
        this.editSalary = page.getByRole('button', { name: 'Edit Salary' });
        this.getsalaryProposition = page.locator('[id="\\35 6\\$530701"]');
        this.fillAmount = page.getByLabel('Amount');
        this.saveSalary = page.getByRole('button', { name: 'Save Salary' });
    }

    async hrPaygroupSubmit(): Promise<void> {
        await this.hrassignPaygroup.click();
        if (await this.validatePayGroup.isVisible()) {
            await this.hrSubmit.click();
        }
    }


    /*
  @Description : This generic method is used to set salary amount, Grade profile and step if required.
  @Author      : @ Madhukar Kirkan
  @Param       :  required test data such as GradeProfile, GradeProfile, GradeProfile.
  */
    async setProposeCompensationHire(GradeProfile: string, Step: string, Salary: String) {

        await super.click(this.proposeCompensation);
        if (await GradeProfile != "N/A" && await GradeProfile != "NaN" && await GradeProfile != undefined) {
            await super.click(this.lblGradeProfile);
            await super.setTextWithDoubleEnter(this.txtGradeProfile, GradeProfile);
            if (await Step != "N/A" && await Step != "NaN" && await Step != undefined && await (this.txtStep.isVisible())) {
                await super.click(this.txtStep);
                await super.setTextWithDoubleEnter(this.txtStep, Step);
            }
        }
        if (Salary != "N/A" && Salary != "NaN" && Salary != undefined && Salary != "Defaulted") {
            if (await this.btnEditSalary.isVisible() && await this.editSalary.isVisible()) {
                await this.click(this.btnEditSalary);
                if (this.txtSalaryAmount.isVisible()) {
                    await super.setText(this.txtSalaryAmount, Salary.toString());
                }
                await super.click(this.saveSalary);
            }
        } else {
            // if (await this.lblBasePayRange.isVisible) {
            await this.page.waitForTimeout(1500);
            let strTotalBasePayRangeValue: string = await super.getInnerText(this.lblBasePayRange);
            // if(strTotalBasePayRangeValue != undefined && strTotalBasePayRangeValue != 'NaN'){
            let strTotalBasePayRangeValueArray: string[] = strTotalBasePayRangeValue.split(" ");
            const strLow = strTotalBasePayRangeValueArray[0];
            const strHingh = strTotalBasePayRangeValueArray[2];

            if (await this.btnEditSalary.isVisible() && await this.editSalary.isVisible()) {
                await this.click(this.btnEditSalary);
                await this.page.waitForTimeout(1500);
                if (await this.txtSalaryAmount.isVisible()) {
                    await super.setText(this.txtSalaryAmount, strLow.toString());
                }
                await super.click(this.saveSalary);
            }
            //}

        }
        await this.hrSubmit.click();
        await this.page.waitForTimeout(1500);
        if (await this.checkWarningAndAlert.isVisible()) {
            await super.click(this.hrSubmit);
        }
        await this.page.waitForTimeout(1000);
        if (await this.checkWarningAndAlert.isVisible()) {
            await super.click(this.hrSubmit);
        }
    }
}
