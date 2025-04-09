import { WebActionsPage } from "@lib/WebActionPage";
import { BrowserContext, expect, Locator, Page } from "@playwright/test";


export class employeeCareerPage extends WebActionsPage {

    readonly page: Page;
    readonly lnkCareer: Locator;
    readonly tabCertification: Locator;
    readonly btnAdd: Locator;
    readonly txtCertificationbox: Locator;
    readonly btnSubmit: Locator;
    readonly btnApprove: Locator;

    constructor(page: Page, context: BrowserContext) {
        super(page);

        this.page = page;
        this.lnkCareer = page.getByRole('link', { name: 'Career' })
        this.tabCertification = page.getByRole('tab', { name: 'Certifications' })
        this.btnAdd = page.getByRole('button', { name: 'Add', exact: true })
        this.txtCertificationbox = page.getByLabel('Certification', { exact: true })
        this.btnSubmit = page.getByRole('button', { name: 'Submit' });
        this.btnApprove = page.getByRole('button', { name: 'Approve' });


    }

    async addEmpCertificationCheck(Job: any): Promise<boolean> {
        let flag = false;
        await this.lnkCareer.click();
        await this.tabCertification.click();
        await this.page.waitForTimeout(1000);
        const jobchecck = await this.page.getByLabel('' + Job + '', { exact: true }).first();
        if (await jobchecck.count() > 0) {
            flag = true;
        }
        return flag;
    }


    async addEmpCertification(strCertificate: string): Promise<string> {
        let errorMsg;
        await this.lnkCareer.click();
        await this.tabCertification.click();
        await this.btnAdd.click();
        await super.setTextWithEnter(this.txtCertificationbox, strCertificate)
        await this.btnSubmit.click();
        await this.page.waitForTimeout(2000);
        const error = await this.page.locator("(//div[@data-automation-id='errorWidgetBarCanvas'])[1]");
        if (await error.isVisible()) {
            await error.click();
            const error1 = await this.page.locator('(//div[@data-automation-id="errorWidgetPopupCanvas"])[1]');
            errorMsg = await error1.allInnerTexts();
        }
        return errorMsg;
        // await this.txtCertificationbox.fill(strCertificate);
        // await this.txtCertificationbox.

        // await page.locator('[id="\\35 6\\$164837--uid309"] div').filter({ hasText: 'Options Expanded' }).nth(2).click();
        // await page.locator('[id="\\35 6\\$164837--uid309"] svg').click();
        // await page.getByLabel('Submenu By Issuer').locator('svg').click();
        // await page.getByLabel('Submenu WFM Schedule Notes').locator('svg').click();
        // await page.getByText('Key Holder (Manager) - WFM').click();

    }

    async getEmpManager(): Promise<string> {
        await this.page.waitForTimeout(5000);
        let mgrNum = await this.page.getByText('You have submittedUp Next:').allInnerTexts();
        mgrNum = mgrNum.toString().split('(');
        if (mgrNum.length > 1) {
            mgrNum = mgrNum[1].toString().split(')');
            return mgrNum[0].toString();
        } else {
            return "";
        }
    }


    async approveCertification(empName: string): Promise<void> {
        await this.page.waitForTimeout(1000);
        const rowTitle = await this.page.getByRole('button', { name: `Manage Certifications: ${empName}`, exact: true }).first();
        for (let i = 0; i < await rowTitle.count(); i++) {
            await this.page.waitForTimeout(500)
            if (await rowTitle.isVisible()) {

                await rowTitle.click();
                await this.page.waitForTimeout(500)
                await this.btnApprove.click()
                await this.page.waitForTimeout(500)
            }


        }

    }


}