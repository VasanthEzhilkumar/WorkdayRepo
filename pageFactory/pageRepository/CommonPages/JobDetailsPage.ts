import { appCommons } from '@lib/appCommons';
import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActionsPage } from 'lib/WebActionPage';


export class JobDetailsPage extends WebActionsPage {
  readonly page: Page;
  readonly supervisorysearch: Locator;
  readonly supervisorysearchexp: Locator;
  readonly newPreHire: Locator;
  readonly gName: Locator;
  readonly fName: Locator;
  readonly addphone: Locator;
  readonly addAddress: Locator;
  readonly addemail: Locator;
  readonly emailAddress: Locator;
  readonly emailType: Locator;
  readonly contactInformation: Locator;
  readonly contactPhoneNumber: Locator;
  readonly contactPhoneDevice: Locator;
  readonly contactPhoneDevicetext: Locator;
  readonly contactphoneType: Locator;
  readonly addressStreet: Locator;
  readonly addressPostalCode: Locator;
  readonly addressCity: Locator;
  readonly addressCounty: Locator;
  readonly addressType: Locator;
  readonly existingPreHire: Locator;
  readonly existingPreHireSearch: Locator;
  readonly okButtonHireEmployee: Locator;
  readonly supervisorhamburger: Locator;
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
  readonly position: Locator;
  readonly contactPhoneNumbermgr: Locator;
  readonly contactPhonedevicemgr: Locator;
  readonly contactPhoneTypemgr: Locator;
  readonly addressPostalCodemgr: Locator;
  readonly addressstreetmgr: Locator;
  readonly addcitymgr: Locator;
  readonly addressTypemgr: Locator;
  readonly emailAddressmgr: Locator;
  readonly emailTypemgr: Locator;
  readonly defaultHours: Locator;
  readonly context: BrowserContext;

  constructor(page: Page, context: BrowserContext) {
    super(page);
    this.page = page;
    this.context = context;
    this.supervisorysearch = page.locator('text=Supervisory OrganizationSupervisory Organization0 items selected >> [placeholder="Search"]');
    this.supervisorysearchexp = page.locator('text=Supervisory OrganizationSupervisory OrganizationOptions Expanded >> [placeholder="Search"]');
    this.supervisorhamburger = page.locator('text=Supervisory OrganizationSupervisory OrganizationOptions Expanded >> svg[role="presentation"]');
    this.supervisorMgrPage = page.getByLabel('Supervisory Organization');
    this.newPreHire = page.locator('text=Create a New Pre-Hire');
    this.contactInformation = page.locator('text=Contact Information >> nth=0');
    // this.gName = page.locator('[id="\\35 6\\$551056--uid22-input"]');
    // this.fName = page.locator('[id="\\35 6\\$551056--uid23-input"]');
    this.gName = page.locator('label:has-text("Given Name")');
    this.fName = page.locator('label:has-text("Family Name")')
    this.addphone = page.locator('[aria-label="Add Phone"]');
    this.addAddress = page.locator('[aria-label="Add Address"]');
    this.addemail = page.locator('[aria-label="Add Email"]');
    this.emailAddress = page.locator('text=Email AddressEmail AddressTypeType0 items selectedPrimary WorkPrimary WorkPrimar >> input[role="textbox"]');
    this.emailType = page.locator('text=Email AddressEmail AddressTypeType0 items selectedPrimary WorkPrimary WorkPrimar >> [placeholder="Search"]');
    this.contactPhoneNumber = page.locator('label:has-text("Phone Number")');//page.locator('label:has-text("Phone Number")');//page.locator('[id="\\35 6\\$506134--uid26-input"]');
    this.contactPhoneDevice = page.locator('text=select oneselect one');
    this.contactPhoneDevicetext = page.locator('div[role="option"]:has-text("Mobile")');
    this.contactphoneType = page.locator('text=TypeType0 items selected >> [placeholder="Search"]');
    this.addressStreet = page.getByLabel('Street Name')//page.locator('label:has-text("Street Name")');// page.locator('[id="\\35 6\\$34052--uid45-input"]');//page.locator('label:has-text("Street Name")');//page.locator('[id="\\35 6\\$34052--uid45-input"]');//text=StreetStreet
    this.addressPostalCode = page.getByLabel('Postal Code');//page.locator('label:has-text("Postal Code")');//page.locator('[id="\\35 6\\$34052--uid52-input"]');
    this.addressCity = page.getByLabel('City');//page.locator('label:has-text("City/Town or Post Office")');//page.locator('[id="\\35 6\\$34052--uid53-input"]');//page.locator('label:has-text("City/Town or Post Office")');//page.locator('[id="\\35 6\\$34052--uid53-input"]');
    this.addressCounty = page.locator('text=CountyCounty0 items selected >> [placeholder="Search"]');

    this.addressType = page.getByLabel('Address', { exact: true }).getByLabel('Type');//locator('text=UsageTypeType0 items selectedPrimary WorkPrimary WorkPrimary HomePrimary HomeUse >> [placeholder="Search"]');//page.locator('text=TypeType0 items selected >> [placeholder="Search"]');//
    this.existingPreHire = page.locator('text=Existing Pre-Hire0 items selected >> [placeholder="Search"]');
    this.existingPreHireSearch = this.page.locator('text=Existing Pre-HireOptions Expanded >> [placeholder="Search"]');
    this.okButtonHireEmployee = page.getByRole('button', { name: 'OK' })
    this.okButton = page.getByRole('button', { name: 'OK' })
    this.submitButton = page.locator('button:has-text("SUBMIT")');
    this.emailTypeExtended = page.locator('text=TypeType0 items selected, press enter to view all options, or type to search and >> [placeholder="Search"]')
    //Hire Employee Locators
    this.hireDate = page.locator('[aria-label="Day"]');

    this.position = page.getByLabel('Position').first();
    //this.hireDate = page.locator('text=Hire DateHire Datecurrentvalue is DD/MM/YYYYDD/MM/YYYYuse right and left arrows >> div[role="group"]');
    this.reason = page.locator('text=ReasonReason0 items selected >> [placeholder="Search"]');
    this.empType = page.getByLabel('Employee Type');//locator('text=Employee TypeEmployee Type0 items selected >> [placeholder="Search"]');
    this.jobprofile = page.getByLabel('Job Profile', { exact: true });//locator('text=Job ProfileJob Profile0 items selected >> [placeholder="Search"]');
    this.timetype = page.getByLabel('Time Type', { exact: true });//locator('text=Time TypeTime Type0 items selected >> [placeholder="Search"]');
    this.location = page.getByLabel('Location', { exact: true });//locator('text=LocationLocation0 items selected >> [placeholder="Search"]');
    this.additionlInformation = page.getByText('Additional Information');//locator('text=Additional Information');
    // this.additonaljobClassification = page.getByLabel('Additional Job Classifications');//locator('text=Additional Job ClassificationsAdditional Job Classifications0 items selected >> [placeholder="Search"]');

    this.additonaljobClassification = page.locator("//label[contains(.,'Additional Job Classifications')]/parent::div/following-sibling::div/descendant::input[@placeholder='Search']");
    // text=Options ExpandedC - Regular labour contract (Romania Contract Types-Romania) >> [placeholder="Search"]
    this.addcls = page.locator('label:has-text("Additional Job Classifications")');
    this.additionalJobClassificationEXp = page.locator('text=Additional Job ClassificationsAdditional Job ClassificationsOptions Expanded >> [placeholder="Search"]');
    this.additionalJobClassificationClick = page.locator('text=Additional Job ClassificationsAdditional Job Classifications1 item selected, C - >> [placeholder="Search"]');
    this.additionalJobsecondItm = page.locator('text=Additional Job ClassificationsAdditional Job Classifications2 items selected, C  >> [placeholder="Search"]');
    this.workshift = page.getByLabel('Work Shift')//locator('text=0 items selectedError: Select a Work Shift. >> [placeholder="Search"]');
    this.workshiftExp = page.locator("//label[contains(.,'Work Shift')]/parent::div/following-sibling::div/descendant::input[@placeholder='Search']");
    this.schdeuledHours = page.getByLabel('Scheduled Weekly Hours')//locator('label:has-text("Scheduled Weekly Hours")');
    this.defaultHours = page.getByLabel('Default Weekly Hours');
    this.endEmploymentDate = page.locator("//label[contains(.,'End Employment Date')]/parent::div/following-sibling::div/descendant::input[@data-automation-id='dateSectionDay-input']");
    this.contactPhoneNumbermgr = page.getByLabel('Phone Number');
    this.contactPhonedevicemgr = page.getByRole('button', { name: 'Phone Device' });
    this.contactPhoneTypemgr = page.getByLabel('Type');
    this.addressstreetmgr = page.getByRole('textbox', { name: 'Street' });
    this.addressPostalCodemgr = page.getByLabel('Postal Code');
    this.addcitymgr = page.getByLabel('City');
    this.addressTypemgr = page.getByRole('group', { name: 'Address' }).getByLabel('Type')
    this.emailAddressmgr = page.getByLabel('Email Address');
    this.emailTypemgr = page.getByRole('group', { name: 'Email' }).getByPlaceholder('Search');
  }

/*
@Description Method - It is Generic Method used to set Job Details of employee on Job detalis page(Hire employee Page)
*/
  async setJobDetails(
    HireDate1: string,
    EmployeeType: string,
    jobprofile: string,
    timetype: string,
    workshift: string,
    AdditionalJobClassifications: string,
    position: string,
    schdeuledhours: string,
    defaultHours: string,
    location: number,
    EndEmploymentDate: string,
  ) {
    const str: String[] = AdditionalJobClassifications.split('@');
    if (position == undefined) {
      position = "DummyValue";
    }
    await this.hireDate.waitFor();
    await this.hireDate.focus();
    await super.setTextWithType(this.hireDate,HireDate1);
    await super.setTextWithEnter(this.reason, "New Hire");
    if (!position.includes('Auto')) {
      await super.selectFromCustomDropDrown(this.empType, EmployeeType);
      await super.selectFromCustomDropDrown(this.jobprofile, jobprofile.toString());
      // await this.page.keyboard.press('Enter');
      await super.setTextWithEnter(this.timetype, timetype);
      await super.setTextWithEnter(this.location, location.toString());
    } else {
      await super.selectFromCustomDropDrown(this.position, position);
    }
    await super.click(this.additionlInformation);

    for (let i = 0; i < str.length; i++) {
      await super.setTextWithEnter(this.additonaljobClassification, str[i].toString());
    }
    await super.click(this.workshift);
    await super.setTextWithEnter(this.workshiftExp, workshift);
    await super.setText(this.schdeuledHours, schdeuledhours);
    if (await this.defaultHours.isVisible() && defaultHours != "NaN" && defaultHours != "N/A" && defaultHours != undefined) {
      await super.setText(this.defaultHours, defaultHours);
    }

    if (EndEmploymentDate != "N/A" && EndEmploymentDate != "NaN" && EndEmploymentDate != undefined) {
      await super.setTextWithType(this.endEmploymentDate, EndEmploymentDate);
    }
    await super.click(this.submitButton);
    // Check for error button
    const errorButton = this.page.getByRole('button', { name: 'Error' });
    if (await errorButton.count() > 0) {
      await errorButton.click();
    }
    // Wait for navigation or network idle state if applicable
    //await this.page.waitForLoadState('networkidle');
  }





}
