import test from '@lib/BaseTest';
import { CaptureAlertErrors } from '@lib/CaptureErrors';

import { excelToJson, getExcelFilePath } from '@lib/ExceltoJsonUtil';
import { writePositionToExcel } from '@lib/ExcelUtils';
import { HrInboxPage } from '@pages/hrInboxPage';
import { JobChangePage } from '@pages/JobChangePage';
import { JobHistoryPage } from '@pages/JobHistoryPage';
import { testConfig } from 'testConfig';

let position: string;
let capObj: CaptureAlertErrors;
let givenName, familyName = null;


// Define the relative directory path to your Excel file
const excelFileName = 'JobChange/Workday_JobChange_Slovenia.xlsx';
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

      test(`@JobRequisition and Integration with Smart Recruitors - Test ${index + 1} `, async ({ page, context, login, hireEmployee, appCommon, proxy }) => {
        try {
          await page.setViewportSize({ width: 1280, height: 596 });
          console.log(`Starting JobRequisition...`);
          //writeUniqueNamesToExcel(excelFilePath, sheetName, index, givenName, familyName)
          const username = testConfig.WorkdayUsername;
          const password = testConfig.WorkdayPassword;//'Vasanth"123';

          const hrInbxPage = new HrInboxPage(page, givenName, familyName, context);
          const jobChangePage = new JobChangePage(page, context);
          capObj = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index);
          const jobHistoryPage = new JobHistoryPage(page);


          // initlize the web environment 
          await login.goto("PK17");
          // login into application 
          await login.sigIn(username, password);

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

          await writePositionToExcel(excelFilePath, sheetName, index, "Passed", 'TestStatus');

        } catch (error) {
          console.error(`Test failed :-`, error);
          let error1 = "Test failed '" + error.toString();
          await writePositionToExcel(excelFilePath, sheetName, index, error1, 'TestStatus');
        }
      });
    });
  }
}