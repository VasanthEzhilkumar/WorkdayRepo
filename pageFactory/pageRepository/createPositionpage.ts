import { WebActionsPage } from '@lib/WebActionPage';
import { Locator, Page } from '@playwright/test';
// import RegistrationPageConstants from '../src/constants/RegistrationPageConstants';


export class createPositionPage extends WebActionsPage {
    readonly page: Page;
    readonly hireDate: Locator;
    readonly reason: Locator;
    readonly empType: Locator;
    readonly jobprofile: Locator;
    readonly timetype: Locator;
    readonly location: Locator;
    readonly additionlInformation: Locator;
    readonly additonaljobClassification: Locator;
    readonly workshift: Locator;
    readonly okButton: Locator;
    readonly emailTypeExtended: Locator;
    readonly additionclassifiction: string;
    readonly additionalJobClassificationEXp: Locator;
    readonly workshiftExp: Locator;
    readonly submitButton: Locator;
    readonly additionalJobClassificationClick: Locator;
    readonly additionalJobsecondItm: Locator;
    readonly schdeuledHours: Locator;
    readonly endEmploymentDate: Locator;
    readonly addcls: Locator;
    readonly supervisorMgrPage: Locator;
    readonly positionrequest: Locator;
    strRandom: string;
    readonly jobtitle: Locator;
    readonly avialbledate: Locator;
    readonly earlierhiredate: Locator;
    readonly workersubtye: Locator;
    readonly assignOrg: Locator;
    readonly paygroupSubmit: Locator;
    readonly WorkerSubTypedd: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.positionrequest = page.getByLabel('Position Request Reason');
        this.jobtitle = page.getByLabel('Job Posting Title');
        this.WorkerSubTypedd = page.locator("//label[contains(.,'Worker Sub-Type')]/parent::div/following-sibling::div/descendant::input[@placeholder='Search']");

        this.assignOrg = page.locator('[aria-label="Inbox Items"] >> text=Assign Organizations: Create Position:');
        this.paygroupSubmit = page.locator('button:has-text("Submit")');

        this.avialbledate = page.locator("//label[contains(.,'Availability Date')]/parent::div/following-sibling::div/descendant::input[@data-automation-id='dateSectionDay-input']");
        this.earlierhiredate = page.locator("//label[contains(.,'Earliest Hire Date')]/parent::div/following-sibling::div/descendant::input[@data-automation-id='dateSectionDay-input']");

        //Hire Employee Locators
        this.hireDate = page.locator('[aria-label="Day"]').first();
        //this.hireDate = page.locator('text=Hire DateHire Datecurrentvalue is DD/MM/YYYYDD/MM/YYYYuse right and left arrows >> div[role="group"]');
        this.reason = page.locator('text=ReasonReason0 items selected >> [placeholder="Search"]');
        this.empType = page.getByLabel('Worker Type');
        this.jobprofile = page.getByLabel('Job Profile');
        this.timetype = page.getByLabel('Time Type');
        this.location = page.getByLabel('Location');
        this.workersubtye = page.getByLabel('Worker Sub-Type');
        this.additionlInformation = page.locator('text=Additional Information');
        this.additonaljobClassification = page.locator('text=Additional Job ClassificationsAdditional Job Classifications0 items selected >> [placeholder="Search"]');
        // text=Options ExpandedC - Regular labour contract (Romania Contract Types-Romania) >> [placeholder="Search"]
        this.addcls = page.locator('label:has-text("Additional Job Classifications")');
        this.additionalJobClassificationEXp = page.locator('text=Additional Job ClassificationsAdditional Job ClassificationsOptions Expanded >> [placeholder="Search"]');
        this.additionalJobClassificationClick = page.locator('text=Additional Job ClassificationsAdditional Job Classifications1 item selected, C - >> [placeholder="Search"]');
        this.additionalJobsecondItm = page.locator('text=Additional Job ClassificationsAdditional Job Classifications2 items selected, C  >> [placeholder="Search"]');
        this.workshift = page.locator('text=0 items selectedError: Select a Work Shift. >> [placeholder="Search"]');
        this.workshiftExp = page.locator('text=Options ExpandedError: Select a Work Shift. >> [placeholder="Search"]');
        this.schdeuledHours = page.locator('label:has-text("Scheduled Weekly Hours")');
        this.endEmploymentDate = page.locator('label:has-text("End Employment Date")');
        this.submitButton = page.getByRole('button', { name: 'Submit' })

    }


    /**
       * Creating a new Account
       * @param supervisoryOrganisation * @param givenname     * @param Country 
       * @param FamilyName 
       * @param PhoneDevice 
       * @param phoneNumber 
       * @param phoneType 
       * @param city 
       * @param address 
       * @param state 
       * @param postalCode 
       * @param EffectiveDate
       * @param Country
       * @param Street
       * @param BuildingNumber
       * @param StreetNumber
       * @param PostalCode
       * @param County
       * @param addressType
       * @param UseFor
       * @param EmailAddress
       * @param EmailType
       * @param HireDate
       * @param Reason
       * @param Position
       * @param EmployeeType
       * @param JobProfile
       * @param TimeType
       * @param Location
       * @param PayRateType
       * @param ScheduledWeeklyHours
       * @param AdditionalJobClassifications
       * @param WorkShift
       * @param EndEmploymentDate
       * @param Comments
       * @param CostCenter
       * @param DepartmentSection
       * @param ProposedPayGroupInitial
       * @param ProposedPayGroupFinal
       * @param MealVoucher
       * @param MedicalInsurance
       * @param HealthHouse
       * @param BasicFunction
       * @param Pensioner
       * @param NegotiatedLeave	
       * @param ProbationReviewDate
       * @param Reason
       * @param ContractID
       * @param ContractType	
       * @param Status
       * @param DateEmployeeSigned
       * @param DateEmployerSigned
       * @param ContractEndDate
       * @param Country1
       * @param NationalIDType1
       * @param DepartmentSection
       * @param IssuedDate1
       * @param ExpirationDate1
       * @param Country2
       * @param NationalIDType2
       * @param DepartmentSection
       * @param IssuedDate2
       * @param ExpirationDate2
       * @param IssuedBy2
       * @param Series2
       * @param Salary
       * @param Gender
       * @param DateOfBirth
       * @param CityOfBirth
       * @param MaritalStatus
       * @param MaritalStatusDate
       * @param CitizenshipStatus
       * @param PrimaryNationality
       * @param BankName
       * @param BankCode
       * @param AccountType
       * @param AccountNumber
       * @param IBAN
       * @param FNameType
       * @param Country
       * @param FGivenName
       * @param FFamilyName
       * @returns 
       */


    async createPositionRequest() {
        await super.setTextWithEnter(this.positionrequest, "New"); //.positionrequest.fill('New');
        // await this.page.waitForTimeout(1000);
        // await this.positionrequest.press('Enter');
        // await this.page.waitForTimeout(1000);
        // await this.positionrequest.press('Enter');
    }
    async createPositionRequestReason() {
        await super.setTextWithEnter(this.positionrequest, "New"); //.positionrequest.fill('New');
    }

    async setPositionTitle() {
        this.strRandom = 'Auto' + ' ' + (await this.randomGenerator()).toString();
        await super.setTextWithEnter(this.jobtitle, this.strRandom);
        //await this.jobtitle.fill(this.strRandom);
        return this.strRandom.toString();
    }

    async randomGenerator() {
        let datestr = Math.floor((Math.random() * 100000000) + 1)
        datestr.toString();
        return datestr;
    }

    async createPositionForManager(availabilitydate: string, earliestdate: string, EmployeeType: string, jobprofile: string, timetype: string, Location: string) {

        await this.createPositionRequestReason();
        let  position:string = await this.setPositionTitle();
        await super.click(this.avialbledate);
        await super.setTextWithType(this.avialbledate, availabilitydate);
        await super.click(this.earlierhiredate);
        await super.setTextWithType(this.earlierhiredate, earliestdate);
        await super.setTextWithDoubleEnter(this.jobprofile, jobprofile);
        await super.setTextWithDoubleEnter(this.location, Location);
        await super.selectFromCustomDropDrown(this.timetype, timetype);
        await super.setTextWithEnter(this.empType, "Employee");
        await super.selectFromCustomDropDrown(this.workersubtye, EmployeeType);
        await super.click(this.paygroupSubmit);
        return position;
    }

    async assignDeparment() {

        await this.assignOrg.click();

        await this.paygroupSubmit.click();
        await this.page.waitForTimeout(500);
    }


    // async createPositionForManager(Availabilitydate: string, Earliestdate: string, EmployeeType: string,
    //     Jobprofile: string, Timetype: string, Location: string) {
    //            this.createPositionForManager(Availabilitydate, Earliestdate, EmployeeType, Jobprofile, Timetype, Location);
    // }





}

//code to auto generate random number ? 




