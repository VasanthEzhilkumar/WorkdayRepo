import { da } from "@faker-js/faker";
import { Page, BrowserContext, expect, Locator } from "@playwright/test";
import { stat } from "fs";
import { LogCallback } from "winston";

export class hrInboxUSPage {

    readonly page: Page;
    readonly onboardtxt: Locator;
    readonly submit: Locator;
    readonly manageProbation: Locator;
    readonly hrSubmit: Locator;
    readonly prbEndDate: Locator;
    readonly idChange: Locator;
    readonly addId: Locator;
    readonly GCountry: Locator;
    readonly GNationalIDType: Locator;
    readonly GID: Locator;
    readonly GExpirationDate: Locator;
    readonly GIssuedDate: Locator;
    readonly chgGovIds: Locator;
    readonly completeI9Review: Locator;
    readonly i9EmpTitle: Locator;
    readonly i9EmpLastname: Locator;
    readonly i9EmpFirstName: Locator;
    readonly i9EmpBusiness: Locator;
    readonly i9city: Locator;
    readonly i9state: Locator;;
    readonly i9zipcode: Locator;
    readonly i9ExpirationDate: Locator;
    readonly i9Documentnumber: Locator;
    readonly i9FirstEmpDate: Locator;
    readonly i9EmpOrg: Locator;
    readonly i9AgreeChkbox: Locator;
    readonly i9OverDueReason: Locator;


    constructor(page: Page, context: BrowserContext, givenName: string, familyName: string) {

        this.page = page;
        this.i9EmpTitle = page.getByLabel('Title of Employer or')
        this.i9EmpLastname = page.getByLabel('Last Name of Employer or')
        this.i9EmpFirstName = page.getByLabel('First Name of Employer or')
        this.i9EmpBusiness = page.getByLabel('Employer\'s Business or Organization Name')
        this.i9EmpOrg = page.getByLabel('Employer\'s Business or Organization Address (Street Number and Name)')
        this.i9city = page.getByLabel('City or Town')
        this.i9state = page.getByLabel('State', { exact: true });
        this.i9zipcode = page.getByLabel('ZIP Code')
        this.i9ExpirationDate = page.locator("(//input[@data-automation-id='dateSectionDay-input' and @role='spinbutton'])[1]/parent::div/input")
        this.i9Documentnumber = page.locator("(//label[contains(.,'Document Number')]/parent::div/following-sibling::div/descendant::input)[1]")
        this.i9FirstEmpDate = page.locator("(//input[@data-automation-id='dateSectionDay-input' and @role='spinbutton'])[6]/parent::div/input")
        this.i9AgreeChkbox = page.locator("(//div[contains(@data-automation-id,'checkboxPanel')])[12]")
        this.i9OverDueReason = page.locator("(//label[contains(.,'Overdue Reason')]/parent::div/following-sibling::div/descendant::input)[1]")


        this.onboardtxt = page.getByRole('button', { name: `Onboarding Setup for Hire: ${givenName} ${familyName}` });
        this.submit = page.locator('button:has-text("Submit")');
        //page.getByRole('button', { name: 'Onboarding Setup for Hire: ' + givenName + ' ' + familyName + '' });
        this.manageProbation = page.locator(`text=Manage Probation Period: ${givenName} ${familyName}`);
        this.hrSubmit = page.locator('button:has-text("Submit")');
        this.prbEndDate = page.locator('label:has-text("Probation End Date")');
        this.idChange = page.locator('text=ID Change: ' + givenName + ' ' + familyName + '');
        this.addId = page.locator('tbody').filter({ hasText: '*Country*National ID' }).getByLabel('Add Row')//page.locator('text=*Country*National ID TypeCurrent IDAdd/Edit IDIssued DateExpiration DateIssued B >> [aria-label="Add Row"]');
        this.GCountry = page.getByLabel('Country', { exact: true })//page.locator('[id="selectInputId-56\\$63401"]');
        this.GNationalIDType = page.getByLabel('National ID Type', { exact: true })//page.locator('[id="selectInputId-56\\$63406"]');
        this.GID = page.locator('input[role="textbox"]');
        this.submit = page.getByRole('button', { name: 'Submit' });
        this.chgGovIds = page.getByRole('button', { name: 'Change My Government IDs' })
        //this.GnationalID = page.locator('text=1 item selected, RomaniaRomania1 item selected, Identity Card NumberIdentity Car >> [id="\\35 6\\$533359"] input[role="textbox"]');
        this.GExpirationDate = page.locator('[id="\\35 6\\$533362"] div[role="group"] div:has-text("DD") >> nth=1');
        this.GIssuedDate = page.locator('[id="\\35 6\\$533356"] div[role="group"] >> text=DD');
        this.completeI9Review = page.getByRole('button', { name: `Complete Form I-9: ${givenName}` })
        //this.IssuedBy = page.locator('text=1 item selected, RomaniaRomania1 item selected, Identity Card NumberIdentity Car >> [id="\\35 6\\$149635"] input[role="textbox"]');


    }


    async onboardSetup(): Promise<void> {

        await this.onboardtxt.click();
        await this.submit.click();

    }

    async hrManageProbation(probReviewDate: string): Promise<void> {
        await this.manageProbation.click();
        await this.page.waitForTimeout(4000);
        const [day, month, year] = probReviewDate.split('/');

        await this.page.waitForTimeout(500);

        //const testyear =
        await this.page.getByLabel('Probation End Date').getByPlaceholder('DD').type(day);
        await this.page.getByLabel('Probation End Date').getByPlaceholder('MM').type(month);
        await this.page.getByLabel('Probation End Date').getByPlaceholder('YYYY').type(year);

        //await testyear.type("2025");
        await this.hrSubmit.click();
        await this.page.waitForTimeout(500);

        if (await this.manageProbation.isVisible()) {
            await this.page.waitForTimeout(500);
            await this.hrSubmit.click();
        }
        await this.page.waitForTimeout(500);
    }


    async hrGetEmpNum(): Promise<string> {

        await this.page.waitForTimeout(5000)

        let empNum = await this.page.getByText('Success! Event submittedUp').allInnerTexts();
        empNum = empNum.toString().split('(');
        empNum = empNum[1].toString().split(')');




        return empNum[0].toString();

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

        await this.chgGovIds.click();
        await this.addId.click();
        await this.fillGovIDDetailsUS(country1, NationalIDType1, NIDPersonal, IssuedDate1, ExpirationDate1, true);


        await this.submit.click();
    }


    async fillGovIDDetailsUS(
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

        if (country.includes("United States")) {
            await this.page.locator('input[type="text"]').fill(String(idNumber));
        }

    }


    async formI9Review(hireDate: any,zipcode:string,city:string,state: string): Promise<void> {

        // Get the current date and time as a string
        let strTitle1: string = new Date().toString();

        // Split the string by space and take the second part (which is the time part)
        let strTitle2: string[] = strTitle1.split(" ");

        // Remove the colons from the time part
        let strTitle3: string = strTitle2[4].replace(/:/g, "");

        // Assign the final string to strDocument_No
        let strDocument_No: string = strTitle3;

            console.log(strDocument_No);

       // await this.completeI9Review.click();

        await this.i9Documentnumber.fill(strDocument_No)
       // await this.i9FirstEmpDate.fill(hireDate.toString())
        await this.i9ExpirationDate.fill("01/01/2047")

        await this.i9AgreeChkbox.click();
        await this.i9OverDueReason.fill("Audit Revealed that New Hire Was Not Run")


        await this.i9EmpTitle.fill("Test")
        await this.i9EmpBusiness.fill("Test")
        await this.i9EmpFirstName.fill("Test")
        await this.i9EmpLastname.fill("Test")
        await this.i9EmpOrg.fill("Test")
        await this.i9city.fill(city)
        await this.i9state.fill(state)
        await this.i9zipcode.fill(zipcode)



    }

}