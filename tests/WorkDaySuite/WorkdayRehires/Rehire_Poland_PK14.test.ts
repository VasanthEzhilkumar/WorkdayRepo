import test from '@lib/BaseTest';

import { CaptureAlertErrors } from '@lib/CaptureErrors';
import { excelToJson, getExcelFilePath } from '@lib/ExceltoJsonUtil';
import { writeErrorToExcel, writePositionToExcel, writeUniqueNamesToExcel } from '@lib/ExcelUtils';
import { JobDetailsPage } from '@pages/CommonPages/JobDetailsPage';
import { MaintainContractPage } from '@pages/CommonPages/MaintainContractPage';
import { ProposeCompensationPage } from '@pages/CommonPages/ProposeCompensationPage';
import { createPositionPage } from '@pages/createPositionpage';
import { employeeInboxPage } from '@pages/employeeInboxpage';
import { HrInboxPage } from '@pages/hrInboxPage';
// import { contactInformationAddressPoland } from '@pages/PolandPages/contactInformationAddressPoland';
// import { GovernmentsIDPagePoland } from '@pages/PolandPages/GovernmentIDsPolandPage';


let empNum: string;
let position: string;
let capObj: CaptureAlertErrors;

// Define the relative directory path to your Excel file
const excelFileName = 'Rehires/Workday_Rehire_Poland_Regression_PK14.xlsx';
const excelFilePath = getExcelFilePath(excelFileName);

// Convert the Excel sheets to JSON format
const sheetsJson = excelToJson(excelFilePath);

// test.use({ viewport: { width: 1920, height: 1080 } }); 
// Iterate over each dataset and run the test
for (const sheetName in sheetsJson) {
  const dataSet = sheetsJson[sheetName];

  dataSet.forEach((data, index) => {
    //  const givenName = givenName || `GivenName_${index + 1}`;
    //  const familyName = familyName || `FamilyName_${index + 1}`;
    const jobProfile = data.JobProfile || `JobProfile_${index + 1}`;
    // const { givenName, familyName } = generateRandomName();
    const givenName = data.GivenName;
    const familyName = data.FamilyName;
    // if (data.TestStatus != 'Passed') {

    test(`@Hire Employee - Test ${index + 1} `, async ({ page, context, login, home, hireEmployee, appCommon, proxy }) => {
      try {
        await page.setViewportSize({ width: 1375, height: 750 });

        // const givenName: string = "Gussie";
        // const familyName: string = "Stanton";

        const empInboxpage = new employeeInboxPage(page, givenName, familyName, jobProfile, context);
        const hrInbxPage = new HrInboxPage(page, givenName, familyName, context);
        const proposeCompensation = new ProposeCompensationPage(page, givenName, familyName, context);
        // const homePagePoland = new contactInformationAddressPoland(page, context);
        const jobDetailsPageObj = new JobDetailsPage(page, context);
        // const governemntIDs = new GovernmentsIDPagePoland(page, givenName, familyName, context);
        const contractObj = new MaintainContractPage(page, givenName, familyName, context);
        capObj = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index);
        //const hireAdditionalData = new HireAdditionalData(page, givenName, familyName, context);
        const createPostition = new createPositionPage(page);

        console.log(`Starting Test for Hire  ${givenName} ${familyName}`);
        writeUniqueNamesToExcel(excelFilePath, sheetName, index, givenName, familyName)

        /*Login creds for PK14*/
        const username = "90002196";
        const password = "Wizos2025!";

        // /*Login creds for PK17*/
        // const username = "90002196";
        // const password = "Wizos2025!";

        // initlize the web environment 
        await login.goto("PK14");

        // login into application 
        await login.sigIn(username, password);

        empNum = data.EmployeeID;

        // // create position for Management hires
        // position = "No";
        if (data.JobProfile.toString().includes("Manager")) {
          await appCommon.SearchClickLink("Create Position");
          await hireEmployee.searchSupervisoryOrganizationMgr(data.SupervisoryOrganisation);
          position = await createPostition.createPositionForManager(data.HireDate, data.HireDate, String(data.EmployeeType).trim(), String((data.JobProfile)).trim(), String(data.TimeType).trim(), data.Location);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();
          await appCommon.MyTasks();
          //passing position created for selecting exact task from My Task (inbox).
          await empInboxpage.setDeparmentAndCostCenter(position, String(data.CostCenter.trim()), String(data.DepartmentSection).trim(), givenName, familyName);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();
          // Write the results to the Excel file
          writePositionToExcel(excelFilePath, sheetName, index, position, 'Position');
          await appCommon.MyTasks();

        }
        else {
          position = "Dummy Value"
        }

        // search Hire employee on Home Page after login
        await home.searchHireEmployee();

        // set Supervisisroy Organazation 
        await hireEmployee.searchSupervisoryOrganizationRehire(data.SupervisoryOrganisation, data.ExistingPreHire);
        // await hireEmployee.legalNameInformationPoland(givenName, familyName);
        // await hireEmployee.contactInformationpage();
        // await hireEmployee.contactInformationPhone(data.PhoneNumber, data.PhoneDevice, data.Type);
        // await homePagePoland.contactInformationAddressPK14(data.StreetName, data.houseNumber, data.Municipality, data.District, data.Province, data.PostalCode, data.City, data.Type, data.UseFor);
        // await hireEmployee.contactInformationEmail(data.EmailAddress, data.Type);
        // await hireEmployee.okHireButton();
        // await capObj.checkForScreenErrors();

        await jobDetailsPageObj.setJobDetails(
          data.HireDate,
          data.EmployeeType.trim(),
          String(data.JobProfile).trim(),
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
        // await appCommon.ClickInbox();
        await appCommon.MyTasks();
        await capObj.checkForScreenErrors();

        //Assign HrpayGroup
        await hrInbxPage.assignInitialPayGroupSubmit(data.ProposedPayGroupInitial);
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        let Title = "Personal Information Change: " + givenName + " " + familyName;
        await empInboxpage.clickInboxMyTaskAndSubmit(Title);
        await appCommon.SuccessEventHandle();

        Title = "Service Dates Change: " + givenName + " " + familyName;
        await empInboxpage.clickInboxMyTaskAndSubmit(Title);
        await appCommon.SuccessEventHandle();

        Title = "Add Medical Exam: " + givenName + " " + familyName;
        await empInboxpage.clickInboxMyTaskAndSubmit(Title);
        await appCommon.SuccessEventHandle();

        //fill Contract Details for Employee
        await contractObj.setContractDetails(data.ContractType, data.Status, data.DateEmployeeSigned, data.DateEmployerSigned, data.ContractEndDate, data.ContractReason);
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();
        
        Title = "Dodaj wykształcenie: " + givenName + " " + familyName;
        await empInboxpage.clickInboxMyTaskAndSubmit(Title);
        await appCommon.SuccessEventHandle();

        Title = "zatrudnienia: " + givenName + " " + familyName;
        await empInboxpage.clickInboxMyTaskAndSubmit(Title);
        await appCommon.SuccessEventHandle();

        Title = "Dodaj dane podatkowe (PIT-2): " + givenName + " " + familyName;
        await empInboxpage.clickInboxMyTaskAndSubmit(Title);
        await appCommon.SuccessEventHandle();

        Title = "National Health Fund Code: " + givenName + " " + familyName;
        await empInboxpage.clickInboxMyTaskAndSubmit(Title);
        await appCommon.SuccessEventHandle();

        // await appCommon.ClickInbox();
        await appCommon.MyTasks();
        await proposeCompensation.setProposeCompensationHire(data.GradeProfile, data.Step, data.Salary, data.Country, data.AllowanceAmount);
        await capObj.checkForScreenErrors();

        // empNum = await hrInbxPage.getEmployeeID();

        console.log("Emplyoee ID : " + empNum + " " + givenName + " " + familyName);

        await appCommon.MyTasks();

        await page.waitForTimeout(5000);

        Title = "ID Change: " + givenName + " " + familyName;
        await empInboxpage.clickInboxMyTaskAndSubmit(Title);
        await appCommon.SuccessEventHandle();

        //Maintain Right to Work Documentation
        Title = "Maintain Right to Work Documentation: Onboarding for " + givenName + " " + familyName;
        await empInboxpage.clickInboxMyTaskAndSubmit(Title);
        await appCommon.SuccessEventHandle();

        // empNum = String(data.EmployeeID);
        await appCommon.SearchboxEmp("Start Proxy");
        await proxy.startProxy(empNum.toString());
        // await appCommon.ClickInbox();
        await appCommon.MyTasks();

        //After Entering to Employee Proxy onboarding process:)
        await empInboxpage.onBoardingGuide();
        await appCommon.SuccessEventHandle();

        await empInboxpage.empaddPhoto();
        await appCommon.SuccessEventHandle();

        await empInboxpage.clickInboxMyTaskAndSubmit("Change/Update My Personal Information");
        await appCommon.SuccessEventHandle();

        await empInboxpage.clickInboxMyTaskAndSubmit("Change/Update My Contact Information");
        await appCommon.SuccessEventHandle();

        await empInboxpage.clickInboxMyTaskAndSubmit("Change/Update My Government IDs");
        await appCommon.SuccessEventHandle();

        await empInboxpage.AddEmergecyInformation();
        await appCommon.SuccessEventHandle();

        await empInboxpage.clickInboxMyTaskAndSubmit("Add Bank Details");
        await appCommon.SuccessEventHandle();

        await empInboxpage.clickInboxMyTaskAndSubmit("rodziny do ubezpieczenia zdrowotnego");
        await appCommon.SuccessEventHandle();

        await empInboxpage.clickInboxMyTaskAndSubmit("Dodaj dane PIT-2");
        await appCommon.SuccessEventHandle();
        
        await empInboxpage.clickInboxMyTaskAndSubmit("National Health Fund Code");
        await appCommon.SuccessEventHandle();

        await empInboxpage.reviewDocumentSubmitGeneric();
        await appCommon.SuccessEventHandle();
      
        //Start Proxy As HR Again 
        await appCommon.Searchbox("Start Proxy");
        await proxy.startProxy(HRPartner);
        await appCommon.MyTasks();
        // await appCommon.ClickInbox();
        await capObj.checkForScreenErrors();

        await appCommon.MyTasks();
        await hrInbxPage.assignPayGroupSubmit(data.ProposedPayGroupFinal);
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        // await appCommon.MyTasks();
        await hrInbxPage.assignPaygroupApprove();
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        await appCommon.SearchClickLink(empNum)
        await appCommon.assignPaygroupValidation(data.ProposedPayGroupFinal);
        // Write the results to the Excel file
        writeErrorToExcel(excelFilePath, sheetName, index, 'N/A', 'Passed');
        empNum = "";

      } catch (error) {
        console.error(`Test failed for ${givenName} ${familyName}:`, error);
        if ((await capObj.getUpdateError()) == undefined) {
          let error1 = "Test failed for '" + givenName + " " + familyName + "' Employee:{" + empNum + "}" + error.toString();
          //   // Write the failure status to the Excel file
          writeErrorToExcel(excelFilePath, sheetName, index, error1, 'Failed');
          empNum = "";
        }
      }
    });
    // }
  });
}