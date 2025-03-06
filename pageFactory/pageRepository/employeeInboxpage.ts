import { appCommons } from '@lib/appCommons';
import { WebActionsPage } from '@lib/WebActionPage';
import { BrowserContext, Locator, Page } from '@playwright/test';

export class employeeInboxPage extends WebActionsPage {
    readonly page: Page;
    readonly givenname: string;
    readonly assignPaygroup: Locator;
    readonly fillPaygroup: Locator;
    readonly paygroupSubmit: Locator;
    readonly assignOrg: Locator;
    readonly editOther: Locator;
    readonly setDeparment: Locator;
    readonly saveDep: Locator;
    readonly onBoarding: Locator;
    readonly addPhoto: Locator;
    readonly addBankDetails: Locator;
    readonly paymentElections: Locator;
    readonly bankName: Locator;
    readonly bankIdentificationCode: Locator;
    readonly accountNumber: Locator;
    readonly IBAN: Locator;
    readonly okButton: Locator;
    readonly chgContactInformation: Locator;
    readonly chgPersonalInformation: Locator;
    readonly buttonchgpersonal: Locator;
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
    readonly peopleLink: Locator;
    readonly personaldetails: Locator;
    readonly addPersonalDetails: Locator;
    readonly nameType: Locator;
    readonly givenName: Locator;
    readonly familyName: Locator;
    readonly okButtonpage: Locator;
    readonly fathersname: Locator;
    readonly doneButton: Locator;
    readonly reviewDoc: Locator;
    readonly addCerti: Locator;
    readonly romFather: Locator;
    readonly agreeCheckbox: Locator;
    readonly addEdu: Locator;
    readonly perInformation: Locator;
    readonly maidenName: Locator;
    readonly agreeCheckboxGrid1: Locator;
    readonly agreeCheckboxGrid2: Locator;
    readonly relatedActionsEmp: Locator;
    readonly PaymentElectionsEmp: Locator;
    readonly hoverPersonalData: Locator;
    readonly AccountName: Locator;
    readonly costCenter: Locator;
    readonly editCostCenter: Locator;
    readonly txtCostCenter: Locator;
    readonly saveCostCenterbtn: Locator;
    readonly btnAddPaymentElections: Locator;
    readonly appCommon: appCommons;
    readonly addBankDetails1: Locator;
    readonly maritalStatusDate: Locator;
    readonly ChangeContactInfo: Locator;
    readonly nameofbank: Locator;
    readonly addDependents: Locator;
    readonly healthcareProviderMealVoucher: Locator;
    readonly setHealthInsuranceCompany: Locator;
    readonly saveHealthInsuranceCompany: Locator;
    readonly setMealVoucher: Locator;
    readonly saveMealVoucher: Locator;
    readonly addEducation: Locator;
    readonly btnSkillsAndExperience: Locator;
    readonly tabEducation: Locator;
    readonly btnAdd: Locator;
    readonly eduCountry: Locator;
    readonly eduSchool: Locator;
    readonly eduDegree: Locator;
    readonly eduDegreeReceived: Locator;
    readonly eduYearDegreeReceived: Locator;
    readonly eduFieldOfStudy: Locator;
    readonly eduFirstYearAttened: Locator;
    readonly eduLastYearAttened: Locator;
    readonly eduGradeAverage: Locator;
    readonly hrchgPersonalInformation: Locator;
    readonly hireEmployeeBel: Locator;
    readonly partnerRevenue: Locator;

    constructor(page: Page, givenname: string, FamilyName: string, jobprofile: string, context: BrowserContext) {
        super(page)
        this.appCommon = new appCommons(page, context);
        this.page = page;

        this.partnerRevenue = page.getByLabel('Partner Revenue');
        this.hireEmployeeBel = page.getByRole('button', { name: 'Hire: ' + givenname + ' ' + FamilyName }).first();

        this.assignPaygroup = page.locator('[aria-label="Inbox Items"] >> text=Assign Pay Group for Hire: ' + givenname + ' ' + FamilyName + '');
        this.fillPaygroup = page.locator('text=Proposed Pay GroupProposed Pay Group0 items selected >> [placeholder="Search"]');
        this.paygroupSubmit = page.locator('button:has-text("Submit")');

        this.costCenter = page.getByLabel('Edit Cost Center')
        this.editCostCenter = page.getByLabel('Edit Cost Center')
        this.txtCostCenter = page.getByLabel('Content Area').getByPlaceholder('Search').first();

        this.assignOrg = page.getByRole('button', { name: 'Assign Organizations: Hire:' + ' ' + givenname + ' ' + FamilyName + ' ' }).first();//locator('[aria-label="Inbox Items"] >> text=Assign Organizations: Hire:'+' '+givenname+' '+FamilyName+' ');
        this.editOther = page.locator('[aria-label="Edit Other"]');
        this.setDeparment = page.locator("//div[contains(./text(),'Department/Section')]/ancestor::li/following-sibling::li/descendant::input[@placeholder='Search']").first();
        this.saveDep = page.locator('[aria-label="Save Other"]');
        this.saveCostCenterbtn = page.locator('[aria-label="Save Cost Center"]');

        this.onBoarding = page.locator('text=Onboarding Guide:' + ' ' + jobprofile + ' - ' + givenname + ' ' + FamilyName);
        //text=Onboarding Guide: Retail Assistant_NEW - ZESKY ELVEN (10286606)

        this.addPhoto = page.getByRole('button', { name: 'Add a Photo', exact: true });
        this.ChangeContactInfo = page.getByRole('button', { name: 'Change/Update My Contact Information', exact: true });
        this.addBankDetails1 = page.locator("//div[@data-automation-id='titleText'][contains(./text(),'Add Bank Details')]");
        this.addBankDetails = page.getByRole('button', { name: 'Add ' + givenname + ' ' + FamilyName + ' ' })
        this.paymentElections = page.locator('button:has-text("Add Payment Elections")');
        this.bankName = page.locator('label:has-text("Bank Name")');
        this.bankIdentificationCode = page.getByLabel('Bank Identification Code');
        this.accountNumber = page.locator('label:has-text("Account Number")');
        this.IBAN = page.locator('label:has-text("IBAN")');
        this.okButton = page.locator('button:has-text("OK")');
        this.nameofbank = page.getByLabel('Name On Account');

        this.chgContactInformation = page.locator('[aria-label="Inbox Items"] >> text=Change/Update My Contact Information');
        this.chgPersonalInformation = page.getByRole('button', { name: 'Change/Update My Personal Information', exact: true });//locator('[aria-label="Inbox Items"] >> text=Change/Update My Personal Information');
        this.buttonchgpersonal = page.locator('button:has-text("Change My Personal Information")');
        this.hrchgPersonalInformation = page.getByRole('button', { name: 'Personal Information Change: ' + givenname + ' ' + FamilyName }).first();//locator('[aria-label="Inbox Items"] >> text=Change/Update My Personal Information');
        this.editGender = page.locator('[aria-label="Edit Gender"]');
        this.editDob = page.locator('[aria-label="Edit Date of Birth"]');
        this.editPlace = page.locator('[aria-label="Edit Place of Birth"]');
        this.editmartial = page.locator('[aria-label="Edit Marital Status"]');
        this.editCitizenship = page.locator('[aria-label="Edit Citizenship Status"]');
        this.editNationality = page.locator('[aria-label="Edit Nationality"]');

        this.chgGovid = page.getByRole('button', { name: 'Change/Update My Government IDs', exact: true })//locator('[aria-label="Inbox Items"] >> text=Change/Update My Government IDs');
        this.addemergncyContacts = page.getByRole('button', { name: 'Add Emergency Contacts', exact: true })//locator('[aria-label="Inbox Items"] >> text=Add Emergency Contacts');

        this.setGenderdrpDown = page.locator('text=select oneselect one');
        this.setGender = page.locator('[aria-label="Male"]');
        this.cityofBirth = page.locator('input[role="textbox"]');
        this.martialstatus = page.locator('text=Marital StatusMarital Status0 items selected, press enter to view all options, o >> [placeholder="Search"]');
        this.citizenship = page.locator('text=Citizenship StatusCitizenship Status0 items selected, press enter to view all op >> [placeholder="Search"]');
        this.nationality = page.locator('text=Primary NationalityPrimary Nationality0 items selected, press enter to view all  >> [placeholder="Search"]');
        // Click [aria-label="Male"]

        this.peopleLink = page.locator('a:has-text("' + givenname + ' ' + FamilyName + ' ")');
        this.personaldetails = page.locator('[aria-label="Navigation pane"] >> text=Personal');
        this.addPersonalDetails = page.locator('[aria-label="Names"] button:has-text("Add")');
        this.nameType = page.locator('text=Name TypeName Type0 items selected >> [placeholder="Search"]');
        this.fathersname = page.locator('text=Father\'s Name');
        this.givenName = page.locator('label:has-text("Given Name")');
        this.familyName = page.locator('label:has-text("Family Name")');
        this.okButtonpage = page.locator('button:has-text("OK")');
        this.doneButton = page.locator('button:has-text("Done")');

        this.reviewDoc = page.getByRole('button', { name: 'Review Documents', exact: true }).first();//locator('[aria-label="Inbox Items"] >> text=Review Documents');
        this.addCerti = page.getByRole('button', { name: 'Add Certifications (External)', exact: true })//locator('[aria-label="Inbox Items"] >> text=Add Certifications (External)');
        this.romFather = page.locator('[aria-label="Inbox Items"] >> text=Romania Father');

        // this.agreeCheckbox = page.locator('[id="\\32 97-container"] [id="\\35 6\\$202639"] div').nth(2);//locator('[id="\\33 20-container"] [id="\\35 6\\$202639"] div').nth(2)
        this.agreeCheckbox = page.locator("(//div[contains(@data-automation-id,'checkboxPanel')])");
        //this.agreeCheckbox = page.locator('//div[@data-automation-id="checkboxPanel"]');//locator('[id="\\32 97-container"] [id="\\35 6\\$202639"] div').nth(2);//locator('[id="\\33 20-container"] [id="\\35 6\\$202639"] div').nth(2)
        this.agreeCheckboxGrid1 = page.locator('//div[contains(@data-automation-id,"checkboxPanel")]');//locator('[id="\\35 6\\$202639--uid152"] div')
        this.agreeCheckboxGrid2 = page.locator('[id="\\33 43-container"] [id="\\35 6\\$202639"] div').nth(2);//locator('[id="\\35 6\\$202639--uid142"] div')//locator('label:has-text("I Agree")');locator('[id="\\35 6\\$202639--uid162"] div')
        this.addEdu = page.getByRole('button', { name: 'Add Education', exact: true });

        this.perInformation = page.locator('[aria-label="Inbox Items"] >> text=Personal Information Change: ' + ' ' + givenname + ' ' + FamilyName);

        this.maidenName = page.getByRole('button', { name: 'Please Add Maiden Name', exact: true })//locator('[aria-label="Inbox Items"] >> text=Please Add Maiden Name');

        this.relatedActionsEmp = page.getByLabel('Related Actions ' + ' ' + givenname + ' ' + FamilyName)

        this.PaymentElectionsEmp = page.getByLabel('Personal Data Maintain').getByText('Maintain Payment Elections')
        this.hoverPersonalData = page.getByText('Personal Data');
        this.btnAddPaymentElections = page.locator("//button[@title='Add Payment Elections'][contains(.,'Add Payment Elections')]").first();
        this.AccountName = page.getByLabel('Name On Account');
        this.maritalStatusDate = page.locator('');
        this.addDependents = page.getByRole('button', { name: 'Please Add Your Dependents', exact: true });
        this.healthcareProviderMealVoucher = page.locator('//div[@data-automation-id="titleText" and contains(text(),"Meal Voucher")]');
        this.setHealthInsuranceCompany = page.locator('//label[contains(text(),"Health Insurance Company")]/parent::div/following-sibling::div/descendant::input');
        this.saveHealthInsuranceCompany = page.locator('//label[contains(text(),"Health Insurance Company")]/parent::div/following-sibling::div//div[@data-automation-id="multiselectInputContainer"]//span');
        this.setMealVoucher = page.locator('//label[contains(text(),"Meal Voucher")]/parent::div/following-sibling::div/descendant::input');
        this.saveMealVoucher = page.locator('//label[contains(text(),"Meal Voucher")]/parent::div/following-sibling::div//div[@data-automation-id="multiselectInputContainer"]//span');
        this.addEducation = page.locator('//div[@data-automation-id="titleText" and contains(text(),"Add Education")]');
        this.btnSkillsAndExperience = page.locator('button[title="Skills and Experience"]');
        this.tabEducation = page.locator('(//div[@data-automation-id="tabLabel" and text()="Education"])[1]');
        this.btnAdd = page.locator('(//button[@title="Add"])[2]');
        this.eduCountry = page.locator('//label[contains(text(),"Country")]/parent::div/following-sibling::div/descendant::input');
        this.eduSchool = page.locator('(//label[contains(text(),"School")]/parent::div/following-sibling::div/descendant::input)[1]');
        this.eduDegree = page.locator('//label[contains(text(),"Degree")]/parent::div/following-sibling::div/descendant::input');
        this.eduDegreeReceived = page.locator('//div[@data-automation-id="selectWidget"]//div[@data-automation-id="selectShowAll"]');
        this.eduYearDegreeReceived = page.locator('//label[contains(text(),"Year Degree Received")]/parent::div/following-sibling::div/descendant::input');
        this.eduFieldOfStudy = page.locator('//label[contains(text(),"Field of Study")]/parent::div/following-sibling::div/descendant::input');
        this.eduFirstYearAttened = page.locator('//label[contains(text(),"First Year Attended")]/parent::div/following-sibling::div/descendant::input');
        this.eduLastYearAttened = page.locator('//label[contains(text(),"Last Year Attended")]/parent::div/following-sibling::div/descendant::input');
        this.eduGradeAverage = page.locator('//label[contains(text(),"Grade Average")]/parent::div/following-sibling::div/descendant::input');
    }



    async reviewDocumentSubmitGeneric() {
        await this.page.waitForTimeout(500);
        if (await this.reviewDoc.isVisible()) {
            await super.click(this.reviewDoc);
            await this.page.waitForTimeout(1500);
            for (let i = 1; i <= await this.agreeCheckbox.count(); i++) {
                // await this.page.waitForTimeout(1500);
                if (await this.page.locator('(//div[contains(@data-automation-id,"checkboxPanel")])[' + i + ']').count() > 0) {
                    // await this.page.waitForTimeout(1000);
                    await this.page.locator('(//div[contains(@data-automation-id,"checkboxPanel")])[' + i + ']').scrollIntoViewIfNeeded();
                    await super.click(this.page.locator('(//div[contains(@data-automation-id,"checkboxPanel")])[' + i + ']'));
                }
            }
            await this.page.waitForTimeout(500);
            await this.paygroupSubmit.click();
        }
    }
    /**
     * @author : Madhukar Kirkan
     * @description : Added method for Belgium.
     * @param PartnerRevenue 
     */
    async setPartnerRevenueBelgiumDependents(PartnerRevenue: string) {
        await super.click(this.hireEmployeeBel);
        await super.setTextWithDoubleEnter(this.partnerRevenue, PartnerRevenue.toString());
        await this.paygroupSubmit.click();
    }

    async assignPayGroup() {
        await this.assignPaygroup.click();
        await this.fillPaygroup.fill("please select a Romania Pay Group");
        await this.fillPaygroup.press('Enter');
        await this.page.waitForTimeout(100);
        await this.paygroupSubmit.click();
        await this.page.waitForTimeout(500);
    }

    async setCostCenter(CostCenter: string) {
        //  await this.page.getByRole('button', { name: 'Assign Organizations: Hire:'+' '+givenname+' '+Familyname+' '}).first().click();
        await this.costCenter.click();
        await this.page.getByLabel('Content Area').getByPlaceholder('Search').fill(CostCenter);
        await this.page.getByLabel('Content Area').getByPlaceholder('Search').press('Enter');
        await this.page.waitForTimeout(500);
        await this.paygroupSubmit.click();
        await this.page.waitForTimeout(500);
    }

    async assigncostCenter(CostCenter: string) {
        //  await this.page.getByRole('button', { name: 'Assign Organizations: Hire:'+' '+givenname+' '+Familyname+' '}).first().click();
        await this.costCenter.click();
        await this.page.getByLabel('Content Area').getByPlaceholder('Search').fill(CostCenter);
        await this.page.getByLabel('Content Area').getByPlaceholder('Search').press('Enter');
        await this.page.waitForTimeout(500);
        await this.paygroupSubmit.click();
        await this.page.waitForTimeout(500);
    }

    //used to set Cost Center and Deparment fields on Assign Organization page.
    async setDeparmentAndCostCenter(position: string, CostCenter: string, Department: string, givenname: string, Familyname: string) {

        if (position.includes('Auto')) {
            await super.click(this.page.getByRole('button', { name: 'Assign Organizations: Create Position: ' + position }).first());
        } else {
            await this.page.getByRole('button', { name: 'Assign Organizations: Hire:' + ' ' + givenname + ' ' + Familyname + ' ' }).first().click();
        }
        await super.click(this.editCostCenter);
        await super.setTextWithDoubleEnter(this.txtCostCenter, String(CostCenter));
        await super.click(this.saveCostCenterbtn);
        await super.click(this.editOther);
        await super.setTextWithDoubleEnter(this.setDeparment, String(Department));
        //await super.click(this.saveDep);
        await super.click(this.paygroupSubmit);
    }

    async assignDeparment(CostCenter: string, givenname: string, Familyname: string) {
        await this.page.getByRole('button', { name: 'Assign Organizations: Hire:' + ' ' + givenname + ' ' + Familyname + ' ' }).first().click();
        await this.editOther.click();
        await this.setDeparment.fill(CostCenter);
        await this.setDeparment.press('Enter');
        await this.page.waitForTimeout(500);
        await this.saveDep.click();
        await this.page.waitForTimeout(500);
        await this.paygroupSubmit.click();
        await this.page.waitForTimeout(500);
    }

    async onBoardingGuide() {
        await this.page.waitForTimeout(500);
        await this.onBoarding.click();
        await this.paygroupSubmit.click();
        await this.page.waitForTimeout(500);
    }

    async empaddPhoto() {
        await this.page.waitForTimeout(500);
        await this.addPhoto.click();
        await this.paygroupSubmit.click();
        await this.page.waitForTimeout(500);
    }
    //"@Gayatari"
    async empChgeContactInformation() {
        await this.page.waitForTimeout(500);
        await this.ChangeContactInfo.click();
        await this.paygroupSubmit.click();
        await this.page.waitForTimeout(500);
    }

    async empaddDependents() {
        await this.page.waitForTimeout(500);
        await this.addDependents.click();
        await this.paygroupSubmit.click();
        await this.page.waitForTimeout(500);
    }

    async empHealthcareProviderMealVoucher(insuranceCompany: string, mealVoucher: string) {
        await this.page.waitForTimeout(500);
        await this.healthcareProviderMealVoucher.click();
        await this.setHealthInsuranceCompany.focus();
        await this.page.keyboard.type(String(insuranceCompany));
        await this.saveHealthInsuranceCompany.click();


        // await this.page.waitForTimeout(500);
        // await this.page.keyboard.press("enter");
        // await this.setHealthInsuranceCompany.press("enter");
        // await this.setHealthInsuranceCompany.type(insuranceCompany);
        // await this.setHealthInsuranceCompany.press('Enter');
        await this.page.waitForTimeout(500);
        await this.setMealVoucher.focus();
        await this.page.waitForTimeout(500);
        await this.page.keyboard.type(String(mealVoucher));
        await this.page.waitForTimeout(2000);
        await this.saveMealVoucher.click();
        await this.page.waitForTimeout(2000);
        // await this.page.waitForTimeout(500);
        // await this.setMealVoucher.press("enter");
        // await this.setMealVoucher.type(mealVoucher);
        // await this.setMealVoucher.press('Enter');        
        await this.paygroupSubmit.click();
        await this.page.waitForTimeout(500);
    }

    async empAddEducation(
        country: string,
        School: string,
        Degree: string,
        DegreeReceived: string,
        YearDegreeReceived: string,
        FieldOfStudy: string,
        FirstYearAttended: string,
        LastYearAttended: string,
        GradeAverage: string
    ) {
        await this.page.waitForTimeout(500);
        await this.addEducation.click();
        await this.btnSkillsAndExperience.click();
        await this.tabEducation.click();
        await this.btnAdd.click();
        await this.eduCountry.fill(country);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1500);
        // await this.eduCountry.press("enter");
        await super.setTextWithDoubleEnter(this.eduSchool, String(School));
        await this.page.waitForTimeout(500);
        await super.setTextWithDoubleEnter(this.eduDegree, String(Degree));
        await this.page.waitForTimeout(500);
        await this.eduDegreeReceived.click();
        await this.page.locator('//div[@data-automation-id="promptOption" and @data-automation-label="' + DegreeReceived + '"]').click();
        await super.setTextWithType(this.eduYearDegreeReceived, YearDegreeReceived);
        await super.setTextWithDoubleEnter(this.eduFieldOfStudy, FieldOfStudy);
        await this.page.locator('//div[@data-automation-id="promptOption" and @data-automation-label="' + FieldOfStudy + '"]').click();

        await super.setTextWithType(this.eduFirstYearAttened, FirstYearAttended);
        await super.setTextWithType(this.eduLastYearAttened, LastYearAttended);
        await this.eduGradeAverage.fill(GradeAverage);
        await this.paygroupSubmit.click();
        await this.page.waitForTimeout(500);
    }

    async empAddEducationSubmit() {
        await this.page.waitForTimeout(500);
        await this.addEducation.click();

        await this.paygroupSubmit.click();
    }

    async empaddBankDetails(bankname: string, bankidentificationnumber: string, accnumber: any, ibannum: any) {

        await this.relatedActionsEmp.click();
        await this.hoverPersonalData.hover();
        await this.PaymentElectionsEmp.click();
        await this.page.waitForTimeout(500);
        await this.addBankDetails.click();
        // await this.paymentElections.click();
        await this.bankName.click();
        await this.bankName.fill(bankname);

        await this.bankIdentificationCode.click();
        await this.bankIdentificationCode.fill(bankidentificationnumber);

        await this.accountNumber.click();
        await this.accountNumber.fill(accnumber.toString());

        await this.IBAN.click();
        await this.IBAN.fill(ibannum.toString());
        await this.page.waitForTimeout(500);

        await this.AccountName.fill('TestAutomation');

        await this.okButton.click();
        await this.page.waitForTimeout(500);
    }

    async addEmployeeBankDetails(bankName: string, bankidentificationnumber: string, accNumber: string, IBANNumber: string, AccType: string) {
        await this.page.waitForTimeout(1000);
        await super.click(this.addBankDetails1);
        // if (await this.btnAddPaymentElections.isVisible()) {
        await super.click(this.btnAddPaymentElections);
        await this.page.waitForTimeout(1000);
        await super.setText(this.bankName, bankName);
        await super.setText(this.bankIdentificationCode, bankidentificationnumber);
        if (String(accNumber) !== "NaN" && String(accNumber) !== "N/A" && String(accNumber) !== undefined) {
            await super.setText(this.accountNumber, accNumber);
        }
        await super.setText(this.IBAN, IBANNumber);
        await this.page.locator('//label[@data-automation-label="' + AccType + '"]').click();
        //await super.setText(this.AccountName, 'TestAutomation');
        await super.click(this.okButton);
        this.page.waitForTimeout(200);
        //await this.appCommon.ClickInbox();
        await this.appCommon.MyTasks();
        await super.click(this.addBankDetails1);// }
        await this.paygroupSubmit.click();
    }

    async addEmployeeBankDetailsPoland(bankName: string, bankidentificationnumber: string,
        accNumber: string, IBANNumber: string, nameonAccount: string) {
        await super.click(this.addBankDetails1);
        // if (await this.btnAddPaymentElections.isVisible()) {
        await super.click(this.btnAddPaymentElections);
        await super.setText(this.bankName, bankName);
        await super.setText(this.bankIdentificationCode, bankidentificationnumber);
        await super.setText(this.accountNumber, accNumber);
        await super.setText(this.IBAN, IBANNumber);
        await super.setText(this.nameofbank, nameonAccount);
        //await super.setText(this.AccountName, 'TestAutomation');
        await super.click(this.okButton);
        this.page.waitForTimeout(200);
        //await this.appCommon.ClickInbox();
        await this.appCommon.MyTasks();
        await super.click(this.addBankDetails1);// }
        await this.paygroupSubmit.click();
    }


    async empaddBanksubmit() {

        await this.addBankDetails.click();

        await this.paygroupSubmit.click();

    }

    async changeContactInformation() {

        await this.page.waitForTimeout(500);
        await this.chgContactInformation.click();
        await this.paygroupSubmit.click();

    }

    async changePersonalInformation(gender: string, dob: string, city: string, martialstat: string,
        maritalStatusDate: string, citizen: string, national: string, CountryOFBirth: string, RegionOfBirth: string) {

        // await this.page.waitForTimeout(500);
        await this.chgPersonalInformation.click();
        // if (await this.buttonchgpersonal.isVisible()) {
        await super.click(this.buttonchgpersonal);
        await super.click(this.editGender);
        await super.click(this.setGenderdrpDown);
        await super.click(this.page.locator('[aria-label=' + gender + ']'));
        await super.click(this.page.locator('//div[@data-automation-id="saveButton"]//*[@aria-label="Save Gender"]'));

        await super.click(this.editDob);
        await super.setTextWithType(this.page.getByPlaceholder('DD'), dob);
        await super.click(this.page.getByLabel('Save Date of Birth'));

        if (CountryOFBirth !== "NaN" && CountryOFBirth !== "N/A" && CountryOFBirth !== undefined) {
            await super.click(this.editPlace);
            await super.setTextWithEnter(this.page.locator('//div[@data-automation-id="monikerSearchBox"] //input'), CountryOFBirth.toString());
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
            if (await this.editmartial.count() > 0) {
                await super.click(this.editmartial);
                await super.setTextWithEnter(this.martialstatus, martialstat);
                //*@Gayatri for poland 
                if (maritalStatusDate !== "NaN" && maritalStatusDate !== "N/A" && maritalStatusDate !== undefined) {
                    await super.setTextWithType(this.page.getByPlaceholder('DD'), maritalStatusDate);
                }
                await super.click(this.page.getByLabel('Save Marital Status'));
            } else {
                // console.error('Edit martial button is not present, and marking as fail. ');
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
            //await super.click(this.paygroupSubmit);
        }
        await super.click(this.paygroupSubmit);
    }
    async changePersonalInformationSubmit() {

        // await this.page.waitForTimeout(500);
        // await this.chgPersonalInformation.click();
        await this.perInformation.click();
        await this.page.waitForTimeout(500);
        await this.paygroupSubmit.click();

    }

    async changePersonalInformation1(dob: string, city: string, martialstat: string, citizen: string, national: string) {

        // await this.page.waitForTimeout(500);
        // await this.chgPersonalInformation.click();
        await this.perInformation.click();
        // if(await this.buttonchgpersonal.isVisible()){
        //await this.buttonchgpersonal.click();
        await this.editGender.click();

        await this.setGenderdrpDown.click();

        await this.setGender.click();

        await this.editDob.click();
        await this.page.waitForTimeout(1000);

        await this.page.keyboard.type(dob);

        await this.page.keyboard.press('Enter');

        await this.editPlace.click();

        await this.cityofBirth.fill(city);
        await this.page.keyboard.press('Enter');
        await this.editmartial.click();
        await this.martialstatus.fill(martialstat);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(500);
        await this.editCitizenship.click();
        await this.page.waitForTimeout(500);
        await this.citizenship.fill(citizen);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(500);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(500);
        await this.editNationality.click();
        await this.page.waitForTimeout(500);
        await this.nationality.fill(national);
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.paygroupSubmit.click();
        // }
    }

    async changepersonalinformationSubmit() {

        await this.chgPersonalInformation.click();

        await this.paygroupSubmit.click();
    }

    async changeGovIDInformation() {

        await this.page.waitForTimeout(500);
        await this.chgGovid.click();
        await this.paygroupSubmit.click();

    }

    async AddEmergecyInformation() {

        await this.page.waitForTimeout(500);
        await this.addemergncyContacts.click();
        await this.paygroupSubmit.click();

    }

    async employeeLinkClick() {

        await this.peopleLink.click();

    }
    async addAdditionalName(namType: string, givenname: string, familyname: string) {
        await super.click(this.personaldetails);
        await super.click(this.addPersonalDetails);
        await super.click(this.nameType);
        await super.click(this.fathersname);
        await super.click(this.page.locator("text='" + namType + "'"));
        await super.setText(this.givenName, givenname);
        await super.click(this.familyName);
        await super.setText(this.familyName, familyname);
        await super.click(this.okButtonpage);
        await super.click(this.doneButton);
    }

    async empFathername(namType: string, givenname: string, familyname: string) {
        //await this.peopleLink.click();
        await this.personaldetails.click();
        await this.addPersonalDetails.click();
        await this.nameType.click();
        await this.fathersname.click();
        await this.givenName.click();
        await this.page.waitForTimeout(500);
        await this.page.keyboard.type(givenname);
        await this.page.waitForTimeout(500);
        await this.familyName.click();
        await this.page.waitForTimeout(500);
        await this.page.keyboard.type(familyname);
        await this.page.waitForTimeout(500);
        await this.okButtonpage.click();
        await this.doneButton.click();
        await this.page.waitForTimeout(500);
    }

    async reviewDocumentSubmit() {

        await this.reviewDoc.click();
        await this.paygroupSubmit.click();
        await this.page.waitForTimeout(500);
    }

    async reviewDocumentSubmitSK() {
        await this.page.waitForTimeout(1000);
        if (await this.reviewDoc.isVisible()) {
            await super.click(this.reviewDoc);
            await this.page.waitForTimeout(1000);
            for (let i = 1; i <= await this.agreeCheckbox.count(); i++) {
                if (await this.page.locator('(//div[contains(@data-automation-id,"checkboxPanel")])[' + i + ']').isVisible()) {
                    await this.page.locator('(//div[contains(@data-automation-id,"checkboxPanel")])[' + i + ']').scrollIntoViewIfNeeded();
                    await super.click(this.page.locator('(//div[contains(@data-automation-id,"checkboxPanel")])[' + i + ']'));
                }
            }
            await this.paygroupSubmit.click();
        }
    }


    //@Madhukar Kirkan -> Making this generic to ensure that if there are 10 "Agree" checkboxes, the test cases won't fail; it will click all 10 "Agree" checkboxes.
    // async reviewDocumentSubmitGeneric() {
    //     await this.page.waitForTimeout(1000);
    //     if (await this.reviewDoc.isVisible()) {
    //         await super.click(this.reviewDoc);
    //         await this.page.waitForTimeout(500);
    //         for (let i = 1; i <= await this.agreeCheckbox.count(); i++) {
    //             if (await this.page.locator('(//div[contains(@data-automation-id,"checkboxPanel")])[' + i + ']').isVisible()) {
    //                 await this.page.locator('(//div[contains(@data-automation-id,"checkboxPanel")])[' + i + ']').scrollIntoViewIfNeeded();
    //                 await super.click(this.page.locator('(//div[contains(@data-automation-id,"checkboxPanel")])[' + i + ']'));
    //             }
    //         }
    //         await this.paygroupSubmit.click();
    //     }
    // }

    async clickIAgreeCheckBox() {
        await this.page.waitForTimeout(500);
        for (let i = 1; i <= await this.agreeCheckbox.count(); i++) {
            if (await this.page.locator('(//div[contains(@data-automation-id,"checkboxPanel")])[' + i + ']').isVisible()) {
                await this.page.locator('(//div[contains(@data-automation-id,"checkboxPanel")])[' + i + ']').scrollIntoViewIfNeeded();
                await super.click(this.page.locator('(//div[contains(@data-automation-id,"checkboxPanel")])[' + i + ']'));
            }
        }
    }

    async addCertificationSubmit() {

        await this.addCerti.click();

        await this.paygroupSubmit.click();
        await this.page.waitForTimeout(500);
    }

    async addeducationSubmit() {

        await this.addEdu.click();

        await this.paygroupSubmit.click();
        await this.page.waitForTimeout(500);
    }
    async romaniaFatherNameSubmit() {

        await this.romFather.click();

        await this.paygroupSubmit.click();
        await this.page.waitForTimeout(500);
    }

    async addMaidenNameSubmit() {

        await this.maidenName.click();

        await this.paygroupSubmit.click();
        await this.page.waitForTimeout(500);
    }

    async clickInboxMyTaskAndSubmit(varString: string) {
        if (await this.page.locator("//div[@data-automation-id='titleText'][contains(./text(),'" + varString + "')]").isVisible()) {
            await super.click(this.page.locator("//div[@data-automation-id='titleText'][contains(./text(),'" + varString + "')]"));
            await this.clickIAgreeCheckBox();
            await super.click(this.paygroupSubmit);
        }
    }

    async clickInboxMyTaskAndApprove(varString: string) {
        await super.click(this.page.locator("//div[@data-automation-id='titleText'][contains(./text(),'" + varString + "')]"));
        await this.clickIAgreeCheckBox();
        await super.click(this.page.getByRole('button', { name: 'Approve' }));
    }

}