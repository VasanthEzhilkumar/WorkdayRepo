import test from '@lib/BaseTest';
import { CaptureAlertErrors } from '@lib/CaptureErrors';

import { excelToJson, getExcelFilePath } from '@lib/ExceltoJsonUtil';
import { writePositionToExcel, writeUniqueNamesToExcel } from '@lib/ExcelUtils';
import { ProposeCompensationPage } from '@pages/CommonPages/ProposeCompensationPage';
import { createPositionPage } from '@pages/createPositionpage';
import { employeeInboxPage } from '@pages/employeeInboxpage';
import { HrInboxPage } from '@pages/hrInboxPage';
import { JobChangePage } from '@pages/JobChangePage';
import { JobHistoryPage } from '@pages/JobHistoryPage';
import { testConfig } from 'testConfig';

let position: string;
let capObj: CaptureAlertErrors;
let givenName, familyName = null;


// Define the relative directory path to your Excel file
const excelFileName = 'JobChange/Workday_JobChange_Czechia.xlsx';
const excelFilePath = getExcelFilePath(excelFileName);

// Convert the Excel sheets to JSON format
const sheetsJson = excelToJson(excelFilePath);

// // Log the keys to verify the sheet names
console.log("Available Sheets: ", Object.keys(sheetsJson));

// // Ensure the sheet exists
const sheetName = 'Sheet1';  // Update this if your sheet has a different name
if (!sheetsJson[sheetName]) {
  throw new Error(`Sheet '${sheetName}' not found in the Excel file.`);
}


// test.use({ viewport: { width: 1920, height: 1080 } }); 
// Iterate over each dataset and run the test
for (const sheetName in sheetsJson) {
  if (sheetName === 'Sheet1') {
    const dataSet = sheetsJson[sheetName];

    dataSet.forEach((data, index) => {

      //const jobProfile = data.JobProfile || `JobProfile_${index + 1}`;
      //const { givenName, familyName } = generateRandomName();

      const jobProfile = data.ChangeJob_JobProfile;

      test(`@JobChange - Test ${index + 1} `, async ({ page, context, login, hireEmployee, appCommon, proxy }) => {
        try {
          await page.setViewportSize({ width: 1280, height: 596 });
          console.log(`Starting JobChange  ${data.Process} ${data.EmployeeID}`);
          const username = testConfig.WorkdayUsername;
          const password = testConfig.WorkdayPassword;
          // initlize the web environment 
          await login.goto("PK17");
          // login into application 
          await login.sigIn(username, password);
          await appCommon.SearchClickLink(data.EmployeeID.toString());

          [givenName, familyName] = await appCommon.getEmployeeGivenNameAndFamilyName(data.EmployeeID.toString());
          await writeUniqueNamesToExcel(excelFilePath, sheetName, index, givenName, familyName);

          const empInboxpage = new employeeInboxPage(page, givenName, familyName, jobProfile, context);
          const hrInbxPage = new HrInboxPage(page, givenName, familyName, context);
          const proposeCompensation = new ProposeCompensationPage(page, givenName, familyName, context);
          const jobChangePage = new JobChangePage(page, context);
          capObj = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index);
          const createPostition = new createPositionPage(page);
          const jobHistoryPage = new JobHistoryPage(page);

          // create position for Management hires
          if (data.ChangeJob_JobProfile.toString().includes("Manager") && data.Process.toString().toLocaleLowerCase() === "promotion_manager") {
            await appCommon.SearchClickLink("Create Position");
            await hireEmployee.searchSupervisoryOrganizationMgr(String(data.ChangeJob_Start_NewTeam));

            const currentDate = new Date();
            const day = String(currentDate.getDate()).padStart(2, '0');
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const year = currentDate.getFullYear();

            const ChangeJob_Current = `${day}/${month}/${year}`;
            console.log('Current Date:', ChangeJob_Current);

            //position = await createPostition.createPositionForManager(ChangeJob_Current, ChangeJob_Current, data.ChangeJob_JobClassifications_EmployeeType, data.ChangeJob_JobProfile, data.ChangeJob_JobClassifications_TimeType, data.ChangeJob_Start_NewLocation);
            position = await createPostition.createPositionForManager(data.ChangeJob_Start_EffectiveDate, data.ChangeJob_Start_EffectiveDate, data.ChangeJob_JobClassifications_EmployeeType, data.ChangeJob_JobProfile, data.ChangeJob_JobClassifications_TimeType, data.ChangeJob_Start_NewLocation);

            await capObj.checkForScreenErrors();
            await appCommon.SuccessEventHandle();
            await appCommon.MyTasks();
            //passing position created for selecting exact task from My Task (inbox).
            await empInboxpage.setDeparmentAndCostCenter(position, data.ChangeJob_Company_CostCentre, data.ChangeJob_Company_Department, givenName, familyName);
            await capObj.checkForScreenErrors();
            await appCommon.SuccessEventHandle();
            // Write the results to the Excel file
            await writePositionToExcel(excelFilePath, sheetName, index, position, 'JobDetails_Position_JobDetailsPosition');
            await appCommon.MyTasks();
          } else {
            position = "DummyValue";
          }

          await appCommon.SearchClickLink(data.EmployeeID.toString());
          await empInboxpage.goToJobChange();
          //start screen
          await jobChangePage.editStartDetails(data.ChangeJob_Start_EffectiveDate.toString(), data.ChangeJob_Start_Reason.toString(), data.ChangeJob_Start_NextPayPeriod, data.ChangeJob_Start_NewTeam, data.ChangeJob_Start_NewManager, data.ChangeJob_Start_NewLocation);
          await capObj.checkForScreenErrors();

          // if (!data.Process.toString().includes("Promotion_Manager"))
          await jobChangePage.clickNext();

          //jobProfile screen
          await jobChangePage.editJobProfile(String(position), data.ChangeJob_JobProfile.toString());
          await capObj.checkForScreenErrors()

          //location screen
          await jobChangePage.editLocationDetails(data.ChangeJob_LocationDetails_Location, data.ChangeJob_LocationDetails_ScheduledWeeklyHours, data.ChangeJob_LocationDetails_WorkShift);
          await capObj.checkForScreenErrors()

          //Edit Administartor screeen
          await jobChangePage.editAdminDetails(
            data.ChangeJob_JobClassifications_AdditionalJobClassifications,
            data.ChangeJob_JobClassifications_EmployeeType,
            data.ChangeJob_JobClassifications_TimeType,
            data.ChangeJob_JobClassifications_PayRateType,
            data.ChangeJob_JobClassifications_DefaultWeeklyHours,
            data.ChangeJob_JobClassifications_EndEmploymentDate,
            data.ChangeJob_JobClassifications_FirstDayofWork);
          await capObj.checkForScreenErrors()

          //Edit Organization Details screeen
          await jobChangePage.editOrganizationDetails(data.ChangeJob_Company_CostCentre, data.ChangeJob_Company_Department);
          await capObj.checkForScreenErrors()

          await jobChangePage.ReviewSummarySubmit();
          await capObj.checkForScreenErrors()
          ////////It will get HR partner ID for hr proxy
          const HRPartner = await appCommon.getJobChangesHRpartnerID(givenName, familyName);
          await appCommon.Searchbox("Start Proxy");
          await proxy.startProxy(HRPartner);
          await appCommon.MyTasks();

          if (data.Process.toString().includes("Promotion_Manager")) {
            await hrInbxPage.clickInboxMyTaskAndApprove("Promotion:");
            await capObj.checkForScreenErrors()
            await appCommon.SuccessEventHandle();
          } else {
            await hrInbxPage.clickInboxMyTaskAndApprove("Data Change:");
            await capObj.checkForScreenErrors()
            await appCommon.SuccessEventHandle();
          }

          await hrInbxPage.clickInboxMyTaskAndSubmitIfVisible("Contract:");
          await capObj.checkForScreenErrors()
          await appCommon.SuccessEventHandle();

          await hrInbxPage.clickInboxMyTaskAndSubmitIfVisible("Manage Probation Period:");
          await capObj.checkForScreenErrors()
          await appCommon.SuccessEventHandle();

          await appCommon.MyTasks();
          await proposeCompensation.setProposeCompensationJobChanges(data.GradeProfile, data.Step, data.ProposeCompensationChange_Salary, data.Country, "NaN");
          await capObj.checkForScreenErrors();

          await appCommon.SearchClickLink(data.EmployeeID.toString());
          //validation part is pending
          await jobHistoryPage.validateJobChangesProcess(
            String(data.Process),
            String(data.ChangeJob_Start_EffectiveDate),
            String(data.ChangeJob_Start_NewTeam),
            String(data.ChangeJob_JobClassifications_EmployeeType),
            String(data.ChangeJob_JobProfile),
            String(data.ChangeJob_JobClassifications_TimeType),
            String(data.ChangeJob_LocationDetails_ScheduledWeeklyHours),
            String(data.ChangeJob_Company_CostCentre),
            String(data.ChangeJob_Company_Department)
          );

          await writePositionToExcel(excelFilePath, sheetName, index, "Passed", 'TestStatus');

        } catch (error) {
          console.error(`Test failed for ${givenName} ${familyName}:`, error);
          let error1 = "Test failed for '" + givenName + " " + familyName + "' Employee:{" + data.EmployeeID + "}" + error.toString();
          await writePositionToExcel(excelFilePath, sheetName, index, error1, 'TestStatus');
        }
      });
    });
  }
}