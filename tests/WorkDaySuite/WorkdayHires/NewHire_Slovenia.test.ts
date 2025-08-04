import test from '@lib/BaseTest';
import { CaptureAlertErrors } from '@lib/CaptureErrors';
import { excelToJson, getExcelFilePath } from '@lib/ExceltoJsonUtil';
import { writePositionToExcel, writeResultsToExcel, writeUniqueNamesToExcel } from '@lib/ExcelUtils';
import { JobDetailsPage } from '@pages/CommonPages/JobDetailsPage';
import { MaintainContractPage } from '@pages/CommonPages/MaintainContractPage';
import { ProposeCompensationPage } from '@pages/CommonPages/ProposeCompensationPage';
import { createPositionPage } from '@pages/createPositionpage';
import { contactInformationAddressCzechia } from '@pages/CzechiaPages/ContactInformationAddressCzechia';
import { GovernmentsIDPageCzechia } from '@pages/CzechiaPages/GovernmentIDsCzechiaPage';
import { EditPassportsAndVisasPage } from '@pages/EditPassportsAndVisasPage';
import { employeeInboxPage } from '@pages/employeeInboxpage';
import { HrInboxPage } from '@pages/hrInboxPage';
import { employeeInboxUSPage } from '@pages/USPages/employeeInboxUSPage';
import { generateRandomName } from 'utils/functional/utils';


let empNum: string;
let position: string;
let captureErrors: CaptureAlertErrors;

// Define the relative directory path to your Excel file
<<<<<<< HEAD
const excelFileName = 'Hires/Workday_NewHire_Slovenia_PK17 July 7.xlsx';
=======
const excelFileName = 'Hires/Workday_NewHire_Slovenia_Regression_PK17.xlsx';
>>>>>>> 51a74b0758967f7b1b51c525d56d3cf828cfbde6
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
    // const givenName = data.GivenName;
    // const familyName = data.FamilyName;
    const { givenName, familyName } = generateRandomName();
    if (data.TestStatus !== "Passed") {


      test(`@Hire Employee - Test ${index + 1} `, async ({ page, context, login, home, hireEmployee, appCommon, proxy }) => {
        try {
          await page.setViewportSize({ width: 1275, height: 595 });//
          const empInboxpage = new employeeInboxPage(page, givenName, familyName, jobProfile, context);
          const hrInbxPage = new HrInboxPage(page, givenName, familyName, context);
          const empInboxUS = new employeeInboxUSPage(page, context);
          const homePageRon = new contactInformationAddressCzechia(page, context)
          const proposeCompensation = new ProposeCompensationPage(page, givenName, familyName, context);
          const createPostition = new createPositionPage(page);
          const jobDetailsPage = new JobDetailsPage(page, context)
          captureErrors = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index);
          const contractObj = new MaintainContractPage(page, givenName, familyName, context);
          const capObj = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index);
          const governemntIDs = new GovernmentsIDPageCzechia(page, givenName, familyName, context);
          const editAndVissaPage = new EditPassportsAndVisasPage(page, givenName, familyName, context)
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
            await empInboxpage.setDeparmentAndCostCenter(position, data.CostCenter, data.DepartmentSection1, givenName, familyName);
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
          await homePageRon.contactInformationAddressSlovenia("NaN", data.AdressLine1, data.AdressLine2, data.PostalCode, data.City, data.Type, data.UseFor);
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

          await empInboxpage.setDeparmentAndCostCenter("position", data.CostCenter, data.DepartmentSection1, givenName, familyName);
          await captureErrors.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          //It will get HR partner ID for hr proxy
          const HRPartner = await appCommon.getHRpartnerID(givenName, familyName);
          await appCommon.Searchbox("Start Proxy");
          await proxy.startProxy(HRPartner);
          await appCommon.MyTasks();

          await hrInbxPage.clickInboxMyTaskAndSubmit("Service Dates Change:");
          await appCommon.SuccessEventHandle();

          await hrInbxPage.clickInboxMyTaskAndSubmit("Add Dependents:");
          await captureErrors.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          await hrInbxPage.clickInboxMyTaskAndSubmit("Add New Hire Data:");
          await captureErrors.checkForScreenErrors();
          await appCommon.SuccessEventHandle();
          //fill ''Add Medical Exam''
          await hrInbxPage.setAddMedicalExam(data.DateWhenMedicalExamTaken, data.ExpirationDateOfTheExam);
          await appCommon.SuccessEventHandle();
          //await appCommon.refreshInbox();

          await hrInbxPage.setCollectiveAgreementAndProfessionalCategoryAndLevel(data.CollectiveAgreement, data.ProfessionalCategory, data.Level);
          await appCommon.SuccessEventHandle();
          // await appCommon.refreshInbox();

          //fill Contract Details for Employee
          await contractObj.setContractDetails(data.ContractType, data.Status, data.DateEmployeeSigned, data.DateEmployerSigned, data.ContractEndDate, String(data.ContractReason));
          await captureErrors.checkForScreenErrors();
          await appCommon.SuccessEventHandle();


          await hrInbxPage.setManageProbation(data.ProbationEndDate, "NaN");
          await appCommon.SuccessEventHandle();
          // await appCommon.refreshInbox();

          await appCommon.MyTasks();
          await proposeCompensation.setProposeCompensationHire(data.GradeProfile, data.Step, data.Salary, "Slovenia", "NaN");
          await captureErrors.checkForScreenErrors();
          empNum = await hrInbxPage.getEmployeeID();
          console.log("Emplyoee ID : " + empNum + " " + givenName + " " + familyName);

          // await appCommon.Searchbox("Stop Proxy");

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

          await empInboxpage.reviewDocumentSubmitGeneric();
          await appCommon.SuccessEventHandle();

          await empInboxpage.clickInboxMyTaskAndSubmit("Add Emergency Contacts");
          await appCommon.SuccessEventHandle();

          await empInboxpage.addEmployeeBankDetails(data.BankName, data.BankIdentificationCode, "NaN", String(data.IBAN), data.AccountType, "NaN", data.NameOnAccount);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          //ChangePersonalInformation
          await empInboxpage.changePersonalInformation(data.Gender, data.DateOfBirth, "NaN", "NaN", "NaN", data.CitizenshipStatus, data.PrimaryNationality, "NaN", "NaN", "NaN", "NaN");
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();
          await empInboxpage.changepersonalinformationSubmit();
          //await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          await empInboxUS.changeGovIDInformation();
          //fill Government IDs  Details for Employee
          await governemntIDs.setGovernmentIDsCzechia(data.Country1, data.Country2, data.NationalIDType1,
            data.GovernmentIDType2, data.AddEditID1, data.AddEditID2, data.IssuedDate1, data.IssuedDate2,
            data.ExpirationDate1, data.ExpirationDate2, "NaN", "NaN");
          await captureErrors.checkForScreenErrors();
          await empInboxUS.changeGovIDInformationSubmit();
          await captureErrors.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          await appCommon.Searchbox("Start Proxy");
          await proxy.startProxy(HRPartner);
          await appCommon.MyTasks();

          await hrInbxPage.clickInboxMyTaskAndApproveIfVisible("Personal Information Change:");
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          await editAndVissaPage.clickMaintainRightToWorkDocumentationANDeditPassportsAndVisas(empNum, data.Country, data.PassportIDType, data.IdentificationNo, data.IssuedDate, data.ExpirationDate);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          await appCommon.MyTasks();
          await hrInbxPage.assignPayGroupApprove(String(data.ProposedPayGroupFinal));
          await capObj.checkForScreenErrors();

          // await appCommon.SearchClickLink(empNum)
          // await appCommon.assignPaygroupValidation(String(data.ProposedPayGroupFinal));
          // Write the results to the Excel file
          writeResultsToExcel(excelFilePath, sheetName, index, empNum, 'Passed');
          empNum = "";

<<<<<<< HEAD
        } catch (error) {
          console.error(`Test failed for ${givenName} ${familyName}:`, error);
          // if ((await captureErrors.getUpdateError()) == undefined) {
=======
        await home.searchHireEmployee();

        await hireEmployee.searchSupervisoryOrganization(data.SupervisoryOrganisation);
        await hireEmployee.legalNameInformation(givenName, familyName, data.Prefix);
        await hireEmployee.contactInformationpage();
        await hireEmployee.contactInformationPhone(data.PhoneNumber, data.PhoneDevice, data.Type);
        await homePageRon.contactInformationAddressSlovenia("NaN", data.AdressLine1, data.AdressLine2, data.PostalCode, data.City, data.Type, data.UseFor);
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

        await empInboxpage.setDeparmentAndCostCenter("position", data.CostCenter, data.DepartmentSection1, givenName, familyName);
        await captureErrors.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        //It will get HR partner ID for hr proxy
        const HRPartner = await appCommon.getHRpartnerID(givenName, familyName);
        await appCommon.Searchbox("Start Proxy");
        await proxy.startProxy(HRPartner);
        await appCommon.MyTasks();

        await hrInbxPage.clickInboxMyTaskAndSubmit("Service Dates Change:");
        await appCommon.SuccessEventHandle();
         await appCommon.MyTasks();
        await hrInbxPage.clickInboxMyTaskAndSubmit("Add Dependents:");
        await captureErrors.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        await hrInbxPage.clickInboxMyTaskAndSubmit("Add New Hire Data:");
        await captureErrors.checkForScreenErrors();
        await appCommon.SuccessEventHandle();
        //fill ''Add Medical Exam''
        await hrInbxPage.setAddMedicalExam(data.DateWhenMedicalExamTaken, data.ExpirationDateOfTheExam);
        await appCommon.SuccessEventHandle();
        //await appCommon.refreshInbox();
        await hrInbxPage.setCollectiveAgreementAndProfessionalCategoryAndLevel(data.CollectiveAgreement, data.ProfessionalCategory, data.Level);
        await appCommon.SuccessEventHandle();
        // await appCommon.refreshInbox();

        //fill Contract Details for Employee
        await contractObj.setContractDetails(data.ContractType, data.Status, data.DateEmployeeSigned, data.DateEmployerSigned, data.ContractEndDate, String(data.ContractReason));
        await captureErrors.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        await hrInbxPage.setManageProbation(data.ProbationEndDate, "NaN");
        await appCommon.SuccessEventHandle();
        // await appCommon.refreshInbox();

        await proposeCompensation.setProposeCompensationHire(data.GradeProfile, data.Step, data.Salary, "Slovenia", "NaN");
        //await captureErrors.checkForScreenErrors();
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

        await empInboxpage.reviewDocumentSubmitGeneric();
        await appCommon.SuccessEventHandle();

        await empInboxpage.addEmployeeBankDetails(data.BankName, data.BankIdentificationCode, "NaN", String(data.IBAN), data.AccountType, "NaN", data.NameOnAccount);
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        //ChangePersonalInformation
        await empInboxpage.changePersonalInformation(data.Gender, data.DateOfBirth, "NaN", "NaN", "NaN", data.CitizenshipStatus, data.PrimaryNationality, "NaN", "NaN", "NaN", "NaN");
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();
        await empInboxpage.changepersonalinformationSubmit();
        //await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        await empInboxUS.changeGovIDInformation();
        //fill Government IDs  Details for Employee
        await governemntIDs.setGovernmentIDsCzechia(data.Country1, data.Country2, data.NationalIDType1,
          data.GovernmentIDType2, data.AddEditID1, data.AddEditID2, data.IssuedDate1, data.IssuedDate2,
          data.ExpirationDate1, data.ExpirationDate2, "NaN", "NaN");
        await captureErrors.checkForScreenErrors();
        await empInboxUS.changeGovIDInformationSubmit();
        await captureErrors.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        await empInboxpage.clickInboxMyTaskAndSubmit("Add Emergency Contacts");
        await appCommon.SuccessEventHandle();

        await appCommon.Searchbox("Start Proxy");
        await proxy.startProxy(HRPartner);
        await appCommon.MyTasks();

        await hrInbxPage.clickInboxMyTaskAndApproveIfVisible("Personal Information Change:");
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        await editAndVissaPage.clickMaintainRightToWorkDocumentationANDeditPassportsAndVisas(empNum, data.Country, data.PassportIDType, data.IdentificationNo, data.IssuedDate, data.ExpirationDate);
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        await appCommon.MyTasks();
        await hrInbxPage.assignPayGroupApprove(String(data.ProposedPayGroupFinal));
        await capObj.checkForScreenErrors();

        await appCommon.SearchClickLink(empNum)
        await appCommon.assignPaygroupValidation(String(data.ProposedPayGroupFinal));
        // Write the results to the Excel file
        writeResultsToExcel(excelFilePath, sheetName, index, empNum, 'Passed');
        empNum = "";

      } catch (error) {
        console.error(`Test failed for ${givenName} ${familyName}:`, error);
        if ((await captureErrors.getUpdateError()) == undefined) {
>>>>>>> 51a74b0758967f7b1b51c525d56d3cf828cfbde6
          let error1 = "Test failed for '" + givenName + " " + familyName + "' Employee:{" + empNum + "}" + error.toString();
          //   // Write the failure status to the Excel file
          writeResultsToExcel(excelFilePath, sheetName, index, error1, 'Failed');
          empNum = "";
          // }
        }

      });
    }
  });
}



