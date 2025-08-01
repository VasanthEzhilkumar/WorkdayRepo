import { WebActionsPage } from '@lib/WebActionPage';
import { BrowserContext, Locator, Page, expect } from '@playwright/test';

export class HrInboxPage extends WebActionsPage {

    readonly page: Page;
    readonly context: BrowserContext;
    readonly hrassignPaygroup: Locator;
    readonly hrassignPaygroupInitial: Locator;
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
    readonly workereducationdetails: Locator;
    readonly workerjobhistory: Locator;
    readonly addPITTaxInformation: Locator;
    //readonly txtStep1: Locator;
    readonly txtSalaryAmount: Locator;
    readonly setservicedateschange: Locator;
    readonly paygroupSubmit: Locator;
    readonly lblEmpID: Locator;
    readonly rightToWork: Locator;
    readonly assignPaygroupProfile: Locator;

    readonly txtJobChangeSalaryAmount: Locator;
    readonly btnEditSalary: Locator;
    readonly btnSaveSalary: Locator;
    readonly btnEditHourly: Locator;
    readonly btnSaveHourly: Locator;
    readonly txtGradeProfile: Locator;
    readonly addMedicalExam: Locator;

    readonly collectiveAgreementProfessional: Locator;
    // readonly lblEmpID: Locator;
    // readonly rightToWork: Locator;

    readonly txtYoungParentEffectiveDate: Locator;
    readonly givenName1: string;
    readonly fimilyName1: string;
    readonly chkYoungParent: Locator;

    readonly txtTaxFreeAmountEffectiveDate: Locator;
    readonly txtPensioneffectiveDate: Locator;
    readonly chkTaxFreeAmount: Locator;
    readonly txtHourlyRegime: Locator;
    readonly polandSchoolName: Locator;
    readonly polandschoolType: Locator;
    readonly polandschoolStartDate: Locator;
    readonly polandschoolEndDate: Locator;
    readonly addUrządSkarbowy: Locator;
    readonly addUlgapodatkowa: Locator;
    readonly addCzęśćulgi: Locator;
    readonly addidentyfikatorpodatkowy: Locator;
    readonly addTypopodatkowania: Locator;
    readonly firstEverJobPolandInformation: Locator;
    readonly firstEverJobBtn: Locator;
    readonly hrAssignPayGroupForHire: Locator;


    readonly editGender: Locator;
    readonly editDob: Locator;
    readonly editPlace: Locator;
    readonly editmartial: Locator;
    readonly editCitizenship: Locator;
    readonly editNationality: Locator;
    readonly chgGovid: Locator;
    readonly addemergncyContacts: Locator;
    readonly setGenderdrpDown: Locator;
    readonly setGender: Locator;
    readonly cityofBirth: Locator;
    readonly martialstatus: Locator;
    readonly citizenship: Locator;
    readonly nationality: Locator;
    readonly hrchgPersonalInformation: Locator;
    readonly AssignPaygroupforPayroll: Locator;
    readonly manageProbationHUn: Locator;
    readonly hireAdditiondataHungary: Locator;
    readonly mainJob: Locator;
    readonly pensioner: Locator;
    readonly btnAddPassPort: Locator;
    readonly txtDateWhenMedicalExamTaken: Locator;
    readonly txtExpirationDateOfExam: Locator;
    readonly carerbtn: Locator;
    readonly carer: Locator;
    readonly txtAssignCollectiveAgreement: Locator;
    readonly txtProfessionalCategory: Locator;
    readonly txtLevel: Locator;
    readonly maidenNameHungary: Locator;
    readonly compensationTitle: Locator;
    readonly areadeEstudo: Locator;
    readonly taxadeIRS: Locator;
    readonly portugalSocialSecurityCode: Locator;
    readonly btnSkip: Locator;
    readonly payrollTaxDeductionNL: Locator;
    readonly WWaansturing: Locator;
    readonly clickSkipThisTaskOK: Locator;
    readonly txtPayrollTaxDeductionNL: Locator;
    readonly txtWWaansturing: Locator;
    readonly estadolIRPF: Locator;
    readonly minusvaliaRH: Locator;
    readonly dodajWyksztalcenieTitle: Locator;
    readonly dodajHistorieZatrudnieniaTitle: Locator;
    readonly dodajDanePodatkoweTitle: Locator;
    readonly nationalHealthFundCodeTitle: Locator;
    readonly txtCountryOfBirth: Locator;
    readonly txtRegionOfBirth: Locator;
    readonly txtCityOfBirth: Locator;
    readonly verifyNationality: Locator;
    readonly personalInformationChangePage: Locator;
    readonly hrchgPersonalInformationTitle: Locator;
    readonly editEduLevel: Locator;
    readonly eduLevel: Locator;
    readonly addRow: Locator;
    readonly companyName: Locator;
    readonly startDate: Locator;
    readonly endDate: Locator;
    readonly addKosztyUzyskaniaPrzychodu: Locator;
    readonly seniorityDate: Locator;

    EmployeeNumber: string[];
    contractAddendumPage: Locator;
    ContractAddendumInfoPage: Locator;
    AddendumEffectiveDate: Locator;
    AddendumCreationDate: Locator;
    AddendumEndDate: Locator;
    txtAddendumNumber: Locator;
    contractJobChange: Locator;

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
        // this.txtStep = page.locator("//label[contains(.,'Step')]/parent::div/following-sibling::div//input[@placeholder='Search']");
        this.txtStep = page.getByLabel('Step');
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

        this.lnkViewDetails = page.locator("(//button[contains(.,'View Details')])[1]");
        this.lblEditNoticeforHire = page.locator("//span[contains(text(),'Success!')]/parent::h1/following-sibling::div/descendant::div[contains(text(),'Edit Notice Periods for')]");
        //this.lblEmpID = page.locator("//span[contains(text(),'Success!')]/parent::h1/following-sibling::div/descendant::div[contains(text(),'Propose Compensation Hire:')]");
        this.lblEmpID = page.locator("(//h1//following-sibling::div//descendant::div[contains(text(),'Hire:')])[1]");

        this.lblprocessCompletedSuccessfully = page.locator("//div[@data-automation-id='textView' or contains(text(),'Process Successfully Completed')]");
        this.btnDone = page.locator("//span[contains(.,'Done')]/ancestor::button[@title='Done']");

        this.AssignPaygroupforPayroll = page.locator('text=Assign Paygroup for Payroll: ' + givenname + ' ' + FamilyName + '');
        //this.hrAssignPayGroupForHire = page.locator('text=Assign Pay Group for Hire: ' + FamilyName + ' ' + givenname + '');
        //this.hrAssignPayGroupForHire = page.locator(`text=Assign Pay Group for Hire: ${FamilyName} ${givenname}`);
        this.hrAssignPayGroupForHire = page.locator('//div[@data-automation-id="titleText" and contains(text(),"Assign Pay Group for Hire: ' + givenname + ' ' + FamilyName + '")]');
        this.hrassignPaygroup = page.locator('text=Assign Pay Group for Hire: ' + givenname + ' ' + FamilyName + '');
        this.validatePayGroup = page.locator('text=Assign Pay Group for Hire: ' + givenname + ' ' + FamilyName + '');
        // this.hrassignPaygroupInitial = page.locator('//div[@data-automation-id="titleText" and contains(text(),"' + givenname + ' ' + FamilyName + '")]');
        this.hrassignPaygroupInitial = page.locator('//div[@data-automation-id="titleText" and contains(text(),"Assign Pay Group for Hire: ' + givenname + ' ' + FamilyName + '")]');
        this.rightToWork = page.locator('//div[@data-automation-id="titleText" and contains(text(),"Maintain Right to Work Documentation: Onboarding for ' + givenname + ' ' + FamilyName + '")]');
        this.workereducationdetails = page.locator('//button/div[@data-automation-id="titleText" and contains (text(),"Poland Worker Education Details:' + ' ' + givenname + ' ' + FamilyName + '")]');
        this.workerjobhistory = page.locator('//button/div[@data-automation-id="titleText" and contains (text(),"Poland Worker Job History:' + ' ' + givenname + ' ' + FamilyName + '")]');

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
        this.contractJobChange = page.getByRole('button', { name: 'Contract: ' + givenname + ' ' + FamilyName + '' }).first();

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
        this.hireAdditiondataHungary = page.locator(':nth-match(:text("Hire: ' + '' + FamilyName + ' ' + givenname + '"),2)');
        this.dependentDataText = page.locator('[aria-label="Click to view/edit grid preferences"]');
        this.depedentChildName = page.getByText('*Do not enter more than 6');
        this.medIns = page.locator('text=Medical/health insuranceMedical/health insurance0 items selected >> [placeholder="Search"]');
        this.healthHouse = page.locator('label:has-text("Health House")');
        this.mealvoucher = page.getByLabel('Meal Voucher')//page.locator('label:has-text("Meal Voucher")');
        this.healthSK = page.getByLabel('Health Insurance Type', { exact: true })//page.locator('label:has-text("Health Insurance Type")');
        this.hireadditiondatasub = page.locator(':nth-match(:text("Hire: ' + '' + givenname + ' ' + FamilyName + '"),1)');
        this.manageProbation = page.locator('text=Manage Probation Period: ' + ' ' + givenname + ' ' + FamilyName);
        this.manageProbationHUn = page.locator('text=Manage Probation Period: ' + ' ' + FamilyName + ' ' + givenname);
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
        //this.assignPaygroup = page.locator('text=Assign Paygroup for Payroll: ' + ' ' + givenname + ' ' + FamilyName);
        this.assignPaygroup = page.locator('//div[@data-automation-id="titleText" and contains(text(),"Assign Paygroup for Payroll") and contains(text(),"' + givenname + ' ' + FamilyName + '")]');
        this.assignPg = page.getByLabel('Proposed Pay Group', { exact: true });//locator('label:has-text("Proposed Pay Group")');
        this.assignPGApprove = page.locator('text=Assign Pay Group for Hire:' + ' ' + givenname + ' ' + FamilyName);
        this.passportVisa = page.locator('text=Passports and Visa Change: ' + ' ' + givenname + ' ' + FamilyName);
        this.editSalary = page.getByRole('button', { name: 'Edit Salary' });
        this.getsalaryProposition = page.locator('[id="\\35 6\\$530701"]');
        this.fillAmount = page.getByLabel('Amount');
        this.saveSalary = page.getByRole('button', { name: 'Save Salary' });
        //this.hrassignPaygroupInitial = page.locator('//div[@data-automation-id="titleText" and contains(text(),"'+ givenname + ' ' + FamilyName +'")]');
        this.setservicedateschange = page.locator('//div[@data-automation-id="titleText" and contains(text(),"Service Dates Change: ' + givenname + ' ' + FamilyName + '")]');
        this.addMedicalExam = page.locator('//div[@data-automation-id="titleText" and contains(text(),"Add Medical Exam: ' + givenname + ' ' + FamilyName + '")]');
        this.collectiveAgreementProfessional = page.locator('//div[@data-automation-id="titleText" and contains(text(),"Assign Employee Collective Agreement: ' + givenname + ' ' + FamilyName + '")]');
        // this.lblEmpID = page.locator("//span[contains(text(),'Success!')]/parent::h1/following-sibling::div/descendant::div[contains(text(),'Propose Compensation Hire:')]");
        // this.rightToWork = page.locator('//div[@data-automation-id="titleText" and contains(text(),"Maintain Right to Work Documentation: Onboarding for ' + givenname + ' ' + FamilyName + '")]');
        this.txtYoungParentEffectiveDate = page.locator("//label[contains(.,'Young Parent Effective Date')]/parent::div/following-sibling::div/descendant::input[@data-automation-id='dateSectionDay-input']");
        this.chkYoungParent = page.locator("//label[contains(.,'Young Parent')]/parent::div/following-sibling::div/descendant::div[@data-automation-id='checkboxPanel']");
        this.txtTaxFreeAmountEffectiveDate = page.locator("//label[contains(.,'Tax Free Amount Effective Date')]/parent::div/following-sibling::div/descendant::input[@data-automation-id='dateSectionDay-input']");
        this.txtPensioneffectiveDate = page.locator("//label[contains(.,'Pension effective Date')]/parent::div/following-sibling::div/descendant::input[@data-automation-id='dateSectionDay-input']");
        this.chkTaxFreeAmount = page.locator("//label[contains(.,'Tax Free Amount')]/parent::div/following-sibling::div/descendant::div[@data-automation-id='checkboxPanel']");
        this.chkTaxFreeAmount = page.locator("//label[contains(.,'Tax Free Amount')]/parent::div/following-sibling::div/descendant::div[@data-automation-id='checkboxPanel']");
        this.txtHourlyRegime = page.locator("//label[contains(text(),'Hourly Regime')]/parent::div/following-sibling::div/descendant ::input");
        this.hrchgPersonalInformation = page.getByRole('button', { name: 'Personal Information Change: ' + givenname + ' ' + FamilyName }).first();//locator('[aria-label="Inbox Items"] >> text=Change/Update My Personal Information');
        this.editGender = page.locator('[aria-label="Edit Gender"]');
        this.editDob = page.locator('[aria-label="Edit Date of Birth"]');
        this.editPlace = page.locator('[aria-label="Edit Place of Birth"]');
        this.editmartial = page.locator('[aria-label="Edit Marital Status"]');
        this.editCitizenship = page.getByLabel('Edit Citizenship Status');
        //this.editCitizenship = page.locator('[aria-label="Edit Citizenship Status"]');


        this.editNationality = page.locator('[aria-label="Edit Nationality"]');
        this.setGenderdrpDown = page.locator('text=select oneselect one');
        this.setGender = page.locator('[aria-label="Male"]');
        this.cityofBirth = page.locator('input[role="textbox"]');
        this.martialstatus = page.locator('text=Marital StatusMarital Status0 items selected, press enter to view all options, o >> [placeholder="Search"]');
        //this.citizenship = page.locator('text=Citizenship StatusCitizenship Status0 items selected, press enter to view all op >> [placeholder="Search"]');
        //this.nationality = page.locator('text=Primary NationalityPrimary Nationality0 items selected, press enter to view all  >> [placeholder="Search"]');
        this.citizenship = page.getByRole('textbox', { name: 'Citizenship Status' });
        this.nationality = page.getByLabel('Primary Nationality');
        this.polandSchoolName = page.getByLabel('School Name');
        this.polandschoolEndDate = page.locator('//label[contains(.,"End Date")]/parent::div/following-sibling::div//input[@aria-label="Day"]');
        this.polandschoolStartDate = page.locator('//label[contains(.,"Start Date")]/parent::div/following-sibling::div//input[@aria-label="Day"]');
        this.polandschoolType = page.getByLabel('School Type');
        this.addPITTaxInformation = page.locator('//button/div[@data-automation-id="titleText" and contains (text(),"Add PIT Tax Information:' + ' ' + givenname + ' ' + FamilyName + '")]');

        this.addUrządSkarbowy = page.getByLabel('Urząd Skarbowy');
        this.firstEverJobPolandInformation = page.locator('//button/div[@data-automation-id="titleText" and contains (text(),"First Job Ever Information details:' + ' ' + givenname + ' ' + FamilyName + '")]');
        this.firstEverJobBtn = page.getByLabel('First Ever Job');
        this.addUlgapodatkowa = page.getByLabel('Ulga podatkowa');
        this.addCzęśćulgi = page.getByLabel('Część ulgi');
        this.addidentyfikatorpodatkowy = page.getByLabel('Identyfikator podatkowy');
        this.addTypopodatkowania = page.getByLabel('Typ opodatkowania');
        this.mainJob = page.getByLabel('Main Job', { exact: true });
        this.pensioner = page.locator("//label[contains(.,'Pensioner')]/parent::div/following-sibling::div/descendant::div[@data-automation-id='checkboxPanel']");
        this.carer = page.locator("//label[contains(.,'Carer')]/parent::div/following-sibling::div/descendant::div[@data-automation-id='checkboxPanel']");

        this.btnAddPassPort = page.locator("(//button[@aria-label='Add Row'])[1]");
        this.txtDateWhenMedicalExamTaken = page.locator("//div[@data-automation-id='fieldSetContent']/descendant::table[@class='mainTable']/tbody/tr[1]/td[2]/descendant::input[@aria-label='Day']");
        this.txtExpirationDateOfExam = page.locator("//div[@data-automation-id='fieldSetContent']/descendant::table[@class='mainTable']/tbody/tr[1]/td[3]/descendant::input[@aria-label='Day']");

        this.txtAssignCollectiveAgreement = page.locator("//label[contains(text(),'Collective Agreement')]/parent::div/following-sibling::div/descendant ::input");
        // this.txtByCountryLocation = "xpath:=//div[@data-automation-checked='Not Checked']/div[contains(text(),'By Country/Location')]"
        // this.txtSelectCollectionAgreement = "xpath:=//div[@data-automation-id='promptOption'][contains(text(),'"  '''')]"
        this.txtProfessionalCategory = page.locator("//label[contains(text(),'Professional Category')]/parent::div/following-sibling::div/descendant ::input");
        this.txtLevel = page.locator("//label[contains(text(),'Level')]/parent::div/following-sibling::div/descendant ::input");

        //this.txtAssignCollectiveAgreement = page.getByLabel('Collective Agreement', { exact: true });
        // this.txtProfessionalCategory = page.getByLabel('Professional Category').first();
        //this.txtLevel = page.getByLabel('Level').first();
        //this.maidenNameHungary = page.locator('//div[@data-automation-id="titleText" and contains(text(), "Maiden & Mother's Maiden Names: Hire: '+ ' ' + FamilyName + ' ' + givenname '")]');
        this.maidenNameHungary = page.locator('//div[@data-automation-id="titleText" and contains(text(), "Maiden Names: Hire:  ' + FamilyName + ' ' + givenname + '")]');
        this.btnSkip = page.locator("//span[text()='Skip']/parent::button[@data-uxi-button-type='action']");
        this.compensationTitle = page.locator('//div[@data-automation-id="titleText" and contains(text(),"Propose Compensation Hire: ' + givenname + ' ' + FamilyName + '")]');
        this.areadeEstudo = page.locator('//label[text()="Area de Estudo"]/parent::div/following-sibling::div//input');
        this.taxadeIRS = page.locator('//label[text()="Taxa de IRS"]/parent::div/following-sibling::div//input');
        this.portugalSocialSecurityCode = page.locator('//label[text()="Social Security Code"]/parent::div/following-sibling::div//input');
        this.payrollTaxDeductionNL = page.getByRole('button', { name: 'Payroll Tax Deduction NL: ' + givenname + ' ' + FamilyName + '', exact: true });
        this.WWaansturing = page.getByRole('button', { name: 'WW aansturing: ' + givenname + ' ' + FamilyName + '', exact: true });
        this.clickSkipThisTaskOK = page.locator("//span[contains(.,'OK')]/..");
        this.txtPayrollTaxDeductionNL = page.locator("//label[contains(.,'Payroll Tax Deduction')]/parent::div/following-sibling::div//descendant::input[1]");
        this.txtWWaansturing = page.locator("//label[contains(.,'WW aansturing')]/parent::div/following-sibling::div//descendant::input[1]")
        this.estadolIRPF = page.locator('//label[contains(.,"Estado IRPF")]/parent::div/following-sibling::div//input');
        this.minusvaliaRH = page.locator('//label[contains(.,"Minusvalía RH")]/parent::div/following-sibling::div//input');

        this.dodajWyksztalcenieTitle = page.locator('//button/div[@data-automation-id="titleText" and contains (text(),"Dodaj wykształcenie:' + ' ' + givenname + ' ' + FamilyName + '")]');
        this.dodajHistorieZatrudnieniaTitle = page.locator('//button/div[@data-automation-id="titleText" and contains (text(),"Dodaj historię zatrudnienia:' + ' ' + givenname + ' ' + FamilyName + '")]');
        this.dodajDanePodatkoweTitle = page.locator('//button/div[@data-automation-id="titleText" and contains (text(),"Dodaj dane podatkowe (PIT-2):' + ' ' + givenname + ' ' + FamilyName + '")]');
        this.nationalHealthFundCodeTitle = page.locator('//button/div[@data-automation-id="titleText" and contains (text(),"Dodaj oddział NFZ:' + ' ' + givenname + ' ' + FamilyName + '")]');
        this.txtCountryOfBirth = page.locator('//label[text()="Country of Birth"]/parent::div/following-sibling::div//input');
        this.txtRegionOfBirth = page.locator('//label[text()="Region of Birth"]/parent::div/following-sibling::div//input');
        this.txtCityOfBirth = page.locator('//label[text()="City of Birth"]/parent::div/following-sibling::div//input');
        this.verifyNationality = page.getByRole('button', { name: 'Verify nationality: Onboarding for ' + givenname + ' ' + FamilyName }).first();
        this.personalInformationChangePage = page.getByRole('button', { name: 'Personal Information Change: ' + givenname + ' ' + FamilyName }).first();

        this.txtAddendumNumber = page.locator("//div[@data-automation-id='numericWidget']/input[@data-automation-id='numericInput']").first();
        this.contractAddendumPage = page.getByText('Edit Additional Data', { exact: true });
        this.ContractAddendumInfoPage = page.getByRole('heading', { name: 'Contract Addendum Info' }).getByLabel('Contract Addendum Info').first();
        this.AddendumEffectiveDate = page.getByPlaceholder('DD').nth(1);
        this.AddendumCreationDate = page.getByPlaceholder('DD').first();
        this.AddendumEndDate = page.getByPlaceholder('DD').nth(2);
        this.hrchgPersonalInformationTitle = page.locator('//div[@data-automation-id="titleText" and contains(text(),"Personal Information Change: ' + givenname + ' ' + FamilyName + '")]');
        this.editEduLevel = page.locator('[aria-label="Edit Education Level"]');
        this.eduLevel = page.locator('//label[contains(text(),"Education Level")]/parent::div/following-sibling::div/descendant::input');
        this.addRow = page.locator('//button[@aria-label="Add Row"]');
        this.companyName = page.locator('//input[@data-automation-id="textInputBox"]');
        this.startDate = page.locator('//input[@data-automation-id="dateSectionDay-input"]').nth(0);
        this.endDate = page.locator('//input[@data-automation-id="dateSectionDay-input"]').nth(1);
        this.addKosztyUzyskaniaPrzychodu = page.getByLabel('Koszty uzyskania przychodu');
        this.seniorityDate = page.locator('//label[text()="Seniority Date"]/parent::div/following-sibling::div//input[@data-automation-id="dateSectionDay-input"]');

    }

    async hrPaygroupSubmit(): Promise<void> {
        await this.hrassignPaygroup.click();
        if (await this.validatePayGroup.isVisible()) {
            await this.hrSubmit.click();
        }
    }
    async setHourlyRegime(HourlyRegime: any) {
        await this.hireadditiondatasub.click();
        await this.page.waitForLoadState();
        await super.selectFromCustomDropDrown(this.txtHourlyRegime, HourlyRegime);
        await this.hrSubmit.click();
    }

    //Generic Method To Set PayrollTax DeductionNL  @Added by Gayatri
    async SetPayrollTaxDeductionNL(payrollTaxDeduction: string) {
        await this.payrollTaxDeductionNL.click();
        await super.selectFromCustomDropDrown(this.txtPayrollTaxDeductionNL, payrollTaxDeduction);
        await this.hrSubmit.click();
        await this.page.waitForTimeout(500);
    }

    //Generic Method To SetWWaansturing  @Added by Gayatri

    async SetWWaansturing(btnWWaansturing: string) {
        await this.WWaansturing.click();
        await super.selectFromCustomDropDrown(this.txtWWaansturing, btnWWaansturing);
        await this.hrSubmit.click();
        await this.page.waitForTimeout(500);
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

    async addHireAdditionalDataPortugal(AreadeEstudo: string, TaxadeIRS: string, PortugalSocialSecurityCode: string): Promise<void> {
        await this.hireadditiondatasub.click();
        await super.selectFromCustomDropDrown(this.areadeEstudo, AreadeEstudo);
        await super.selectFromCustomDropDrown(this.taxadeIRS, TaxadeIRS);
        if (await this.portugalSocialSecurityCode.count() > 0)
            await super.setTextWithEnter(this.portugalSocialSecurityCode, PortugalSocialSecurityCode);
        await this.page.waitForTimeout(500);
        await this.hrSubmit.click();
    }

    async setContractAddendumInfoIfVisible(ContractAddendumInfo_TerminateAddendumEffectiveDate: any, ContractAddendumInfo_AddendumCreationDate: any, ContractAddendumInfo_AddendumEndDate: any) {
        await this.page.waitForTimeout(2000);
        if (await this.contractJobChange.count() > 0) {
            await this.contractJobChange.click();
            await this.contractAddendumPage.waitFor();
            // if (await this.contractAddendumPage.isVisible()) {
            await this.page.getByLabel('Add Row').click();
            const randomNumber = Math.floor(Math.random() * 10) + 1;
            await super.setText(this.txtAddendumNumber, randomNumber.toString());
            await super.setTextWithType(this.AddendumEffectiveDate, ContractAddendumInfo_TerminateAddendumEffectiveDate);
            await super.setTextWithType(this.AddendumCreationDate, ContractAddendumInfo_AddendumCreationDate);
            await super.setTextWithType(this.AddendumEndDate, ContractAddendumInfo_AddendumEndDate);
            await super.setText(this.page.getByRole('textbox').nth(2), "Text");
            await this.page.waitForTimeout(500);
            await this.hrSubmit.click();
            // }

        }

    }

    async addHireAdditionalDataSpain(EstadolIRPF: string, MinusvaliaRH: string): Promise<void> {
        await this.hireadditiondatasub.click();
        await super.selectFromCustomDropDrown(this.estadolIRPF, EstadolIRPF);
        await super.selectFromCustomDropDrown(this.minusvaliaRH, MinusvaliaRH);
        // await super.setTextWithEnter(this.portugalSocialSecurityCode, PortugalSocialSecurityCode);
        await this.page.waitForTimeout(500);
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
        await this.page.waitForTimeout(500);
    }

    async updatePaymentElection(): Promise<void> {
        await this.payElection.click();
        await this.hrSubmit.click();
        await this.page.waitForTimeout(500);
    }

    async updateWorkerContactInfo(): Promise<void> {
        await this.upWorker.click();
        await this.hrSubmit.click();
        await this.page.waitForTimeout(2000);
    }

    async addWorkerBankDetails(): Promise<void> {
        await this.page.waitForTimeout(2000);
        await this.addbank.click();
        await this.hrSubmit.click();
        await this.page.waitForTimeout(2000);
    }

    async changePersonalInformation(): Promise<void> {
        await this.perInfochgn.click();
        await this.hrSubmit.click();
    }



    async setAddMedicalExam(DateWhenMedicalExamTaken: any, ExpirationDateOfTheExam: any) {
        await this.addMedicalExam.click();
        await this.btnAddPassPort.click();
        await super.setTextWithType(this.txtDateWhenMedicalExamTaken, DateWhenMedicalExamTaken);
        await super.setTextWithType(this.txtExpirationDateOfExam, ExpirationDateOfTheExam);
        await this.hrSubmit.click();
    }

    //Added By Gayatri for PageHireSkipOk
    async PageHireSkipThisTask() {
        await this.page.waitForTimeout(500);
        await this.btnSkip.click();
        await this.page.waitForTimeout(500);
        await this.clickSkipThisTaskOK.click();
    }



    async setCollectiveAgreementAndProfessionalCategoryAndLevel(CollectiveAgreement: any, ProfessionalCategory: any, Level: any) {
        await this.page.waitForTimeout(500);
        await this.collectiveAgreementProfessional.click({ 'force': true })
        await super.click(this.collectiveAgreementProfessional);
        await super.selectFromCustomDropDrownBySliptAndEnter(this.txtAssignCollectiveAgreement, CollectiveAgreement);
        await this.txtAssignCollectiveAgreement.press('Tab');
        await super.selectFromCustomDropDrown(this.txtProfessionalCategory, ProfessionalCategory);
        await this.txtProfessionalCategory.press('Tab');
        await super.selectFromCustomDropDrown(this.txtLevel, Level);
        await this.txtLevel.press('Tab');
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
    async getEmployeeID() {
        await super.click(this.lnkViewDetails);
        await this.page.waitForLoadState();
        await this.page.waitForTimeout(500);
        this.EmployeeNumber = await super.getAllInnerText(this.lblEmpID);
        await this.page.waitForTimeout(500);
        this.EmployeeNumber = this.EmployeeNumber.toString().split('(');
        this.EmployeeNumber = this.EmployeeNumber[1].toString().split(')');
        return this.EmployeeNumber[0].toString();
    }

    async getEmployeeIDAfterMaintainRightToWorkDocumentation() {
        await super.click(this.lnkViewDetails);
        await this.page.waitForTimeout(500);
        this.EmployeeNumber = await super.getAllInnerText(this.lblEmpID);
        await this.page.waitForTimeout(500);
        this.EmployeeNumber = this.EmployeeNumber.toString().split('(');
        this.EmployeeNumber = this.EmployeeNumber[1].toString().split(')');
        return this.EmployeeNumber[0].toString();
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

    async assignInitialPayGroupSubmit(ProposedPayGroup: any): Promise<void> {
        await this.page.waitForTimeout(1500);
        // await this.hrassignPaygroupInitial.waitFor({ state: 'visible' });
        await this.hrassignPaygroupInitial.click();
        await this.page.waitForLoadState();
        await super.selectFromCustomDropDrown(this.assignPg, ProposedPayGroup.toString());
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }
    //@added by Gayatri for new change for PK17
    async polandWorkerEducationDetails(schoolName: string, schoolType: string, schoolStartDate: string, schoolEndDate: string) {
        await this.workereducationdetails.click();
        await this.page.waitForTimeout(500);
        await this.polandSchoolName.click();
        await this.polandSchoolName.fill(schoolName);
        await this.page.keyboard.press('Tab');
        await super.selectFromCustomDropDrown(this.polandschoolType, schoolType);
        await this.page.keyboard.press('Tab');
        await this.polandschoolStartDate.click();
        await super.setTextWithType(this.polandschoolStartDate, schoolStartDate);
        await this.page.keyboard.press('Tab');
        await this.page.waitForTimeout(500);
        await this.polandschoolEndDate.click();
        await super.setTextWithType(this.polandschoolEndDate, schoolEndDate);
        await this.page.keyboard.press('Tab');
        await this.hrSubmit.click();


    }

    // Worker Education Details in Polish
    async dodajWyksztalcenie(schoolName: string, schoolType: string, schoolStartDate: string, schoolEndDate: string) {
        
        await this.dodajWyksztalcenieTitle.waitFor({ state: 'visible' });
        await this.dodajWyksztalcenieTitle.click();
        await this.page.waitForTimeout(500);
        await this.page.waitForLoadState();
        await this.polandSchoolName.click();
        await this.polandSchoolName.fill(schoolName);
        await this.page.keyboard.press('Tab');
        await super.selectFromCustomDropDrown(this.polandschoolType, schoolType);
        await this.page.keyboard.press('Tab');
        await this.polandschoolStartDate.click();
        await super.setTextWithType(this.polandschoolStartDate, schoolStartDate);
        await this.page.keyboard.press('Tab');
        await this.page.waitForTimeout(500);
        await this.polandschoolEndDate.click();
        await super.setTextWithType(this.polandschoolEndDate, schoolEndDate);
        await this.page.keyboard.press('Tab');
        await this.page.waitForTimeout(2000);
        await this.hrSubmit.click();
    }

    //@added by Gayatri for new change for PK17
    async polandPITTaxInformation(UrządSkarbowy: string, Ulgapodatkowa: string, Częśćulgi: string, Typopodatkowania: string, identyfikatorpodatkowy: string) {
        await this.addPITTaxInformation.click();
        await super.setTextWithEnter(this.addUrządSkarbowy, UrządSkarbowy);
        await this.page.waitForTimeout(500);

        await super.selectFromCustomDropDrown(this.addUlgapodatkowa, Ulgapodatkowa);
        await super.selectFromCustomDropDrown(this.addCzęśćulgi, Częśćulgi);
        await this.page.waitForTimeout(500);

        await super.selectFromCustomDropDrown(this.addTypopodatkowania, Typopodatkowania);
        await this.page.keyboard.press('Tab');
        await this.page.waitForTimeout(500);
        await super.selectFromCustomDropDrown(this.addidentyfikatorpodatkowy, identyfikatorpodatkowy);
        await this.page.keyboard.press('Tab');
        await this.page.waitForTimeout(500);
        await this.hrSubmit.click();

    }

    async dodajDanePodatkowe(UrządSkarbowy: string, Ulgapodatkowa: string, Częśćulgi: string, Typopodatkowania: string, identyfikatorpodatkowy: string, KosztyUzyskaniaPrzychodu: string) {
        await this.dodajDanePodatkoweTitle.waitFor({ state: 'visible' });
        await this.dodajDanePodatkoweTitle.click();
        await this.page.waitForTimeout(1000);
        await this.page.waitForLoadState();
        await super.setTextWithEnter(this.addUrządSkarbowy, UrządSkarbowy);
        await this.page.waitForTimeout(500);

        await super.selectFromCustomDropDrown(this.addUlgapodatkowa, Ulgapodatkowa);
        await super.selectFromCustomDropDrown(this.addKosztyUzyskaniaPrzychodu, KosztyUzyskaniaPrzychodu);
        await super.selectFromCustomDropDrown(this.addCzęśćulgi, Częśćulgi);
        await this.page.waitForTimeout(500);

        await super.selectFromCustomDropDrown(this.addTypopodatkowania, Typopodatkowania);
        await this.page.keyboard.press('Tab');
        await this.page.waitForTimeout(500);
        await super.selectFromCustomDropDrown(this.addidentyfikatorpodatkowy, identyfikatorpodatkowy);
        await this.page.keyboard.press('Tab');
        await this.page.waitForTimeout(500);
        await this.hrSubmit.click();

    }

    //@added by Gayatri for new change for PK17
    async firstEverJobDetails(firsteverjob: string, firstJobExpiryDate: any) {
        await this.firstEverJobPolandInformation.click();
        await super.setTextWithEnter(this.firstEverJobBtn, firsteverjob);
        await this.page.keyboard.press('Tab');
        if (firsteverjob.toLowerCase() === 'yes') {
            await this.page.waitForTimeout(500);
            await super.setTextWithType(this.page.getByPlaceholder('DD').first(), String(firstJobExpiryDate));
        }
        await this.hrSubmit.click();
    }

    // Worker Job History in Polish
    async dodajHistorieZatrudnienia(FirstEverJobDetails: string, FirstJobStartDate: string, FirstJobExpiryDate: string) {
        await this.page.waitForTimeout(500);
        await this.dodajHistorieZatrudnieniaTitle.waitFor({ state: 'visible' });
        await this.dodajHistorieZatrudnieniaTitle.click();
        await this.page.waitForLoadState();
        if (FirstEverJobDetails !== "No" && FirstEverJobDetails !== "N/A" && FirstEverJobDetails !== "NaN" && FirstEverJobDetails !== undefined && FirstEverJobDetails !== "") {
            await this.addRow.click();
            await super.setText(this.companyName, FirstEverJobDetails);
            await super.setTextWithType(this.page.getByPlaceholder('DD').nth(0), FirstJobStartDate.toString());
            await super.setTextWithType(this.page.getByPlaceholder('DD').nth(1), FirstJobExpiryDate.toString());
            await this.page.keyboard.press('Tab');
            // await super.setTextWithType(this.startDate, FirstJobStartDate);
            // await super.setTextWithType(this.endDate, FirstJobExpiryDate);
        }
        await this.page.waitForTimeout(500);
        await this.hrSubmit.click();
    }


    //@added by Gayatri for new change for PK17
    async workerJobHistory() {
        await this.workerjobhistory.click();
        await this.page.waitForTimeout(500);
        await this.hrSubmit.click();
    }

    async compensationHRapprove(): Promise<void> {
        await this.page.waitForTimeout(500);
        await this.compensationTitle.click();
        await this.page.getByRole('button', { name: 'Approve' }).click();
        await this.page.waitForTimeout(700);
    }


    async setMaintainRightToWorkDocumentation(): Promise<void> {
        await this.page.waitForTimeout(2000);
        await this.page.waitForLoadState();
        if (await this.rightToWork.count() > 0) {
            await this.rightToWork.click();
            await this.page.waitForTimeout(500);
            await this.page.getByRole('button', { name: 'Submit' }).click();
            await this.page.waitForTimeout(1000);
        }
    }

    async assignPaygroupApprove(): Promise<void> {
        await this.page.waitForLoadState();
        await this.assignPGApprove.click();
        await this.Approve.click();
    }

    async medicalExam(givenName: string, familyName: string): Promise<void> {
        await this.page.locator('//div[@data-automation-id="titleText" and contains(text(),"Medical exam: Onboarding for ' + givenName + ' ' + familyName + '")]').click();
        await this.hrSubmit.click();
    }

    async nationalHealthFundCode(HealthFundCode: string): Promise<void> {
        await this.page.waitForLoadState();
        if (await this.nationalHealthFundCodeTitle.count() > 0) {
            await this.nationalHealthFundCodeTitle.click();
            await this.page.waitForLoadState();
            const locator = await this.page.locator('//label[contains(text(),"Kod NFZ")]/parent::div/following-sibling::div/descendant ::input');
            await super.setTextWithDoubleEnter(locator, HealthFundCode);
            await this.page.waitForTimeout(1000);
            await this.hrSubmit.click();
        }
    }

    async setServiceDates(SeniorityDate:string) {
        await this.page.waitForTimeout(500);
        await this.setservicedateschange.waitFor({ state: 'visible' });
        await this.setservicedateschange.click();
        await this.page.waitForLoadState();
        await super.setTextWithType(this.seniorityDate, SeniorityDate.toString());
        await this.hrSubmit.click();
        await this.page.waitForTimeout(500);
    }

    async SetMedicalExamForm() {
        await this.page.waitForTimeout(500);
        
        await this.addMedicalExam.waitFor({ state: 'visible' });
        await this.addMedicalExam.click();
        await this.page.waitForLoadState();
        await this.hrSubmit.click();
        await this.page.waitForTimeout(500);
    }

    async maidenNamePageSubmit() {
        await this.maidenNameHungary.click();
        await this.paygroupSubmit.click();
        await this.page.waitForTimeout(500);
    }


    async assignPayGroupSubmit(ProposedPayGroup: any): Promise<void> {
        await this.assignPaygroup.click();
        await this.page.waitForLoadState();
        await super.selectFromCustomDropDrown(this.assignPg, ProposedPayGroup.toString());
        await this.page.keyboard.press('Tab');
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await this.page.waitForTimeout(700);
    }


    async assignPayGroupForHireApprove(ProposedPayGroup: any) {
        await this.hrAssignPayGroupForHire.click();
        //await this.assignPg.fill(ProposedPayGroup.toString());
        await super.selectFromCustomDropDrown(this.assignPg, ProposedPayGroup.toString());
        await this.page.getByRole('button', { name: 'Approve' }).click();
        await this.page.waitForTimeout(700);
    }



    async assignPayGroupApprove(ProposedPayGroup: any): Promise<void> {
        await this.page.waitForTimeout(700);
        await this.AssignPaygroupforPayroll.click();
        await this.page.waitForLoadState();
        await super.selectFromCustomDropDrown(this.assignPg, ProposedPayGroup.toString());
        await this.page.getByRole('button', { name: 'Approve' }).click();
        await this.page.waitForTimeout(700);
    }

    // async assignPayGroupApprove(ProposedPayGroup: any): Promise<void> {
    //     await this.assignPaygroup.click();
    //     await super.selectFromCustomDropDrown(this.assignPg, ProposedPayGroup.toString());
    //     await this.Approve.click();
    // }

    async updatePassportsAndVisa(): Promise<void> {
        await this.passportVisa.click();
        await this.page.getByRole('button', { name: 'Approve' }).click();
    }

    async clickInboxMyTaskAndSubmit(varString: string) {
        if (this.page.locator("//div[@data-automation-id='titleText'][contains(./text(),'" + varString + " " + this.givenName1 + " " + this.fimilyName1 + "')]").isVisible()) {
            await super.click(this.page.locator("//div[@data-automation-id='titleText'][contains(./text(),'" + varString + " " + this.givenName1 + " " + this.fimilyName1 + "')]").first());
            await super.click(this.hrSubmit);
        }
    }

    async clickInboxMyTaskAndSubmitIfVisible(varString: string) {
        const locator = await this.page.locator("//div[@data-automation-id='titleText'][contains(./text(),'" + varString + " " + this.givenName1 + " " + this.fimilyName1 + "')]").first();
        await this.page.waitForTimeout(1000);
        if (await locator.isVisible() && await locator.count() > 0) {
            await super.click(locator);
            await super.click(this.hrSubmit);
        }

    }

    async clickInboxMyTaskAndApproveIfVisible(varString: string) {
        const locator = await this.page.locator("//div[@data-automation-id='titleText'][contains(./text(),'" + varString + " " + this.givenName1 + " " + this.fimilyName1 + "')]");
        const approve = await this.page.getByRole('button', { name: 'Approve' });
        await this.page.waitForTimeout(1000);
        if (await locator.first().isVisible() && await locator.first().count() > 0) {
            await super.click(locator.first());
            await super.click(approve);
            await this.page.waitForTimeout(2500);
            if (await approve.isVisible() && await locator.count() > 0) {
                await super.click(approve);
            }
            await this.page.waitForTimeout(500);
        }
    }
    async clickInboxMyTaskAndApprove(varString: string) {
        const locator = await this.page.locator("//div[@data-automation-id='titleText'][contains(./text(),'" + varString + " " + this.givenName1 + " " + this.fimilyName1 + "')]");
        const approve = await this.page.getByRole('button', { name: 'Approve' });
        await this.page.waitForLoadState();
        await this.page.waitForTimeout(2500);
        await super.click(locator.first());
        await this.page.waitForLoadState();
        await super.click(approve);
        await this.page.waitForTimeout(3000);
        if (await approve.isVisible() && await locator.isVisible()) {
            await super.click(approve);
        }
        await this.page.waitForTimeout(500);
    }

    async clickInboxMyTaskAndApproveOnce(varString: string) {
        const locator = await this.page.locator("//div[@data-automation-id='titleText'][contains(./text(),'" + varString + " " + this.givenName1 + " " + this.fimilyName1 + "')]");
        const approve = await this.page.getByRole('button', { name: 'Approve' });
        await this.page.waitForLoadState();
        await this.page.waitForTimeout(2500);
        await super.click(locator.first());
        await this.page.waitForLoadState();
        await super.click(approve);
        await this.page.waitForTimeout(3000);
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
        await this.idChange.waitFor({ state: 'visible' });
        await this.idChange.click();
        await this.page.waitForLoadState();
        await this.addId.click();
        await this.fillGovIDDetails(country1, NationalIDType1, NIDPersonal, IssuedDate1, ExpirationDate1, true);

        if (!country1.includes("Slovakia") && !country1.includes("Belgium")) {
            // Adding second ID
            await this.page.waitForTimeout(500);
            await this.addId.click();
            await this.fillGovIDDetails(Country2, NationalIDType2, IDCardNumber, IssuedDate2, ExpirationDate2, false);
        }

        await this.submit.click();
        await this.page.waitForTimeout(500);
        if (await this.idChange.count() > 0 && await this.contractWarningAlert.count() > 0) {
            await this.submit.click();
        }
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


    async setchangePersonalInformation(gender: string, dob: string, city: string, martialstat: string,
        maritalStatusDate: string, citizen: string, national: string, CountryOFBirth: string, RegionOfBirth: string) {
        await this.page.waitForTimeout(5000);
        await this.hrchgPersonalInformation.waitFor({ state: 'visible' });
        await this.hrchgPersonalInformation.click();
        await this.page.waitForLoadState();
        await super.click(this.editGender);
        await super.click(this.setGenderdrpDown);
        await super.click(this.page.locator('[aria-label=' + gender + ']'));
        await super.click(this.page.locator('//div[@data-automation-id="saveButton"]//*[@aria-label="Save Gender"]'));

        await super.click(this.editDob);
        await super.setTextWithType(this.page.getByPlaceholder('DD'), String(dob));
        await this.page.getByLabel('Save Date of Birth').first().scrollIntoViewIfNeeded();
        await super.click(this.page.getByLabel('Save Date of Birth').first());

        await this.page.waitForTimeout(500);
        if (CountryOFBirth !== "NaN" && CountryOFBirth !== "N/A" && CountryOFBirth !== undefined) {
            await super.click(this.editPlace);
            await this.page.waitForTimeout(500);
            await this.page.getByLabel('Country of Birth').first().focus();
            //await super.setTextWithEnter(this.page.locator('(//div[@data-automation-id="monikerSearchBox"]//input)[1]'), CountryOFBirth.toString());
            await super.setTextWithType(this.page.getByLabel('Country of Birth').first(), CountryOFBirth.toString());
            await super.click(this.page.getByLabel('Save Place of Birth'));
        }

        if (RegionOfBirth !== "NaN" && RegionOfBirth !== "N/A" && RegionOfBirth !== undefined) {
            await super.click(this.editPlace);
            await super.setTextWithEnter(this.page.getByLabel('Region of Birth').first(), RegionOfBirth.toString());
            await super.click(this.page.getByLabel('Save Place of Birth'));
        }

        if (city !== "NaN" && city !== "N/A" && city !== undefined) {
            await super.click(this.editPlace);
            await super.setTextWithEnter(this.cityofBirth, city);
            await super.click(this.page.getByLabel('Save Place of Birth'));
        }

        if (martialstat !== "NaN" && martialstat !== "N/A" && martialstat !== undefined) {
            if (await this.editmartial.isVisible()) {
                await super.click(this.editmartial);
                await super.setTextWithEnter(this.martialstatus, martialstat);
                //*@Gayatri for poland 
                if (maritalStatusDate !== "NaN" && maritalStatusDate !== "N/A" && maritalStatusDate !== undefined) {
                    await super.setTextWithType(this.page.getByPlaceholder('DD').first(), maritalStatusDate);
                }
                await super.click(this.page.getByLabel('Save Marital Status'));
            } else {
                console.log('Edit martial button is not present on the page so marking as skipping/fail. ');
            }

        }

        await super.click(this.editCitizenship);
        await super.selectFromCustomDropDrown(this.citizenship, citizen);
        //await super.setTextWithDoubleEnter(this.page.getByRole('textbox', { name: 'Citizenship Status' }),citizen);
        await super.click(this.page.getByLabel('Save Citizenship Status'));

        if (national !== "" && national !== "NaN" && national !== "N/A" && national !== undefined) {
            await super.click(this.editNationality);
            await super.setTextWithDoubleEnter(this.nationality, national);
            await this.page.waitForTimeout(1000);
        }
        await super.click(this.hrSubmit);
        return 1;
    }

    async setchangePersonalInformationBelgiumPK14(gender: string, dob: string, city: string, martialstat: string,
        maritalStatusDate: string, citizen: string, national: string, CountryOFBirth: string, RegionOfBirth: string,
        edulevel: string) {
        await this.hrchgPersonalInformationTitle.click();
        await this.page.waitForLoadState();
        await super.click(this.editGender);
        await super.click(this.setGenderdrpDown);
        await super.click(this.page.locator('[aria-label=' + gender + ']'));
        await super.click(this.page.locator('//div[@data-automation-id="saveButton"]//*[@aria-label="Save Gender"]'));

        await super.click(this.editDob);
        await super.setTextWithType(this.page.getByPlaceholder('DD'), dob);
        await this.page.getByLabel('Save Date of Birth').first().scrollIntoViewIfNeeded();
        await super.click(this.page.getByLabel('Save Date of Birth').first());

        await this.page.waitForTimeout(500);
        await super.click(this.editPlace);
        if (CountryOFBirth !== "NaN" && CountryOFBirth !== "N/A" && CountryOFBirth !== undefined) {
            await this.page.waitForTimeout(500);
            await super.click(this.txtCountryOfBirth);
            await this.page.waitForTimeout(500);
            await this.page.getByLabel('Country of Birth').first().focus();
            //await super.setTextWithEnter(this.page.locator('(//div[@data-automation-id="monikerSearchBox"]//input)[1]'), CountryOFBirth.toString());
            await super.setTextWithEnter(this.page.getByLabel('Country of Birth').first(), CountryOFBirth.toString());
            // await super.click(this.page.getByLabel('Save Place of Birth'));
        }

        if (RegionOfBirth !== "NaN" && RegionOfBirth !== "N/A" && RegionOfBirth !== undefined) {
            await super.click(this.txtRegionOfBirth);
            await super.setTextWithEnter(this.page.getByLabel('Region of Birth').first(), RegionOfBirth.toString());
            // await super.click(this.page.getByLabel('Save Place of Birth'));
        }

        if (city !== "NaN" && city !== "N/A" && city !== undefined) {
            await super.click(this.txtCityOfBirth);
            await super.setTextWithEnter(this.cityofBirth, city);
            // await super.click(this.page.getByLabel('Save Place of Birth'));
        }
        await super.click(this.page.getByLabel('Save Place of Birth'));

        if (martialstat !== "NaN" && martialstat !== "N/A" && martialstat !== undefined) {
            if (await this.editmartial.isVisible()) {
                await super.click(this.editmartial);
                await super.setTextWithEnter(this.martialstatus, martialstat);
                //*@Gayatri for poland 
                if (maritalStatusDate !== "NaN" && maritalStatusDate !== "N/A" && maritalStatusDate !== undefined) {
                    await super.setTextWithType(this.page.getByPlaceholder('DD').first(), maritalStatusDate);
                }
                await super.click(this.page.getByLabel('Save Marital Status'));
            } else {
                console.log('Edit martial button is not present on the page so marking as skipping/fail. ');
            }

        }

        await super.click(this.editCitizenship);
        await super.selectFromCustomDropDrown(this.citizenship, citizen);
        //await super.setTextWithDoubleEnter(this.page.getByRole('textbox', { name: 'Citizenship Status' }),citizen);
        await super.click(this.page.getByLabel('Save Citizenship Status'));

        if (national !== "" && national !== "NaN" && national !== "N/A" && national !== undefined) {
            await super.click(this.editNationality);
            await super.setTextWithDoubleEnter(this.nationality, national);
            await this.page.waitForTimeout(1000);
        }

        if (edulevel !== "" && edulevel !== "NaN" && edulevel !== "N/A" && edulevel !== undefined) {
            await super.click(this.editEduLevel);
            await super.setTextWithDoubleEnter(this.eduLevel, edulevel);
            await this.page.waitForTimeout(1000);
        }
        await super.click(this.hrSubmit);
        return 1;
    }

    async hrcontractAddendum() {
        await this.contractAddendum.click();
        await this.page.waitForTimeout(500);

        if (await this.contractAddendumtext.isVisible()) {
            await this.hrSubmit.click();
        }
    }

    async hrHireAdditionalDataSK(mealvoucher: string, insuracneType: string, youngParent: string,
        youngParentEffectiveDate: string, taxFreeAmount: string, taxFreeAmountEffectiveDate: string, pensioneffectiveDate: string) {

        await super.click(this.hireAdditiondata);
        const warningText = '*Do not enter more than 6 Dependents. A maximum of 6 Dependents will be sent to Payroll*';
        const isWarningPresent = await this.page.locator('b').allTextContents();

        if (!isWarningPresent.includes(warningText)) {
            await super.setTextWithDoubleEnter(this.mealvoucher, mealvoucher);
            await this.setTextWithDoubleEnter(this.healthSK, insuracneType);
        }
        if (youngParent.toLocaleLowerCase() === "yes" && youngParent !== undefined) {
            await super.click(this.chkYoungParent);
            //  data.TaxFreeAmount, data.PensioneffectiveDate, data.
            if (youngParentEffectiveDate.toLocaleLowerCase() !== undefined && youngParentEffectiveDate !== "NaN") {
                await super.setTextWithType(this.txtYoungParentEffectiveDate, youngParentEffectiveDate);
            }
        }
        if (taxFreeAmount.toLocaleLowerCase() === "yes" && taxFreeAmount !== undefined) {
            await super.setText(this.chkTaxFreeAmount, taxFreeAmount);
            await super.setTextWithEnter(this.txtTaxFreeAmountEffectiveDate, taxFreeAmountEffectiveDate);
        }
        if (pensioneffectiveDate.toLocaleLowerCase() === "yes" && pensioneffectiveDate !== undefined) {
            await super.setTextWithType(this.txtPensioneffectiveDate, pensioneffectiveDate);
        }
        await super.click(this.hrSubmit);
    }

    async hrHireAdditionalDataDependentSK(Child: string, DependentName: string, DependentChildBirthNumber: string, TaxBonus: string, TaxBonusEffectiveDate: string) {
        await this.page.waitForTimeout(500);
        if (await this.hireadditiondatasub.isVisible()) {
            await this.hireadditiondatasub.click({ 'force': true });
            if (await Child.toLocaleLowerCase() === 'yes') {
                await expect(this.page.locator('b')).toContainText('*Do not enter more than 6 Dependents. A maximum of 6 Dependents will be sent to Payroll*');
                await this.page.getByLabel('Add Row').click();
                await this.page.waitForTimeout(500);
                await this.page.getByRole('textbox').nth(1).fill(DependentName);
                await this.page.getByRole('textbox').nth(1).press('Tab');
                await this.page.getByRole('textbox').nth(2).fill(String(DependentChildBirthNumber));
                const checkbox = await this.page.locator('//*[@data-automation-id="checkboxPanel"]//*[@type="checkbox"]').first().or(await this.page.locator('//*[@data-automation-id="checkboxPanel"]').first());
                if (TaxBonus.toLocaleLowerCase() === 'yes' && TaxBonusEffectiveDate !== 'N/A' && TaxBonusEffectiveDate !== "" && TaxBonusEffectiveDate !== undefined) {
                    await checkbox.click();
                    await this.page.getByPlaceholder('DD').first().type(TaxBonusEffectiveDate);
                } else if (TaxBonus.toLocaleLowerCase() === 'no' && TaxBonusEffectiveDate !== 'N/A' && TaxBonusEffectiveDate !== "" && TaxBonusEffectiveDate !== undefined) {
                    await this.page.getByPlaceholder('DD').first().type(TaxBonusEffectiveDate);
                }

            }
            await this.hrSubmit.click();
            await this.page.waitForTimeout(500);
        }
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

    async setManageProbation(probEndDate: string, probReviewDate: string) {
        await this.page.waitForTimeout(3000);
        if (await this.manageProbation.count() > 0) {
            await super.click(this.manageProbation);
            // await super.setTextWithType(this.prbStartDate, '');
            await this.page.waitForTimeout(1000);
            if (await probEndDate != 'NaN' && await probEndDate != 'N/A' && await probEndDate != undefined) {
                await super.setTextWithType(this.prbEndDate, probEndDate);
            }
            if (await probReviewDate != 'NaN' && await probReviewDate != 'N/A' && await probReviewDate != undefined) {
                await super.setTextWithType(this.prbReviewDate, probReviewDate);
            }
            await super.click(this.hrSubmit);
            await this.page.waitForTimeout(1000);
            if (await this.contractWarningAlert.isVisible() && await this.manageProbation.isVisible()) {
                await super.click(this.hrSubmit);
            }

        } else {
            console.log("Manage Probation Period Page is missing for This job profiles.");
        }





        // if (await probReviewDate != 'NaN' && await probReviewDate != 'N/A' && await probReviewDate != undefined) {
        //     await super.setTextWithType(this.prbReviewDate, probReviewDate);
        // }
        // await this.page.waitForTimeout(600);
        // await super.click(this.hrSubmit);
        // await this.page.waitForTimeout(1500);
        // if (await this.contractWarningAlert.isVisible() && await this.manageProbation.isVisible()) {
        //     await super.click(this.hrSubmit);
        // }
        // await this.page.waitForTimeout(500);
        // if (await this.contractWarningAlert.isVisible() && await this.manageProbation.isVisible()) {
        //     await super.click(this.hrSubmit);
        // }
    }

    async setManageProbationHun(probEndDate: string, probReviewDate: string) {
        await this.page.waitForTimeout(1000);
        if (await this.manageProbationHUn.count() > 0) {
            await super.click(this.manageProbationHUn);
            // await super.setTextWithType(this.prbStartDate, '');
            if (await probEndDate != 'NaN' && await probEndDate != 'N/A' && await probEndDate != undefined) {
                await super.setTextWithType(this.prbEndDate, probEndDate);
            }
            if (await probReviewDate != 'NaN' && await probReviewDate != 'N/A' && await probReviewDate != undefined) {
                await super.setTextWithType(this.prbReviewDate, probReviewDate);
            }
            await super.click(this.hrSubmit);
            await this.page.waitForTimeout(1000);
            if (await this.contractWarningAlert.isVisible() && await this.manageProbation.isVisible()) {
                await super.click(this.hrSubmit);
            }
            await this.page.waitForTimeout(1000);
            if (await this.contractWarningAlert.isVisible() && await this.manageProbation.isVisible()) {
                await super.click(this.hrSubmit);
            }
        } else {
            console.log("Manage Probation Period Page is missing for This job profiles.");
        }


    }

    async clickEditNoticePeriodsforHireSubmit() {
        await super.click(this.editNoticePeriod);
        await super.click(this.hrSubmit)
    }
    // async VerifyNationalityOnborading() {
    //     await this.page.waitForTimeout(800);
    //     await this.verifyNationality.click();
    //     await this.page.waitForTimeout(300);
    //     await super.click(this.hrSubmit)
    // }
    async VerifyNationalityOnborading() {
        // Wait for the button to be visible and enabled before clicking
        await this.verifyNationality.waitFor({ state: 'visible' });
        await this.verifyNationality.click();

        // Ensure the submit button is also ready before clicking
        await this.hrSubmit.waitFor({ state: 'visible' });
        await super.click(this.hrSubmit);
    }

    async PersonalInformationChangeApprove() {
        // Wait until the personal information page link/button is visible in the DOM
        await this.personalInformationChangePage.waitFor({ state: 'visible' });
        await this.personalInformationChangePage.click();

        // Wait until the "Approve" button is visible and ready
        const approveButton = this.page.getByRole('button', { name: 'Approve' });
        await approveButton.waitFor({ state: 'visible' });
        await approveButton.click();
    }

    // async PersonalInformationChangeApprove() {
    //     await this.page.waitForTimeout(800);
    //     await this.personalInformationChangePage.click();
    //     await this.page.getByRole('button', { name: 'Approve' }).click();
    // }



    async hrManageProbation(probReviewDate: string) {
        await this.page.waitForTimeout(500);
        if (await this.manageProbation.isVisible() && await this.manageProbation.count() > 0) {
            await this.manageProbation.click();
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

    //Generic Function For MainJob Page @Added By Gayatri to set mainjob ,pensioner,Carer

    async hireAdditionalInfoMainJob(mainjobdetails: string, Pensioner: string, carer: string) {
        await this.hireAdditiondata.click();
        await this.page.waitForTimeout(500);
        //await this.mainJob.click();
        await super.selectFromCustomDropDrown(this.mainJob, mainjobdetails);
        await this.page.waitForTimeout(200);
        if (Pensioner.toLowerCase() === "yes") {
            await this.pensioner.click()
        }
        if (carer.toLowerCase() === 'yes') {
            await this.carer.click()

        }
        await this.hrSubmit.click(); //Last step
    }

}



// }