import { Page, BrowserContext, Locator,expect } from '@playwright/test';

export class WFMNotificationPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly EMP_REQUESTS: Locator;
    readonly EMP_SEARCHBAR: Locator;
    readonly EMP_RELOAD: Locator;
    readonly EMP_Select: Locator;
    readonly EMP_Selected: Locator;
    employeeNumbers: string[];

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.EMP_REQUESTS = page.getByRole('button', { name: 'Employee Requests' })
        this.EMP_SEARCHBAR = page.getByRole('textbox', { name: 'Search' });
        this.EMP_RELOAD = page.getByRole('button', { name: ' Reload' });
        this.EMP_Select = page.getByRole('button', { name: 'Select people' });
        this.EMP_Selected = page.getByRole('menu', { name: 'Select people' }).locator('label');
        
    }

    async SelectEmpRequests( start_Date: string, end_date: string ): Promise<void>{

        await this.EMP_REQUESTS.click();
        // Wait for the elements to be available
        await this.page.waitForSelector(`#cc-slats-0-slat-area-1`);

        const elements = await this.page.getByRole('button', { name: 'Request GL-Time Off Request Employee' }).all();
        if (elements.length > 0) {
            for (let index = 0; index < elements.length; index++) {
                const ele = elements[index];
                const rawText = await ele.textContent();
                if (rawText) {
                    const cleanedText = rawText.replace(/\s+/g, ' ').trim();
                    console.log(cleanedText);

                    const parts = cleanedText.split(':').map(part => part.trim());
                    let startDate = "";
                    let endDate = "";
                    
                    for (let i = 0; i < parts.length; i++) {
                        if (parts[i].includes('Request Period')) {
                            const dateRange = parts[i + 1].split('-').map(date => date.trim());
                            startDate = dateRange[0];
                            endDate = dateRange[1];
                            break;
                        }
                    }

                    if (startDate === start_Date && endDate.includes(end_date)) {
                        const checkboxLocator = this.page.locator(`#cc-slats-${index}-slat-area-1`).getByLabel('Select Item');
                        await checkboxLocator.check();
                        
                        await this.page.waitForLoadState('domcontentloaded');
                        // Validate and perform the appropriate action
                         const approvalRecommended = await this.page.getByText('Approval is recommended').isVisible();
                         const rejectionRecommended = await this.page.getByText('Rejection is recommended').isVisible();
 
                         if (approvalRecommended) {
                             await this.page.getByText('Approve', { exact: true }).click();
                         } else if (rejectionRecommended) {
                             await this.page.getByText('Refuse', { exact: true }).click();
                         } else {
                            throw new Error('Neither "Approval is recommended" nor "Rejection is recommended" was found.');
                        }

                        // Check for failure message after performing the action
                        const failureMessage = await this.page.locator('#failure-message').textContent();
                        if (failureMessage && failureMessage.includes('Error The request overlaps an existing pay code edit for the same pay code.')) {
                            throw new Error('Error: The request overlaps an existing pay code edit for the same pay code.');
                        }

                        break
                     }
                }
            }
        } 
            else {
                console.log("No matching elements found.");
            }
    } 

    async


}



