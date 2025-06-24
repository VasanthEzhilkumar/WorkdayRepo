import test from '@lib/BaseTest';
import { CaptureAlertErrors } from '@lib/CaptureErrors';
import { excelToJson, getExcelFilePath } from '@lib/ExceltoJsonUtil';
import { writeErrorToExcel, writePositionToExcel, writeResultsToExcel, writeUniqueNamesToExcel } from '@lib/ExcelUtils';
// import { contactInformationAddressBelgium } from '@pages/BelgiumPages/contactInformationAddressBelgium';
import { JobDetailsPage } from '@pages/CommonPages/JobDetailsPage';
import { MaintainContractPage } from '@pages/CommonPages/MaintainContractPage';
import { ProposeCompensationPage } from '@pages/CommonPages/ProposeCompensationPage';
import { createPositionPage } from '@pages/createPositionpage';
import { employeeInboxPage } from '@pages/employeeInboxpage';
import { HrInboxPage } from '@pages/hrInboxPage';


let empNum: string;
let position: string;
let captureErrors: CaptureAlertErrors;

// Define the relative directory path to your Excel file
const excelFileName = 'Rehires/Workday_Rehire_Belgium_Regression_PK14.xlsx';
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
    const givenName = data.GivenName;
    const familyName = data.FamilyName;
    // const { givenName, familyName } = generateRandomName();


    test(`@Rehire Employee - Test ${index + 1} `, async ({ page, appCommon, context, login, home, hireEmployee, proxy }) => {
      try {
        await page.setViewportSize({ width: 1375, height: 750 });//
        const empInboxpage = new employeeInboxPage(page, givenName, familyName, jobProfile, context);
        const hrInbxPage = new HrInboxPage(page, givenName, familyName, context);
        // const homePageBelgium = new contactInformationAddressBelgium(page, context);
        const proposeCompensation = new ProposeCompensationPage(page, givenName, familyName, context);
        const createPostition = new createPositionPage(page);
        const jobDetailsPage = new JobDetailsPage(page, context)
        captureErrors = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index);
        const contractObj = new MaintainContractPage(page, givenName, familyName, context);
        const capObj = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index);



        console.log(`Starting Test for Rehire  ${givenName} ${familyName}`);

        writeUniqueNamesToExcel(excelFilePath, sheetName, index, givenName, familyName)

        // /*Login creds for PK14*/
        const username = "90002196";
        const password = "Wizos2025!";

        // // /*Login creds for PK17*/
        // const username = "90001655";
        // const password = "Vasanth2025!";

        await login.goto("PK14");
        await login.sigIn(username, password);

        empNum = data.EmployeeID;


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

        await hireEmployee.searchSupervisoryOrganizationRehire(data.SupervisoryOrganisation, data.ExistingPreHire);
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
        await empInboxpage.setDeparmentAndCostCenter("position", data.CostCenter, data.DepartmentSection, givenName, familyName);
        await captureErrors.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        // const HRPartner = "10652444";
        //It will get HR partner ID for hr proxy
        const HRPartner = await appCommon.getHRpartnerID(givenName, familyName);
        await appCommon.Searchbox("Start Proxy");
        await proxy.startProxy(HRPartner);
        await appCommon.MyTasks();
        // await appCommon.ClickInbox();

        await hrInbxPage.setHourlyRegime(data.HourlyRegime);
        await captureErrors.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        let Title = "ID Change: " + givenName + " " + familyName;
        await empInboxpage.clickInboxMyTaskAndSubmit(Title);
        await appCommon.SuccessEventHandle();

        //fill Contract Details for Employee
        await contractObj.setContractDetails(data.ContractType, data.Status, data.DateEmployeeSigned, "NaN", data.ContractEndDate, String(data.ContractReason));
        await captureErrors.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        Title = "Personal Information Change: " + givenName + " " + familyName;
        await empInboxpage.clickInboxMyTaskAndSubmit(Title);
        await appCommon.SuccessEventHandle();
/*
        // await hrInbxPage.setManageProbation("NaN", data.ProbationReviewDate);
        // await appCommon.SuccessEventHandle();
        // await appCommon.refreshInbox();
        if (!data.JobProfile.toString().includes("Manager")) {
          await proposeCompensation.setProposeCompensationHire(data.GradeProfile, data.Step, data.Salary, "", data.AllowanceAmount);
          await captureErrors.checkForScreenErrors();
          // await appCommon.SuccessEventHandle();
          // await appCommon.Searchbox("Stop Proxy");
          // await proxy.stopproxy();
          // await appCommon.MyTasks();
          // //It will get HR partner ID for hr proxy
          // const HRidProposeCompensation = await appCommon.getHRpartnerID(givenName, familyName);
          // await appCommon.Searchbox("Start Proxy");
          // await proxy.startProxy(HRidProposeCompensation);
          // //await appCommon.ClickInbox();
          // await appCommon.MyTasks();
          // await hrInbxPage.clickInboxMyTaskAndApprove("Propose Compensation Hire:");
          // empNum = await hrInbxPage.getEmployeeID();
          console.log("Emplyoee ID : " + empNum + " " + givenName + " " + familyName);
          // await appCommon.SuccessEventHandle();
        } else {   */
          //It will get HR partner ID for hr proxy
          const HRidforProposeCompensation = await appCommon.getHRpartnerID(givenName, familyName);
          await appCommon.Searchbox("Start Proxy");
          await proxy.startProxy(HRidforProposeCompensation);
          await appCommon.MyTasks();
          await proposeCompensation.setProposeCompensationHire(data.GradeProfile, data.Step, data.Salary, "", data.AllowanceAmount);
          await captureErrors.checkForScreenErrors();

          if (await page.locator('//div[contains(@title,"Up Next: Compensation Partner | Review Compensation Hire") or contains(@title,"Up Next: Global Compensation Partner | Approval by Global Compensation Partner")]').count() > 0) {
            const CompensationApprovalHR = await appCommon.getCompensationHRpartnerID();
            await appCommon.Searchbox("Stop Proxy");
            await proxy.stopproxy();
            await page.waitForTimeout(1000);
            await appCommon.Searchbox("Start Proxy");
            await proxy.startProxy(CompensationApprovalHR);
            await appCommon.MyTasks();
            await hrInbxPage.clickInboxMyTaskAndApprove("Propose Compensation Hire:");
          // }

          await appCommon.Searchbox("Stop Proxy");
          await proxy.stopproxy();
          await page.waitForTimeout(1000);
          await appCommon.Searchbox("Start Proxy");
          await proxy.startProxy(HRPartner);
          await appCommon.MyTasks();

        }

        // await appCommon.MyTasks();
        Title = "Hire: " + givenName + " " + familyName;
        page.waitForTimeout(1000);
        await empInboxpage.clickInboxMyTaskAndSubmit(Title);
        await appCommon.SuccessEventHandle();

        empNum = data.EmployeeID;
        await appCommon.SearchboxEmp("Start Proxy");
        await proxy.startProxy(empNum.toString());
        //await appCommon.ClickInbox();
        await appCommon.MyTasks();

        await empInboxpage.onBoardingGuide();
        await appCommon.SuccessEventHandle();

        await empInboxpage.empaddPhoto();
        await appCommon.SuccessEventHandle();

        await empInboxpage.clickInboxMyTaskAndSubmit("Change/Update My Government IDs");
        await appCommon.SuccessEventHandle();

        await empInboxpage.clickInboxMyTaskAndSubmit("Change/Update My Contact Information");
        await appCommon.SuccessEventHandle();

        await empInboxpage.clickInboxMyTaskAndSubmit("Change Display Language (Belgium):");
        await appCommon.SuccessEventHandle();

        await empInboxpage.clickInboxMyTaskAndSubmit("Change/Update My Personal Information");
        await appCommon.SuccessEventHandle();

        await empInboxpage.AddEmergecyInformation();
        await appCommon.SuccessEventHandle();

        await empInboxpage.clickInboxMyTaskAndSubmit("Add Bank Details");
        await appCommon.SuccessEventHandle();

        await empInboxpage.reviewDocumentSubmitGeneric();
        await appCommon.SuccessEventHandle();

        await appCommon.MyTasks();
        await empInboxpage.setPartnerRevenueBelgiumDependents(data.PartnerRevenue);
        await appCommon.SuccessEventHandle();

        await appCommon.Searchbox("Start Proxy");
        await proxy.startProxy(HRPartner);
        //await appCommon.ClickInbox();
        await appCommon.MyTasks();

        // await hrInbxPage.clickInboxMyTaskAndApprove("Payment Election:");
        // await capObj.checkForScreenErrors();
        // await appCommon.SuccessEventHandle();

        const HRPartner1 = await appCommon.getHRpartnerIDFromEmployeeWorkerHistory(empNum, "Assign Pay Group for Hire:");
        //// await appCommon.refreshInbox();

        if (HRPartner !== HRPartner1) {
          await appCommon.Searchbox("Start Proxy");
          await proxy.startProxy(HRPartner1);
        }

        // await appCommon.ClickInbox();
        await appCommon.MyTasks();

        await hrInbxPage.assignPayGroupApprove(String(data.ProposedPayGroupFinal));
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        Title = "Add Education: Hire: " + givenName + " " + familyName;
        await empInboxpage.clickInboxMyTaskAndSubmit(Title);
        await appCommon.SuccessEventHandle();

        Title = "Change of reporting line manager after hire: Hire: " + givenName + " " + familyName;
        await empInboxpage.clickInboxMyTaskAndSubmit(Title);
        await appCommon.SuccessEventHandle();

        //await appCommon.SuccessEventHandle();
        await appCommon.SearchClickLink(empNum)
        await appCommon.assignPaygroupValidation(String(data.ProposedPayGroupFinal));
        // Write the results to the Excel file
        writeErrorToExcel(excelFilePath, sheetName, index, 'N/A', 'Passed');
        empNum = "";

      } catch (error) {
        console.error(`Test failed for ${givenName} ${familyName}:`, error);
        if ((await captureErrors.getUpdateError()) == undefined) {
          let error1 = "Test failed for '" + givenName + " " + familyName + "' Employee:{" + empNum + "}" + error.toString();
          //   // Write the failure status to the Excel file
          writeErrorToExcel(excelFilePath, sheetName, index, error1, 'Failed');
          empNum = "";
        }
      }

    });
  });
}



