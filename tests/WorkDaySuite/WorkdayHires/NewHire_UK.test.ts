import test from '@lib/BaseTest';

import { CaptureAlertErrors } from '@lib/CaptureErrors';
import { excelToJson, getExcelFilePath } from '@lib/ExceltoJsonUtil';
import { writePositionToExcel, writeResultsToExcel, writeUniqueNamesToExcel } from '@lib/ExcelUtils';
import { JobDetailsPage } from '@pages/CommonPages/JobDetailsPage';
import { ProposeCompensationPage } from '@pages/CommonPages/ProposeCompensationPage';
import { createPositionPage } from '@pages/createPositionpage';
import { contactInformationAddressCzechia } from '@pages/CzechiaPages/ContactInformationAddressCzechia';
import { GovernmentsIDPageCzechia } from '@pages/CzechiaPages/GovernmentIDsCzechiaPage';
import { employeeInboxPage } from '@pages/employeeInboxpage';
import { HrInboxPage } from '@pages/hrInboxPage';
import { generateRandomName } from 'utils/functional/utils';


let empNum: string;
let position: string;
let capObj: CaptureAlertErrors;
let CompensationHRPartner: string;

// Define the relative directory path to your Excel file
const excelFileName = 'Hires/Workday_NewHire_UKNI_Regression_PK14.xlsx';
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
    const jobProfile = (data.JobProfile || `JobProfile_${index + 1}`).trim();
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
        const homePageRon = new contactInformationAddressCzechia(page, context)
        const jobDetailsPageObj = new JobDetailsPage(page, context)
        const governemntIDs = new GovernmentsIDPageCzechia(page, givenName, familyName, context);
        capObj = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index)
        // const hireAdditionalData = new HireAdditionalData(page, givenName, familyName, context)
        const createPostition = new createPositionPage(page);

        console.log(`Starting Test for Hire  ${givenName} ${familyName}`);
        writeUniqueNamesToExcel(excelFilePath, sheetName, index, givenName, familyName)
        // /*Login creds for PK14*/
        const username = "90002196";
        const password = "Primark0255!";

        // // /*Login creds for PK17*/
        // const username = "90002196";
        // const password = "Wizos2025!";

        // initlize the web environment 
        await login.goto("PK14");

        // login into application 
        await login.sigIn(username, password);

        // // create position for Management hires
        // position = "No";
        if (data.JobProfile.toString().includes("Manager")) {// || data.Position.toString() == "Yes") {
          // if (data.SupervisoryOrganisation.toString().includes("Management") || data.Position.toString() == "Yes") {
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
        } else {
          position = "DummyValue";
        }
        // search Hire employee on Home Page after login
        await home.searchHireEmployee();
        // set Supervisisroy Organazation 
        await hireEmployee.searchSupervisoryOrganization(data.SupervisoryOrganisation);
        await hireEmployee.legalNameInformation(givenName, familyName, data.Prefix);
        await hireEmployee.contactInformationpage();
        await hireEmployee.contactInformationPhone(data.PhoneNumber, data.PhoneDevice, data.Type);
        await homePageRon.contactInformationAddressUK(
          data.EffectiveDate,
          data.Country,
          data.County,
          data.AddressLine1,
          data.AddressLine2,
          data.AddressLine3,
          data.PostalCode,
          data.City,
          data.Type,
          data.UseFor
        );
        await hireEmployee.contactInformationEmail(data.EmailAddress, data.Type);
        await hireEmployee.okHireButton();
        await capObj.checkForScreenErrors();

        await jobDetailsPageObj.setJobDetails(
          data.HireDate,
          data.EmployeeType.trim(),
          String(data.JobProfile).trim(),
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
        // await capObj.checkForScreenErrors();

        //Assign Initial Details for Employee
        // await appCommon.MyTasks();
        // await hrInbxPage.assignInitialPayGroupSubmit(data.ProposedPayGroupInitial);
        // await capObj.checkForScreenErrors();
        // await appCommon.SuccessEventHandle();

        // Probation Date Details for Employee
        // await appCommon.MyTasks();
        await appCommon.staticWait(3);
        await hrInbxPage.setManageProbation(data.ProbationEndDate, "NaN");
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        //fill Contract Details for Employee
        // await contractObj.setContractDetails(String(data.ContractType).trim(), data.Status, data.DateEmployeeSigned, data.DateEmployerSigned, data.ContractEndDate, "NaN");
        // await capObj.checkForScreenErrors();
        // await appCommon.SuccessEventHandle();
        // await appCommon.refreshInbox();

        await appCommon.MyTasks();
        await proposeCompensation.setProposeCompensationHire(data.GradeProfile, data.Step, String(data.Salary), "NaN", data.AllowanceAmount);
        await capObj.checkForScreenErrors();
        await page.waitForTimeout(3000);
        if (await page.locator('//div[@title="Up Next: Compensation Partner | Approval by Compensation Partner"]').isVisible()) {
          CompensationHRPartner = await appCommon.getCompensationHRpartnerID();
          if (CompensationHRPartner !== HRPartner) {
            await appCommon.SearchboxEmp("Start Proxy");
            await proxy.startProxy(CompensationHRPartner);
            await appCommon.MyTasks();
            await hrInbxPage.compensationHRapprove();
          }
        }

        //await appCommon.SuccessEventHandle();
        empNum = await hrInbxPage.getEmployeeID();
        console.log("Emplyoee ID : " + empNum + " " + givenName + " " + familyName);
        //Maintain Right to Work Documentation
        if (CompensationHRPartner !== undefined && CompensationHRPartner !== HRPartner) {
          await appCommon.SearchboxEmp("Stop Proxy");
          await proxy.stopproxy();
          page.waitForTimeout(2000);
          await appCommon.SearchboxEmp("Start Proxy");
          await proxy.startProxy(HRPartner);
          await appCommon.MyTasks();
        }
        await appCommon.MyTasks();
        await appCommon.staticWait(3)
        await hrInbxPage.setMaintainRightToWorkDocumentation();
        // empNum = String(data.EmployeeID);

        await appCommon.SearchboxEmp("Start Proxy");
        await proxy.startProxy(empNum);
        await appCommon.MyTasks();

        await empInboxpage.onBoardingGuide();
        await appCommon.SuccessEventHandle();

        await empInboxpage.verifyLegalNameSubmit();
        await appCommon.SuccessEventHandle();

        await empInboxpage.empaddPhoto();
        await appCommon.SuccessEventHandle();

        await empInboxpage.clickInboxMyTaskAndSubmit("Change/Update My Contact Information");
        await appCommon.SuccessEventHandle();

        await empInboxpage.AddEmergecyInformation();
        await appCommon.SuccessEventHandle();

        await empInboxpage.GBEmployeeHandbooksSubmit();
        await appCommon.SuccessEventHandle();

        await empInboxpage.addCertificationSubmit();
        await appCommon.SuccessEventHandle();

        await empInboxpage.changePersonalInformation(data.Gender, data.DateOfBirth, data.CityofBirth, data.MaritalStatus, data.MaritalStatusDate, data.CitizenshipStatus, data.PrimaryNationality, "NaN", "NaN", data.RaceEthnicity, data.Religion);
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();
        await empInboxpage.changepersonalinformationSubmit();
        await appCommon.SuccessEventHandle();

        await empInboxpage.addEmployeeBankDetails(data.BankName, "NaN", data.AccountNumber, "NaN", data.AccountType, data.BankSortCode, givenName);
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        //fill Government IDs  Details for Employee
        await governemntIDs.setGovernmentIDsUK(data.Country1, data.NationalIDType1, data.AddEditID1, data.IssuedDate1, data.ExpirationDate1);
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();
        await empInboxpage.changeGovIDInformation();
        await appCommon.SuccessEventHandle();
        
        await empInboxpage.reviewDocumentSubmitGeneric();
        await appCommon.SuccessEventHandle();

        await appCommon.SearchboxEmp("Start Proxy");
        await proxy.startProxy(HRPartner);
        await appCommon.MyTasks();

        await appCommon.MyTasks();
        await hrInbxPage.setMaintainRightToWorkDocumentation();

        await hrInbxPage.clickInboxMyTaskAndApprove("Personal Information Change:");
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        // await hrInbxPage.clickInboxMyTaskAndApprove("Payment Election:");
        // await capObj.checkForScreenErrors();
        // await appCommon.SuccessEventHandle();
        const PaygroupHRPartner = await appCommon.getHRpartnerIDFromEmployeeWorkerHistory(empNum, "Assign Pay Group");

        if (PaygroupHRPartner !== HRPartner) {
          await appCommon.SearchboxEmp("Start Proxy");
          await proxy.startProxy(PaygroupHRPartner);
        }

        await appCommon.MyTasks();
        await hrInbxPage.assignPayGroupApprove(data.ProposedPayGroupFinal);
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        // await appCommon.MyTasks();
        // await hrInbxPage.assignPaygroupApprove();
        // await capObj.checkForScreenErrors();
        // await appCommon.SuccessEventHandle();

        await appCommon.SearchClickLink(empNum)
        await appCommon.assignPaygroupValidation(String(data.ProposedPayGroupFinal));
        //await appCommon.tearDown();
        // Write the results to the Excel file
        writeResultsToExcel(excelFilePath, sheetName, index, empNum, 'Passed');
        empNum = "";

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
  });
}
