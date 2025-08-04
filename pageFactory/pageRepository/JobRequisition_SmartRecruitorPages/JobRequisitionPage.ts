import { WebActionsPage } from '@lib/WebActionPage';
import { JobChangePage } from '@pages/JobChangePage';
import { BrowserContext, expect, Locator, Page } from '@playwright/test';


export class JobRequisitionPage extends WebActionsPage {

    readonly page: Page;
    //readonly street: Locator;
    readonly btnNext: Locator;
    readonly lblStart: Locator;
    readonly lblStartDetails: Locator;
    readonly lblAttachment: Locator;
    readonly btnStart: Locator;
    readonly btnEditStartDetails: Locator;
    readonly btnSaveStartDetails: Locator;
    readonly btnEditJobProfile: Locator;
    readonly btnEditPosition: Locator;
    readonly btnSaveJobProfile: Locator;
    readonly btnSavePosition: Locator;
    readonly btnEditRecruitingDetails: Locator;
    readonly btnSaveRecruitingDetails: Locator;
    readonly txtNumberOfOpenings: Locator;
    readonly drpReason: Locator;
    readonly drpReplacementFor: Locator;
    readonly drpRecruitingInstruction: Locator;
    readonly txtRecruitingStartDate: Locator;
    readonly txtTargetHireDate: Locator;
    readonly txtTargetEndDate: Locator;
    readonly jobChanges: JobChangePage;


    constructor(page: Page, context: BrowserContext) {

        super(page);
        this.page = page;
        this.btnNext = page.getByRole('button', { name: 'Next', exact: true }).nth(0);
        this.lblStart = page.locator("//h2[contains(.,'Start')]");
        this.lblStartDetails = page.locator("//div[@data-metadata-id='NO_METADATA_ID']/div/*[text()='Start Details']");
        this.lblAttachment = page.locator("(//div[@data-metadata-id='NO_METADATA_ID']/div/*[text()='Documents']/ancestor::div/descendant ::*[text()='Attachments'])[1]");
        this.btnStart = page.locator("//span[contains(.,'Start')]/parent::button");
        this.btnEditStartDetails = page.locator("//button[@aria-label='Edit Start Details']");
        this.btnSaveStartDetails = page.locator("//button[@aria-label='Save Start Details']");
        this.btnEditJobProfile = page.locator("//button[@aria-label='Edit Job Profile']");
        this.btnEditPosition = page.locator("//button[@aria-label='Edit Position']");
        this.btnSaveJobProfile = page.locator("//button[@aria-label='Save Job Profile']");
        this.btnSavePosition = page.locator("//button[@aria-label='Save Position']");
        // getByLabel('Edit Job Details')
        ///-----------new locators

        this.btnEditRecruitingDetails = page.getByLabel('Edit Recruiting Details').nth(0);
        this.btnSaveRecruitingDetails = page.getByLabel('Save Recruiting Details').nth(0);
        this.txtNumberOfOpenings = page.getByLabel('Number of Openings').nth(0);

        this.drpReason = page.getByLabel('Reason', { exact: true });
        this.drpReplacementFor = page.getByLabel('Replacement For');
        // this.drpRecruitingInstruction = page.getByLabel('Recruiting Instruction');
        this.drpRecruitingInstruction = page.getByLabel('select one').first();


        // await page.getByLabel('Post Internal and External -').click();

        this.txtRecruitingStartDate = page.getByLabel('Recruiting Start Date').getByPlaceholder('DD');

        this.txtTargetHireDate = page.getByLabel('Target Hire Date', { exact: true }).getByPlaceholder('DD');
        this.txtTargetEndDate = page.getByLabel('Target End Date').getByPlaceholder('DD');
        // getByLabel('Edit Job Details')
        this.jobChanges = new JobChangePage(page, context);
    }



    // await page.getByRole('button', { name: 'Close' }).click();

    async verifyRecruitingInfromationPage() {
        await expect(this.page.getByRole('heading', { name: 'Recruiting Details' })).toBeVisible();
    }

    async clickOnEditRecruitingDetails() {
        await super.click(this.btnEditRecruitingDetails);
    }

    async clickNext() {
        await super.click(this.btnNext);
    }
    async clickOnSaveRecruitingDetails() {
        await super.click(this.btnSaveRecruitingDetails);
    }

    async setRecruitingInfromation(Number_of_Openings: any, Reason: any, RecruitingInstruction: any, Recruiting_Start_Date: any, Target_Hire_Date: any, Target_End_Date: any) {
        await this.verifyRecruitingInfromationPage();
        await this.clickOnEditRecruitingDetails();
        await super.setText(this.txtNumberOfOpenings, String(Number_of_Openings));
        await super.setTextWithEnter(this.drpReason, String(Reason));
        // await super.setTextWithEnter(this.drpReplacementFor, String(Reason));
        await super.selectFromCustomList(this.drpRecruitingInstruction, String(RecruitingInstruction));
        if (Recruiting_Start_Date !== 'N/A' && Recruiting_Start_Date !== undefined && Recruiting_Start_Date !== 'NaN' && Recruiting_Start_Date !== '') {
            await super.setTextWithType(this.txtRecruitingStartDate, String(Recruiting_Start_Date));
        }
        await super.setTextWithType(this.txtTargetHireDate, String(Target_Hire_Date));

        if (Target_End_Date !== 'N/A' && Target_End_Date !== undefined && Target_End_Date !== 'NaN' && Target_End_Date !== '') {
            await super.setTextWithType(this.txtTargetEndDate, String(Target_End_Date));
        }
        await this.clickOnSaveRecruitingDetails();

    }

    async setJobDetails(JobPostingTitle: any, JobProfile: any, WorkerSubType: any, TimeType: any, WorkShift: any, PrimaryLocation: any, ScheduledWeeklyHours: any) {
        await this.page.waitForTimeout(1000);
        await expect(await this.page.getByRole('heading', { name: 'Job Details' })).toBeVisible();
        await super.click(this.page.getByLabel('Edit Job Details'));
        await super.setText(this.page.getByLabel('Job Posting Title'), String(JobPostingTitle));
        await super.setTextWithDoubleEnter(await this.page.getByLabel('Job Profile'), String(JobProfile));
        await super.setTextWithDoubleEnter(await this.page.getByLabel('Worker Sub-Type'), String(WorkerSubType));
        await super.setTextWithDoubleEnter(await this.page.getByLabel('Time Type'), String(TimeType));
        await super.setTextWithDoubleEnter(this.page.getByLabel('Primary Location').nth(0), String(PrimaryLocation));
        await super.setTextWithDoubleEnter(this.page.getByLabel('Scheduled Weekly Hours'), String(ScheduledWeeklyHours));
        await super.selectFromCustomDropDrownBySliptAndEnter(await this.page.getByLabel('Work Shift'), String(WorkShift));
        await this.page.getByLabel('Save Job Details').click();
        //    this.jobChanges.editJobProfile();
    }

}

