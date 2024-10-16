import { WebActionsPage } from '@lib/WebActionPage';
import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { UnexpectedResponseException } from 'pdfjs-dist-es5';

export class HrInboxPage extends WebActionsPage {
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

    async AddID(): Promise<void> {
        await this.idChange.click();
        await this.addId.click();
        await this.GCountry.selectOption({ label: 'Romania' });
        await this.GNationalIDType.selectOption({ label: 'Identity Card Number' });
        await this.GID.fill('XH123456');
        await this.GIssuedDate.fill('01/01/2020');
        await this.GExpirationDate.fill('01/01/2030');
        await this.IssuedBy.fill('Romania');
        await this.series.fill('B123');
        await this.hrSubmit.click();
    }

    async approveContract(): Promise<void> {
        await this.contract.click();
        await this.DEmployerSigned.fill('01/01/2020');
        await this.DEmployeSigned.fill('01/01/2020');
        await this.contractEndate.fill('01/01/2025');
        await this.Approve.click();
    }

    async addHireAdditionalData(): Promise<void> {
        await this.hireAdditiondata.click();
        await this.dependentDataText.click();
        await this.depedentChildName.fill('John Doe');
        await this.medIns.click();
        await this.medIns.fill('Health Insurance Plan');
        await this.healthHouse.click();
        await this.healthHouse.fill('Local Health House');
        await this.mealvoucher.click();
        await this.mealvoucher.fill('Monthly Meal Voucher');
        await this.healthSK.click();
        await this.healthSK.fill('Public Health Insurance');
        await this.hrSubmit.click();
    }

    async manageProbationPeriod(): Promise<void> {
        await this.manageProbation.click();
        await this.prbStartDate.fill('01/01/2020');
        await this.prbEndDate.fill('01/01/2021');
        await this.prbReviewDate.fill('01/01/2021');
        await this.hrSubmit.click();
    }

    async ProposeCompensation(): Promise<void> {
        await this.proposeCompensation.click();
        await this.editSalary.click();
        await this.getsalaryProposition.click();
        await this.fillAmount.fill('50000');
        await this.saveSalary.click();
    }

    async EditNoticePeriod(): Promise<void> {
        await this.editNoticePeriod.click();
        await this.hrSubmit.click();
    }

    async updatePersonalInformation(): Promise<void> {
        await this.perInformation.click();
        await this.hrSubmit.click();
    }

    async updatePaymentElection(): Promise<void> {
        await this.payElection.click();
        await this.hrSubmit.click();
    }

    async updateWorkerContactInfo(): Promise<void> {
        await this.upWorker.click();
        await this.hrSubmit.click();
    }

    async addWorkerBankDetails(): Promise<void> {
        await this.addbank.click();
        await this.hrSubmit.click();
    }

    async changePersonalInformation(): Promise<void> {
        await this.perInfochgn.click();
        await this.hrSubmit.click();
    }
    async changePersonalInformationApproveAndSubmit(): Promise<void> {

        // if (await this.perInfochgn.isVisible()) {
        await super.click(this.perInfochgn);
        await this.page.waitForTimeout(2000);
        await this.hrSubmit.waitFor();
        if (await this.hrSubmit.isVisible()) {
            await super.click(this.hrSubmit);
        } else if (await this.Approve.isVisible()) {
            await super.click(this.Approve);
        }
        // }
    }

    async assignPayrollPayGroup(): Promise<void> {
        await this.assignPaygroup.click();
        await this.assignPg.fill('Proposed Pay Group');
        await this.hrSubmit.click();
    }

    async assignPaygroupSubmit(): Promise<void> {
        await this.hrassignPaygroup.click();
        if (await this.validatePayGroup.isVisible()) {
            await this.hrSubmit.click();
        }
    }

    async assignPaygroupApprove(): Promise<void> {
        await this.assignPGApprove.click();
        await this.Approve.click();
    }

    async assignPayGroupSubmit(ProposedPayGroup: any): Promise<void> {

        await this.assignPaygroup.click();
        //await this.assignPg.fill(ProposedPayGroup.toString());
        await super.selectFromCustomDropDrown(this.assignPg, ProposedPayGroup.toString());
        await this.page.getByRole('button', { name: 'Approve' }).click();

    }

    async updatePassportsAndVisa(): Promise<void> {
        await this.passportVisa.click();
        await this.page.getByRole('button', { name: 'Approve' }).click();
    }

    async clickInboxMyTaskAndSubmit(varString: string) {
        await super.click(this.page.locator("//div[@data-automation-id='titleText'][contains(./text(),'" + varString + " " + this.givenName1 + " " + this.fimilyName1 + "')]"));
        await super.click(this.hrSubmit);
    }

    async clickInboxMyTaskAndApprove(varString: string) {
        await super.click(this.page.locator("//div[@data-automation-id='titleText'][contains(./text(),'" + varString + " " + this.givenName1 + " " + this.fimilyName1 + "')]"));
        await super.click(this.page.getByRole('button', { name: 'Approve' }));
    }



    async EnterGovID(
        country1: string,
        NationalIDType1: string,
        NIDPersonal: string,
        IssuedDate1: string,
        ExpirationDate1: string,
        Country2: string,
        NationalIDType2: string,
        IDCardNumber: string,
        IssuedDate2: string,
        ExpirationDate2: string
    ) {
        await this.idChange.click();
        await this.addId.click();
        await this.fillGovIDDetails(country1, NationalIDType1, NIDPersonal, IssuedDate1, ExpirationDate1, true);

        if (!country1.includes("Slovakia")) {
            // Adding second ID
            await this.page.waitForTimeout(500);
            await this.addId.click();
            await this.fillGovIDDetails(Country2, NationalIDType2, IDCardNumber, IssuedDate2, ExpirationDate2, false);
        }

        await this.submit.click();
    }

    async fillGovIDDetails(
        country: string,
        nationalIDType: string,
        idNumber: string,
        issuedDate: string,
        expirationDate: string,
        isFirstID: boolean
    ) {
        await this.GCountry.fill(country);
        await this.GCountry.press('Enter');
        await this.page.waitForTimeout(500);

        await this.GNationalIDType.fill(String(nationalIDType));

        await this.page.waitForTimeout(500);
        await this.GNationalIDType.press('Enter');
        await this.page.waitForTimeout(500);

        await this.page.getByLabel('Content Area').locator('input[type="text"]').fill(String(idNumber));

        // await this.page.keyboard.press('Tab');
        // await this.page.waitForTimeout(500);
        // await this.GID.press('Control+a');
        // await this.page.keyboard.type(idNumber);

        if (!isFirstID) {
            await this.page.keyboard.press('Tab');
            await this.page.waitForTimeout(500);
            await this.GIssuedDate.click();
            await this.GIssuedDate.type(issuedDate);

            await this.GExpirationDate.click();
            await this.GExpirationDate.type(expirationDate);

            await this.GID.press('Control+a');

            await this.page.keyboard.press('Tab');
            await this.page.waitForTimeout(500);
            await this.page.keyboard.press('Tab');
            await this.page.waitForTimeout(500);
            await this.page.keyboard.type(issuedDate);

            await this.page.keyboard.press('Tab');
            await this.page.waitForTimeout(500);
            await this.page.keyboard.press('Tab');
            await this.page.waitForTimeout(500);
            await this.page.keyboard.type(expirationDate);

            await this.IssuedBy.fill('Test');
            await this.series.fill('Test');
        }
    }

    async hrcontractsubmit(contractType: string, contractStatus: string, DEmpsigned: string, DEmplyersigned: string, contractEnddate: string, reason: string) {
        await this.contract.click();
        await this.contractReason.click();
        await this.page.waitForTimeout(500);

        await this.page.locator('[aria-label="Main checkbox Not Checked"] >> text=Main').click();
        await this.fillField(this.contractType, contractType);
        await this.fillField(this.contractStatus, contractStatus);
        // await this.fillField(this.DEmployerSigned, DEmplyersigned);
        // await this.fillField(this.DEmployeSigned, DEmpsigned);
        // await this.fillField(this.contractEndate, contractEnddate);

        await this.hrSubmit.click();
    }

    async hrcontractAddendum() {
        await this.contractAddendum.click();
        await this.page.waitForTimeout(500);

        if (await this.contractAddendumtext.isVisible()) {
            await this.hrSubmit.click();
        }
    }

    async hrHireAdditionalDataSK(mealvoucher: string, insuracneType: string) {
        await this.hireAdditiondata.click();
        await this.page.waitForTimeout(500);

        const warningText = '*Do not enter more than 6 Dependents. A maximum of 6 Dependents will be sent to Payroll*';
        const isWarningPresent = await this.page.locator('b').allTextContents();

        if (!isWarningPresent.includes(warningText)) {
            await this.fillField(this.mealvoucher, mealvoucher);
            await this.fillField(this.healthSK, insuracneType);
        }

        await this.hrSubmit.click();
        await this.page.waitForTimeout(500); // Consider reducing or removing this if possible
    }


    async hrHireAdditionalDataDependentSK(medicalins: string, health: string) {

        await this.hireadditiondatasub.click();
        await expect(this.page.locator('b')).toContainText('*Do not enter more than 6 Dependents. A maximum of 6 Dependents will be sent to Payroll*');
        await this.page.getByLabel('Add Row').click();
        await this.page.waitForTimeout(500);
        await this.page.getByRole('textbox').nth(1).fill('Childone');
        await this.page.getByRole('textbox').nth(1).press('Tab');
        await this.page.getByRole('textbox').nth(2).fill('1234567891');



        await this.hrSubmit.click();
        await this.page.waitForTimeout(500);
    }

    async hrHireAdditionalData(mealvoucher: string, insuracneType: string) {
        await this.hireAdditiondata.click();

        if (await this.mealvoucher.isVisible()) {
            await this.fillField(this.mealvoucher, insuracneType);
        }

        await this.hrSubmit.click();
    }

    async hrhireadditiondatasubmit(mealvoucher: string, insuracneType: string) {
        await this.hireadditiondatasub.click();

        if (await this.dependentDataText.isVisible()) {
            await this.hrSubmit.click();
        } else {
            await this.fillField(this.mealvoucher, insuracneType);
            await this.hrSubmit.click();
        }
    }

    async setManageProbation(probReviewDate: string) {
        await super.click(this.manageProbation);
        // await this.manageProbation.click();
        // await this.page.waitForTimeout(500);
        // await super.setTextWithType(this.prbStartDate, '');
        // await super.setTextWithType(this.prbEndDate, '');
        if (await probReviewDate != 'NaN' && await probReviewDate != 'N/A' && await probReviewDate != undefined) {
            ///await super.setTextWithType(this.prbReviewDate, probReviewDate);
        }

        await super.click(this.hrSubmit);
        // await this.hrSubmit.click();
        await this.page.waitForTimeout(2000);
        if (await this.contractWarningAlert.isVisible()) {
            await super.click(this.hrSubmit);
        }
        await this.page.waitForTimeout(2000);
        if (await this.contractWarningAlert.isVisible()) {
            await super.click(this.hrSubmit);
        }
        // if (await super.checkExistsOrIsVisible(this.manageProbation)) {
        //     await super.click(this.hrSubmit);
        //     // await this.page.waitForTimeout(500);
        //     // await this.hrSubmit.click();
        // }
    }


    async clickEditNoticePeriodsforHireSubmit() {
        await super.click(this.editNoticePeriod);
        await super.click(this.hrSubmit)
    }

    async hrManageProbation(probReviewDate: string) {
        await this.manageProbation.click();
        await this.page.waitForTimeout(500);

        // await this.fillField(this.prbStartDate, '');
        // await this.fillField(this.prbEndDate, '');
        // await this.fillField(this.prbReviewDate, probReviewDate);

        await this.hrSubmit.click();
        await this.page.waitForTimeout(500);

        if (await this.manageProbation.isVisible()) {
            await this.page.waitForTimeout(500);
            await this.hrSubmit.click();
        }
    }

    async hrgetemployeenumber() {
        // await this.page.waitForTimeout(500);
        // await this.upWorker.click();
        await super.click(this.upWorker);
        this.EmployeeNumber = await this.upWorker.allInnerTexts();
        // this.EmployeeNumber = await super.getAllInnerText(this.upWorker);
        this.EmployeeNumber = this.EmployeeNumber.toString().split('(');
        this.EmployeeNumber = this.EmployeeNumber[1].toString().split(')');
        return this.EmployeeNumber[0].toString();
    }

    async getEmployeeIDFromEditNoticePeriodPage() {
        await super.click(this.lnkViewDetails);
        this.EmployeeNumber = await super.getAllInnerText(this.lblEditNoticeforHire);
        this.EmployeeNumber = this.EmployeeNumber.toString().split('(');
        this.EmployeeNumber = this.EmployeeNumber[1].toString().split(')');
        return this.EmployeeNumber[0].toString();
    }

    async hrProposeCompensationHire(GradeProfile: string, Step: string, Salary: String) {

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
            await this.page.waitForTimeout(1500);
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
        await this.page.waitForTimeout(1500);
        if (await this.checkWarningAndAlert.isVisible()) {
            await super.click(this.hrSubmit);
        }
        await this.page.waitForTimeout(2800);
    }

    // Helper method to fill fields
    async fillField(fieldLocator: Locator, value: string) {
        await fieldLocator.fill(value);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(500);
    }


}

// }