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


// Define the relative directory path to your Excel file
const excelFileName = 'Hires/Workday_NewHire_Spain_Regression_PK17.xlsx';
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
    //const { givenName, familyName } = generateRandomName();
    const givenName = data.GivenName;
    const familyName = data.FirstLastName;
    const secondLastName = data.SecondLastName;
    if (data.TestStatus != 'Passed') {

    test(`@Hire Employee - Test ${index + 1} `, async ({ page, context, login, home, hireEmployee, appCommon, proxy }) => {
      try {
        await page.setViewportSize({ width: 1375, height: 750 });

        // const givenName: string = "Gussie";
        // const familyName: string = "Stanton";

        const empInboxpage = new employeeInboxPage(page, givenName, familyName, jobProfile, context);
        const hrInbxPage = new HrInboxPage(page, givenName, familyName, context);
        const proposeCompensation = new ProposeCompensationPage(page, givenName, familyName, context);
        const homePageRon = new contactInformationAddressCzechia(page, context)
        const jobDetailsPageObj = new JobDetailsPage(page, context);
        const governemntIDs = new GovernmentsIDPageCzechia(page, givenName, familyName, context);
        capObj = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index);
        //const hireAdditionalData = new HireAdditionalData(page, givenName, familyName, context);
        const createPostition = new createPositionPage(page);

        console.log(`Starting Test for Hire  ${givenName} ${familyName}`);
        writeUniqueNamesToExcel(excelFilePath, sheetName, index, givenName, familyName)

        // /*Login creds for PK14*/
        // const username = "90002196";
        // const password = "Primark0255!";

        /*Login creds for PK17*/
        const username = "90001655";
        const password = 'Vasanth"123';

        // initlize the web environment 
        await login.goto("PK17");

        // login into application 
        await login.sigIn(username, password);

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
        await hireEmployee.searchSupervisoryOrganization(data.SupervisoryOrganisation);
        await hireEmployee.legalNameInformationSpain(givenName, familyName, secondLastName);
        await hireEmployee.contactInformationpage();
        await hireEmployee.contactInformationPhone(data.PhoneNumber, data.PhoneDevice, data.Type);
        await homePageRon.contactInformationAddressSpain(data.NameOfStreet, data.PostalCode, data.City, "NaN", data.Type, data.HouseNumber, "NaN", "NaN", "NaN", data.UseFor, data.Province);
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

        //Probation Date Details for Employee
        //await appCommon.MyTasks();
        await hrInbxPage.setManageProbation(data.ProbationEndDate, "NaN");
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        // Spain Additional Information
        await hrInbxPage.addHireAdditionalDataSpain(data.EstadolIRPF, data.MinusvaliaRH);
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        // Govt. IDs
        await governemntIDs.setGovernmentIDsSpainHr(data.Country1, data.Country2, data.NationalIDType1,
          data.NationalIDType2, data.AddEditID1, data.AddEditID2, data.IssuedDate1, data.IssuedDate2,
          data.ExpirationDate1, data.ExpirationDate2, "NaN", "NaN");
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        // await appCommon.ClickInbox();
        await appCommon.MyTasks();
        await proposeCompensation.setProposeCompensationHire(data.GradeProfile, data.Step, data.Salary, data.Country, data.AllowanceAmount);
        await capObj.checkForScreenErrors();
        // await appCommon.SuccessEventHandle();

        empNum = await hrInbxPage.getEmployeeID();

        console.log("Emplyoee ID : " + empNum + " " + givenName + " " + familyName);

        await appCommon.MyTasks();

        // Medical Exam
        await hrInbxPage.medicalExam(givenName, familyName);
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        await appCommon.SearchboxEmp("Start Proxy");
        await proxy.startProxy(empNum);
        // await appCommon.ClickInbox();
        await appCommon.MyTasks();

        //After Entering to Employee Proxy onboarding process:)
        await empInboxpage.onBoardingGuide();
        await appCommon.SuccessEventHandle();
        await empInboxpage.empaddPhoto();
        await appCommon.SuccessEventHandle();

        await empInboxpage.clickInboxMyTaskAndSubmit("Change/Update My Contact Information");
        // await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        await empInboxpage.changeGovIDInformation();
        await appCommon.SuccessEventHandle();

        await empInboxpage.AddEmergecyInformation();
        await appCommon.SuccessEventHandle();

        await empInboxpage.reviewDocumentSubmitGeneric();
        await appCommon.SuccessEventHandle();

        await empInboxpage.clickInboxMyTaskAndSubmit("Add Certifications (External Spain)");
        // await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        // await empInboxpage.documentosDoTrabalhador();
        // await appCommon.SuccessEventHandle();

        await empInboxpage.addEmployeeBankDetails("NaN", data.BankIdentificationCode, "NaN", data.IBAN, data.AccountType, "NaN", "NaN");
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        //ChangePersonalInformation
        await empInboxpage.changePersonalInformation(data.Gender, data.DateOfBirth, data.CityOfBirth, data.MaritalStatus, data.MaritalStatusDate, "NaN", data.PrimaryNationality, data.CountryOfBirth, data.RegionOfBirth, "NaN", "NaN");
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();
        await empInboxpage.changepersonalinformationSubmit();
        //await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        await empInboxpage.spainStudyLevel(data.EducationLevel, data.EducationCompletionDate, data.Studies);
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();


        //Start Proxy As HR Again 
        await appCommon.Searchbox("Start Proxy");
        await proxy.startProxy(HRPartner);
        await appCommon.MyTasks();

        await hrInbxPage.clickInboxMyTaskAndApprove("Payment Election:");
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        await hrInbxPage.clickInboxMyTaskAndApprove("Personal Information Change:");
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        await appCommon.MyTasks();
        await hrInbxPage.assignPayGroupApprove(data.ProposedPayGroupFinal);
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        await appCommon.SearchClickLink(empNum)
        await appCommon.assignPaygroupValidation(data.ProposedPayGroupFinal);
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