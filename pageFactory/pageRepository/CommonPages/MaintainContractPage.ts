import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActionsPage } from 'lib/WebActionPage';

export class MaintainContractPage extends WebActionsPage {
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
    readonly contractDateEmployeeSigned: Locator;
    readonly contractDateEmployerSigned: Locator;
    readonly contractWarningAlert: Locator;



    EmployeeNumber: string[];

    constructor(page: Page, givenname: string, FamilyName: string, context: BrowserContext) {
        super(page)
        this.page = page;
        this.context = context;
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
        //this.DEmployerSigned = page.locator("//label[contains(.,'Date Employer Signed')]/parent::div/following-sibling::div/descendant::input[@data-automation-id='dateSectionMonth-input']");
        this.DEmployerSigned = page.getByLabel('Date Employer Signed').getByPlaceholder('DD')
        this.DEmployeSigned = page.locator("//label[contains(.,'Date Employee Signed')]/parent::div/following-sibling::div/descendant::input[@data-automation-id='dateSectionDay-input']");
        this.contractEndate = page.locator("//label[contains(.,'Contract End Date')]/parent::div/following-sibling::div/descendant::input[@data-automation-id='dateSectionDay-input']");
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
        this.perInfochgn = page.locator('text=Personal Information Change: ' + ' ' + givenname + ' ' + FamilyName);
        this.assignPaygroup = page.locator('text=Assign Paygroup for Payroll: ' + ' ' + givenname + ' ' + FamilyName);
        this.assignPg = page.getByLabel('Proposed Pay Group', { exact: true })//locator('label:has-text("Proposed Pay Group")');
        this.assignPGApprove = page.locator('text=Assign Pay Group for Hire:' + ' ' + givenname + ' ' + FamilyName);
        this.passportVisa = page.locator('text=Passports and Visa Change: ' + ' ' + givenname + ' ' + FamilyName);
        this.editSalary = page.getByRole('button', { name: 'Edit Salary' });
        this.getsalaryProposition = page.locator('[id="\\35 6\\$530701"]');
        this.fillAmount = page.getByLabel('Amount');
        this.saveSalary = page.getByRole('button', { name: 'Save Salary' });
        this.contractWarningAlert = this.page.locator('//div[@role="button"]//div[@data-automation-id="errorWidgetBarMessageCountCanvas"]').first();
    }

    async hrPaygroupSubmit(): Promise<void> {
        await this.hrassignPaygroup.click();
        if (await this.validatePayGroup.isVisible()) {
            await this.hrSubmit.click();
        }
    }

    // async AddID(): Promise<void> {
    //     await this.idChange.click();
    //     await this.addId.click();
    //     await this.GCountry.selectOption({ label: 'Romania' });
    //     await this.GNationalIDType.selectOption({ label: 'Identity Card Number' });
    //     await this.GID.fill('XH123456');
    //     await this.GIssuedDate.fill('01/01/2020');
    //     await this.GExpirationDate.fill('01/01/2030');
    //     await this.IssuedBy.fill('Romania');
    //     await this.series.fill('B123');
    //     await this.hrSubmit.click();
    // }

    // async approveContract(): Promise<void> {
    //     await this.contract.click();
    //     await this.DEmployerSigned.fill('01/01/2020');
    //     await this.DEmployeSigned.fill('01/01/2020');
    //     await this.contractEndate.fill('01/01/2025');
    //     await this.Approve.click();
    // }

    // async addHireAdditionalData(): Promise<void> {
    //     await this.hireAdditiondata.click();
    //     await this.dependentDataText.click();
    //     await this.depedentChildName.fill('John Doe');
    //     await this.medIns.click();
    //     await this.medIns.fill('Health Insurance Plan');
    //     await this.healthHouse.click();
    //     await this.healthHouse.fill('Local Health House');
    //     await this.mealvoucher.click();
    //     await this.mealvoucher.fill('Monthly Meal Voucher');
    //     await this.healthSK.click();
    //     await this.healthSK.fill('Public Health Insurance');
    //     await this.hrSubmit.click();
    // }

    // async manageProbationPeriod(): Promise<void> {
    //     await this.manageProbation.click();
    //     await this.prbStartDate.fill('01/01/2020');
    //     await this.prbEndDate.fill('01/01/2021');
    //     await this.prbReviewDate.fill('01/01/2021');
    //     await this.hrSubmit.click();
    // }

    // async ProposeCompensation(): Promise<void> {
    //     await this.proposeCompensation.click();
    //     await this.editSalary.click();
    //     await this.getsalaryProposition.click();
    //     await this.fillAmount.fill('50000');
    //     await this.saveSalary.click();
    // }

    // async EditNoticePeriod(): Promise<void> {
    //     await this.editNoticePeriod.click();
    //     await this.hrSubmit.click();
    // }

    // async updatePersonalInformation(): Promise<void> {
    //     await this.perInformation.click();
    //     await this.hrSubmit.click();
    // }

    // async updatePaymentElection(): Promise<void> {
    //     await this.payElection.click();
    //     await this.hrSubmit.click();
    // }

    // async updateWorkerContactInfo(): Promise<void> {
    //     await this.upWorker.click();
    //     await this.hrSubmit.click();
    // }

    // async addWorkerBankDetails(): Promise<void> {
    //     await this.addbank.click();
    //     await this.hrSubmit.click();
    // }

    // async changePersonalInformation(): Promise<void> {
    //     await this.perInfochgn.click();
    //     await this.hrSubmit.click();
    // }

    // async assignPayrollPayGroup(): Promise<void> {
    //     await this.assignPaygroup.click();
    //     await this.assignPg.fill('Proposed Pay Group');
    //     await this.hrSubmit.click();
    // }

    // async assignPaygroupSubmit(): Promise<void> {
    //     await this.hrassignPaygroup.click();
    //     if (await this.validatePayGroup.isVisible()) {
    //         await this.hrSubmit.click();
    //     }
    // }

    // async assignPaygroupApprove(): Promise<void> {
    //     await this.assignPGApprove.click();
    //     await this.Approve.click();
    // }

    // async assignPayGroupSubmit(ProposedPayGroup: any): Promise<void> {

    //     await this.assignPaygroup.click();
    //     await this.assignPg.fill(ProposedPayGroup.toString());
    //     await this.page.getByRole('button', { name: 'Approve' }).click();

    // }

    // async updatePassportsAndVisa(): Promise<void> {
    //     await this.passportVisa.click();
    //     await this.page.getByRole('button', { name: 'Approve' }).click();
    // }


// need to Generic
    async setContractDetails(contractType: string, contractStatus: string,
        DEmpsigned: string, DEmplyersigned: string, contractEnddate: string, reason: string) {
        await super.click(this.contract);
       
        //await super.click(this.page.locator('[aria-label="Main checkbox Not Checked"] >> text=Main')); 
        if (await reason != 'N/A' && await reason != 'NaN' && await reason != undefined) {
            await super.click(this.contractReason);
            await super.selectFromCustomDropDrown(this.contractReason, reason);
        }
        if (await contractType != 'N/A' && await contractType != 'NaN' && await contractType != undefined) {
            await super.selectFromCustomDropDrown(this.contractType, contractType);
        }

        if (await contractStatus != 'N/A' && await contractStatus != 'NaN' && await contractStatus != undefined) {
            await super.setTextWithEnter(this.contractStatus, contractStatus);
        }

        if (await DEmpsigned != 'N/A' && await DEmpsigned != 'NaN' && await DEmpsigned != undefined) {
            await super.click(this.DEmployeSigned);
            await super.setTextWithType(this.DEmployeSigned, DEmpsigned);
        }

        if (await DEmplyersigned != 'N/A' && await DEmplyersigned != 'NaN' && await DEmplyersigned != undefined) {
            await super.click(this.DEmployerSigned);
            await super.setTextWithType(this.DEmployerSigned, DEmplyersigned);
        }

        if (await contractEnddate != 'N/A' && await contractEnddate != 'NaN' && await contractEnddate != undefined) {
            await super.click(this.contractEndate);
            await super.setTextWithType(this.contractEndate, contractEnddate);
        }
        await super.click(this.hrSubmit);
        await this.page.waitForTimeout(2000);
        if (await this.contractWarningAlert.isVisible()){
            await super.click(this.hrSubmit);
        }
        await this.page.waitForTimeout(2000);
        if (await this.contractWarningAlert.isVisible()){
            await super.click(this.hrSubmit);
        }
       
    }

    // async hrcontractAddendum() {
    //     await this.contractAddendum.click();
    //     await this.page.waitForTimeout(500);

    //     if (await this.contractAddendumtext.isVisible()) {
    //         await this.hrSubmit.click();
    //     }
    // }

    // async hrHireAdditionalDataSK(mealvoucher: string, insuracneType: string) {
    //     await this.hireAdditiondata.click();
    //     await this.page.waitForTimeout(500);

    //     const warningText = '*Do not enter more than 6 Dependents. A maximum of 6 Dependents will be sent to Payroll*';
    //     const isWarningPresent = await this.page.locator('b').allTextContents();

    //     if (!isWarningPresent.includes(warningText)) {
    //         await this.fillField(this.mealvoucher, mealvoucher);
    //         await this.fillField(this.healthSK, insuracneType);
    //     }

    //     await this.hrSubmit.click();
    //     await this.page.waitForTimeout(500); // Consider reducing or removing this if possible
    // }


    // async hrHireAdditionalDataDependentSK(medicalins: string, health: string) {

    //     await this.hireadditiondatasub.click();
    //     await expect(this.page.locator('b')).toContainText('*Do not enter more than 6 Dependents. A maximum of 6 Dependents will be sent to Payroll*');
    //     await this.page.getByLabel('Add Row').click();
    //     await this.page.waitForTimeout(500);
    //     await this.page.getByRole('textbox').nth(1).fill('Childone');
    //     await this.page.getByRole('textbox').nth(1).press('Tab');
    //     await this.page.getByRole('textbox').nth(2).fill('1234567891');



    //     await this.hrSubmit.click();
    //     await this.page.waitForTimeout(500);
    // }

    // async hrHireAdditionalData(mealvoucher: string, insuracneType: string) {
    //     await this.hireAdditiondata.click();

    //     if (await this.mealvoucher.isVisible()) {
    //         await this.fillField(this.mealvoucher, insuracneType);
    //     }

    //     await this.hrSubmit.click();
    // }

    // async hrhireadditiondatasubmit(mealvoucher: string, insuracneType: string) {
    //     await this.hireadditiondatasub.click();

    //     if (await this.dependentDataText.isVisible()) {
    //         await this.hrSubmit.click();
    //     } else {
    //         await this.fillField(this.mealvoucher, insuracneType);
    //         await this.hrSubmit.click();
    //     }
    // }

    // async hrManageProbation(probReviewDate: string) {
    //     await this.manageProbation.click();
    //     await this.page.waitForTimeout(500);

    //     // await this.fillField(this.prbStartDate, '');
    //     // await this.fillField(this.prbEndDate, '');
    //     // await this.fillField(this.prbReviewDate, probReviewDate);

    //     await this.hrSubmit.click();
    //     await this.page.waitForTimeout(500);

    //     if (await this.manageProbation.isVisible()) {
    //         await this.page.waitForTimeout(500);
    //         await this.hrSubmit.click();
    //     }
    // }

    // async hrgetemployeenumber() {
    //     await this.page.waitForTimeout(500);
    //     await this.upWorker.click();
    //     this.EmployeeNumber = await this.upWorker.allInnerTexts();
    //     this.EmployeeNumber = this.EmployeeNumber.toString().split('(');

    //     this.EmployeeNumber = this.EmployeeNumber[1].toString().split(')');
    //     return this.EmployeeNumber[0].toString();
    // }

    // async hrProposeCompensationHire() {
    //     await this.page.waitForTimeout(500);
    //     await this.proposeCompensation.click();
    //     await this.hrSubmit.click();
    // }

    // // Helper method to fill fields
    // async fillField(fieldLocator: Locator, value: string) {
    //     await fieldLocator.fill(value);
    //     await this.page.keyboard.press('Enter');
    //     await this.page.waitForTimeout(500);
    // }


}

// }