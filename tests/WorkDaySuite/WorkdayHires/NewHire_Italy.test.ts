import test from '@lib/BaseTest';
import { CaptureAlertErrors } from '@lib/CaptureErrors';
import { excelToJson, getExcelFilePath } from '@lib/ExceltoJsonUtil';
import { writePositionToExcel, writeResultsToExcel, writeUniqueNamesToExcel } from '@lib/ExcelUtils';
import { MaintainContractPage } from '@pages/CommonPages/MaintainContractPage';
import { ProposeCompensationPage } from '@pages/CommonPages/ProposeCompensationPage';
import { GovernmentsIDPageCzechia } from '@pages/CzechiaPages/GovernmentIDsCzechiaPage';
import { employeeInboxPage } from '@pages/employeeInboxpage';
import { HrInboxPage } from '@pages/hrInboxPage';
import { contactInformationAddressRomania } from '@pages/RomaniaPages/ContactInformationAddressRomania';
import { generateRandomName } from 'utils/functional/utils';


let empNum: string;
let position: string;
let capObj: CaptureAlertErrors;


// Define the relative directory path to your Excel file
const excelFileName = 'Hires/Copy of MKItaly2.xlsx';
const excelFilePath = getExcelFilePath(excelFileName);

// Convert the Excel sheets to JSON format
const sheetsJson = excelToJson(excelFilePath);

// test.use({ viewport: { width: 1920, height: 1080 } }); 
// Iterate over each dataset and run the test
for (const sheetName in sheetsJson) {
  const dataSet = sheetsJson[sheetName];

  dataSet.forEach((data, index) => {
    if (data.TestStatus !== "Passed") {
      //  const givenName = givenName || `GivenName_${index + 1}`;
      //  const familyName = familyName || `FamilyName_${index + 1}`;
      const jobProfile = data.JobProfile || `JobProfile_${index + 1}`;
      const { givenName, familyName } = generateRandomName();

      // const givenName = data.GivenName;
      // const familyName = data.FamilyName;
      // const givenName: string = "Gussie";
      // const familyName: string = "Stanton";
      // if (data.TestStatus != 'Passed') {

      test(`@Hire Employee - Test ${index + 1} `, async ({ page, context, createPostition, jobDetailsPage, login, home, hireEmployee, appCommon, proxy }) => {
        try {
          await page.setViewportSize({ width: 1280, height: 650 });

          const empInboxpage = new employeeInboxPage(page, givenName, familyName, jobProfile, context);
          const hrInbxPage = new HrInboxPage(page, givenName, familyName, context);
          const proposeCompensation = new ProposeCompensationPage(page, givenName, familyName, context);
          const homePageRon = new contactInformationAddressRomania(page, context)
          const governemntIDs = new GovernmentsIDPageCzechia(page, givenName, familyName, context);
          const contractObj = new MaintainContractPage(page, givenName, familyName, context)
          capObj = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index);

          console.log(`Starting Test for Hire  ${givenName} ${familyName}`);
          await writeUniqueNamesToExcel(excelFilePath, sheetName, index, givenName, familyName)

          const username = "90001655";
          const password = "Vasanth2025!";

          // initlize the web environment 
          await login.goto("PK17");

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
            await empInboxpage.setDeparmentAndCostCenter(position, data.CostCenter, data.DepartmentSection1, givenName, familyName);
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
          await hireEmployee.searchSupervisoryOrganization(data.SupervisoryOrganisation);
          await hireEmployee.legalNameInformation(givenName, familyName, "");
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
            data.EndEmploymentDate,
            data.PayRateType
          );

          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();
          await appCommon.MyTasks();

          await empInboxpage.setDeparmentAndCostCenter("position", data.CostCenter, data.DepartmentSection1, givenName, familyName);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          const HRPartner = await appCommon.getHRpartnerID(givenName, familyName);
          // //const HRPartner = "10554022"
          // const HRPartner = "10559802"
          await appCommon.Searchbox("Start Proxy");
          await proxy.startProxy(HRPartner);
          //await appCommon.ClickInbox();
          await appCommon.MyTasks();
          await hrInbxPage.setCollectiveAgreementAndProfessionalCategoryAndLevel(data.CollectiveAgreement, data.ProfessionalCategory, data.Level);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          // await capObj.checkForScreenErrors();
          await hrInbxPage.setManageProbation(data.ProbationEndDate, "NaN");
          await appCommon.SuccessEventHandle();

          // //fill Contract Details for Employee
          await contractObj.setContractDetails(data.ContractType, data.Status, data.DateEmployeeSigned, data.DateEmployerSigned, data.ContractEndDate, data.ContractReason);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          // await appCommon.ClickInbox();
          // await appCommon.MyTasks();
          await proposeCompensation.setProposeCompensationHire(data.GradeProfile, data.Step, data.Salary, "", "");
          await capObj.checkForScreenErrors();
          empNum = await hrInbxPage.getEmployeeID();
          console.log("Emplyoee ID : " + empNum + " " + givenName + " " + familyName);
          await appCommon.SearchboxEmp("Start Proxy");
          await proxy.startProxy(empNum);
          await appCommon.MyTasks();

          await empInboxpage.onBoardingGuide();
          await appCommon.SuccessEventHandle();

          await empInboxpage.empaddPhoto();
          await appCommon.SuccessEventHandle();

          await empInboxpage.changePersonalInformation(data.Gender, data.DateOfBirth, data.CityOfBirth, data.MaritalStatus, "NaN", data.CitizenshipStatus, data.PrimaryNationality, data.CountryOfBirth, data.RegionOfBirth, "NaN", "NaN");
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();
          await empInboxpage.changepersonalinformationSubmit();
          await appCommon.SuccessEventHandle();

          await empInboxpage.AddEmergecyInformation();
          await appCommon.SuccessEventHandle();

          await empInboxpage.reviewDocumentSubmitGeneric();
          await appCommon.SuccessEventHandle();

          await empInboxpage.clickInboxMyTaskAndSubmit("Change/Update My Contact Information");
          await appCommon.SuccessEventHandle();

          await empInboxpage.clickInboxMyTaskAndSubmit("Add Certifications (External Italy)");
          await appCommon.SuccessEventHandle();

          await empInboxpage.clickInboxMyTaskAndSubmit("Istruzioni per l’inserimento:");
          await appCommon.SuccessEventHandle();

          await empInboxpage.addEmployeeBankDetails("NaN", data.BankIdentificationCode, "NaN", String(data.IBAN), data.AccountType, "NaN", "NaN");
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          //fill Government IDs  Details for Employee
          await governemntIDs.setGovernmentIDsCzechia(data.Country1, data.Country2, data.NationalIDType1,
            data.NationalIDType2, data.AddEditID1, data.AddEditID2, data.IssuedDate1, data.IssuedDate2,
            data.ExpirationDate1, data.ExpirationDate2, "NaN", "NaN");
          await capObj.checkForScreenErrors();
          await empInboxpage.changeGovIDInformation();
          await appCommon.SuccessEventHandle();
          await empInboxpage.clickInboxMyTaskAndSubmit("Verfiy Legal Name");
          await appCommon.SuccessEventHandle();
          // await appCommon.staticWait(1);
          // await governemntIDs.clickGovernmentandSubmit();
          // await empInboxpage.changeGovIDInformation();
          //await capObj.checkForScreenErrors();
          //await appCommon.SuccessEventHandle();

          // await empInboxpage.clickVerfiyLegalNameAndCheckandSubmit();
          // await appCommon.SuccessEventHandle();

          await appCommon.SearchboxEmp("Start Proxy");
          await proxy.startProxy(HRPartner);
          // await appCommon.ClickInbox();
          await appCommon.MyTasks();

          await hrInbxPage.clickInboxMyTaskAndApprove("Personal Information Change:");
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();


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
          await writeResultsToExcel(excelFilePath, sheetName, index, empNum, 'Passed');
          empNum = "";
        } catch (error) {
          console.error(`Test failed for ${givenName} ${familyName}:`, error);
          //if ((await capObj.getUpdateError()) == undefined) {
          let error1 = "Test failed for '" + givenName + " " + familyName + "' Employee:{" + empNum + "}" + error.toString();
          //   // Write the failure status to the Excel file
          await writeResultsToExcel(excelFilePath, sheetName, index, error1, 'Failed');
          empNum = "";
          // }
        }

      });
    }
  });

}