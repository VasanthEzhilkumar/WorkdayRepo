import test from '@lib/BaseTest';

import { CaptureAlertErrors } from '@lib/CaptureErrors';
import { excelToJson, getExcelFilePath } from '@lib/ExceltoJsonUtil';
import { writePositionToExcel, writeResultsToExcel, writeUniqueNamesToExcel } from '@lib/ExcelUtils';
import { HireAdditionalData } from '@pages/CommonPages/HireAdditionalDataPage';
import { JobDetailsPage } from '@pages/CommonPages/JobDetailsPage';
import { MaintainContractPage } from '@pages/CommonPages/MaintainContractPage';
import { ProposeCompensationPage } from '@pages/CommonPages/ProposeCompensationPage';
import { createPositionPage } from '@pages/createPositionpage';
import { employeeInboxPage } from '@pages/employeeInboxpage';
import { HrInboxPage } from '@pages/hrInboxPage';
import { contactInformationAddressRomania } from '@pages/RomaniaPages/ContactInformationAddressRomania';
import { GovernmentsIDPageRomania } from '@pages/RomaniaPages/GovernmentIDsRomaniaPage';
import { generateRandomName } from 'utils/functional/utils';


let empNum: string;
let position: string;
let capObj: CaptureAlertErrors;


// Define the relative directory path to your Excel file
const excelFileName = 'Hires/testDataItaly.xlsx';
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
    const { givenName, familyName } = generateRandomName();

    // const givenName = data.GivenName;
    // const familyName = data.FamilyName;
    // const givenName: string = "Gussie";
    // const familyName: string = "Stanton";
    // if (data.TestStatus != 'Passed') {

    test(`@Hire Employee - Test ${index + 1} `, async ({ page, context, login, home, hireEmployee, appCommon, proxy }) => {
      try {
        await page.setViewportSize({ width: 1280, height: 650 });

        const empInboxpage = new employeeInboxPage(page, givenName, familyName, jobProfile, context);
        const hrInbxPage = new HrInboxPage(page, givenName, familyName, context);
        const proposeCompensation = new ProposeCompensationPage(page, givenName, familyName, context);
        const homePageRon = new contactInformationAddressRomania(page, context)
        const jobDetailsPage = new JobDetailsPage(page, context)
        const governemntIDs = new GovernmentsIDPageRomania(page, givenName, familyName, context);
        const contractObj = new MaintainContractPage(page, givenName, familyName, context)
        capObj = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index);
        const hireAdditionalData = new HireAdditionalData(page, givenName, familyName, context)
        const createPostition = new createPositionPage(page);

        console.log(`Starting Test for Hire  ${givenName} ${familyName}`);
        writeUniqueNamesToExcel(excelFilePath, sheetName, index, givenName, familyName)

        const username = "90002195";
        const password = "Primark@123";

        // initlize the web environment 
        await login.goto("Romania");

        // login into application 
        await login.sigIn(username, password);

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
          writePositionToExcel(excelFilePath, sheetName, index, position, 'Position');
          await appCommon.MyTasks();
        } else {
          position = "DummyValue";
        }

        // search Hire employee on Home Page after login
        await home.searchHireEmployee();
        // set Supervisisroy Organazation 
        await hireEmployee.searchSupervisoryOrganization(data.SupervisoryOrganisation, givenName);
        await hireEmployee.legalNameInformation(givenName, familyName);
        await hireEmployee.contactInformationpage();
        await hireEmployee.contactInformationPhone(data.PhoneNumber, data.PhoneDevice, data.Type);
        await homePageRon.contactInformationAddressItaly(data.Street, data.StreetOrPlaceName, data.StreetNumber, data.PostalCode, data.City, data.County, data.Type, data.Province);
        await hireEmployee.contactInformationEmail(data.EmailAddress, data.Type);
        await hireEmployee.okHireButton();
        await capObj.checkForScreenErrors();

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
          data.EndEmploymentDate
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
        await appCommon.ClickInbox();
        await appCommon.MyTasks();
        await capObj.checkForScreenErrors();
        await hrInbxPage.setManageProbation(data.ProbationEndDate, "NaN");
        await appCommon.SuccessEventHandle();
        //code working upto this LOC
        // await appCommon.ClickInbox();
        await appCommon.MyTasks();
        await proposeCompensation.setProposeCompensationHire(data.GradeProfile, data.Step, data.Salary,"");
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();
        // await appCommon.refreshInbox();

        await hrInbxPage.clickEditNoticePeriodsforHireSubmit()
        await capObj.checkForScreenErrors();
        empNum = await hrInbxPage.getEmployeeIDFromEditNoticePeriodPage();

        console.log("Emplyoee ID : " + empNum + " " + givenName + " " + familyName);
        await appCommon.MyTasks();
        // await appCommon.Searchbox("Stop Proxy");
        // await proxy.stopproxy();

        // empNum = String(data.EmployeeID);
        await appCommon.SearchboxEmp("Start Proxy");
        await proxy.startProxy(empNum);
        //await appCommon.ClickInbox();
        await appCommon.MyTasks();

        await empInboxpage.onBoardingGuide();
        await appCommon.SuccessEventHandle();
        await empInboxpage.empaddPhoto();
        await appCommon.SuccessEventHandle();

        await empInboxpage.changePersonalInformation(data.Gender, data.DateOfBirth, data.CityOfBirth, data.MaritalStatus, data.CitizenshipStatus, data.PrimaryNationality,"");
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();
        await empInboxpage.changepersonalinformationSubmit();
        //await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();
        await empInboxpage.changeGovIDInformation();
        await appCommon.SuccessEventHandle();
        await empInboxpage.AddEmergecyInformation();
        await appCommon.SuccessEventHandle();
        await empInboxpage.reviewDocumentSubmitSK();
        // await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();
        await empInboxpage.clickInboxMyTaskAndSubmit("Change/Update My Contact Information");
        // await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();
        await empInboxpage.addEmployeeBankDetails(data.BankName, data.BankCode, String(data.AccountNumber), String(data.IBAN));
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        await appCommon.SearchClickLink(empNum)
        //need to make it generic method for adding additional name such maiden name, fathers name
        await empInboxpage.addAdditionalName(data.NameType, data.GivenName1, data.FamilyName1);
        //let HRPartner = "10559802";
        await appCommon.SearchboxEmp("Start Proxy");
        await proxy.startProxy(HRPartner);
        await appCommon.ClickInbox();
        await appCommon.MyTasks();

        await hrInbxPage.clickInboxMyTaskAndApprove("Personal Information Change:");
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        await hrInbxPage.updateWorkerContactInfo();
        await appCommon.SuccessEventHandle();

        await hrInbxPage.clickInboxMyTaskAndApprove("Payment Election:");
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        await hrInbxPage.addWorkerBankDetails();
        await appCommon.SuccessEventHandle();

        await hrInbxPage.clickInboxMyTaskAndSubmit("Personal Information Change:");
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        await appCommon.MyTasks();
        await hrInbxPage.assignPayGroupSubmit(data.ProposedPayGroupFinal);
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        await appCommon.SearchClickLink(empNum)
        await appCommon.assignPaygroupValidation(data.ProposedPayGroupFinal);
        // Write the results to the Excel file
        writeResultsToExcel(excelFilePath, sheetName, index, empNum, 'Passed');
        empNum = "";
        await appCommon.tearDown();
      } catch (error) {
        console.error(`Test failed for ${givenName} ${familyName}:`, error);
        if ((await capObj.getUpdateError()) == undefined) {
          let error1 = "Test failed for '" + givenName + " " + familyName + "' Employee:{" + empNum + "}" + error.toString();
          //   // Write the failure status to the Excel file
          writeResultsToExcel(excelFilePath, sheetName, index, error1, 'Failed');
          empNum = "";
        }
      }
    });

    // test.afterEach(`Tear down ${test.name}`, async ({ page, context})=>{
    //   await new appCommons(page, context).tearDown();
    // });

  });
}