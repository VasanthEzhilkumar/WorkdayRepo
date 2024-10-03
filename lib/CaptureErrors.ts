import { Page, BrowserContext, Locator, expect } from '@playwright/test';
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
        this.lblAlertMessageTitle = this.page.locator("(//div[@data-automation-id='errorWidgetMessageFieldCanvas'])[1]");
        this.lblAlertMessageDescription = this.page.locator("(//div[@data-automation-id='errorWidgetMessageCanvas'])[1]");


    }

    // errorLogs = process.env.ERROR_LOGS || '';
    async logScreenErrors(message1: string, message2: string) {
        try {
            console.log(message1 + "" + message2);
        } catch (message1) {

        }
    }


    async checkForScreenErrors(): Promise<boolean> {
        let errorMsg: string;
        try {
            // Check for side error bar
            if (await await super.checkExistsOrIsVisible(this.btnSideErrorBar1)) {
                await super.click(this.btnSideErrorBar);
                const message1 = await super.getText(this.lblAlertMessageTitle);
                const message2 = await super.getText(this.lblAlertMessageDescription);
                errorMsg = message1 + " " + message2;
                await this.logScreenErrors(message1, message2);
               
            } else if (await super.checkExistsOrIsVisible(this.btnMainErrorBar1)) {
                await super.click(this.btnMainErrorBar);
                const message1 = await super.getText(this.lblAlertMessageTitle);
                const message2 = await super.getText(this.lblAlertMessageDescription);
                errorMsg = message1 + " " + message2;
                await this.logScreenErrors(message1, message2);
                
            }
            if (errorMsg != undefined ){
                await expect(errorMsg).toBeNull();
            }
            return  false;
        } catch (error) {
            try {
                let error1 = "Test failed for '" + this.givenName + " " + this.familyNmae + "' Employee: " + errorMsg;
                error1 = error1.toString();
                await this.setUpdateError(error1);
                // Write the failure status to the Excel file and captured screen error
                writeResultsToExcel(this.excelFilePath, this.sheetName, this.index, error1, 'Failed');
                return true; // "ERROR: " + errorMsg;
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









