import { th } from '@faker-js/faker';
import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { throws } from 'assert';
import { promises } from 'dns';
import moment, { months } from "moment";

export class WebActionsPage {
    readonly page: Page;
    //readonly locator: Locator;
    readonly timeOut: number;

    constructor(page: Page) {
        this.page = page;
        this.timeOut = 1000;
    }

    async setText(locator: Locator, varString: String,) {

        await this.page.waitForTimeout(this.timeOut);
        if (await locator.count() > 0) {
            //await locator.scrollIntoViewIfNeeded();
            await locator.waitFor();
            await locator.clear();
            await locator.fill(String(varString));
        }
        await this.page.waitForTimeout(300);
    }

    async setTextWithType(locator: Locator, varString: String,) {
        await this.page.waitForTimeout(this.timeOut);
        if (await locator.count() > 0 && await locator.isVisible()) {
            await locator.scrollIntoViewIfNeeded();
            await locator.waitFor();
            await locator.clear();
            await locator.type(String(varString));
        }
        await this.page.waitForTimeout(300);
    }

    async setTextWithEnter(locator: Locator, varString: String,) {
        try {
            await this.page.waitForTimeout(this.timeOut);
            // if (await locator.count() > 0) {
            await locator.scrollIntoViewIfNeeded();
            await locator.waitFor();
            await locator.clear();
            await locator.fill(String(varString));
            await locator.press('Enter');
            await this.page.waitForTimeout(300);
            // }

        } catch (error) {
            await throws;
            console.log(" ERROR :-" + error);
        }

    }

    async selectFromCustomDropDrown(locator: Locator, varString: String,) {

        await this.page.waitForTimeout(this.timeOut);
        if (await locator.count() > 0) {
            //await locator.waitFor();
            await locator.scrollIntoViewIfNeeded();
            // await locator.clear();
            await locator.fill(String(varString));
            await locator.press('Enter');
            await this.page.keyboard.press('Enter');
            const custumLocator: Locator = this.page.locator("(//div[@data-automation-label='" + varString + "' or text()='" + varString + "'])[1]");
            await this.page.waitForTimeout(this.timeOut);
            if (await custumLocator.isVisible() && await custumLocator.count() > 0) {
                await custumLocator.scrollIntoViewIfNeeded();
                await custumLocator.click();
            }
        }
        await this.page.waitForTimeout(this.timeOut);

    }

    async setTextWithDoubleEnter(locator: Locator, varString: String,) {
        await this.page.waitForTimeout(this.timeOut);
        if (await locator.count() > 0) {
            await locator.scrollIntoViewIfNeeded();
            await locator.waitFor();
            await locator.clear();
            await locator.fill(String(varString));
            await locator.press('Enter');
            await this.page.keyboard.press('Enter');
        }
    }

    //check checkbox is checked 
    async checkBoxIsChecked(locator: Locator): Promise<boolean | void> {
        try {
            await this.page.waitForTimeout(this.timeOut);
            await locator.waitFor();
            if (await locator.count() > 0) {
                await locator.scrollIntoViewIfNeeded();
                return await locator.check();
            }
        } catch (error) {
            await throws;
            console.log("Could you please check your Locator(find this error):-" + error);
            return false;
        }

    }

    //check checkbox is checked 
    async checkExistsOrIsVisible(locator: Locator): Promise<boolean> {
        if (this.retryWebElement(locator)) {
            try {
                await this.page.waitForTimeout(this.timeOut);
                await locator.waitFor({ state: 'visible' });
                if (await locator.count() > 0 && await locator.isVisible()) {
                    return true;
                }
            }
            catch (error) {
                console.log("Could you please check your Locator- encotered this error =>" + error);
                return false;
            }
        }


    }

    async click(locator: Locator) {
        //if (this.retryWebElement(locator)) {
        try {
            await this.page.waitForTimeout(this.timeOut);
            if (await locator.count() > 0) {
                await locator.scrollIntoViewIfNeeded();
                await locator.click();
            }
        } catch (error) {
            console.log("Could you please check your Locator(click failed ):-" + error);
        }
        // }

    }

    async doubleClick(locator: Locator) {
        try {
            await this.page.waitForTimeout(this.timeOut);
            if (await locator.count() > 0) {
                await locator.scrollIntoViewIfNeeded();
                // await locator.waitFor();
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
    }


    async getText(locator: Locator): Promise<string | null> {
        try {
            await this.page.waitForTimeout(this.timeOut);
            // await this.locator.waitFor();
            if (await locator.count() > 0 && await locator.isVisible()) {
                await locator.scrollIntoViewIfNeeded();
                return await locator.textContent();
            }
        } catch (error) {

        }
    }

<<<<<<< HEAD
    async getInnerText(locator: Locator): Promise<string | null> {
        try {
            await this.page.waitForTimeout(this.timeOut);
            //await this.locator.waitFor();
            if (await locator.count() > 0 && await locator.isVisible()) {
                await locator.scrollIntoViewIfNeeded();
                return await locator.innerText();
            }
        } catch (error) {
=======
    // async getInnerText(locator: Locator): Promise<string | null> {
    //     try {
    //         await this.page.waitForTimeout(this.timeOut);
    //         // await this.locator.waitFor();
    //         if (await locator.count() > 0 && await locator.isVisible()) {
    //             await locator.scrollIntoViewIfNeeded();
    //             return await locator.innerText();
    //         }
    //     } catch (error) {
>>>>>>> 6bc4f14fdedbf30d1139b594b94e51aa1472ac91

    //     }

    // }

    async getAllInnerText(locator: Locator): Promise<string[] | null> {
        try {
            await this.page.waitForTimeout(this.timeOut);
            // await this.locator.waitFor();
            if (await locator.count() > 0 && await locator.isVisible()) {
                await locator.scrollIntoViewIfNeeded();
                return await locator.allInnerTexts();
            }
        } catch (error) {

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
        if (await locator.count() > 0) {
            await locator.waitFor();
            await locator.scrollIntoViewIfNeeded();
            await locator.selectOption(varString);
        }

    }
    async retryWebElement(locator: Locator): Promise<boolean> {
        let flag: boolean = true;
        for (let i = 0; i < 3; i++) {
            try {
                await this.page.waitForSelector(locator.toString(), { timeout: 5000 });
                break;// Break the loop if successful
            } catch (error) {
                if (i === 2) { throw error; flag = false; }// Throw error if final attempt fails
            }
        }
        return flag;
    }

    async selectDatePicker(dateToSelect: string) {
        const [day, month, year] = dateToSelect.split('/');
        // Extract day, month (as a string), and year
        let month1 = Number(month);
        let monthAsString: string;
        // Array of month names
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let monthMap: Map<number, string> = new Map();

        // Populate the map using the monthNames array
        monthNames.forEach((month, index) => {
            monthMap.set(index + 1, month);
        });

        // Log the map to see the result
        console.log("Month As string -" + monthMap.get(month1));
        monthAsString = monthMap.get(month1).toString();
        ///--------------------------------------------------------------------------------------------
        await this.page.waitForTimeout(this.timeOut);
        await this.page.click("(//*[@aria-label='Calendar' and @role= 'button'])[1]")
        const mmYY = this.page.locator('(//*[@data-automation-id="monthPickerHeader"]//span[@data-automation-id="datePickerMonth"])[1]');
        const prev = this.page.locator('(//*[@data-automation-id="datePicker"]//button[@data-automation-id="previousControl"])[1]');
        const next = this.page.locator('(//*[@data-automation-id="datePicker"]//button[@data-automation-id="nextControl"])[1]');
        const mothYear = monthAsString.trim() + " " + year;
        // let dateToSelect: string = "May 2019";
        const thisMonth = moment(mothYear.trim(), "MMMM YYYY").isBefore();
        console.log("this month? " + thisMonth);
        const thisMonth1 = monthAsString.trim() + "  " + year;
        await this.page.waitForTimeout(this.timeOut);
        while (await mmYY.textContent() != thisMonth1) {
            if (thisMonth) {
                await prev.click();
            } else {
                await next.click();
            }
        }
        await this.page.waitForTimeout(this.timeOut);
        await this.page.locator("//*[@data-automation-id='datePickerDay' and text()='" + day + "'][contains(@aria-label,'" + thisMonth1 + "')]").waitFor();
        await this.page.locator("//*[@data-automation-id='datePickerDay' and text()='" + day + "'][contains(@aria-label,'" + thisMonth1 + "')]").click();
        await this.page.waitForTimeout(this.timeOut);
    }

}