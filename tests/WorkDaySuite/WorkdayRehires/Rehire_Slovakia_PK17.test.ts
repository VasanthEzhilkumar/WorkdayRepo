import test from '@lib/BaseTest';
import { CaptureAlertErrors } from '@lib/CaptureErrors';
import { excelToJson, getExcelFilePath } from '@lib/ExceltoJsonUtil';
import { writeErrorToExcel, writePositionToExcel,  writeUniqueNamesToExcel } from '@lib/ExcelUtils';
import { JobDetailsPage } from '@pages/CommonPages/JobDetailsPage';
import { MaintainContractPage } from '@pages/CommonPages/MaintainContractPage';
import { ProposeCompensationPage } from '@pages/CommonPages/ProposeCompensationPage';
import { createPositionPage } from '@pages/createPositionpage';
import { employeeInboxPage } from '@pages/employeeInboxpage';
import { HrInboxPage } from '@pages/hrInboxPage';
import { generateRandomName } from 'utils/functional/utils';


let empNum: string;
let position: string;
let captureErrors: CaptureAlertErrors;

// Define the relative directory path to your Excel file
const excelFileName = 'Rehires/Workday_Rehire_Slovakia_Regression_PK17.xlsx';
const excelFilePath = getExcelFilePath(excelFileName);

// Convert the Excel sheets to JSON format
const sheetsJson = excelToJson(excelFilePath);
// test.use({ viewport: { width: 1920, height: 1080 } }); 

// Iterate over each dataset and run the test
for (const sheetName in sheetsJson) {
  const dataSet = sheetsJson[sheetName];

  dataSet.forEach((data, index) => {
    // const givenName = givenName || `GivenName_${index + 1}`;
    // const familyName = familyName || `FamilyName_${index + 1}`;
    const jobProfile = data.JobProfile || `JobProfile_${index + 1}`;
    const givenName = data.GivenName;
    const familyName = data.FamilyName;
     if (data.TestStatus !== "Passed") {
    //const { givenName, familyName } = generateRandomName();


    test(`@Rehire Employee - Test ${index + 1} `, async ({ page, appCommon, context, login, home, hireEmployee, proxy }) => {
      try {
        await page.setViewportSize({ width: 1280, height: 595 });
        const empInboxpage = new employeeInboxPage(page, givenName, familyName, jobProfile, context);
        const hrInbxPage = new HrInboxPage(page, givenName, familyName, context);
        const proposeCompensation = new ProposeCompensationPage(page, givenName, familyName, context);
        const createPostition = new createPositionPage(page);
        const jobDetailsPage = new JobDetailsPage(page, context)
        captureErrors = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index);
        const contractObj = new MaintainContractPage(page, givenName, familyName, context);
        const capObj = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index);



        console.log(`Starting Test for Rehire  ${givenName} ${familyName}`);

        writeUniqueNamesToExcel(excelFilePath, sheetName, index, givenName, familyName)

        // // /*Login creds for PK14*/
        // const username = "90002196";
        // const password = "Wizos2025!";

        // // /*Login creds for PK17*/
        const username = "90001655";
        const password = 'Vasanth"123';

        await login.goto("PK17");
        await login.sigIn(username, password);

        empNum = data.EmployeeID;
    
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
          data.DefaultWeeklyHours,
          data.Location,
          data.EndEmploymentDate,
          data.PayRateType,
          data.Reason
        );

        await captureErrors.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        //Working till here on 16-6-25
        await appCommon.MyTasks();
        await empInboxpage.setDeparmentAndCostCenter("position", data.CostCenter, data.DepartmentSection, givenName, familyName);
        await captureErrors.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        //It will get HR partner ID for hr proxy
        const HRPartner = await appCommon.getHRpartnerID(givenName, familyName);
        await appCommon.Searchbox("Start Proxy");
        await proxy.startProxy(HRPartner);

        await appCommon.MyTasks();
        let Title = "Hire: " + givenName + " " + familyName;
        await appCommon.staticWait(10);
        await empInboxpage.clickInboxMyTaskAndSubmit(Title);
        await appCommon.SuccessEventHandle();

        await appCommon.MyTasks();
        
        Title = "Hire: " + givenName + " " + familyName;
        await appCommon.staticWait(10);
        await empInboxpage.clickInboxMyTaskAndSubmitEditAdditionalData(Title);
        await appCommon.SuccessEventHandle();

        Title = "ID Change: " + givenName + " " + familyName;
        await empInboxpage.clickInboxMyTaskAndSubmit(Title);
        await appCommon.SuccessEventHandle();

        Title = "Manage Probation Period: " + givenName + " " + familyName;
        await empInboxpage.clickInboxMyTaskAndSubmit(Title);
        await appCommon.SuccessEventHandle();

        //fill Contract Details for Employee
        await contractObj.setContractDetails(data.ContractType, data.Status, data.DateEmployeeSigned, "NaN", data.ContractEndDate, String(data.ContractReason));
        await captureErrors.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        if (!data.JobProfile.toString().includes("Manager")) {
          await proposeCompensation.setProposeCompensationHire(data.GradeProfile, data.Step, data.Salary, "", "NaN");
          await captureErrors.checkForScreenErrors();
          console.log("Emplyoee ID : " + empNum + " " + givenName + " " + familyName);
          // await appCommon.SuccessEventHandle();
        } else {
          //It will get HR partner ID for hr proxy
          const HRidforProposeCompensation = await appCommon.getHRpartnerID(givenName, familyName);
          await appCommon.Searchbox("Start Proxy");
          await proxy.startProxy(HRidforProposeCompensation);
          await appCommon.MyTasks();
          await proposeCompensation.setProposeCompensationHire(data.GradeProfile, data.Step, data.Salary, "NaN", "NaN");
          await captureErrors.checkForScreenErrors();
        }
  
        await appCommon.Searchbox("Start Proxy");
        await proxy.startProxy(HRPartner);
        await appCommon.MyTasks();
      
        await appCommon.staticWait(15);
        await hrInbxPage.addWorkerBankDetails();
        await appCommon.SuccessEventHandle();

        await appCommon.MyTasks();
        await hrInbxPage.updateWorkerContactInfo();
        await appCommon.SuccessEventHandle();
        
        empNum = data.EmployeeID;
        await appCommon.SearchboxEmp("Start Proxy");
        await proxy.startProxy(empNum.toString());
        await appCommon.MyTasks();
        await appCommon.staticWait(5);
        await empInboxpage.onBoardingGuide();
        await appCommon.SuccessEventHandle();

        await empInboxpage.empaddPhoto();
        await appCommon.SuccessEventHandle();

        await empInboxpage.clickInboxMyTaskAndSubmit("Change/Update My Personal Information");
        await appCommon.SuccessEventHandle();

        await empInboxpage.clickInboxMyTaskAndSubmit("Change/Update My Government IDs");
        await appCommon.SuccessEventHandle();
        await appCommon.staticWait(5);
        await empInboxpage.AddEmergecyInformation();
        await appCommon.SuccessEventHandle();
        await appCommon.staticWait(5);
        await empInboxpage.reviewDocumentSubmitGeneric();
        await appCommon.SuccessEventHandle();
        await empInboxpage.addCertificationSubmit();
        await appCommon.SuccessEventHandle();
        await empInboxpage.addeducationSubmit();
        await appCommon.SuccessEventHandle();
        await appCommon.staticWait(5);
        await empInboxpage.addMaidenNameSubmit();
        await appCommon.SuccessEventHandle();


        await appCommon.Searchbox("Start Proxy");
        await proxy.startProxy(HRPartner);
        await appCommon.MyTasks();


        await hrInbxPage.changePersonalInformation();
        await appCommon.SuccessEventHandle();
        await appCommon.refreshInbox();

        await hrInbxPage.updatePassportsAndVisa();
        await appCommon.SuccessEventHandle();
        await appCommon.staticWait(5);
        await hrInbxPage.assignPayGroupApprove(String(data.ProposedPayGroupFinal));
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        //await appCommon.SuccessEventHandle();
        await appCommon.SearchClickLink(empNum)
        await appCommon.assignPaygroupValidation(String(data.ProposedPayGroupFinal));
        // Write the results to the Excel file
        writeErrorToExcel(excelFilePath, sheetName, index, 'N/A', 'Passed');
        empNum = "";

      } catch (error) {
        console.error(`Test failed for ${givenName} ${familyName}:`, error);
        if ((await captureErrors.getUpdateError()) == undefined) {
          let error1 = "Test failed for '" + givenName + " " + familyName + "' Employee:{" + empNum + "}" + error.toString();
          //   // Write the failure status to the Excel file
          writeErrorToExcel(excelFilePath, sheetName, index, error1, 'Failed');
          empNum = "";
        }
      }

    });
  }
  });
}
