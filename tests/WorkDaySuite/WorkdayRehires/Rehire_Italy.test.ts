import test from '@lib/BaseTest';
import { CaptureAlertErrors } from '@lib/CaptureErrors';
import { excelToJson, getExcelFilePath } from '@lib/ExceltoJsonUtil';
import { writeErrorToExcel, writePositionToExcel, writeResultsToExcel, writeUniqueNamesToExcel } from '@lib/ExcelUtils';
import { MaintainContractPage } from '@pages/CommonPages/MaintainContractPage';
import { ProposeCompensationPage } from '@pages/CommonPages/ProposeCompensationPage';
// import { GovernmentsIDPageCzechia } from '@pages/CzechiaPages/GovernmentIDsCzechiaPage';
import { employeeInboxPage } from '@pages/employeeInboxpage';
import { HrInboxPage } from '@pages/hrInboxPage';
// import { contactInformationAddressRomania } from '@pages/RomaniaPages/ContactInformationAddressRomania';
import { generateRandomName } from 'utils/functional/utils';


let empNum: string;
let position: string;
let capObj: CaptureAlertErrors;


// Define the relative directory path to your Excel file
const excelFileName = 'Rehires/Workday_Rehire_Italy_Regression_PK14.xlsx';
const excelFilePath = getExcelFilePath(excelFileName);

// Convert the Excel sheets to JSON format
const sheetsJson = excelToJson(excelFilePath);

// test.use({ viewport: { width: 1920, height: 1080 } }); 
// Iterate over each dataset and run the test
for (const sheetName in sheetsJson) {
  const dataSet = sheetsJson[sheetName];

  dataSet.forEach((data, index) => {

    if (data.TestStatus !== "Passed" && data.Country === "Italy") {
      //  const givenName = givenName || `GivenName_${index + 1}`;
      //  const familyName = familyName || `FamilyName_${index + 1}`;
      const jobProfile = data.JobProfile || `JobProfile_${index + 1}`;
      // const { givenName, familyName } = generateRandomName();

      const givenName = data.GivenName;
      const familyName = data.FamilyName;

      test(`@Rehire - Test ${index + 1} `, async ({ page, context, createPostition, jobDetailsPage, login, home, hireEmployee, appCommon, proxy }) => {
        try {
          await page.setViewportSize({ width: 1375, height: 750 });

          const empInboxpage = new employeeInboxPage(page, givenName, familyName, jobProfile, context);
          const hrInbxPage = new HrInboxPage(page, givenName, familyName, context);
          const proposeCompensation = new ProposeCompensationPage(page, givenName, familyName, context);
          // const homePageRon = new contactInformationAddressRomania(page, context)
          // const governemntIDs = new GovernmentsIDPageCzechia(page, givenName, familyName, context);
          const contractObj = new MaintainContractPage(page, givenName, familyName, context)
          capObj = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index);

          console.log(`Starting Test for Rehire  ${givenName} ${familyName}`);
          // await writeUniqueNamesToExcel(excelFilePath, sheetName, index, givenName, familyName)

          const username = "";
          const password = '';

          // initlize the web environment 
          await login.goto("PK17");

          // login into application 
          await login.sigIn(username, password);

          empNum = data.EmployeeID;

          // // create position for Management hires
          if (data.JobProfile.toString().includes("Manager")) {
            await appCommon.SearchClickLink("Create Position");
            await hireEmployee.searchSupervisoryOrganizationMgr(data.SupervisoryOrganisation);
            position = await createPostition.createPositionForManager(data.HireDate, data.HireDate, data.EmployeeType, data.JobProfile, data.TimeType, data.Location);
            await capObj.checkForScreenErrors();
            await appCommon.SuccessEventHandle();
            await appCommon.MyTasks();
            //passing position created for selecting exact task from My Task (inbox).
            await empInboxpage.setDeparmentAndCostCenter(position, data.CostCenter, data.DepartmentSection, givenName, familyName);
            await capObj.checkForScreenErrors();
            await appCommon.SuccessEventHandle();
            // Write the results to the Excel file
            await writePositionToExcel(excelFilePath, sheetName, index, position, 'Position');
            await appCommon.MyTasks();
          } else {
            position = "DummyValue";
          }

          // search Hire employee on Home Page after login
          await home.searchHireEmployee();
          // set Supervisisroy Organazation 
          await hireEmployee.searchSupervisoryOrganizationRehire(data.SupervisoryOrganisation, data.ExistingPreHire);

          await jobDetailsPage.setJobDetails(
            data.HireDate,
            data.EmployeeType,
            data.JobProfile,
            data.TimeType,
            data.WorkShift,
            data.AdditionalJobClassifications,
            position,
            data.ScheduledWeeklyHours,
            data.defaultHours,
            data.Location,
            data.EndEmploymentDate,
            data.PayRateType,
            data.Reason
          );

          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();
          await appCommon.MyTasks();

          await empInboxpage.setDeparmentAndCostCenter("position", data.CostCenter, data.DepartmentSection, givenName, familyName);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          const HRPartner = await appCommon.getHRpartnerID(givenName, familyName);
          // //const HRPartner = "10554022"
          // const HRPartner = "10559802"
          await appCommon.Searchbox("Start Proxy");
          await proxy.startProxy(HRPartner);

          await appCommon.MyTasks();
          await hrInbxPage.setCollectiveAgreementAndProfessionalCategoryAndLevel(data.CollectiveAgreement, data.ProfessionalCategory, data.Level);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          // await capObj.checkForScreenErrors();
          // await hrInbxPage.setManageProbation(data.ProbationEndDate, "NaN");
          // await appCommon.SuccessEventHandle();

          // //fill Contract Details for Employee
          await contractObj.setContractDetails(data.ContractType, data.Status, data.DateEmployeeSigned, data.DateEmployerSigned, data.ContractEndDate, data.ContractReason);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          // await appCommon.ClickInbox();
          // await appCommon.MyTasks();
          await proposeCompensation.setProposeCompensationHire(data.GradeProfile, data.Step, data.Salary, "", "");
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          await appCommon.SearchboxEmp("Start Proxy");
          await proxy.startProxy(empNum.toString());
          await appCommon.MyTasks();

          await empInboxpage.onBoardingGuide();
          await appCommon.SuccessEventHandle();

          await empInboxpage.empaddPhoto();
          await appCommon.SuccessEventHandle();

          await empInboxpage.clickInboxMyTaskAndSubmit("Change/Update My Contact Information");
          await appCommon.SuccessEventHandle();

          await empInboxpage.clickInboxMyTaskAndSubmit("Change/Update My Personal Information");
          await appCommon.SuccessEventHandle();

          await empInboxpage.clickInboxMyTaskAndSubmit("Add Bank Details");
          await appCommon.SuccessEventHandle();

          await empInboxpage.clickInboxMyTaskAndSubmit("Change/Update My Government IDs");
          await appCommon.SuccessEventHandle();

          await empInboxpage.clickInboxMyTaskAndSubmit("Add Certifications (External Italy)");
          await appCommon.SuccessEventHandle();

          await empInboxpage.AddEmergecyInformation();
          await appCommon.SuccessEventHandle();

          await empInboxpage.clickInboxMyTaskAndSubmit("Verfiy Legal Name");
          await appCommon.SuccessEventHandle();

          await empInboxpage.clickInboxMyTaskAndSubmit("Istruzioni per l’inserimento");
          await appCommon.SuccessEventHandle();

          await empInboxpage.reviewDocumentSubmitGeneric();
          await appCommon.SuccessEventHandle();

          await appCommon.SearchboxEmp("Start Proxy");
          await proxy.startProxy(HRPartner);
          // await appCommon.ClickInbox();
          await appCommon.MyTasks();

          // await hrInbxPage.clickInboxMyTaskAndApprove("Personal Information Change:");
          // await capObj.checkForScreenErrors();
          // await appCommon.SuccessEventHandle();


          // await hrInbxPage.clickInboxMyTaskAndApprove("Legal Name Change:");
          // await capObj.checkForScreenErrors();
          // await appCommon.SuccessEventHandle();

          await appCommon.MyTasks();
          await hrInbxPage.assignPayGroupApprove(data.ProposedPayGroupFinal);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          await appCommon.SearchClickLink(empNum)
          await appCommon.assignPaygroupValidation(data.ProposedPayGroupFinal);
          // Write the results to the Excel file
          writeErrorToExcel(excelFilePath, sheetName, index, 'N/A', 'Passed');
          empNum = "";
        } catch (error) {
          console.error(`Test failed for ${givenName} ${familyName}:`, error);
          //if ((await capObj.getUpdateError()) == undefined) {
          let error1 = "Test failed for '" + givenName + " " + familyName + "' Employee:{" + empNum + "}" + error.toString();
          //   // Write the failure status to the Excel file
          writeErrorToExcel(excelFilePath, sheetName, index, error1, 'Failed');
          empNum = "";
          // }
        }

      });
    }
  });

}