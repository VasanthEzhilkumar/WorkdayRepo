import test from '@lib/BaseTest';
import { CaptureAlertErrors } from '@lib/CaptureErrors';

import { excelToJson, getExcelFilePath } from '@lib/ExceltoJsonUtil';
import { writePositionToExcel } from '@lib/ExcelUtils';
import { JobRequisitionPage } from '@pages/JobRequisition_SmartRecruitorPages/JobRequisitionPage';

let capObj: CaptureAlertErrors;
let givenName, familyName = null;


// Define the relative directory path to your Excel file
const excelFileName = 'JobRequisition/Workday_JobRequisition.xlsx';
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

      test(`@JobRequisition and Integration with Smart Recruitors - Test ${index + 1} `, async ({ page, context, login, hireEmployee, appCommon, proxy }) => {
        try {
          await page.setViewportSize({ width: 1280, height: 800 });
          console.log(`Starting JobRequisition...`);

          const jobRequisition = new JobRequisitionPage(page, context);
          capObj = new CaptureAlertErrors(page, String(givenName), String(familyName), excelFilePath, sheetName, index);

          //writeUniqueNamesToExcel(excelFilePath, sheetName, index, givenName, familyName)
          // initlize the web environment 
          // await login.goto("PK17");

          // // login into application 
          // await login.sigIn();

          // await appCommon.Searchbox(String("Start Proxy"));
          // await proxy.startProxy(String(data.ProxyID));

          // //start screen 
          // await appCommon.SearchClickLink("Create Job Requisition");
          // await hireEmployee.searchSupervisoryOrganizationMgr(String(data.SupervisoryOrganization));

          // //recruiting information 
          // await jobRequisition.setRecruitingInfromation(
          //   data.NumberOfOpenings,
          //   data.Reason,
          //   data.RecruitingInstruction,
          //   data.RecruitingStartDate,
          //   data.TargetHireDate,
          //   data.TargetEndDate,
          // );

          // await jobRequisition.clickNext();
          // await capObj.checkForScreenErrors();

          // await jobRequisition.setJobDetails(
          //   data.JobPostingTitle,
          //   data.JobProfile,
          //   data.WorkerSubType,
          //   data.TimeType,
          //   data.WorkShift,
          //   data.PrimaryLocation,
          //   data.ScheduledWeeklyHours
          // );
          // await jobRequisition.clickNext();

          // // //Edit Organization Details screeen
          // // await jobChangePage.editOrganizationDetails(data.ChangeJob_Company_CostCentre, data.ChangeJob_Company_Department);
          // // await capObj.checkForScreenErrors()

          // // await jobChangePage.ReviewSummarySubmit();

          // await writePositionToExcel(excelFilePath, sheetName, index, "Passed", 'TestStatus');

          // login into application 
          await login.LogInInToSmartRecruiter();
          await writePositionToExcel(excelFilePath, sheetName, index, "Passed", 'TestStatus');

        } catch (error) {
          console.error(`Test failed :-`, error);
          let error1 = "Test failed '" + String(error);
          await writePositionToExcel(excelFilePath, sheetName, index, error1, 'TestStatus');
        }
      });
    });
  }
}