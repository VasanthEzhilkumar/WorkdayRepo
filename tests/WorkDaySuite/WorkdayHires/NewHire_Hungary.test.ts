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
import { GovernmentsIDPageHungary } from '@pages/HungaryPages/GovernmentIDHungaryPage';
import { contactInformationAddressHungary } from 'pageFactory/HungaryPages/ContactInformationAddressHungary';
import { generateRandomName } from 'utils/functional/utils';


let empNum: string;
let position: string;
let capObj: CaptureAlertErrors;


// Define the relative directory path to your Excel file
const excelFileName = 'Hires/testDataHungry.xlsx';
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
    if (data.TestStatus != 'Passed') {

      test(`@Hire Employee - Test ${index + 1} `, async ({ page, context, login, home, hireEmployee, appCommon, proxy }) => {
        try {
          await page.setViewportSize({ width: 1280, height: 595 });

          const empInboxpage = new employeeInboxPage(page, familyName, givenName, jobProfile, context);
          const hrInbxPage = new HrInboxPage(page, familyName, givenName, context);
          const proposeCompensation = new ProposeCompensationPage(page, familyName, givenName, context);
          const jobDetailsPageObj = new JobDetailsPage(page, context)
          const governemntIDs = new GovernmentsIDPageHungary(page, familyName, givenName, context);
          const contractObj = new MaintainContractPage(page, familyName, givenName, context)
          capObj = new CaptureAlertErrors(page, familyName, givenName, excelFilePath, sheetName, index)
          const hireAdditionalData = new HireAdditionalData(page, familyName, givenName, context)
          const createPostition = new createPositionPage(page);
          const homePageHun = new contactInformationAddressHungary(page, context);

          console.log(`Starting Test for Hire  ${givenName} ${familyName}`);
          writeUniqueNamesToExcel(excelFilePath, sheetName, index, givenName, familyName)

          const username = "90001655";
          const password = 'Vasanth"123';

          await login.goto("PK17");

          // initlize the web environment 
          //await login.goto("Hungary");

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
          await hireEmployee.searchSupervisoryOrganization(data.SupervisoryOrganisation);
          await hireEmployee.legalNameInformationHungary(givenName, familyName);
          await hireEmployee.contactInformationpage();
          await hireEmployee.contactInformationPhone(data.PhoneNumber, data.PhoneDevice, data.Type);
          await homePageHun.contactInformationAddress(data.StreetNumber, data.PostalCode, data.City, data.County, data.Type, data.StreetOrPlaceName, data.StreetOrPlaceType, data.UseFor);
          await hireEmployee.contactInformationEmail(data.EmailAddress, data.Type);
          await hireEmployee.okHireButton();
          await capObj.checkForScreenErrors();

          await jobDetailsPageObj.setJobDetails(
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

          //till this expect the additional details

          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();
          await appCommon.MyTasks();


          await empInboxpage.setDeparmentAndCostCenter("position", data.CostCenter, data.DepartmentSection, familyName, givenName);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          const HRPartner = await appCommon.getHRpartnerID(familyName, givenName);
          // //const HRPartner = "10554022"
          // const HRPartner = "10559802"
          await appCommon.Searchbox("Start Proxy");
          await proxy.startProxy(HRPartner);
          await appCommon.MyTasks();
          await capObj.checkForScreenErrors();

          await empInboxpage.changePersonalInformationHun(data.Gender, data.DateOfBirth, data.CityOfBirth, data.MaritalStatus, data.MaritalStatusDate, data.CitizenshipStatus, data.PrimaryNationality, data.CountryOfBirth, data.Disability, data.DisabilityDegree);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();
          //await empInboxpage.changepersonalinformationSubmit();

          //fill Government IDs  Details for Hungary Employee
          await governemntIDs.setGovernmentIDsHungary(data.Country1, data.NationalIDType1, data.AddEditID1, data.IssuedDate1, data.ExpirationDate1,
            data.Country2, data.NationalIDType2, data.AddEditID2, data.IssuedDate2, data.ExpirationDate2);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          //Set Contract Details

          await contractObj.setContractDetails(data.ContractType, data.Status, data.DateEmployeeSigned, data.DateEmployerSigned, data.ContractEndDate, "NaN");
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          //To add Dependenet Details For Hungary

          await hireAdditionalData.hrHireAdditionalDataDependentHungary(
            data.Relationship1,
            data.DependentName1,
            data.DependentPlaceofBirth1,
            data.DependentDateofBirth1,
            data.DependentMothersMaidenName1,
            data.DependentTaxID1,
            data.DependentSocialSecurityNumber1
          );
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();


          //Fill MainJob Details
          await hrInbxPage.hireAdditionalInfoMainJob(data.MainJob, data.Pensioner, data.Carer);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();


          await hrInbxPage.setManageProbation("NaN", "NaN");
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          //await appCommon.MyTasks();
          await proposeCompensation.setProposeCompensationHire(data.GradeProfile, data.Step, data.Salary, data.Country, "NaN");
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          //Notice Period
          await hrInbxPage.clickEditNoticePeriodsforHireSubmit()
          await capObj.checkForScreenErrors();
          empNum = await hrInbxPage.getEmployeeIDFromEditNoticePeriodPage();

          console.log("Emplyoee ID : " + empNum + " " + familyName + " " + givenName);

          await appCommon.MyTasks();

          await appCommon.SearchboxEmp("Start Proxy");
          await proxy.startProxy(empNum);
          await appCommon.MyTasks();
          await empInboxpage.onBoardingGuide();
          await appCommon.SuccessEventHandle();
          await empInboxpage.empaddPhoto();
          await appCommon.SuccessEventHandle();


          //Till This Working Fine
          await empInboxpage.addEmployeeBankDetailsforHungaryn(
            data.BankName,
            data.BankIdentificationCode,
            data.AccountNumber,
            String(data.IBAN),
            data.AccountType,
            data.AccountNickname,
            data.BankName2,
            data.BankIdentificationCode2,
            data.AccountNumber2,
            String(data.IBAN2),
            data.AccountType2,
            data.AccountNickname2,
            data.PaymentType,
            data.Account,
            data.Percent
          );
          await appCommon.SuccessEventHandle();


          await empInboxpage.clickInboxMyTaskAndSubmit("Change/Update My Contact Information");
          await appCommon.SuccessEventHandle();


          await empInboxpage.clickInboxMyTaskAndSubmit("Change/Update My Personal Information");
          await appCommon.SuccessEventHandle();

          await empInboxpage.changeGovIDInformation();
          await appCommon.SuccessEventHandle();

          await empInboxpage.AddEmergecyInformation();
          await appCommon.SuccessEventHandle();

          await empInboxpage.reviewDocumentSubmitGeneric();
          await appCommon.SuccessEventHandle();

          await appCommon.SearchClickLink(empNum)
          await empInboxpage.addAdditionalNameHungary(data.NameType, data.Country, data.GivenName1, data.FamilyName1, data.NameType2);

          //let HRPartner = "10559802";
          await appCommon.SearchboxEmp("Start Proxy");
          await proxy.startProxy(HRPartner);
          await appCommon.MyTasks();

          await hrInbxPage.updateWorkerContactInfo();
          await appCommon.SuccessEventHandle();

          await hrInbxPage.addWorkerBankDetails();
          await appCommon.SuccessEventHandle();

          await hrInbxPage.clickInboxMyTaskAndApprove("Payment Election:");
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          await empInboxpage.clickInboxMyTaskAndSubmit("Maiden Names: Hire:");
          await appCommon.SuccessEventHandle();

          await hrInbxPage.assignPayGroupForHireApprove(data.ProposedPayGroupFinal);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          await hrInbxPage.assignPayGroupApprove(data.ProposedPayGroupFinal);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          await appCommon.SearchClickLink(empNum)
          await appCommon.assignPaygroupValidation(data.ProposedPayGroupFinal);
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
    }
  });
}