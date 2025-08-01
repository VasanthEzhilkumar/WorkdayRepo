import test from '@lib/BaseTest';

import { CaptureAlertErrors } from '@lib/CaptureErrors';
import { excelToJson, getExcelFilePath } from '@lib/ExceltoJsonUtil';
import { writePositionToExcel, writeUniqueNamesToExcel } from '@lib/ExcelUtils';
// import { ProposeCompensationPage } from '@pages/CommonPages/ProposeCompensationPage';
import { employeeInboxPage } from '@pages/employeeInboxpage';
// import { HrInboxPage } from '@pages/hrInboxPage';
import { TerminationPage } from '@pages/TerminationPage';
import { testConfig } from 'testConfig';

let capObj: CaptureAlertErrors;
let givenName, familyName = null;


// Define the relative directory path to your Excel file
const excelFileName = 'Terminations/Workday_Termination_Belgium_Regression_PK14 - Copy.xlsx';
const excelFilePath = getExcelFilePath(excelFileName);

// Convert the Excel sheets to JSON format
const sheetsJson = excelToJson(excelFilePath);

// Iterate over each dataset and run the test
for (const sheetName in sheetsJson) {
  const dataSet = sheetsJson[sheetName];

  dataSet.forEach((data, index) => {

    test(`@Termination - Test ${index + 1} `, async ({ page, context, login, appCommon, proxy }) => {
      try {
        await page.setViewportSize({ width: 1375, height: 750 });
        console.log(`Starting Termination of ${data.EmployeeID}`);
        const username = testConfig.WorkdayUsername;
        const password = testConfig.WorkdayPassword;

        // initlize the web environment 
        await login.goto("PK14");

        // login into application 
        await login.sigIn(username, password);

        await appCommon.SearchClickLink(data.EmployeeID.toString());

        [givenName, familyName] = await appCommon.getEmployeeGivenNameAndFamilyName(data.EmployeeID.toString());
        await writeUniqueNamesToExcel(excelFilePath, sheetName, index, givenName, familyName);

        let jobProfile = await appCommon.getJobProfile();
        let empType = await appCommon.getEmpType();

        const empInboxpage = new employeeInboxPage(page, givenName, familyName, jobProfile, context);
        // const hrInbxPage = new HrInboxPage(page, givenName, familyName, context);
        // const proposeCompensation = new ProposeCompensationPage(page, givenName, familyName, context);
        const terminationPage = new TerminationPage(page, givenName, familyName, context);
        capObj = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index);

        await empInboxpage.goToTermination();

        /*Set Reasons of Termination and dates*/
        await terminationPage.setReason(data.PrimaryReason, data.SecondaryReason, data.LocalTerminationReason);
        await terminationPage.setDates(data.TerminationDate, data.LastDayOfWork, data.PayThroughDate);
        await terminationPage.managePosition();
        await terminationPage.clickSubmit();
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        /*Get HR ID and Proxy In as HR*/
        //const HRPartner = "10265694";
        const HRPartner = await appCommon.getTerminationHRpartnerID(givenName, familyName);
        await appCommon.Searchbox("Start Proxy");
        await proxy.startProxy(HRPartner);
        await capObj.checkForScreenErrors();

        /*Set Contract Details*/
        await appCommon.MyTasks();
        await terminationPage.setContractDetails(data.ContractType, data.Status, data.DateEmployeeSigned, data.DateEmployerSigned, data.ContractEndDate, data.ContractReason, empType);
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        /*Manage Business Processes*/
        await appCommon.MyTasks();
        await terminationPage.setmanageBusinessProcesses();
        await page.waitForTimeout(2000);
        await appCommon.SuccessEventHandle();

        /*Validate if Employee is Terminated*/
        await appCommon.SearchClickLink(data.EmployeeID.toString());
        await appCommon.validateTermination();
        await writePositionToExcel(excelFilePath, sheetName, index, "Passed", 'TestStatus');

      } catch (error) {
        console.error(`Test failed for ${givenName} ${familyName}:`, error);
        let error1 = "Test failed for '" + givenName + " " + familyName + "' Employee:{" + data.EmployeeID + "}" + error.toString();
        await writePositionToExcel(excelFilePath, sheetName, index, error1, 'TestStatus');
      }
    });
  });
}