import { WebActionsPage } from '@lib/WebActionPage';
import { BrowserContext, Locator, Page } from '@playwright/test';

export class EditPassportsAndVisasPage extends WebActionsPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly hrassignPaygroup: Locator;
    readonly givenName1: string;
    readonly FamilyName1: string;

    EmployeeNumber: string[];
    readonly PerIssuedDate: Locator;
    readonly PerExpirationDate: Locator;
    readonly Approve: Locator;
    readonly passportVisa: Locator;
    readonly validatePayGroup: any;
    readonly hrSubmit: any;
    readonly btnEditPassportsAndVissaa: Locator;
    readonly txtPerson: Locator;
    readonly btnOK: Locator;
    readonly btnAddRowPasswordt: Locator;
    readonly txtCountry: Locator;
    readonly txtPassportsIDType: Locator;
    readonly txtPassportID: Locator;
    readonly txtIssueDate: Locator;
    readonly txtExpirationDate: Locator;
    readonly btnSubmit: Locator;
    readonly taskMaintainRighttoWorkDocumentation: Locator;
    readonly btnApprove: Locator;


    constructor(page: Page, givenname: string, FamilyName: string, context: BrowserContext) {
        super(page);
        this.page = page;
        this.context = context;
        this.givenName1 = givenname;
        this.FamilyName1 = FamilyName;

        this.taskMaintainRighttoWorkDocumentation = page.locator('text=Maintain Right to Work Documentation: Onboarding for ' + givenname + ' ' + FamilyName + '');
        this.PerIssuedDate = page.locator('text=DD >> nth=1');
        this.PerExpirationDate = page.locator('text=DD >> nth=3');
        this.Approve = page.locator('button:has-text("Approve")');
        this.passportVisa = page.locator('text=Passports and Visa Change: ' + ' ' + givenname + ' ' + FamilyName);
        this.btnEditPassportsAndVissaa = page.getByRole('button', { name: 'Edit Passports and Visas' });
        this.txtPerson = page.getByLabel('Person', { exact: true });
        this.btnOK = page.getByRole('button', { name: 'OK' });
        this.btnAddRowPasswordt = page.locator('tr').filter({ hasText: '*Country*Passport ID' }).getByLabel('Add Row');
        this.txtCountry = page.getByLabel('Country', { exact: true });
        this.txtPassportsIDType = page.getByLabel('Passport ID Type', { exact: true });
        this.txtPassportID = page.getByRole('table', { name: 'Passports' }).locator('input[type="text"]');
        this.txtIssueDate = page.getByPlaceholder('DD').first();
        this.txtExpirationDate = page.getByPlaceholder('DD').nth(1);
        this.btnSubmit = page.getByRole('button', { name: 'Submit' });
        this.btnApprove = page.locator('button:has-text("Approve")');

    }

    async setEditPassportsAndVisas(Country: any, PassportIDType: any, IdentificationNo: any, IssuedDate: any, ExpirationDate: any) {
        await this.page.waitForTimeout(500);
        await this.passportVisa.click();
        await super.click(this.btnAddRowPasswordt);
        await super.setTextWithDoubleEnter(this.txtCountry, Country);
        await super.selectFromCustomDropDrown(this.txtPassportsIDType, PassportIDType);
        await super.setText(this.txtPassportID, IdentificationNo);

        await super.setTextWithType(this.txtIssueDate, IssuedDate);
        await super.setTextWithType(this.txtExpirationDate, ExpirationDate);
        await super.click(this.btnApprove);
    }
    async clickMaintainRightToWorkDocumentationANDeditPassportsAndVisas(emp: any, Country: any, PassportIDType: any, IdentificationNo: any, IssuedDate: any, ExpirationDate: any) {
        await this.page.waitForTimeout(500);
        await this.taskMaintainRighttoWorkDocumentation.click();
        await super.click(this.btnEditPassportsAndVissaa);
        await super.setTextWithDoubleEnter(this.txtPerson, emp);
        await super.click(this.btnOK);
        await super.click(this.btnAddRowPasswordt);
        await super.setTextWithDoubleEnter(this.txtCountry, Country);
        await super.selectFromCustomDropDrown(this.txtPassportsIDType, PassportIDType);
        await super.setText(this.txtPassportID, IdentificationNo);

        await super.setTextWithType(this.txtIssueDate, IssuedDate);
        await super.setTextWithType(this.txtExpirationDate, ExpirationDate);
        await super.click(this.btnSubmit);

        await this.taskMaintainRighttoWorkDocumentation.click();
        await super.click(this.btnSubmit);
    }

    async hrPaygroupSubmit(): Promise<void> {
        await this.taskMaintainRighttoWorkDocumentation.click();
        if (await this.validatePayGroup.isVisible()) {
            await this.hrSubmit.click();
        }
    }


}

