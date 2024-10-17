import { WebActionsPage } from "@lib/WebActionPage";
import { Page, BrowserContext, Locator, expect } from "@playwright/test";
import { stat } from "fs";

export class hireEmpUSPage extends WebActionsPage {
 readonly page: Page
  readonly fName: Locator;
  readonly lName: Locator;
  readonly addressStreet: Locator;
  readonly addressPostalCode: Locator;
  readonly addressCity: Locator;
  readonly addressState: Locator;
  readonly addressType: Locator;
  readonly addAddress: Locator;

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
  readonly position: Locator;
  readonly defaultHours: Locator;


  constructor(page: Page, context: BrowserContext) {
    super(page);
    this.page = page;
    this.fName = page.getByLabel('First Name');
    this.lName = page.getByLabel('Last Name');
    this.addAddress = page.locator('[aria-label="Add Address"]');

    this.addressStreet = page.getByLabel('Address Line 1')//page.locator('label:has-text("Street Name")');// page.locator('[id="\\35 6\\$34052--uid45-input"]');//page.locator('label:has-text("Street Name")');//page.locator('[id="\\35 6\\$34052--uid45-input"]');//text=StreetStreet
    this.addressPostalCode = page.getByLabel('Postal Code');//page.locator('label:has-text("Postal Code")');//page.locator('[id="\\35 6\\$34052--uid52-input"]');
    this.addressCity = page.getByLabel('City');//page.locator('label:has-text("City/Town or Post Office")');//page.locator('[id="\\35 6\\$34052--uid53-input"]');//page.locator('label:has-text("City/Town or Post Office")');//page.locator('[id="\\35 6\\$34052--uid53-input"]');
    this.addressState = page.getByLabel('State', { exact: true })

    this.addressType = page.getByLabel('Address', { exact: true }).getByLabel('Type');

    this.emailTypeExtended = page.locator('text=TypeType0 items selected, press enter to view all options, or type to search and >> [placeholder="Search"]')
    //Hire Employee Locators
    this.hireDate = page.locator('[aria-label="Day"]');

    this.position = page.getByLabel('Position');
    //this.hireDate = page.locator('text=Hire DateHire Datecurrentvalue is DD/MM/YYYYDD/MM/YYYYuse right and left arrows >> div[role="group"]');
    this.reason = page.locator('text=ReasonReason0 items selected >> [placeholder="Search"]');
    this.empType = page.getByLabel('Employee Type');//locator('text=Employee TypeEmployee Type0 items selected >> [placeholder="Search"]');
    this.jobprofile = page.getByLabel('Job Profile', { exact: true })//locator('text=Job ProfileJob Profile0 items selected >> [placeholder="Search"]');
    this.timetype = page.getByLabel('Time Type', { exact: true })//locator('text=Time TypeTime Type0 items selected >> [placeholder="Search"]');
    this.location = page.getByLabel('Location', { exact: true });//locator('text=LocationLocation0 items selected >> [placeholder="Search"]');
    this.additionlInformation = page.getByText('Additional Information');//locator('text=Additional Information');
    this.additonaljobClassification = page.getByLabel('Additional Job Classifications');//locator('text=Additional Job ClassificationsAdditional Job Classifications0 items selected >> [placeholder="Search"]');
    // text=Options ExpandedC - Regular labour contract (Romania Contract Types-Romania) >> [placeholder="Search"]
    this.addcls = page.locator('label:has-text("Additional Job Classifications")');
    this.additionalJobClassificationEXp = page.locator('text=Additional Job ClassificationsAdditional Job ClassificationsOptions Expanded >> [placeholder="Search"]');
    this.additionalJobClassificationClick = page.locator('text=Additional Job ClassificationsAdditional Job Classifications1 item selected, C - >> [placeholder="Search"]');
    this.additionalJobsecondItm = page.locator('text=Additional Job ClassificationsAdditional Job Classifications2 items selected, C  >> [placeholder="Search"]');
    this.workshift = page.getByLabel('Work Shift')//locator('text=0 items selectedError: Select a Work Shift. >> [placeholder="Search"]');
    this.workshiftExp = page.locator('text=Options ExpandedError: Select a Work Shift. >> [placeholder="Search"]');
    this.schdeuledHours = page.getByLabel('Scheduled Weekly Hours')//locator('label:has-text("Scheduled Weekly Hours")');
    this.defaultHours = page.getByLabel('Default Weekly Hours');
    this.endEmploymentDate = page.getByLabel('End Employment Date');
    this.submitButton = page.locator('button:has-text("SUBMIT")');

  }


  async legalInfo(fname: string, lname: string) {

    await this.fName.type(fname);
    await this.lName.type(lname);
  }


  async contactInfoUS(address: string, PostalCode: number, city: string, state: string, addressType: string) {
    await this.page.waitForTimeout(500);
    await this.addAddress.click();
    await this.addressStreet.fill(address);
    await this.addressState.fill(state);
    await this.addressPostalCode.fill(PostalCode.toString());
    await this.addressCity.fill(city);
    await this.addressType.click()
    await this.page.getByLabel('' + addressType + ' checkbox Not Checked').getByRole('checkbox').check();

  }


  async hireEmployeeJobDetails(
    HireDate: string,
    EmployeeType: string,
    jobprofile: string,
    timetype: string,
    workshift: string,
    AdditionalJobClassifications: string,
    position: string,
    schdeuledhours: any
  ) {
    const str: String[] = AdditionalJobClassifications.split('@');

    await this.hireDate.waitFor();
    await this.page.waitForTimeout(1000);
    const [day, month, year] = HireDate.split('/');


    // Optionally: Focus and type the value
    await this.page.focus('input[placeholder="DD"]');
    await this.page.type('input[placeholder="DD"]', day);

    await this.page.focus('input[placeholder="MM"]');
    await this.page.type('input[placeholder="MM"]', month);
    await this.page.focus('input[placeholder="YYYY"]');
    await this.page.type('input[placeholder="YYYY"]', year);


    await this.page.getByLabel('Day', { exact: true }).fill(day);
    //await this.page.getByText('DD', { exact: true }).fill(day);
    await this.page.getByLabel('Month').fill(month);
    await this.page.getByLabel('Year').fill(year);
    //await this.hireDate.fill(HireDate);
    await this.reason.fill("New Hire");
    await this.page.waitForTimeout(1000);
    await this.page.keyboard.press('Enter');

    if (!position.includes('Auto')) {
      // await this.empType.waitFor();
      // await this.empType.fill(EmployeeType);
      // await this.page.waitForTimeout(1000);
      await super.selectFromCustomDropDrown(this.empType,EmployeeType);
      // await this.empType.press('Enter');
          // await this.page.waitForTimeout(1000);
      // await this.page.keyboard.press('Enter');


      await this.jobprofile.waitFor();
      await this.jobprofile.fill(jobprofile);
      await this.page.waitForTimeout(1000);
      await this.jobprofile.press('Enter');
      await this.page.getByText(jobprofile).click();
      await this.page.waitForTimeout(1000);



      await this.timetype.waitFor();
      await this.timetype.fill(timetype);
      await this.page.waitForTimeout(1000);
      await this.timetype.press('Enter');
      await this.page.waitForTimeout(500);
      //await this.page.getByText(timetype).click();

      await this.location.waitFor();
      await this.location.fill('121');
      await this.location.press('Enter');
    }

    await this.additionlInformation.waitFor();
    await this.additionlInformation.click();

    await this.additonaljobClassification.waitFor();
    await this.additonaljobClassification.fill(str[0].toString());
    await this.additonaljobClassification.press('Enter');

    if (str[1]) {
      await this.addcls.waitFor();
      await this.addcls.fill(str[1].toString());
      await this.page.keyboard.press('Enter');
    }
    const workshifUS = this.page.getByLabel('Default Work Shift (United States of America)', { exact: true })
    if (!(await workshifUS.count() > 0)) {

      await this.workshift.waitFor();
      await this.workshift.click();

      await this.page.waitForTimeout(500);
      await this.workshiftExp.waitFor();
      await this.workshiftExp.fill(workshift);
      await this.page.waitForTimeout(500);
      await this.workshiftExp.press('Enter');
    }


    await this.schdeuledHours.waitFor();
    await this.schdeuledHours.fill(schdeuledhours.toString());
    await this.page.waitForTimeout(500);

    // await this.defaultHours.waitFor();
    // await this.defaultHours.fill(defaultHours);

    if (!(EmployeeType.includes('Permanent') || EmployeeType.includes('Regular') || EmployeeType.includes('Seasonal'))) {
      await this.endEmploymentDate.waitFor();
      //await this.page.getByLabel('End Employment Date').fill('01/12/2025');
      // await this.endEmploymentDate.fill('01/12/2024');
      // Focus and fill Day (DD)
      await this.page.getByLabel('End Employment Date').getByPlaceholder('DD').focus();
      await this.page.getByLabel('End Employment Date').getByPlaceholder('DD').type('31');

      // Focus and fill Month (MM)
      await this.page.getByLabel('End Employment Date').getByPlaceholder('MM').focus();
      await this.page.getByLabel('End Employment Date').getByPlaceholder('MM').type('12');

      // Focus and fill Year (YYYY)
      await this.page.getByLabel('End Employment Date').getByPlaceholder('YYYY').focus();
      await this.page.getByLabel('End Employment Date').getByPlaceholder('YYYY').type('2025');

    }

    await this.submitButton.waitFor();
    await this.submitButton.click();

    await this.page.waitForTimeout(1000);

    // Check for error button
    const errorButton = this.page.getByRole('button', { name: 'Error' });
    if (await errorButton.count() > 0) {
      await errorButton.click();

    }
  }



}

