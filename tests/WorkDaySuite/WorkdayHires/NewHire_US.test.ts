import test from '@lib/BaseTest';
import { CaptureAlertErrors } from '@lib/CaptureErrors';
import { excelToJson, getExcelFilePath } from '@lib/ExceltoJsonUtil';
import { writePositionToExcel, writeResultsToExcel, writeUniqueNamesToExcel } from '@lib/ExcelUtils';
import { JobDetailsPage } from '@pages/CommonPages/JobDetailsPage';
import { ProposeCompensationPage } from '@pages/CommonPages/ProposeCompensationPage';
import { createPositionPage } from '@pages/createPositionpage';
import { employeeInboxPage } from '@pages/employeeInboxpage';
import { HrInboxPage } from '@pages/hrInboxPage';
import { employeeInboxUSPage } from '@pages/USPages/employeeInboxUSPage';
import { hireEmpUSPage } from '@pages/USPages/hireEmpUSPage';
import { hrInboxUSPage } from '@pages/USPages/hrInboxUSPage';
import { generateRandomName } from 'utils/functional/utils';

let empNum: string;
let position: string;
let captureErrors: CaptureAlertErrors;

// Define the relative directory path to your Excel file
const excelFileName = 'Hires/Workday_NewHire_USA_Regression_PK17.xlsx';
const excelFilePath = getExcelFilePath(excelFileName);

// Convert the Excel sheets to JSON format
const sheetsJson = excelToJson(excelFilePath);

// Iterate over each dataset and run the test
for (const sheetName in sheetsJson) {
  const dataSet = sheetsJson[sheetName];

  dataSet.forEach((data, index) => {
    if (data.TestStatus !== "Passed"){
    //  const givenName = givenName || `GivenName_${index + 1}`;
    //  const familyName = familyName || `FamilyName_${index + 1}`;
    const jobProfile = data.JobProfile || `JobProfile_${index + 1}`;
    const { givenName, familyName } = generateRandomName();
    // const givenName = data.GivenName;
    // const familyName = data.FamilyName;
    test(`@Hire Employee - Test ${index + 1} `, async ({ page, context, login, home, hireEmployee, appCommon, proxy }) => {
      try {
        //await page.viewportSize();
         await page.setViewportSize({ width: 1275, height: 595 })
        const empInboxpage = new employeeInboxPage(page, givenName, familyName, jobProfile, context);
        const hrInbxPage = new HrInboxPage(page, givenName, familyName, context);
        const proposeCompensation = new ProposeCompensationPage(page, givenName, familyName, context);
        const hrInboxUS = new hrInboxUSPage(page, context, givenName, familyName, jobProfile)
        const empInboxUS = new employeeInboxUSPage(page, context);
        const hireempUS = new hireEmpUSPage(page, context);
        const createPostition = new createPositionPage(page);
        const jobDetailsPage = new JobDetailsPage(page, context)
        captureErrors = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index);

        console.log(`Starting Test for Hire  ${givenName} ${familyName}`);
        writeUniqueNamesToExcel(excelFilePath, sheetName, index, givenName, familyName)

        const username = "90001655";
        const password = 'Vasanth"123';
        await login.goto("PK17");
        await login.sigIn(username, password);

        // // create position for Management hires
        if (data.JobProfile.toString().includes("Manager")) {
          await appCommon.SearchClickLink("Create Position");
          await hireEmployee.searchSupervisoryOrganizationMgr(data.SupervisoryOrganisation);
          position = await createPostition.createPositionForManager(data.HireDate, data.HireDate, data.EmployeeType, data.JobProfile, data.TimeType, data.Location);
          await captureErrors.checkForScreenErrors();
          await appCommon.SuccessEventHandle();
          await appCommon.MyTasks();

          //passing position created for selecting exact task from My Task (inbox).
          await empInboxpage.setDeparmentAndCostCenter(position, data.CostCenter, data.DepartmentSection, givenName, familyName);
          await captureErrors.checkForScreenErrors();
          await appCommon.SuccessEventHandle();
          // Write the results to the Excel file
          writePositionToExcel(excelFilePath, sheetName, index, position, 'Position');
          await appCommon.MyTasks();
        } else {
          position = "DummyValue";
        }

        await home.searchHireEmployee();
        await hireEmployee.searchSupervisoryOrganization(data.SupervisoryOrganisation);
        await hireempUS.legalInfo(givenName, familyName);
        await hireEmployee.contactInformationpage();
        await hireEmployee.contactInformationPhone(data.PhoneNumber, data.PhoneDevice, data.Type);
        await hireempUS.contactInfoUS(data.AdressLine1, data.PostalCode, data.City, data.State, data.Type);
        await hireEmployee.contactInformationEmail(data.EmailAddress, data.Type);
        await hireEmployee.okHireButton();
        await captureErrors.checkForScreenErrors();
        await jobDetailsPage.setJobDetails(
          data.HireDate,
          data.EmployeeType,
          data.JobProfile,
          data.TimeType,
          data.WorkShift,
          data.AdditionalJobClassifications,
          position,
          data.ScheduledWeeklyHours,
          data.DefaultWeeklyHours,
          data.Location,
          data.EndEmploymentDate,
          data.PayRateType,
          data.Reason
        );

        await captureErrors.checkForScreenErrors();
        await appCommon.SuccessEventHandle();
        await appCommon.MyTasks();

        await empInboxpage.setDeparmentAndCostCenter("position", data.CostCenter, data.DepartmentSection, givenName, familyName);
        await captureErrors.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        const HRPartner = await appCommon.getHRpartnerID(givenName, familyName);

        await appCommon.Searchbox("Start Proxy");
        await proxy.startProxy(HRPartner);
        await appCommon.MyTasks();

        await hrInboxUS.onboardSetup();
        await appCommon.SuccessEventHandle();

        await hrInbxPage.setManageProbation(data.ProbationEndDate, "NaN");
        await appCommon.SuccessEventHandle();

        if (data.JobProfile.toString().includes("Manager")) {
          await appCommon.Searchbox("Stop Proxy");
          await proxy.stopproxy();
          await appCommon.staticWait(4); 

          const HRPartner2 = await appCommon.getHRpartnerID(givenName, familyName);
          await appCommon.Searchbox("Start Proxy");
           await appCommon.staticWait(4);
          await proxy.startProxy(HRPartner2);
          await appCommon.MyTasks();
          await proposeCompensation.setProposeCompensationHire(data.GradeProfile, data.Step, data.Salary, "NaN", "NaN");
        } else {
          await proposeCompensation.setProposeCompensationHire(data.GradeProfile, data.Step, data.Salary, "NaN", "NaN");
        }

        empNum = await hrInboxUS.hrGetEmpNum();
        console.log(empNum, givenName, familyName);
        await appCommon.SuccessEventHandle();

        await appCommon.SearchboxEmp("Start Proxy");
        await proxy.startProxy(empNum);
        await appCommon.MyTasks();
        //---------------------------------------------------------------------------------
        await empInboxpage.onBoardingGuide();
        await appCommon.SuccessEventHandle();

        await empInboxpage.empaddPhoto();
        await appCommon.SuccessEventHandle();

        await empInboxUS.changepersonalinformationSubmit(data.Gender, data.DateOfBirth, data.Race_Ethnicity);
        await appCommon.SuccessEventHandle();

        await empInboxUS.changeGovIDInformation();
        await hrInboxUS.EnterGovID(data.Country1, data.NationalIDType1, data.AddEditID1, "NaN", "NaN", "NaN", "NaN", "NaN", "NaN", "NaN");
        await captureErrors.checkForScreenErrors();
        await empInboxUS.changeGovIDInformationSubmit();
        await captureErrors.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

         await empInboxpage.clickInboxMyTaskAndSubmit("Add Emergency Contacts");
        await appCommon.SuccessEventHandle();

        await empInboxpage.reviewDocumentSubmitGeneric();
        await appCommon.SuccessEventHandle();

        await empInboxUS.electronicPayAcceptance();
        await appCommon.SuccessEventHandle();

        await empInboxUS.completeFormI9();
        await captureErrors.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        await empInboxUS.handBookUS();
        await appCommon.SuccessEventHandle();

        await empInboxpage.addCertificationSubmit();
        await appCommon.SuccessEventHandle();

        await empInboxpage.clickInboxMyTaskAndSubmit("Change/Update My Contact Information");
        await appCommon.SuccessEventHandle();

        await empInboxpage.clickInboxMyTaskAndSubmit("Notification to Employees of Their Rights and Duties Under the PA Worker");
        await appCommon.SuccessEventHandle();

        await empInboxpage.clickInboxMyTaskAndSubmit("USA PTO Policy:");
        await appCommon.SuccessEventHandle();


        await appCommon.Searchbox("Start Proxy");
        await proxy.startProxy(HRPartner);
        await appCommon.MyTasks();

        await hrInboxUS.formI9Review(data.HireDate, data.PostalCode, data.City, data.State, data.IssuingAuthority, data.I9ExpirationDate);
        await captureErrors.checkForScreenErrors();
        
        await hrInboxUS.finaliseEmpVerification(data.USEmploymentVerificationStatus);
        await captureErrors.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        // await appCommon.Searchbox("Stop Proxy");
        // await proxy.stopproxy();
        const HRPartner2 = await appCommon.getHRpartnerIDFromEmployeeWorkerHistory(empNum, "Assign Pay Group for Hire: ");
        // const HRPartner2  = await hrInboxUS.hrGetEmpNum();
        if (HRPartner != HRPartner2) {
          await appCommon.Searchbox("Start Proxy");
          await proxy.startProxy(HRPartner2);
        }
        await appCommon.MyTasks();
        await hrInboxUS.assignPayGroupSubmit(data.ProposedPayGroupFinal);
        await captureErrors.checkForScreenErrors();
        await appCommon.SuccessEventHandle();
        //await appCommon.ClickInbox();
        await appCommon.MyTasks();
        await appCommon.SearchClickLink(empNum)
        await appCommon.assignPaygroupValidation(data.ProposedPayGroupFinal);
        // Write the results to the Excel file
        writeResultsToExcel(excelFilePath, sheetName, index, empNum, 'Passed');
        empNum = "";
      } catch (error) {
        console.error(`Test failed for ${givenName} ${familyName}:`, error);
        if ((await captureErrors.getUpdateError()) == undefined) {
          let error1 = "Test failed for '" + givenName + " " + familyName + "' Employee:{" + empNum + "}" + error.toString();
          //   // Write the failure status to the Excel file
          writeResultsToExcel(excelFilePath, sheetName, index, error1, 'Failed');
          empNum = "";
        }
      }

    });
  }
  });
}



