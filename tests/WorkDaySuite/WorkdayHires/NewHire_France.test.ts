import test from '@lib/BaseTest';
import { CaptureAlertErrors } from '@lib/CaptureErrors';
import { excelToJson, getExcelFilePath } from '@lib/ExceltoJsonUtil';
import { writePositionToExcel, writeResultsToExcel, writeUniqueNamesToExcel } from '@lib/ExcelUtils';
import { MaintainContractPage } from '@pages/CommonPages/MaintainContractPage';
import { ProposeCompensationPage } from '@pages/CommonPages/ProposeCompensationPage';
import { GovernmentsIDPageCzechia } from '@pages/CzechiaPages/GovernmentIDsCzechiaPage';
import { EditPassportsAndVisasPage } from '@pages/EditPassportsAndVisasPage';
import { employeeInboxPage } from '@pages/employeeInboxpage';
import { HrInboxPage } from '@pages/hrInboxPage';
import { generateRandomName } from 'utils/functional/utils';


let empNum: string;
let position: string;
let captureErrors: CaptureAlertErrors;

// Define the relative directory path to your Excel file
const excelFileName = 'Hires/Workday_NewHire_France_Regression_PK17.xlsx';
const excelFilePath = getExcelFilePath(excelFileName);

// Convert the Excel sheets to JSON format
const sheetsJson = excelToJson(excelFilePath);

// Iterate over each dataset and run the test
for (const sheetName in sheetsJson) {
  const dataSet = sheetsJson[sheetName];


  dataSet.forEach((data, index) => {
    // TestCaseIDs = "";
    // TestCaseIDs = data.TestCaseIDs;
    if (data.TestStatus !== "Passed" && data.Country === "France") {

      //  const givenName = givenName || `GivenName_${index + 1}`;
      //  const familyName = familyName || `FamilyName_${index + 1}`;
      const jobProfile = data.JobProfile || `JobProfile_${index + 1}`;
      const { givenName, familyName } = generateRandomName();


      test(`@HireREG Employee - Test ${index + 1} `, async ({ page, context, createPostition, homePageRon, empInboxUS, jobDetailsPage, login, home, hireEmployee, appCommon, proxy }) => {
        try {
          await page.setViewportSize({ width: 1275, height: 595 });//
          const empInboxpage = new employeeInboxPage(page, givenName, familyName, jobProfile, context);
          const hrInbxPage = new HrInboxPage(page, givenName, familyName, context);
          const proposeCompensation = new ProposeCompensationPage(page, givenName, familyName, context);

          // const createPostition = new createPositionPage(page);
          // const jobDetailsPage = new JobDetailsPage(page, context)
          // const empInboxUS = new employeeInboxUSPage(page, context);
          // const homePageRon = new contactInformationAddressCzechia(page, context)

          captureErrors = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index);
          const contractObj = new MaintainContractPage(page, givenName, familyName, context);
          const capObj = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index);
          const governemntIDs = new GovernmentsIDPageCzechia(page, givenName, familyName, context);
          const editAndVissaPage = new EditPassportsAndVisasPage(page, givenName, familyName, context)
          console.log(`Starting Test for Hire  ${givenName} ${familyName}`);
          writeUniqueNamesToExcel(excelFilePath, sheetName, index, givenName, familyName)

          const username = "90001655";
          const password = "Vasanth2025!";
          await login.goto("PK17");
          //await login.goto((data.Country).toString());
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
          await hireEmployee.legalNameInformation(givenName, familyName, data.Prefix);
          await hireEmployee.contactInformationpage();
          await hireEmployee.contactInformationPhone(data.PhoneNumber, data.PhoneDevice, data.Type);
          await homePageRon.contactInformationAddressFrance(data.StreetNameAndType, data.Department, data.PostalCode, data.City, data.Type, data.UseFor);
          await hireEmployee.contactInformationEmail(data.EmailAddress, data.Type);
          await hireEmployee.okHireButton();
          // await captureErrors.checkForScreenErrors();
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
            data.PayRateType
          );

          await captureErrors.checkForScreenErrors();
          await appCommon.SuccessEventHandle();
          await appCommon.MyTasks();

          await empInboxpage.setDeparmentAndCostCenter("position", data.CostCenter, data.DepartmentSection, givenName, familyName);
          await captureErrors.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          //It will get HR partner ID for hr proxy
          const HRPartner = await appCommon.getHRpartnerID(givenName, familyName);
          console.log('HR Parnter ID -' + HRPartner);
          await appCommon.Searchbox("Start Proxy");
          await proxy.startProxy(HRPartner);
          await appCommon.MyTasks();


          await hrInbxPage.setCollectiveAgreementAndProfessionalCategoryAndLevel(data.CollectiveAgreement, data.ProfessionalCategory, data.Level);
          await captureErrors.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          //fill Contract Details for Employee
          await contractObj.setContractDetails(data.ContractType, data.Status, data.DateEmployeeSigned, data.DateEmployerSigned, data.ContractEndDate, String(data.ContractReason));
          await captureErrors.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          await hrInbxPage.setManageProbation(data.ProbationEndDate, "NaN");
          await captureErrors.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          await hrInbxPage.clickInboxMyTaskAndSubmit("Hire:");
          await appCommon.SuccessEventHandle();

          await appCommon.MyTasks();
          await proposeCompensation.setProposeCompensationHire(data.GradeProfile, data.Step, data.Salary, data.Country, "NaN");
          await captureErrors.checkForScreenErrors();
          const flag = await appCommon.checkUpNextCompensationParnterApproval();
          await appCommon.SuccessEventHandle();
          if (flag) {
            await appCommon.Searchbox("Stop Proxy");
            await proxy.stopproxy();
            // await appCommon.staticWait(2);
            //It will get HR partner ID for hr proxy
            const HRidProposeCompensation = await appCommon.getHRpartnerID(givenName, familyName);
            console.log("HR_ID_ProposeCompensation - " + HRidProposeCompensation);
            await appCommon.Searchbox("Start Proxy");
            await proxy.startProxy(HRidProposeCompensation);
            await appCommon.MyTasks();
            await hrInbxPage.clickInboxMyTaskAndApprove("Propose Compensation Hire:");
            // await captureErrors.checkForScreenErrors();
            await appCommon.SuccessEventHandle();
            await appCommon.Searchbox("Start Proxy");
            await proxy.startProxy(HRPartner);
            await appCommon.MyTasks();
          }
          //HR Partner: Hire:
          await hrInbxPage.clickInboxMyTaskAndSubmit("HR Partner: Hire:");
          empNum = await hrInbxPage.getEmployeeID();
          console.log("Emplyoee ID : " + empNum + " " + givenName + " " + familyName);

          await appCommon.SearchboxEmp("Start Proxy");
          await proxy.startProxy(empNum);
          await appCommon.MyTasks();

          await empInboxpage.onBoardingGuide();
          await appCommon.SuccessEventHandle();

          await empInboxpage.empaddPhoto();
          await appCommon.SuccessEventHandle();

          await empInboxpage.clickInboxMyTaskAndSubmit("Change/Update My Contact Information");
          await appCommon.SuccessEventHandle();

          await empInboxpage.clickInboxMyTaskAndSubmit("Add Certifications");
          await appCommon.SuccessEventHandle();

          await empInboxpage.clickInboxMyTaskAndSubmit("Add Education");
          await appCommon.SuccessEventHandle();

          await empInboxpage.clickInboxMyTaskAndSubmit("Verifier vos donnes");
          await appCommon.SuccessEventHandle();

          await empInboxpage.clickInboxMyTaskAndSubmit("Maiden Name");
          await appCommon.SuccessEventHandle();

          await empInboxpage.reviewDocumentSubmitGeneric();
          await appCommon.SuccessEventHandle();

          await empInboxpage.AddEmergecyInformation();
          await appCommon.SuccessEventHandle();

          await empInboxpage.addEmployeeBankDetails(data.BankName, data.BankIdentificationCode, data.AccountNumber, String(data.IBAN), data.AccountType, "NaN", data.NameOnAccount);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          // ******************Working fine


          await empInboxUS.changeGovIDInformation();
          //fill Government IDs  Details for Employee
          await governemntIDs.setGovernmentIDsCzechia(data.Country1, "NaN", data.NationalIDType1,
            "NaN", data.AddEditID1, "NaN", data.IssuedDate, "NaN",
            data.ExpirationDate, "NaN", "NaN", "NaN");
          await captureErrors.checkForScreenErrors();
          await empInboxUS.changeGovIDInformationSubmit();
          await appCommon.SuccessEventHandle();

          //ChangePersonalInformation
          await empInboxpage.changePersonalInformation(data.Gender, data.DateOfBirth, data.CityofBirth, data.MaritalStatus, data.MaritalStatusDate, data.CitizenshipStatus, data.PrimaryNationality, data.CountryofBirth, data.RegionofBirth, "NaN", "NaN");
          await capObj.checkForScreenErrors();
          await empInboxpage.changepersonalinformationSubmit();
          await appCommon.SuccessEventHandle();

          await appCommon.Searchbox("Start Proxy");
          await proxy.startProxy(HRPartner);
          await appCommon.staticWait(2);
          await appCommon.MyTasks();

          await hrInbxPage.clickInboxMyTaskAndApprove("Personal Information Change:");
          await appCommon.SuccessEventHandle();

          await hrInbxPage.clickInboxMyTaskAndApprove("Payment Election:");
          await appCommon.SuccessEventHandle();

          await hrInbxPage.clickInboxMyTaskAndApprove("ID Change:");
          await appCommon.SuccessEventHandle();

          await editAndVissaPage.setEditPassportsAndVisas(data.Country, data.PassportIDType, data.IdentificationNo, data.IssuedDate, data.ExpirationDate);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          await appCommon.MyTasks();
          await hrInbxPage.assignPayGroupApprove(String(data.ProposedPayGroupFinal));
          // await capObj.checkForScreenErrors();
          await appCommon.SearchClickLink(empNum)
          await appCommon.assignPaygroupValidation(String(data.ProposedPayGroupFinal));
          // Write the results to the Excel file
          writeResultsToExcel(excelFilePath, sheetName, index, empNum, 'Passed');
          empNum = "";
        } catch (error) {
          console.error(`Test failed for ${givenName} ${familyName}:`, error);
          if ((await captureErrors.getUpdateError()) === undefined) {
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






