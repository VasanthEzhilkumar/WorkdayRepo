import { WebActionsPage } from '@lib/WebActionPage';
import { BrowserContext, Locator, Page } from '@playwright/test';

export class JobChangePage extends WebActionsPage {

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
    readonly btnEditLocationDetails: Locator;
    readonly btnSaveLocationDetails: Locator;
    readonly btnEditJobClassifications: Locator;
    readonly btnSaveJobClassifications: Locator;
    readonly btnEditAdministrative: Locator;
    readonly btnSaveAdministrative: Locator;
    readonly btnEditCompany: Locator;
    readonly btnSaveCompany: Locator;
    readonly btnEditCostCentre: Locator;
    readonly btnSaveCostCentre: Locator;
    readonly btnEditOther: Locator;
    readonly btnSaveOther: Locator;
    readonly btnSubmit: Locator;
    readonly lblJobProfile: Locator;
    readonly lblPosition: Locator;
    readonly lblJobClassifications: Locator;
    readonly lblLocationDetails: Locator;
    readonly lblDocuments: Locator;
    readonly lblCompany: Locator;
    readonly rbNextPayPeriod: Locator;
    readonly rbNextPayPeriod_On: Locator;
    readonly rbNextPayPeriod_Off: Locator;
    readonly lblMove: Locator;
    readonly txtEffectiveDate_Day: Locator;
    readonly txtEffectiveDate_Month: Locator;
    readonly txtReason: Locator;
    readonly txtNewManager: Locator;
    readonly txtNewTeam: Locator;
    readonly txtNewLocation: Locator;
    readonly txtJobProfile: Locator;
    readonly txtPosition: Locator;
    readonly txtJobTitle: Locator;
    readonly txtLocation: Locator;
    readonly txtScheduledWeeklyHours: Locator;
    readonly txtWorkShift: Locator;
    readonly txtAdditionalJobClassifications: Locator;
    readonly txtEmployeeType: Locator;
    readonly txtTimeType: Locator;
    readonly txtPayRateType: Locator;
    readonly txtDefaultWeeklyHours: Locator;
    readonly txtEndEmploymentDate_Day: Locator;
    readonly txtEndEmploymentDate_Month: Locator;
    readonly txtFirstDayOfWork_Day: Locator;
    readonly txtFirstDayOfWork_Month: Locator;
    readonly txtCostCentre: Locator;
    readonly txtDepartment: Locator;
    readonly txtAssignmentType: Locator;
    readonly txtStatus: Locator;
    readonly txtEndContractDate_Day: Locator;
    readonly txtEndContractDate_Month: Locator;
    txtEndEmploymentDate_Day1: Locator;

    constructor(page: Page, context: BrowserContext) {
        super(page);
        this.page = page;
        this.btnNext = page.locator("//span[contains(.,'Next')]/parent::button");
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
        this.btnEditLocationDetails = page.locator("//button[@aria-label='Edit Location Details']").first();
        this.btnSaveLocationDetails = page.locator("//button[@aria-label='Save Location Details']");
        this.btnEditJobClassifications = page.locator("//button[@aria-label='Edit Job Classifications']");
        this.btnSaveJobClassifications = page.locator("//button[@aria-label='Save Job Classifications']");
        this.btnEditAdministrative = page.locator("//button[@aria-label='Edit Administrative']");
        this.btnSaveAdministrative = page.locator("//button[@aria-label='Save Administrative']");
        this.btnEditCompany = page.locator("//button[@aria-label='Edit Company']");
        this.btnSaveCompany = page.locator("//button[@aria-label='Save Company']");
        this.btnEditCostCentre = page.locator("//button[@aria-label='Edit Cost Center']");
        this.btnSaveCostCentre = page.locator("//button[@aria-label='Save Cost Center']");
        this.btnEditOther = page.locator("//button[@aria-label='Edit Other']");
        this.btnSaveOther = page.locator("//button[@aria-label='Save Other']");
        this.btnSubmit = page.locator("//span[contains(.,'Submit')]/parent::button");
        // this.lblJobProfile = page.locator("//h2[contains(.,'Job Profile')]");
        this.lblJobProfile = page.getByLabel('Job Profile', { exact: true }).getByPlaceholder('Search');
        this.lblPosition = page.locator("//h2[contains(.,'Position')]");
        this.lblPosition = page.locator("//div[@data-metadata-id='NO_METADATA_ID']/div/*[text()='Position']");
        this.lblJobClassifications = page.locator("//div[@data-metadata-id='NO_METADATA_ID']/div/*[text()='Job Classifications']");
        this.lblLocationDetails = page.locator("//div[@data-metadata-id='NO_METADATA_ID']/div/*[text()='Location Details']");
        this.lblDocuments = page.locator("//div[@data-metadata-id='NO_METADATA_ID']/div/*[text()='Documents']");
        this.lblCompany = page.locator("//div[@data-metadata-id='NO_METADATA_ID']/div/*[text()='Company']");
        this.rbNextPayPeriod = page.locator("//input[@type='checkbox']");
        this.rbNextPayPeriod_On = page.locator("//input[@type='checkbox'][@aria-checked='true']");
        this.rbNextPayPeriod_Off = page.locator("//input[@type='checkbox'][@aria-checked='false']");
        this.lblMove = page.locator("(//div[@data-metadata-id='NO_METADATA_ID']//div[@title='Move']/*[text()='Move'])[1]");
        //''''''''''''''''
        this.txtReason = page.locator("//label[contains(.,'Why are you making this change?')]/parent::div/following-sibling::div/descendant::input[@placeholder='Search']");
        this.txtNewTeam = page.locator("//label[text()='Which team will this person be on after this change?']/parent::div/following-sibling::div/descendant::input[contains(@placeholder,'Search')]");
        this.txtNewManager = page.locator("//label[text()='Who will be the manager after this change?']/parent::div/following-sibling::div/descendant::input[contains(@placeholder,'Search')]");
        this.txtNewLocation = page.locator("//label[text()='Where will this person be located after this change?']/parent::div/following-sibling::div/descendant::input[contains(@placeholder,'Search')]");

        // this.txtReason = page.getByLabel('Why are you making this change?', { exact: true }).getByPlaceholder('Search')
        // this.txtNewTeam = page.getByLabel('Which team will this person be on after this change?', { exact: true }).getByPlaceholder('Search')
        // this.txtNewManager = page.getByLabel('Who will be the manager after this change?', { exact: true }).getByPlaceholder('Search')
        // this.txtNewLocation = page.getByLabel('Where will this person be located after this change?', { exact: true }).getByPlaceholder('Search')
        this.txtAdditionalJobClassifications = page.locator("//label[contains(.,'Additional Job Classifications')]/parent::div/following-sibling::div/descendant::input[@placeholder='Search']")
        this.txtPosition = page.locator("//label[text()='Position']/ancestor::li[@role='presentation']/following-sibling::li/descendant::input[@placeholder='Search']");
        // this.txtLocation = page.getByLabel('Location', { exact: true }).getByPlaceholder('Search')
        this.txtLocation = page.locator("//label[text()='Location']/parent::div/following-sibling::div/descendant::input[contains(@placeholder,'Search')]")
        this.txtWorkShift = page.getByLabel('Work Shift', { exact: true }).getByPlaceholder('Search');
        this.txtScheduledWeeklyHours = page.locator("//label[text()='Scheduled Weekly Hours']/parent::div/following-sibling::div/descendant::input");

        //---------------
        this.txtAdditionalJobClassifications = page.locator("//label[contains(.,'Additional Job Classifications')]/parent::div/following-sibling::div/descendant::input[@placeholder='Search']");
        this.txtEmployeeType = page.locator("//label[contains(.,'Employee Type')]/parent::div/following-sibling::div/descendant::input[@placeholder='Search']");
        this.txtTimeType = page.locator("//label[contains(.,'Time Type')]/parent::div/following-sibling::div/descendant::input[@placeholder='Search']");
        this.txtPayRateType = page.locator("//label[contains(.,'Pay Rate Type')]/parent::div/following-sibling::div/descendant::input[@placeholder='Search']");
        this.txtDefaultWeeklyHours = page.locator("//label[text()='Default Weekly Hours']/parent::div/following-sibling::div/descendant::input");

        this.txtEndEmploymentDate_Day = page.locator("//label[contains(.,'End Employment Date')]/parent::div/following-sibling::div/descendant::input[@aria-label='Day']");
        this.txtEndEmploymentDate_Month = page.locator("//label[contains(.,'End Employment Date')]/parent::div/following-sibling::div/descendant::input[@data-automation-id='dateWidgetInputBox']/following-sibling::span[@aria-label='Month']");
        this.txtEndEmploymentDate_Day1 = page.getByLabel('current value is DD/MM/YYYY').getByPlaceholder('DD').first();

        this.txtFirstDayOfWork_Day = page.locator("//label[contains(.,'First Day of Work')]/parent::div/following-sibling::div/descendant::input[@data-automation-id='dateWidgetInputBox']/following-sibling::span[@aria-label='Day']");
        this.txtFirstDayOfWork_Month = page.locator("//label[contains(.,'First Day of Work')]/parent::div/following-sibling::div/descendant::input[@data-automation-id='dateWidgetInputBox']/following-sibling::span[@aria-label='Month']");
        this.txtCostCentre = page.locator("//label[contains(.,'Cost Center')]/parent::div/following-sibling::div/descendant::input[@placeholder='Search']");
        this.txtDepartment = page.locator("//div[@aria-label='Department/Section']/ancestor::li[@role='presentation']/following-sibling::li/descendant::input[@placeholder='Search']");
        this.txtAssignmentType = page.locator("//label[contains(.,'Assignment Type')]/parent::div/following-sibling::div/descendant::input[@placeholder='Search']");
        this.txtStatus = page.locator("//label[contains(.,'Status')]/parent::div/following-sibling::div/descendant::input[@placeholder='Search']");
        this.txtEndContractDate_Day = page.locator("//label[contains(text(),'Contract End Date')]/parent::div/following-sibling::div//input[@data-automation-id='dateSectionDay-input']");
        this.txtEndContractDate_Month = page.locator("//label[contains(text(),'Contract End Date')]/parent::div/following-sibling::div//input[@data-automation-id='dateSectionMonth-input']");

    }






    async editStartDetails(startDate: string, reason: string, nextPayPeriod: string, newTeam: string,
        newManager: string, newLocation: string) {
        await this.page.waitForTimeout(1000);
        await this.btnEditStartDetails.click();
        await this.page.getByPlaceholder('DD').first().focus();
        await super.setTextWithType(await this.page.getByPlaceholder('DD').first(), String(startDate));
        await super.setTextWithDoubleEnter(this.txtReason, reason);

        if (nextPayPeriod !== "N/A" && nextPayPeriod !== undefined && nextPayPeriod !== " " && await this.rbNextPayPeriod_Off.isVisible()) {
            await super.click(this.rbNextPayPeriod);
        } else if (nextPayPeriod.toLocaleLowerCase() === "yes" && !await this.rbNextPayPeriod.isChecked()) {
            await super.click(this.rbNextPayPeriod);
        }

        if (newTeam !== "N/A" && newTeam !== undefined && newTeam !== " " && await this.txtNewTeam.isVisible()) {
            newTeam = newTeam.split("(")[0];
            await super.setTextWithDoubleEnter(this.txtNewTeam, newTeam);
        }

        if (newManager !== "N/A" && newManager !== undefined && newManager !== " " && await this.txtNewManager.isVisible()) {
            await super.setTextWithDoubleEnter(this.txtNewManager, newManager);
        }

        if (newLocation !== "N/A" && newLocation !== undefined && newLocation !== " " && await this.txtNewLocation.isVisible()) {
            await super.setTextWithDoubleEnter(this.txtNewLocation, newLocation);
        }

        await this.btnSaveStartDetails.click();
        await this.btnStart.click();
    }

    async editJobProfile(position: string, jobProfile: string) {
        await this.page.waitForTimeout(1000);
        const positionEdit = await this.page.locator("//button[@aria-label='Edit Position']").first();
        if (position !== "N/A" && position !== undefined && position !== "DummyValue" && await positionEdit.isVisible()) {
            await positionEdit.click();
            await this.page.waitForTimeout(1000);
            if (await this.txtPosition.isVisible())
                await super.setTextWithDoubleEnter(this.txtPosition, position);
        }

        await this.btnEditJobProfile.click();
        await this.page.waitForTimeout(500);
        const jobProfileLocator = await this.page.getByLabel('Job Profile', { exact: true }).getByPlaceholder('Search')
        if (jobProfile !== "N/A" && jobProfile !== undefined && jobProfile !== " " && await jobProfileLocator.isVisible()) {
            await super.setTextWithDoubleEnter(jobProfileLocator, jobProfile);
        }
        await this.btnSaveJobProfile.click();
        await this.page.waitForTimeout(500)
        await this.btnNext.click();
    }

    async clickNext() {
        const lblOpening1 = await this.page.getByText('What do you want to do with the opening left on your team?What do you want to').first();
        const lblOpnning = await this.page.getByLabel('Opening', { exact: true }).first().or(lblOpening1);
        await this.page.waitForTimeout(1000);
        if (await lblOpnning.count() > 0)
            await this.btnNext.click();
    }


    async editJobProfileld(jobProfile: string) {
        await this.page.waitForTimeout(500);
        await this.btnEditJobProfile.click();

        // only enter value if jobProfile is NOT "N/A" and NOT blank
        if (jobProfile.trim() !== "" && !jobProfile.toUpperCase().includes("N/A")) {
            await super.setTextWithDoubleEnter(
                this.page
                    .getByLabel("Job Profile", { exact: true })
                    .getByPlaceholder("Search"),
                jobProfile
            );
        }

        await this.btnSaveJobProfile.click();
        await this.btnNext.click();
    }

    async editLocationDetails(ChangeJob_LocationDetails_Location: string, ChangeJob_LocationDetails_ScheduledWeeklyHours: string, ChangeJob_LocationDetails_WorkShift: string) {
        await this.page.waitForTimeout(2000);
        await this.btnEditLocationDetails.click()
        if (ChangeJob_LocationDetails_Location !== "N/A" && ChangeJob_LocationDetails_Location !== undefined && ChangeJob_LocationDetails_Location !== " " && await this.txtLocation.isVisible()) {
            await super.setTextWithDoubleEnter(this.txtLocation, String(ChangeJob_LocationDetails_Location));
        }
        await this.page.waitForTimeout(500);
        if (ChangeJob_LocationDetails_ScheduledWeeklyHours !== "N/A" && ChangeJob_LocationDetails_ScheduledWeeklyHours !== undefined && ChangeJob_LocationDetails_ScheduledWeeklyHours !== " " && await this.txtScheduledWeeklyHours.isVisible()) {
            await super.setTextWithDoubleEnter(this.txtScheduledWeeklyHours, String(ChangeJob_LocationDetails_ScheduledWeeklyHours));
        }
        await this.page.waitForTimeout(500);
        if (ChangeJob_LocationDetails_WorkShift !== "N/A" && ChangeJob_LocationDetails_WorkShift !== undefined && ChangeJob_LocationDetails_WorkShift !== " " && await this.txtWorkShift.isVisible()) {
            await super.setTextWithDoubleEnter(this.txtWorkShift, String(ChangeJob_LocationDetails_WorkShift));
        }
        await this.page.waitForTimeout(500);
        await this.btnSaveLocationDetails.click();
        await this.btnNext.click();
    }

    async editAdminDetails(ChangeJob_JobClassifications_AdditionalJobClassifications: any, ChangeJob_JobClassifications_EmployeeType: any, ChangeJob_JobClassifications_TimeType: any, ChangeJob_JobClassifications_PayRateType: any, ChangeJob_JobClassifications_DefaultWeeklyHours: any, ChangeJob_JobClassifications_EndEmploymentDate: any, ChangeJob_JobClassifications_FirstDayofWork: any) {
        await this.page.waitForTimeout(2000);
        if (ChangeJob_JobClassifications_AdditionalJobClassifications !== "N/A" && ChangeJob_JobClassifications_AdditionalJobClassifications !== undefined && ChangeJob_JobClassifications_AdditionalJobClassifications !== " ") {
            await this.page.locator("//button[@aria-label='Edit Job Classifications']").click();
            if (await this.txtAdditionalJobClassifications.isVisible())
                await super.setTextWithDoubleEnter(this.txtAdditionalJobClassifications, String(ChangeJob_JobClassifications_AdditionalJobClassifications));
        }

        await this.btnEditAdministrative.click();
        await this.page.waitForTimeout(700);
        if (ChangeJob_JobClassifications_EmployeeType !== "N/A" && ChangeJob_JobClassifications_EmployeeType !== undefined && ChangeJob_JobClassifications_EmployeeType !== " " && await this.txtEmployeeType.count() > 0) {
            await super.setTextWithDoubleEnter(this.txtEmployeeType, String(ChangeJob_JobClassifications_EmployeeType));
        }
        await this.page.waitForTimeout(500);
        if (ChangeJob_JobClassifications_TimeType !== "N/A" && ChangeJob_JobClassifications_TimeType !== undefined && ChangeJob_JobClassifications_TimeType !== " " && await this.txtTimeType.count() > 0) {
            await super.setTextWithDoubleEnter(this.txtTimeType, String(ChangeJob_JobClassifications_TimeType));
        }
        if (ChangeJob_JobClassifications_PayRateType !== "N/A" && ChangeJob_JobClassifications_PayRateType !== undefined && ChangeJob_JobClassifications_PayRateType !== " " && await this.txtPayRateType.count() > 0) {
            await super.setTextWithDoubleEnter(this.txtPayRateType, String(ChangeJob_JobClassifications_PayRateType));
        }
        await this.page.waitForTimeout(500);
        if (ChangeJob_JobClassifications_DefaultWeeklyHours !== "N/A" && ChangeJob_JobClassifications_DefaultWeeklyHours !== undefined && ChangeJob_JobClassifications_DefaultWeeklyHours !== " " && await this.txtDefaultWeeklyHours.count() > 0) {
            await super.setTextWithDoubleEnter(this.txtDefaultWeeklyHours, String(ChangeJob_JobClassifications_DefaultWeeklyHours));
        }
        await this.page.waitForTimeout(500);
        if (ChangeJob_JobClassifications_EndEmploymentDate !== "N/A" && ChangeJob_JobClassifications_EndEmploymentDate !== undefined && ChangeJob_JobClassifications_EndEmploymentDate !== " " && await this.txtEndEmploymentDate_Day.count() > 0) {
            await super.setTextWithType(this.txtEndEmploymentDate_Day, String(ChangeJob_JobClassifications_EndEmploymentDate));
        }
        await this.btnSaveAdministrative.click();
        await this.btnNext.click();


    }

    async editOrganizationDetails(ChangeJob_Company_CostCentre: any, ChangeJob_Company_Department: any) {
        await this.page.waitForTimeout(2000);
        if (ChangeJob_Company_CostCentre !== "N/A" && ChangeJob_Company_CostCentre !== undefined && ChangeJob_Company_CostCentre !== " " && await this.btnEditCostCentre.isVisible()) {
            await this.btnEditCostCentre.click();
            await this.page.waitForTimeout(500);
            await super.setTextWithDoubleEnter(this.txtCostCentre, String(ChangeJob_Company_CostCentre));
            await this.btnSaveCostCentre.click();
        }
        await this.page.waitForTimeout(100);
        if (ChangeJob_Company_Department !== "N/A" && ChangeJob_Company_Department !== undefined && ChangeJob_Company_Department !== " " && await this.btnEditOther.isVisible()) {
            await this.btnEditOther.click();
            await this.page.waitForTimeout(500);
            await super.setTextWithDoubleEnter(this.txtDepartment, String(ChangeJob_Company_Department));
            await this.btnSaveOther.click()
        }

        await this.btnNext.click();


    }

    async ReviewSummarySubmit() {
        await this.page.waitForTimeout(1000);
        await this.btnSubmit.click();

    }




}