import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { throws } from 'assert';
import { promises } from 'dns';


export class WebActionsPage {
    readonly page: Page;
    readonly locator: Locator;
    readonly timeOut: number;


    constructor(page: Page) {
        this.page = page;
        this.timeOut = 500;
    }

    async setText(locator: Locator, varString: String,) {

        await this.page.waitForTimeout(this.timeOut);
        await locator.waitFor();
        if (await locator.count() > 0 && await locator.isVisible()) {
            await locator.scrollIntoViewIfNeeded();
            await locator.fill(String(varString));
        }

    }

    async setTextWithType(locator: Locator, varString: String,) {

        await this.page.waitForTimeout(this.timeOut);
        await locator.waitFor();
        if (await locator.count() > 0 && await locator.isVisible()) {
            await locator.scrollIntoViewIfNeeded();
            await locator.type(String(varString));
        }

    }

    async setTextWithEnter(locator: Locator, varString: String,) {

        await this.page.waitForTimeout(this.timeOut);
        await locator.waitFor();
        if (await locator.count() > 0 && await locator.isVisible()) {
            await locator.scrollIntoViewIfNeeded();
            await locator.fill(String(varString));
            await locator.press('Enter');
        }
        await this.page.waitForTimeout(this.timeOut);
    }

    async selectFromCustomDropDrown(locator: Locator, varString: String,) {

        await this.page.waitForTimeout(this.timeOut);
        await locator.waitFor();
        if (await locator.count() > 0 && await locator.isVisible()) {
            await locator.scrollIntoViewIfNeeded();
            await locator.fill(String(varString));
            await locator.press('Enter');
            await this.page.keyboard.press('Enter');
            const custumLocator: Locator = this.page.locator("//div[text()='" + varString + "']");
            await this.page.waitForTimeout(this.timeOut);
            if (await custumLocator.isVisible() && await custumLocator.count() > 0) {
                //await custumLocator.waitFor();
                await custumLocator.scrollIntoViewIfNeeded();
                await custumLocator.click();
            }
        }
        await this.page.waitForTimeout(this.timeOut);

    }

    async setTextWithDoubleEnter(locator: Locator, varString: String,) {


        await locator.waitFor();
        if (await locator.count() > 0 && await locator.isVisible()) {
            await locator.scrollIntoViewIfNeeded();
            await locator.fill(String(varString));
            await locator.press('Enter');
            await this.page.keyboard.press('Enter');
        }
        await this.page.waitForTimeout(this.timeOut);

    }

    //check checkbox is checked 
    async checkBoxIsChecked(locator: Locator): Promise<boolean | void> {
        try {
            await this.page.waitForTimeout(this.timeOut);
            await locator.waitFor();
            if (await locator.count() > 0 && await locator.isVisible()) {
                await locator.scrollIntoViewIfNeeded();
                return await locator.check();
            }
        } catch (error) {
            console.log("Could you please check your Locator(find this error):-" + error);
            return false;
        }

    }

    //check checkbox is checked 
    async checkExistsOrIsVisible(locator: Locator): Promise<boolean> {
        try {
            await this.page.waitForTimeout(this.timeOut);
            // await locator.waitFor();
            if (await locator.count() > 0 && await locator.isVisible()) {
                //  await locator.scrollIntoViewIfNeeded();
                return true;
            }
        } catch (error) {
            console.log("Could you please check your Locator- encotered this error =>" + error);
            return false;
        }

    }

    async click(locator: Locator) {
        try {
            await this.page.waitForTimeout(this.timeOut);
            await locator.waitFor();
            if (await locator.count() > 0 && await locator.isVisible()) {
                await locator.scrollIntoViewIfNeeded();
                await locator.click();
            }
        } catch (error) {
            console.log("Could you please check your Locator(find this error):-" + error);
        }

    }

    async doubleClick(locator: Locator) {
        try {
            await this.page.waitForTimeout(this.timeOut);
            await locator.waitFor();
            if (await locator.count() > 0 && await locator.isVisible()) {
                await locator.scrollIntoViewIfNeeded();
                await locator.dblclick();
            }
        } catch (error) {
            console.log("Could you please check your Locator(find this error):-" + error);
        }

    }


    async clickElementJS(locator: string): Promise<void> {
        await this.page.$eval(locator, (element: HTMLElement) => element.click());
    }

    async setValueUsingJS(locator: string, varString: string) {
        // Use JavaScript execution to assign a value to an input field

        await this.page.$eval(locator, (element: HTMLElement) => element.ariaValueText = varString);

        // await this.page.evaluate(() => {
        //     const  inputField = document.querySelector(locator); // Adjust the selector
        //     if (inputField) {
        //         inputField.value = varString; // Set the desired value
        //     }
        // });

    }


    async getText(locator: Locator): Promise<string | null> {

        await this.page.waitForTimeout(this.timeOut);
        //await this.locator.waitFor();
        if (await locator.count() > 0 && await locator.isVisible()) {
            await locator.scrollIntoViewIfNeeded();
            return await locator.textContent();
        } else {
            return null;
        }

    }

    async getListOfText(locator: Locator): Promise<string[] | null> {

        await this.page.waitForTimeout(this.timeOut);
        // await locator.waitFor();
        if (await locator.count() > 0 && await locator.isVisible()) {
            return await locator.allTextContents();
        } else {
            return null;
        }

    }

    async selectDropDown(locator: Locator, varString: string) {

        await this.page.waitForTimeout(this.timeOut);
        await locator.waitFor();
        if (await locator.count() > 0 && await locator.isVisible()) {
            await locator.scrollIntoViewIfNeeded();
            await locator.selectOption(varString);
        } else {

        }

    }

    async selectCustomDropDown(locator: Locator, varString: string) {

        await this.page.waitForTimeout(this.timeOut);
        await locator.waitFor();
        if (await locator.count() > 0 && await locator.isVisible()) {
            await locator.scrollIntoViewIfNeeded();
            await locator.fill(varString);
            await locator.press("Enter");
            await this.page.locator("Need to write custom xpath for this");
        } else {
            //need to write error logs here
        }

    }

}