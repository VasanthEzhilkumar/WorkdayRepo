import { Page, test, BrowserContext, Locator, expect } from '@playwright/test';
import { error } from 'console';
import { WebActionsPage } from 'lib/WebActionPage';
import { generateUniqueString, writeUniqueNamesToExcel, writeResultsToExcel } from '@lib/ExcelUtils';

export class CaptureAlertErrors extends WebActionsPage {
    readonly page: Page;
    readonly redAlertWarningsPopupBtn: Locator;
    readonly yellowAlertWarningsPopUpnBtn: Locator;
    readonly btnMainErrorBar1: Locator;
    readonly btnSideErrorBar1: Locator;

    readonly txtRedPopUpWarings: Locator;
    readonly txtYellowPopUpWarinngs: Locator;

    readonly btnMainErrorBar: Locator;
    readonly btnSideErrorBar: Locator;

    readonly lblErrorAlert: Locator;
    readonly lblAlertMessageTitle: Locator;
    readonly lblAlertMessageDescription: Locator;
    readonly givenName: string;
    readonly familyNmae: String;

    readonly excelFilePath: string;
    readonly sheetName: string;
    readonly index: number;
    public updateError: string;

    constructor(page: Page, givenName: string, familyName: string, testdatFilePath: string, sheet: string, index: number) {
        super(page);
        this.page = page;
        this.givenName = givenName;
        this.familyNmae = familyName;
        this.excelFilePath = testdatFilePath;
        this.sheetName = sheet;
        this.index = index;
        this.btnMainErrorBar1 = this.page.locator("(//div[@data-automation-id='errorWidgetBarViewAllCanvas']//ancestor::div//descendant::div[contains(@title,'" + givenName + " " + familyName + "')])[1]");
        this.btnSideErrorBar1 = this.page.locator("(//div[@data-automation-id='errorWidgetBarCanvas']//ancestor::div//descendant::div[contains(@title,'" + givenName + " " + familyName + "')])[1]");

        this.btnMainErrorBar = this.page.locator("//div[@data-automation-id='errorWidgetBarViewAllCanvas']");
        this.btnSideErrorBar = this.page.locator("//div[@data-automation-id='errorWidgetBarCanvas']");

        this.lblErrorAlert = this.page.locator("(//h2[contains(.,'Alert')]|//h2[contains(.,'Error')])[2]");//		'' GC changed from h1 to h2 02/07/2021 for Spain Job Changes
        // this.lblAlertMessageTitle = this.page.locator("(//div[@data-automation-id='errorWidgetMessageFieldCanvas'])[1]");
        // this.lblAlertMessageDescription = this.page.locator("(//div[@data-automation-id='errorWidgetMessageCanvas'])[1]");

        this.lblAlertMessageTitle = this.page.getByLabel('Errors and Alerts', { exact: true }).first();
        this.lblAlertMessageDescription = this.page.getByLabel('Errors and Alerts', { exact: true }).nth(2);

        // getByLabel('Errors and Alerts', { exact: true }).getByText('National IDs (Row 1)This')
        //getByLabel('Errors and Alerts', { exact: true }).getByText('National IDs (Row 2)This')
    }

    // errorLogs = process.env.ERROR_LOGS || '';
    async logScreenErrors(message1: string) {
        try {
            console.log(message1);
        } catch (error) {

        }
    }


    async checkForScreenErrors(): Promise<boolean> {
        let errorMsg: string;
        try {
            await this.page.waitForTimeout(3000);
            // Check for side error bar
            if (await this.btnSideErrorBar1.isVisible()) {
                await this.page.waitForTimeout(4000);
                await super.click(this.btnSideErrorBar);
                const message1 = await super.getText(this.lblAlertMessageTitle);
                // const message2 = await super.getText(this.lblAlertMessageDescription);
                errorMsg = message1 + " ";
                await this.logScreenErrors(message1);
            } else if (await this.btnMainErrorBar1.isVisible()) {
                await this.page.waitForTimeout(4000);
                await super.click(this.btnMainErrorBar);
                const message1 = await super.getText(this.lblAlertMessageTitle);
                //const message2 = await super.getText(this.lblAlertMessageDescription);
                errorMsg = message1 + " ";
                await this.logScreenErrors(message1);
            }
            if (errorMsg != undefined && errorMsg != 'NaN' ) {
                await expect(errorMsg).toBeNull();
            }
            return false;
        } catch (error) {
            try {
                let error1 = "Test failed for '" + this.givenName + " " + this.familyNmae + "' Employee: " + errorMsg;
                error1 = error1.toString();
                await this.setUpdateError(error1);
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                // Take a screenshot and save it with a specific name
                const screenshotPath = "H:/WorkDaySuite_Playwright/WorkdayFailedScreenshot/"+timestamp+".png";
                await this.page.screenshot({ path: screenshotPath });
                error1 = error1+"& find failed Screenshot Path:->"+screenshotPath;
                // Write the failure status to the Excel file and captured screen error as well.
                writeResultsToExcel(this.excelFilePath, this.sheetName, this.index, error1, 'Failed');
                return true;
            } finally {
                this.page.close();
            }

        }

    }

    async setUpdateError(error: string) {
        this.updateError = error;
    }

    async getUpdateError(): Promise<string> {
        return this.updateError;
    }




}









