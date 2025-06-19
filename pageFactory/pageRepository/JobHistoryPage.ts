import { WebActionsPage } from '@lib/WebActionPage';
import { expect, Page } from '@playwright/test';

export class JobHistoryPage extends WebActionsPage {


    readonly page: Page;
    constructor(page: Page) {
        super(page);
        this.page = page;

    }


    async validateJobChangesProcess(Process: string, ChangeJob_Start_EffectiveDate: any,
        ChangeJob_Start_NewTeam: any, ChangeJob_JobClassifications_EmployeeType: any,
        ChangeJob_JobProfile: any, ChangeJob_JobClassifications_TimeType: any,
        ChangeJob_LocationDetails_ScheduledWeeklyHours: any, ChangeJob_Company_CostCentre: any,
        ChangeJob_Company_Department: any) {
        await this.page.getByRole('link', { name: 'Job' }).waitFor();
        await this.page.getByRole('link', { name: 'Job' }).click({ force: true })
        await this.page.getByRole('tablist').getByText('Job History').click();

        const lbljobProfile = this.page.getByRole('cell', { name: `${ChangeJob_JobProfile}` }).first();
        const lblTimeType = this.page.getByRole('cell', { name: `${ChangeJob_JobClassifications_TimeType}` + ' Related Actions' }).first();
        const lblCostCentreAndDepartment = this.page.getByRole('cell', { name: 'items selected' }).first();
        const workerType = this.page.getByLabel(`${ChangeJob_JobClassifications_EmployeeType}`, { exact: true }).first();
        const lblSupervisoryORG = this.page.getByLabel(`${ChangeJob_Start_NewTeam}`, { exact: true }).first();
        const lnkEffectiveDate = this.page.locator("//div[@data-automation-id='textView' and contains(text(),'" + ChangeJob_Start_EffectiveDate + "') ]").first();
        const lblScheduleWOrkingHours = this.page.getByRole('cell', { name: `${ChangeJob_LocationDetails_ScheduledWeeklyHours}` }).first();

        if (Process.toLocaleLowerCase().includes('promotion_manager')) {
            await expect(lblSupervisoryORG).toBeVisible();
            await expect(lnkEffectiveDate).toBeVisible();
            await expect(lbljobProfile).toBeVisible();
            await expect(workerType).toBeVisible();
            await expect(lblCostCentreAndDepartment).toContainText(ChangeJob_Company_CostCentre);
            await expect(lblCostCentreAndDepartment).toContainText(ChangeJob_Company_Department);
        } else if (Process.toLocaleLowerCase().includes('demotion')) {
            await expect(lblSupervisoryORG).toBeVisible();
            await expect(lnkEffectiveDate).toBeVisible();
            await expect(lbljobProfile).toBeVisible();
            await expect(workerType).toBeVisible();
            await expect(lblCostCentreAndDepartment).toContainText(ChangeJob_Company_CostCentre);
            await expect(lblCostCentreAndDepartment).toContainText(ChangeJob_Company_Department);
        } else if (Process.toLocaleLowerCase().includes('fulltime_to_parttime') || Process.toLocaleLowerCase().includes('partTime_to_fulltime')) {
            await expect(lnkEffectiveDate).toBeVisible();
            await expect(lblTimeType).toBeVisible();
            await expect(lblScheduleWOrkingHours).toBeVisible();
        } else if (Process.toLocaleLowerCase().includes('permanent')) {
            await expect(lnkEffectiveDate).toBeVisible();
            await expect(workerType).toBeVisible();
        } else if (Process.toLocaleLowerCase().includes('promotion')) {
            await expect(lnkEffectiveDate).toBeVisible();
            await expect(lbljobProfile).toBeVisible();
        }
    }







}