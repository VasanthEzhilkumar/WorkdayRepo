import test from '@lib/BaseTest';
import { excelToJson, getExcelFilePath } from '@lib/ExceltoJsonUtil';
import { employeeInboxPage } from '@pages/employeeInboxpage';
import { HrInboxPage } from '@pages/hrInboxPage';
import ExcelJS from 'exceljs';
import path from 'path';
import { generateUniqueString, writeUniqueNamesToExcel, writeResultsToExcel } from '@lib/ExcelUtils';
import { generateRandomName } from 'utils/functional/utils';
import { hireEmpUSPage } from '@pages/USPages/hireEmpUSPage';
import { hrInboxUSPage } from '@pages/USPages/hrInboxUSPage';
import { employeeInboxUSPage } from '@pages/USPages/employeeInboxUSPage';

let empNum: string;

// Define the relative directory path to your Excel file
const excelFileName = 'testDataUS.xlsx';
const excelFilePath = getExcelFilePath(excelFileName);

// Convert the Excel sheets to JSON format
const sheetsJson = excelToJson(excelFilePath);



// Iterate over each dataset and run the test
for (const sheetName in sheetsJson) {
  const dataSet = sheetsJson[sheetName];

  dataSet.forEach((data, index) => {
    //  const givenName = givenName || `GivenName_${index + 1}`;
    //  const familyName = familyName || `FamilyName_${index + 1}`;
    const jobProfile = data.JobProfile || `JobProfile_${index + 1}`;
    const { givenName, familyName } = generateRandomName();


    test(`@Hire Employee - Test ${index + 1} `, async ({ page, context, login, home, hireEmployee, appCommon, proxy }) => {
      try {
        await page.setViewportSize({ width: 1280, height: 595 });
        const empInboxpage = new employeeInboxPage(page, givenName, familyName, jobProfile, context);
        const hrInbxPage = new HrInboxPage(page, givenName, familyName, context);
        const hrInboxUS = new hrInboxUSPage(page, context, givenName, familyName)
        const empInboxUS = new employeeInboxUSPage(page, context);
        const hireempUS = new hireEmpUSPage(page, context);

        console.log(`Starting Test for Hire  ${givenName} ${familyName}`);

        writeUniqueNamesToExcel(excelFilePath, sheetName, index, givenName, familyName)

        const username = "90001655";
        const password = "Primark123!!";
        await login.goto("Slovakia");
        await login.sigIn(username, password);


        

        await home.searchHireEmployee();

        await hireEmployee.searchSupervisoryOrganization(data.SupervisoryOrganisation, givenName);
        await hireempUS.legalInfo(givenName, familyName);
        await hireEmployee.contactInformationpage();
        await hireEmployee.contactInformationPhone(data.PhoneNumber, data.PhoneDevice, data.Type);
        await hireempUS.contactInfoUS(data.AdressLine1, data.PostalCode, data.City, data.State, data.Type);
        await hireEmployee.contactInformationEmail(data.EmailAddress, data.Type);
        await hireEmployee.okHireButton();
        await hireempUS.hireEmployeeJobDetails(
          data.HireDate,
          data.EmployeeType,
          data.JobProfile,
          data.TimeType,
          data.WorkShift,
          data.AdditionalJobClassifications,
          data.Position,
          data.ScheduledWeeklyHours
        );
        await appCommon.SuccessEventHandle();
        await appCommon.MyTasks();



        await empInboxpage.assignDeparment(data.DepartmentSection, givenName, familyName);
        await empInboxpage.assigncostCenter(data.CostCenter)
        await appCommon.SuccessEventHandle();

        const HRPartner = await appCommon.getHRpartnerID(givenName, familyName);

        await appCommon.Searchbox("Start Proxy");
        await proxy.startProxy(HRPartner);
        await appCommon.ClickInbox();
        await hrInboxUS.onboardSetup();
        await appCommon.SuccessEventHandle();
        await hrInbxPage.setManageProbation(data.ProbationEndDate,"NaN");
        await appCommon.SuccessEventHandle();
        await appCommon.refreshInbox();

        await hrInbxPage.hrProposeCompensationHire(data.GradeProfile, data.Step, data.Salary);
        const empNum = await hrInboxUS.hrGetEmpNum();
        console.log(empNum, givenName, familyName);

        await appCommon.SuccessEventHandle();
        await appCommon.ClickInbox();

        await appCommon.Searchbox("Stop Proxy");
        await proxy.stopproxy();

        await appCommon.SearchboxEmp("Start Proxy");
        await proxy.startProxy(empNum);
        await appCommon.ClickInbox();

        await empInboxpage.onBoardingGuide();
        await appCommon.SuccessEventHandle();
        await empInboxpage.empaddPhoto();
        await appCommon.SuccessEventHandle();

        await empInboxUS.changepersonalinformationSubmit(data.DateOfBirth, data.Race_Ethnicity);
        await appCommon.SuccessEventHandle();
        await empInboxUS.changeGovIDInformation();
        await hrInboxUS.EnterGovID(data.Country1, data.NationalIDType1, data.AddEditID1, "", "", "", "", "", "", "");
        await empInboxUS.changeGovIDInformationSubmit();
        await appCommon.SuccessEventHandle();
        await empInboxpage.AddEmergecyInformation();
        await appCommon.SuccessEventHandle();

        await empInboxUS.reviewDocUS();
        await appCommon.SuccessEventHandle();
        await empInboxUS.electronicPayAcceptance();
        await appCommon.SuccessEventHandle();

        await empInboxUS.completeFormI9();
        await appCommon.SuccessEventHandle();

        await empInboxUS.handBookUS();
        await appCommon.SuccessEventHandle();

        await empInboxpage.addCertificationSubmit();
        await appCommon.SuccessEventHandle();

        await empInboxpage.clickInboxMyTaskAndSubmit("Change/Update My Contact Information");
        //await empInboxpage.changeContactInformation();
        await appCommon.SuccessEventHandle();
        // await empInboxpage.addMaidenNameSubmit();
        // await appCommon.SuccessEventHandle();

        await appCommon.Searchbox("Start Proxy");
        await proxy.startProxy("10239663");
        await appCommon.ClickInbox();

        await hrInboxUS.formI9Review(data.HireDate, data.PostalCode, data.City, data.State)

        await hrInbxPage.updateWorkerContactInfo();
        await appCommon.SuccessEventHandle();

        await appCommon.Searchbox(empNum)
        await empInboxpage.empaddBankDetails(data.BankName, data.BankCode, data.AccountNumber, data.IBAN);
        await appCommon.ClickInbox();
        await hrInbxPage.addWorkerBankDetails();
        await appCommon.SuccessEventHandle();

        await hrInbxPage.changePersonalInformation();
        await appCommon.SuccessEventHandle();
        await appCommon.refreshInbox();

        await hrInbxPage.updatePassportsAndVisa();
        await appCommon.SuccessEventHandle();
        await appCommon.refreshInbox();
        await hrInbxPage.assignPayGroupSubmit(data.PayGroup);
        await appCommon.SuccessEventHandle();
        await appCommon.ClickInbox();

        await appCommon.Searchbox("Stop Proxy");
        await proxy.stopproxy();

        await page.waitForTimeout(3000);

        // Write the results to the Excel file
        writeResultsToExcel(excelFilePath, sheetName, index, empNum, 'Passed');

      } catch (error) {
        console.error(`Test failed for ${givenName} ${familyName}:`, error);
        // Write the failure status to the Excel file
        writeResultsToExcel(excelFilePath, sheetName, index, error, 'Failed');
      }

    });
  });
}



