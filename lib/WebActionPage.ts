import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import moment, { months } from "moment";
/*
@Author      : @ Madhukar Kirkan
*/
export class WebActionsPage {
    readonly page: Page;
    //readonly locator: Locator;
    readonly timeOut: number;

    constructor(page: Page) {
        this.page = page;
        this.timeOut = 500;
    }

    async setText(locator: Locator, varString: String,) {
        try {
            //console.log(`Entering  "${varString}" value on: ${locator}`);
            await this.page.waitForTimeout(this.timeOut);
            // await locator.scrollIntoViewIfNeeded();
            await locator.clear();
            await locator.fill(String(varString));
            // await this.page.waitForTimeout(300);
            console.log(`Entered "${varString}" value on: ${locator}`);
        } catch (error) {
            console.log(`Entering value on failed : ${locator}` + error);
        }

    }

    async setTextWithType(locator: Locator, varString: String,) {
        try {
            // console.log(`Typing "${varString}" into: ${locator}`);
            await this.page.waitForTimeout(this.timeOut);
            //await locator.scrollIntoViewIfNeeded();
            //await locator.waitFor();
            await locator.clear();
            await locator.type(String(varString));
            await this.page.waitForTimeout(300);
            console.log(`Typied "${varString}" into: ${locator}`);
        } catch (error) {
            console.log(`Typing "${varString}" into: ${locator} failed` + error);

        }

    }

    async setTextWithEnter(locator: Locator, varString: String,) {
        try {
            // console.log(`Filling Value with press One Enter "${varString}" into: ${locator}`);
            await this.page.waitForTimeout(this.timeOut);
            await locator.clear();
            await locator.fill(String(varString));
            await locator.press('Enter');
            console.log(`Entered "${varString}" value into: ${locator}`);

        } catch (error) {
            console.log(`Entering  "${varString}" value with single Enter - into: ${locator} failed` + error);
        }

    }

    async selectFromCustomDropDrown(locator: Locator, varString: String,) {
        try {
            //console.log(`selecting Value from Custom DropDown -"${varString}" into: ${locator}`);
            await this.page.waitForTimeout(this.timeOut);
            await locator.scrollIntoViewIfNeeded();
            await locator.fill(String(varString));
            await locator.press('Enter');
            await this.page.keyboard.press('Enter');
            const custumLocator: Locator = this.page.locator("(//div[@data-automation-label='" + varString + "' or text()='" + varString + "'])[1]");
            await this.page.waitForTimeout(1000);
            if (await custumLocator.isVisible() && await custumLocator.count() > 0) {
                await custumLocator.scrollIntoViewIfNeeded();
                await custumLocator.click();
            }
            // await this.page.waitForTimeout(this.timeOut);
            console.log(`Selected "${varString}" from Custom DropDown - into: ${locator}`);
        } catch (error) {
            console.log(`Selecting  "${varString}" value from Custom DropDown- into: ${locator} failed` + error);
        }

    }

    async setTextWithDoubleEnter(locator: Locator, varString: String,) {
        try {
            //console.log(`set ${varString} Value With Double Enter -"into: ${locator}`);
            await this.page.waitForTimeout(this.timeOut);
            await locator.clear();
            await locator.fill(String(varString));
            await locator.press('Enter');
            await this.page.keyboard.press('Enter');
        } catch (error) {
            console.log(`Selecting  "${varString}" value from Custom DropDown- into: ${locator} failed` + error);
        }
    }

    //check checkbox is checked 
    async checkBoxIsChecked(locator: Locator): Promise<boolean | void> {
        try {
            console.log(`Checking checkbox is checked or not-"into: ${locator}`);
            await this.page.waitForTimeout(this.timeOut);
            await locator.waitFor();
            await locator.scrollIntoViewIfNeeded();
            return await locator.check();
            // console.log(`Checking checkbox is checked or not-"into: ${locator}`);
        } catch (error) {
            console.log(`checking checkbox is : ${locator} failed ` + error);
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
        try {
            // console.log(`Clicking on : ${locator}`);
            await this.page.waitForTimeout(this.timeOut);
            await locator.click();
            console.log(`Clicked on : ${locator}`);
        } catch (error) {
            console.log(`clicking on : ${locator} failed ` + error);
        }
    }

    async doubleClick(locator: Locator) {
        try {
            // console.log(`Double Clicking on : ${locator}`);
            await this.page.waitForTimeout(this.timeOut);
            await locator.scrollIntoViewIfNeeded();
            await locator.dblclick();
            console.log(`Double Clicked on : ${locator}`);
        } catch (error) {
            console.log(`Double Clicking on : ${locator} failed ` + error);
        }
    }


    async clickElementJS(locator: string): Promise<void> {
        await this.page.$eval(locator, (element: HTMLElement) => element.click());
    }

    async setValueUsingJS(locator: string, varString: string) {
        // Use JavaScript execution to assign a value to an input field
        await this.page.$eval(locator, (element: HTMLElement) => element.ariaValueText = varString);
    }

    async waitForSelector(locator: Locator, options = {}) {
        console.log(`Waiting for selector: ${locator}`);
        await this.page.waitForSelector(String(locator), { timeout: 5000, ...options });
    }

    async getText(locator: Locator): Promise<string | null> {
        try {
            let text;
            //console.log(`Getting text from: ${locator}, text: "${text}"`);
            await this.page.waitForTimeout(this.timeOut);
            // await this.locator.waitFor();
            if (await locator.count() > 0 && await locator.isVisible()) {
                await locator.scrollIntoViewIfNeeded();
                text = await locator.textContent();
            }
            console.log(`Got text from: ${locator}, text: "${text}"`);
            return text;
        } catch (error) {
            console.log(`Getting text from : ${locator} failed ` + error);
        }
    }

    async getInnerText(locator: Locator): Promise<string | null> {
        try {
            let text;
           // console.log(`Getting Inner text from: ${locator}, text: "${text}"`);
            await this.page.waitForTimeout(this.timeOut);
            if (await locator.count() > 0) {
                await locator.scrollIntoViewIfNeeded();
                //  await locator.waitFor();
                text = await locator.innerText();
            }
            console.log(`Getting Inner text from: ${locator}, text: "${text}"`);
            return text;
        } catch (error) {
            console.log(`Getting Inner text from : ${locator} failed ` + error);
        }

    }

    async getAllInnerText(locator: Locator): Promise<string[] | null> {
        try {
            let text;
            // console.log(`Getting All Inner text from: ${locator}, text: "${text}"`);
            await this.page.waitForTimeout(this.timeOut);
            if (await locator.count() > 0) {
                await locator.scrollIntoViewIfNeeded();
                //  await locator.waitFor();
                text = await locator.allInnerTexts();
            }
            console.log(`Getting All Inner text from: ${locator}, text: "${text}"`);
            return text;
        } catch (error) {
            console.log(`Getting All Inner text from : ${locator} failed ` + error);
        }
    }

    async getListOfText(locator: Locator): Promise<string[] | null> {
        try {
            let text: string[];
            //console.log(`Getting text(Using textContext) from: ${locator}, text: "${text}"`);
            await this.page.waitForTimeout(this.timeOut);
            // await this.locator.waitFor();
            if (await locator.count() > 0 && await locator.isVisible()) {
                await locator.scrollIntoViewIfNeeded();
                text = await locator.allTextContents();
            }
            console.log(`Getting all text(Using textContext) from: ${locator}, text: "${text}"`);
            return text;
        } catch (error) {
            console.log(`Getting All text(Using textContext) from : ${locator} failed ` + error);
        }
    }

    async selectDropDown(locator: Locator, varString: string) {
        try {
           // console.log(`Selecting ${varString} value (Using SelectOption) from: ${locator}, Value: "${varString}"`);
            await this.page.waitForTimeout(this.timeOut);
            await locator.waitFor();
            await locator.scrollIntoViewIfNeeded();
            await locator.selectOption(varString);
            console.log(`Selecting ' ${varString}'  value (Using SelectOption) from: ${locator}, Value: "${varString}"`);
        } catch (error) {
            console.log(`Selecting ${varString} value (Using textContext) from : ${locator} failed ` + error);
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