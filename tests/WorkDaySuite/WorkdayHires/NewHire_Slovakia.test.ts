import test from '@lib/BaseTest';
import { CaptureAlertErrors } from '@lib/CaptureErrors';
import { excelToJson, getExcelFilePath } from '@lib/ExceltoJsonUtil';
import { writePositionToExcel, writeResultsToExcel, writeUniqueNamesToExcel } from '@lib/ExcelUtils';
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
const excelFileName = 'Hires/testDataSlovakia.xlsx';
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


    test(`@Hire Employee - Test ${index + 1} `, async ({ page, context, login, home, hireEmployee, appCommon, proxy }) => {
      try {
        await page.setViewportSize({ width: 1275, height: 595 });//
        const empInboxpage = new employeeInboxPage(page, givenName, familyName, jobProfile, context);
        const hrInbxPage = new HrInboxPage(page, givenName, familyName, context);
        const proposeCompensation = new ProposeCompensationPage(page, givenName, familyName, context);
        const createPostition = new createPositionPage(page);
        const jobDetailsPage = new JobDetailsPage(page, context)
        captureErrors = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index);
        const contractObj = new MaintainContractPage(page, givenName, familyName, context)


        console.log(`Starting Test for Hire  ${givenName} ${familyName}`);

        writeUniqueNamesToExcel(excelFilePath, sheetName, index, givenName, familyName)

        const username = "90001655";
        const password = "Primark123!!";
        await login.goto((data.Country).toString());
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
        await hireEmployee.legalNameInformation(givenName, familyName, "");
        await hireEmployee.contactInformationpage();
        await hireEmployee.contactInformationPhone(data.PhoneNumber, data.PhoneDevice, data.Type);
        await hireEmployee.contactInformationAddress(data.Street, data.PostalCode, data.City, data.County, data.Type);
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
          data.PayRateType
        );
        await captureErrors.checkForScreenErrors();
        await appCommon.SuccessEventHandle();
        await appCommon.MyTasks();
        await empInboxpage.setDeparmentAndCostCenter("position", data.CostCenter, data.DepartmentSection1, givenName, familyName);
        await captureErrors.checkForScreenErrors();
        await appCommon.SuccessEventHandle();
       //It will get HR partner ID for hr proxy
        const HRPartner = await appCommon.getHRpartnerID(givenName, familyName);

        await appCommon.Searchbox("Start Proxy");
        await proxy.startProxy(HRPartner);
        // await appCommon.ClickInbox();
        await appCommon.MyTasks();
        await hrInbxPage.EnterGovID(data.Country1, data.NationalIDType1, data.DepartmentSection, "", "", "", "", "", "", "");

        // await appCommon.refreshInbox();
        await captureErrors.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        //fill Contract Details for Employee
        await contractObj.setContractDetails(data.ContractType, data.Status, data.DateEmployeeSigned, data.DateEmployerSigned, data.ContractEndDate, String(data.ContractReason));
        await captureErrors.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        await appCommon.refreshInbox();
        await hrInbxPage.hrHireAdditionalDataDependentSK(data.MealVoucher, data.HealthInsuranceType);
        await captureErrors.checkForScreenErrors();

        await appCommon.SuccessEventHandle();
        await hrInbxPage.hrHireAdditionalDataSK(data.MealVoucher, data.HealthInsuranceType, data.YoungParent, data.YoungParentEffectiveDate, data.TaxFreeAmount, data.TaxFreeAmountEffectiveDate, data.PensioneffectiveDate);
        await captureErrors.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        await hrInbxPage.setManageProbation("NaN", data.ProbationReviewDate);
        await appCommon.SuccessEventHandle();
        await appCommon.refreshInbox();

        await proposeCompensation.setProposeCompensationHire(data.GradeProfile, data.Step, data.Salary,"","");
        await captureErrors.checkForScreenErrors();
        // await appCommon.SuccessEventHandle();
        // await appCommon.refreshInbox();
        //await appCommon.SuccessEventHandle();
        empNum = await hrInbxPage.hrgetemployeenumber();
        console.log(empNum, givenName, familyName);
        await appCommon.SuccessEventHandle();
        //await appCommon.ClickInbox();

        await appCommon.Searchbox("Stop Proxy");
        await proxy.stopproxy();

        await appCommon.SearchboxEmp("Start Proxy");
        await proxy.startProxy(empNum);
        //await appCommon.ClickInbox();
        await appCommon.MyTasks();

        await empInboxpage.onBoardingGuide();
        await appCommon.SuccessEventHandle();
        await empInboxpage.empaddPhoto();
        await appCommon.SuccessEventHandle();

        await empInboxpage.changePersonalInformation(data.Gender, data.DateOfBirth, data.CityOfBirth, data.MaritalStatus,"NaN", data.CitizenshipStatus, data.PrimaryNationality,"NaN","NaN","NaN","NaN");
        await appCommon.SuccessEventHandle();
        await empInboxpage.changepersonalinformationSubmit();
        await appCommon.SuccessEventHandle();
        await empInboxpage.changeGovIDInformation();
        await appCommon.SuccessEventHandle();
        await empInboxpage.AddEmergecyInformation();
        await appCommon.SuccessEventHandle();
        await empInboxpage.reviewDocumentSubmitSK();
        await appCommon.SuccessEventHandle();
        await empInboxpage.addCertificationSubmit();
        await appCommon.SuccessEventHandle();
        await empInboxpage.addeducationSubmit();
        await appCommon.SuccessEventHandle();
        await empInboxpage.addMaidenNameSubmit();
        await appCommon.SuccessEventHandle();

        await appCommon.Searchbox("Start Proxy");
        await proxy.startProxy(HRPartner);
        //await appCommon.ClickInbox();
        await appCommon.MyTasks();

        await hrInbxPage.updateWorkerContactInfo();
        await appCommon.SuccessEventHandle();

        await appCommon.MyTasks();
        await appCommon.Searchbox(empNum)
        await empInboxpage.empaddBankDetails(data.BankName, data.BankCode, data.AccountNumber, data.IBAN);
        // await appCommon.ClickInbox();
        await appCommon.MyTasks();
        await hrInbxPage.addWorkerBankDetails();
        await appCommon.SuccessEventHandle();

        await hrInbxPage.changePersonalInformation();
        await appCommon.SuccessEventHandle();
        await appCommon.refreshInbox();

        await hrInbxPage.updatePassportsAndVisa();
        await appCommon.SuccessEventHandle();
        // await appCommon.refreshInbox();
        await hrInbxPage.assignPayGroupSubmit(String(data.ProposedPayGroupFinal));
        await appCommon.SuccessEventHandle();
        await appCommon.ClickInbox();
        await appCommon.MyTasks();

        await appCommon.SearchClickLink(empNum)
        await appCommon.assignPaygroupValidation(String(data.ProposedPayGroupFinal));
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
  });
}



