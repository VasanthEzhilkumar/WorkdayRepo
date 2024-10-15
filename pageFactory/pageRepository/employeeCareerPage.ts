import { WebActionsPage } from "@lib/WebActionPage";
import { Page, BrowserContext, Locator, Expect } from "@playwright/test";
import { lcov } from "node:test/reporters";


export class employeeCareerPage extends WebActionsPage{

    readonly page: Page;
    readonly lnkCareer: Locator;
    readonly tabCertification: Locator;
    readonly btnAdd: Locator;
    readonly txtCertificationbox: Locator;
    readonly btnSubmit: Locator;
    readonly btnApprove: Locator;
    
    constructor(page: Page,context: BrowserContext) {
        super(page);
        
        this.page = page;
        this.lnkCareer = page.getByRole('link', { name: 'Career' })
        this.tabCertification = page.getByRole('tab', { name: 'Certifications' })
        this.btnAdd = page.getByRole('button', { name: 'Add', exact: true })
        this.txtCertificationbox = page.getByLabel('Certification', { exact: true })
        this.btnSubmit = page.getByRole('button', { name: 'Submit' });
        this.btnApprove = page.getByRole('button', { name: 'Approve' });


    }


    async addEmpCertification(strCertificate: string): Promise<void>{

        await this.lnkCareer.click();
        await this.tabCertification.click();
        await this.btnAdd.click();
        await super.setTextWithEnter(this.txtCertificationbox, strCertificate)
        await this.btnSubmit.click();
        // await this.txtCertificationbox.fill(strCertificate);
        // await this.txtCertificationbox.

        // await page.locator('[id="\\35 6\\$164837--uid309"] div').filter({ hasText: 'Options Expanded' }).nth(2).click();
        // await page.locator('[id="\\35 6\\$164837--uid309"] svg').click();
        // await page.getByLabel('Submenu By Issuer').locator('svg').click();
        // await page.getByLabel('Submenu WFM Schedule Notes').locator('svg').click();
        // await page.getByText('Key Holder (Manager) - WFM').click();

    }

    async getEmpManager(): Promise<string>{

        await this.page.waitForTimeout(5000)
        let mgrNum = await this.page.getByText('You have submittedUp Next:').allInnerTexts();
        mgrNum = mgrNum.toString().split('(');
        mgrNum = mgrNum[1].toString().split(')');
        return mgrNum[0].toString();
    }

    async approveCertification(empName: string): Promise<void>{

        await this.page.getByRole('button', { name: `Manage Certifications: ${empName}`, exact: true }).click();
        await this.btnApprove.click()
    }

    
}