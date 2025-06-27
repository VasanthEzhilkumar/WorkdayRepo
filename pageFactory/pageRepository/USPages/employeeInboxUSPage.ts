import { WebActionsPage } from "@lib/WebActionPage";
import { BrowserContext, Locator, Page } from "@playwright/test";

export class employeeInboxUSPage extends WebActionsPage {
    readonly chgPersonalInformation: Locator;
    readonly paygroupSubmit: Locator
    readonly page: Page;
    readonly chgGovid: Locator
    readonly buttonchgpersonal: Locator;
    readonly setGenderdrpDown: Locator;
    readonly setGender: Locator;
    readonly editGender: Locator;
    readonly editDob: Locator;
    readonly editRace: Locator;
    readonly setRace: Locator;
    readonly ePay: Locator;
    readonly ePaycheckbox: Locator;
    readonly formI9: Locator;
    readonly formI9Address: Locator;
    readonly formI9State: Locator
    readonly formI9ZipCode: Locator;
    readonly formI9Immigration: Locator
    readonly formI9Signature: Locator
    readonly formI9city: Locator
    readonly formI9Translator: Locator;
    readonly harssmentchkbox: Locator;
    readonly antiharssmentChkbox: Locator;
    readonly antifactsheetChkbox: Locator;
    readonly leavechkbox: Locator;
    readonly minWagechkbox: Locator;
    readonly tempWagechkbox: Locator;
    readonly reviewDoc: Locator;
    readonly empHandbook: Locator;
    readonly handBookchkbox: Locator;
    readonly handBookchkbox1: Locator;


    constructor(page: Page, context: BrowserContext) {
        super(page);
        this.page = page;
        this.harssmentchkbox = page.locator("(//div[contains(@data-automation-id,'checkboxPanel')])[1]");
        this.antiharssmentChkbox = page.locator('[id="\\33 20-container"] [id="\\35 6\\$202639"] div').nth(2);
        this.antifactsheetChkbox = page.locator("(//div[contains(@data-automation-id,'checkboxPanel')])[3]");
        this.leavechkbox = page.locator('[id="\\33 66-container"] [id="\\35 6\\$202639"] div').nth(2)
        this.minWagechkbox = page.locator('[id="\\33 43-container"] [id="\\35 6\\$202639"] div').nth(2)
        this.tempWagechkbox = page.locator('[id="\\34 12-container"] [id="\\35 6\\$202639"] div').nth(2)

        this.chgPersonalInformation = page.getByRole('button', { name: 'Change/Update My Personal Information', exact: true })//locator('[aria-label="Inbox Items"] >> text=Change/Update My Personal Information');
        this.buttonchgpersonal = page.locator('button:has-text("Change My Personal Information")');
        this.chgGovid = page.getByRole('button', { name: 'Change/Update My Government IDs', exact: true }).or(page.getByRole('button', { name: 'Change/Update My Government IDs: Onboarding for ' }));
        this.paygroupSubmit = page.locator('button:has-text("Submit")');
        this.setGenderdrpDown = page.locator('text=select oneselect one');
        this.setGender = page.locator('[aria-label="Male"]');
        this.editGender = page.locator('[aria-label="Edit Gender"]');
        this.editDob = page.locator('[aria-label="Edit Date of Birth"]');
        this.editRace = page.getByLabel('Edit Race/Ethnicity');
        this.setRace = page.getByRole('textbox', { name: 'Race/Ethnicity' });
        this.ePay = page.getByRole('button', { name: 'Acceptance of Electronic Pay' });
        this.ePaycheckbox = page.locator("(//div[contains(@data-automation-id,'checkboxPanel')])[1]");
        this.formI9 = page.getByRole('button', { name: 'Complete Form I-' });
        this.formI9Address = page.locator('[id="\\35 6\\$559682--uid640-input"]');
        this.formI9city = page.locator('[id="\\35 6\\$413744--uid778-input"]');
        this.formI9State = page.locator('[id="\\35 6\\$413743--uid643-input"]');
        this.formI9ZipCode = page.locator('[id="\\35 6\\$413743--uid643-input"]');
        this.formI9Immigration = page.getByLabel('A citizen of the United States');
        this.formI9Signature = page.locator("(//div[contains(@data-automation-id,'checkboxPanel')])[1]");;
        this.formI9Translator = page.getByLabel('I did not use a preparer or');
        this.reviewDoc = page.getByRole('button', { name: 'Review Documents', exact: true })
        this.empHandbook = page.getByRole('button', { name: 'USA Employee Handbook: ' })
        this.handBookchkbox = page.locator("(//div[contains(@data-automation-id,'checkboxPanel')])[1]");
        this.handBookchkbox1 = page.locator('[id="\\33 20-container"] [id="\\35 6\\$202639"] div').nth(2);
    }

    async chngpersonaInfo(): Promise<void> {
    }

    async changepersonalinformationSubmit(gender: string, dob: string, race: string) {

        await this.chgPersonalInformation.click();
        await super.click(this.buttonchgpersonal);
        await super.click(this.editGender);
        await super.click(this.setGenderdrpDown);
        await super.click(this.page.locator('[aria-label=' + gender + ']'));
        await super.click(this.page.locator('//div[@data-automation-id="saveButton"]//*[@aria-label="Save Gender"]'));
        await super.click(this.editDob);
        await super.setTextWithType(this.page.getByPlaceholder('DD'), dob);
        await super.click(this.page.getByLabel('Save Date of Birth'));
        await super.click(this.editRace);
        await super.setTextWithDoubleEnter(this.setRace, race);
        await this.paygroupSubmit.click();
        await this.page.waitForTimeout(500);
        await this.paygroupSubmit.click();
    }

    async changeGovIDInformation() {
        await this.page.waitForTimeout(500);
        await this.chgGovid.click();
        // await this.paygroupSubmit.click();
    }

    async changeGovIDInformationSubmit() {

        await this.page.waitForTimeout(500);
        await this.chgGovid.click();
        await this.paygroupSubmit.click();

    }

    async electronicPayAcceptance(): Promise<void> {
        //  await this.page.waitForTimeout(500);
        await this.ePay.click();
        await this.ePaycheckbox.click();
        await this.paygroupSubmit.click();
    }

    async completeFormI9(): Promise<void> {
        await super.click(this.formI9);
        await super.click(this.formI9Immigration);
        await super.click(this.formI9Signature);
        await super.click(this.formI9Translator);
        await super.click(this.paygroupSubmit);
    }

    async reviewDocUS(): Promise<void> {

        await this.reviewDoc.click();

        await this.harssmentchkbox.click();
        await this.page.waitForTimeout(500);
        await this.antiharssmentChkbox.click();
        await this.page.waitForTimeout(500);
        await this.antifactsheetChkbox.click();
        await this.page.waitForTimeout(500);
        await this.leavechkbox.click();
        await this.page.waitForTimeout(500);
        await this.minWagechkbox.click();
        await this.page.waitForTimeout(500);
        await this.tempWagechkbox.click();
        await this.page.waitForTimeout(500);
        await this.paygroupSubmit.click();
    }

    async handBookUS(): Promise<void> {
        //  await this.page.waitForTimeout(1000);
        // if (await this.empHandbook.count() > 0) {
        await this.empHandbook.click();
        await this.clickIAgreeCheckBox();
        // await this.handBookchkbox.click();
        // await this.handBookchkbox1.click();
        await this.paygroupSubmit.click();
        ////}

    }


    async clickIAgreeCheckBox() {
        await this.page.waitForTimeout(1000);
        for (let i = 1; i <= await this.page.locator("//div[contains(@data-automation-id,'checkboxPanel')]").count(); i++) {
            if (await this.page.locator('(//div[contains(@data-automation-id,"checkboxPanel")])[' + i + ']').isVisible()) {
                await this.page.locator('(//div[contains(@data-automation-id,"checkboxPanel")])[' + i + ']').scrollIntoViewIfNeeded();
                await super.click(this.page.locator('(//div[contains(@data-automation-id,"checkboxPanel")])[' + i + ']'));
            }
        }
    }




}