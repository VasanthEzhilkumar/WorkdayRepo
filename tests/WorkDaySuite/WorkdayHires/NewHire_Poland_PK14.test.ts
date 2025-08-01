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
import { contactInformationAddressPoland } from '@pages/PolandPages/contactInformationAddressPoland';
import { GovernmentsIDPagePoland } from '@pages/PolandPages/GovernmentIDsPolandPage';


let empNum: string;
let position: string;
let capObj: CaptureAlertErrors;


// Define the relative directory path to your Excel file
const excelFileName = 'Hires/Workday_NewHire_Poland_Regression_PK14.xlsx';
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
    if (data.TestStatus != 'Passed') {

      test(`@Hire Employee - Test ${index + 1} `, async ({ page, context, login, home, hireEmployee, appCommon, proxy }) => {
        try {
          await page.setViewportSize({ width: 1375, height: 750 });

          // const givenName: string = "Gussie";
          // const familyName: string = "Stanton";

          const empInboxpage = new employeeInboxPage(page, givenName, familyName, jobProfile, context);
          const hrInbxPage = new HrInboxPage(page, givenName, familyName, context);
          const proposeCompensation = new ProposeCompensationPage(page, givenName, familyName, context);
          const homePagePoland = new contactInformationAddressPoland(page, context);
          const jobDetailsPageObj = new JobDetailsPage(page, context);
          const governemntIDs = new GovernmentsIDPagePoland(page, givenName, familyName, context);
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

          // // create position for Management hires
          // position = "No";
          if (data.JobProfile.toString().includes("Manager") || data.JobProfile.toString().includes("Administrator") || data.JobProfile.toString().includes("Officer") || data.JobProfile.toString().includes("Resourcer") || data.JobProfile.toString().includes("Head") || data.JobProfile.toString().includes("Commercial Support") || data.JobProfile.toString().includes("Legal Compliance Specialist")) {
            await appCommon.SearchClickLink("Create Position");
            await hireEmployee.searchSupervisoryOrganizationMgr(data.SupervisoryOrganisation);
            position = await createPostition.createPositionForManager(data.HireDate, data.HireDate, String(data.EmployeeType).trim(), String((data.JobProfile)).trim(), String(data.TimeType).trim(), data.Location);
            await capObj.checkForScreenErrors();
            await appCommon.SuccessEventHandle();
            await appCommon.MyTasks();
            //passing position created for selecting exact task from My Task (inbox).
            await empInboxpage.setCompanyDeparmentAndCostCenter(position, String(data.CostCenter.trim()), String(data.DepartmentSection).trim(), givenName, familyName, data.Company);
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
          await hireEmployee.legalNameInformationPoland(givenName, familyName);
          await hireEmployee.contactInformationpage();
          await hireEmployee.contactInformationPhone(data.PhoneNumber, data.PhoneDevice, data.Type);
          await homePagePoland.contactInformationAddressPK14(data.StreetName, data.houseNumber, data.Municipality, data.District, data.Province, data.PostalCode, data.City, data.Type, data.UseFor, data.EffectiveDate);
          await hireEmployee.contactInformationEmail(data.EmailAddress, data.Type);
          await hireEmployee.okHireButton();
          await capObj.checkForScreenErrors();

          await jobDetailsPageObj.setJobDetails(
            data.HireDate,
            data.EmployeeType.trim(),
            String(data.JobProfile).trim(),
            data.TimeType,
            data.WorkShift,
            data.AdditionalJobClassifications.toString(),
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

          await empInboxpage.setCompanyDeparmentAndCostCenter("position", data.CostCenter, data.DepartmentSection, givenName, familyName, data.Company);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          // const HRPartner = await appCommon.getHRpartnerID(givenName, familyName);
          const HRPartner = await appCommon.getSecondHRpartnerID(givenName, familyName);
          // //const HRPartner = "10554022"
          // const HRPartner = "10230200"
          await appCommon.Searchbox("Start Proxy");
          await proxy.startProxy(HRPartner);
          // await appCommon.ClickInbox();
          await appCommon.MyTasks();
          await capObj.checkForScreenErrors();

          await page.waitForTimeout(5000);
          //Assign HrpayGroup
          await hrInbxPage.assignInitialPayGroupSubmit(data.ProposedPayGroupInitial);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          await page.waitForTimeout(5000);
          /*This will be exxcuted for PK14 and ignored for PK17 */
          await hrInbxPage.setchangePersonalInformation(data.Gender, data.DateOfBirth, data.CityOfBirth, data.MaritalStatus, data.MaritalStatusDate,
            data.CitizenshipStatus, data.PrimaryNationality, data.CountryOfBirth, data.RegionOfBirth);
          await appCommon.SuccessEventHandle();

          await page.waitForTimeout(5000);
          // Worker education details in Polish
          await hrInbxPage.dodajWyksztalcenie(data.SchoolName, data.SchoolType, data.SchoolStartDate, data.SchoolEndDate);
          await capObj.checkForScreenErrors();
          await page.waitForTimeout(1500);
          await appCommon.SuccessEventHandle();
          // await appCommon.SuccessEventHandle();

          await page.waitForTimeout(5000);
          //Submit Worker Job History 
          await hrInbxPage.dodajHistorieZatrudnienia(data.FirstEverJobDetails, data.FirstJobStartDate, data.FirstJobExpiryDate);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          await page.waitForTimeout(5000);
          //Add Poland PIT Tax Information
          await hrInbxPage.dodajDanePodatkowe(data.UrządSkarbowy, data.Ulgapodatkowa, data.Częśćulgi, data.Typopodatkowania, data.Identyfikatorpodatkowy, data.KosztyUzyskaniaPrzychodu);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          await page.waitForTimeout(5000);
          //Click Submit On MedicalExamForm
          await hrInbxPage.SetMedicalExamForm();
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          //Click Submit First Ever Job Details
          // await hrInbxPage.firstEverJobDetails(data.FirstEverJobDetails, data.FirstJobExpiryDate);
          // await capObj.checkForScreenErrors();
          // await appCommon.SuccessEventHandle();

          await page.waitForTimeout(5000);
          //fill Contract Details for Employee
          await contractObj.setContractDetails(data.ContractType, data.Status, data.DateEmployeeSigned, data.DateEmployerSigned, data.ContractEndDate, data.ContractReason);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();
          await appCommon.refreshInbox();

          await page.waitForTimeout(5000);
          //Click submit on service dates
          await hrInbxPage.setServiceDates(data.SeniorityDate);
          await appCommon.SuccessEventHandle();

          await page.waitForTimeout(5000);
          //fill National Health Fund Code
          await hrInbxPage.nationalHealthFundCode(data.NationalHealthFundCode);
          await appCommon.SuccessEventHandle();
          await appCommon.SuccessEventHandle();

          await page.waitForTimeout(5000);
          // await appCommon.ClickInbox();
          await appCommon.MyTasks();
          await proposeCompensation.setProposeCompensationHirePolandPK14(data.GradeProfile, data.Step, data.Salary, data.Country, data.AllowanceAmount);
          await capObj.checkForScreenErrors();
          await page.waitForTimeout(1500);

          if (await page.locator('//div[contains(@title,"Up Next: Compensation Partner | Review Compensation Hire") or contains(@title,"Up Next: Global Compensation Partner | Approval by Global Compensation Partner")]').count() > 0) {
            const CompensationApprovalHR = await appCommon.getCompensationHRpartnerID();
            await appCommon.Searchbox("Stop Proxy");
            await proxy.stopproxy();
            await page.waitForTimeout(2500);
            await appCommon.Searchbox("Start Proxy");
            await proxy.startProxy(CompensationApprovalHR);
            await appCommon.MyTasks();
            await page.waitForTimeout(2500);
            await appCommon.clickSkipTour();
            await hrInbxPage.clickInboxMyTaskAndApproveOnce("Propose Compensation Hire:");

            if (await page.locator('//div[contains(@title,"Up Next: Compensation Partner | Review Compensation Hire") or contains(@title,"Up Next: Global Compensation Partner | Approval by Global Compensation Partner")]').count() > 0) {
              const CompensationApprovalHR = await appCommon.getCompensationHRpartnerID();
              await appCommon.Searchbox("Stop Proxy");
              await proxy.stopproxy();
              await page.waitForTimeout(2500);
              await appCommon.Searchbox("Start Proxy");
              await proxy.startProxy(CompensationApprovalHR);
              await appCommon.MyTasks();
              await page.waitForTimeout(2500);
              await appCommon.clickSkipTour();
              await hrInbxPage.clickInboxMyTaskAndApproveOnce("Propose Compensation Hire:");
            }
            empNum = await hrInbxPage.getEmployeeID();
            console.log("Emplyoee ID : " + empNum + " " + givenName + " " + familyName);
            await appCommon.Searchbox("Stop Proxy");
            await proxy.stopproxy();
            await page.waitForTimeout(1000);
            await appCommon.Searchbox("Start Proxy");
            await proxy.startProxy(HRPartner);
            // await appCommon.MyTasks();
          } else {
            empNum = await hrInbxPage.getEmployeeID();
            console.log("Emplyoee ID : " + empNum + " " + givenName + " " + familyName);
          }


          // empNum = await hrInbxPage.getEmployeeID();
          // console.log("Emplyoee ID : " + empNum + " " + givenName + " " + familyName);
          /*Compensation HR Approval*/
          // if(await appCommon.checkUpNextCompensationParnterApproval()){
          //   CompensationHR = await appCommon.getCompensationHRpartnerID();

          // }

          await page.waitForTimeout(1500);
          await page.waitForLoadState();
          // await appCommon.ClickInbox();
          // await appCommon.clickSkipTour();
          await appCommon.MyTasks();
          await page.waitForTimeout(5000);
          await appCommon.clickSkipTour();
          await governemntIDs.setGovernmentIDsPolandHr(data.Country1, data.NationalIDType1, data.AddEditID1, data.Country2, data.NationalIDType2, data.AddEditID2, data.Country3, data.NationalIDType3, data.AddEditID3);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          // await appCommon.MyTasks();

          await page.waitForTimeout(5000);
          //Maintain Right to Work Documentation
          await appCommon.MyTasks();
          await appCommon.clickSkipTour();
          await hrInbxPage.setMaintainRightToWorkDocumentation();
          await appCommon.SuccessEventHandle();
          // empNum = await hrInbxPage.getEmployeeIDAfterMaintainRightToWorkDocumentation();




          // empNum = String(data.EmployeeID);
          await appCommon.SearchboxEmp("Start Proxy");
          await proxy.startProxy(empNum);
          // await appCommon.ClickInbox();
          await appCommon.MyTasks();
          await page.waitForTimeout(5000);
          await appCommon.clickSkipTour();

          await page.waitForTimeout(5000);
          await appCommon.clickSkipTour();
          //After Entering to Employee Proxy onboarding process:)
          await empInboxpage.onBoardingGuide();
          await appCommon.SuccessEventHandle();

          await page.waitForTimeout(5000);
          await empInboxpage.empaddPhoto();
          await appCommon.SuccessEventHandle();

          //Add Bank Details For Poland
          await appCommon.MyTasks();
          await page.waitForTimeout(5000);
          await appCommon.clickSkipTour();

          let nameOnBankAccount = givenName + " " + familyName;
          await empInboxpage.addEmployeeBankDetailsPoland(data.BankName, data.BankIdentificationCode, String(data.AccountNumber), String(data.IBAN), String(nameOnBankAccount));
          await capObj.checkForScreenErrors();

          //ChangeUpdateMyContactInfoForPoland
          await page.waitForTimeout(5000);
          await empInboxpage.empChgeContactInformation();
          await appCommon.SuccessEventHandle();


          //ChangePersonalInformation
          await page.waitForTimeout(5000);
          await empInboxpage.changepersonalinformationSubmit();
          //await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          //*
          //fill Government IDs  Details for Employee
          await page.waitForTimeout(5000);
          await empInboxpage.changeGovIDInformation();
          await appCommon.SuccessEventHandle();

          await page.waitForTimeout(5000);
          await empInboxpage.AddEmergecyInformation();
          await appCommon.SuccessEventHandle();

          await page.waitForTimeout(5000);
          await empInboxpage.reviewDocumentSubmitGeneric();
          await appCommon.SuccessEventHandle();

          await page.waitForTimeout(5000);
          await empInboxpage.empaddDependents();
          await appCommon.SuccessEventHandle();

          await page.waitForTimeout(5000);
          await empInboxpage.empAddPITTaxInformation();
          await appCommon.SuccessEventHandle();

          await page.waitForTimeout(5000);
          await empInboxpage.dodajDanePIT2();
          await appCommon.SuccessEventHandle();

          await page.waitForTimeout(5000);
          await empInboxpage.rodzinyDoUbezpieczeniaZdrowotnego();
          await appCommon.SuccessEventHandle();

          await page.waitForTimeout(5000);
          await empInboxpage.empNationalHealthFundCode();
          await appCommon.SuccessEventHandle();

          // await empInboxpage.reviewDocumentSubmitGeneric();
          // await appCommon.SuccessEventHandle();

          // await empInboxpage.reviewDocumentSubmitGeneric();
          // await appCommon.SuccessEventHandle();

          //Start Proxy As HR Again 
          await appCommon.Searchbox("Start Proxy");
          await proxy.startProxy(HRPartner);
          await appCommon.MyTasks();
          // await appCommon.ClickInbox();
          await capObj.checkForScreenErrors();

          // await hrInbxPage.setMaintainRightToWorkDocumentation();
          // await capObj.checkForScreenErrors();
          // await appCommon.SuccessEventHandle();

          // await hrInbxPage.clickInboxMyTaskAndApprove("Personal Information Change:");
          // await capObj.checkForScreenErrors();
          // await appCommon.SuccessEventHandle();

          await page.waitForTimeout(5000);
          await appCommon.clickSkipTour();
          await hrInbxPage.clickInboxMyTaskAndApprove("Payment Election:");
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();


          await appCommon.MyTasks();
          await page.waitForTimeout(5000);
          await appCommon.clickSkipTour();
          await hrInbxPage.assignPayGroupSubmit(data.ProposedPayGroupFinal);
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          // await appCommon.MyTasks();
          await page.waitForTimeout(5000);
          await hrInbxPage.assignPaygroupApprove();
          await capObj.checkForScreenErrors();
          await appCommon.SuccessEventHandle();

          await page.waitForTimeout(5000);
          await appCommon.SearchClickLink(empNum)

          await page.waitForTimeout(5000);
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