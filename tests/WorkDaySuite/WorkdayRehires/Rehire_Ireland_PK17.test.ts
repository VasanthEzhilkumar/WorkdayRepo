import test from '@lib/BaseTest';
import { CaptureAlertErrors } from '@lib/CaptureErrors';
import { excelToJson, getExcelFilePath } from '@lib/ExceltoJsonUtil';
import { writeErrorToExcel, writePositionToExcel, writeUniqueNamesToExcel } from '@lib/ExcelUtils';
import { JobDetailsPage } from '@pages/CommonPages/JobDetailsPage';
import { MaintainContractPage } from '@pages/CommonPages/MaintainContractPage';
import { ProposeCompensationPage } from '@pages/CommonPages/ProposeCompensationPage';
import { createPositionPage } from '@pages/createPositionpage';
import { employeeInboxPage } from '@pages/employeeInboxpage';
import { EditPassportsAndVisasPage } from '@pages/EditPassportsAndVisasPage';
import { HrInboxPage } from '@pages/hrInboxPage';


let empNum: string;
let position: string;
let captureErrors: CaptureAlertErrors;
let givenName: string;
let familyName: string;

// Define the relative directory path to your Excel file
const excelFileName = 'Rehires/Workday_Rehire_Ireland_Regression_PK17.xlsx';
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
        // const { givenName, familyName } = generateRandomName();
        if (data.TestStatus !== "Passed") {

            test(`@Rehire Employee - Test ${index + 1} `, async ({ page, appCommon, context, login, home, hireEmployee, proxy }) => {
                try {
                    await page.setViewportSize({ width: 1280, height: 595 });
                    // initlize the web environment 
                    await login.goto("PK17");
                    const username = "90002196";
                    const password = "Wizos2025!";

                    // login into application 
                    await login.sigIn(username, password);
                    await appCommon.SearchClickLink(data.EmployeeID.toString());
                    [givenName, familyName] = await appCommon.getEmployeeGivenNameAndFamilyName(data.EmployeeID.toString());
                    await writeUniqueNamesToExcel(excelFilePath, sheetName, index, givenName, familyName);

                    console.log(`Starting Test for Rehire  ${givenName} ${familyName}`);

                    const empInboxpage = new employeeInboxPage(page, givenName, familyName, jobProfile, context);
                    const hrInbxPage = new HrInboxPage(page, givenName, familyName, context);
                    const proposeCompensation = new ProposeCompensationPage(page, givenName, familyName, context);
                    const createPostition = new createPositionPage(page);
                    const jobDetailsPage = new JobDetailsPage(page, context)
                    const editAndVissaPage = new EditPassportsAndVisasPage(page, givenName, familyName, context)
                    captureErrors = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index);
                    const contractObj = new MaintainContractPage(page, givenName, familyName, context);
                    const capObj = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index);
                    const jobDetailsPageObj = new JobDetailsPage(page, context)

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
                    const existingPrehire: string = givenName + " " + familyName;
                    await hireEmployee.searchSupervisoryOrganizationRehire(data.SupervisoryOrganisation, existingPrehire);
                    await jobDetailsPageObj.setJobDetails(
                        data.HireDate,
                        data.EmployeeType,
                       String(data.JobProfile).trim(),
                        data.TimeType,
                        data.WorkShift,
                        String(data.AdditionalJobClassifications),
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

                    //It will get HR partner ID for hr proxy
                    const HRPartner = await appCommon.getHRpartnerID(givenName, familyName);
                    await appCommon.Searchbox("Start Proxy");
                    await proxy.startProxy(HRPartner);
                    await appCommon.MyTasks();
                    await contractObj.setContractDetails(data.ContractType, data.Status, data.DateEmployeeSigned, data.DateEmployerSigned, data.ContractEndDate, data.ContractReason);
                    await appCommon.SuccessEventHandle();

                    await appCommon.MyTasks();
                    await page.waitForTimeout(1000);
                    await hrInbxPage.setManageProbation(data.ProbationEndDate, "NaN");
                    await appCommon.SuccessEventHandle();

                    //fill Contract Details for Employee
                    await appCommon.MyTasks();
                    await proposeCompensation.setProposeCompensationReHire(data.HireDate,"NaN", "NaN", data.Salary, data.Country, "NaN");
                    await captureErrors.checkForScreenErrors();

                    //To start Employee Proxy
                    empNum = await hrInbxPage.getEmployeeID();
                    console.log("Emplyoee ID : " + empNum + " " + givenName + " " + familyName);
                    await appCommon.SearchboxEmp("Start Proxy");
                    await proxy.startProxy(empNum);
                    await page.waitForTimeout(5000);

                    await appCommon.MyTasks();
                    await empInboxpage.onBoardingGuide();
                    await appCommon.SuccessEventHandle();

                    await empInboxpage.empaddPhoto();
                    await appCommon.SuccessEventHandle();

                    await empInboxpage.clickInboxMyTaskAndSubmit("Change/Update My Personal Information");
                    await appCommon.SuccessEventHandle();

                    await empInboxpage.clickInboxMyTaskAndSubmit("Change/Update My Government IDs");
                    await appCommon.SuccessEventHandle();

                    await empInboxpage.clickInboxMyTaskAndSubmit("Change/Update My Contact Information");
                    await appCommon.SuccessEventHandle();

                    await empInboxpage.reviewDocumentSubmitGeneric();
                    await appCommon.SuccessEventHandle();

                    await empInboxpage.addCertificationSubmit();
                    await appCommon.SuccessEventHandle();
                    await empInboxpage.clickInboxMyTaskAndSubmit("Add Bank Details");
                    await appCommon.SuccessEventHandle();
                    await empInboxpage.AddEmergecyInformation();
                    await appCommon.SuccessEventHandle();

                    await appCommon.Searchbox("Start Proxy");
                    await proxy.startProxy(HRPartner);
                    await appCommon.staticWait(2);
                    await appCommon.MyTasks();

                    await hrInbxPage.VerifyNationalityOnborading();
                    await appCommon.SuccessEventHandle();

                    await appCommon.staticWait(10);
                    await hrInbxPage.assignPayGroupApprove(String(data.ProposedPayGroupFinal));
                    await capObj.checkForScreenErrors();
                    await appCommon.SuccessEventHandle();

                    //await appCommon.SuccessEventHandle();
                    await appCommon.SearchClickLink(empNum)
                    await appCommon.assignPaygroupValidation(String(data.ProposedPayGroupFinal));

                    // Write the results to the Excel file
                    await writeErrorToExcel(excelFilePath, sheetName, index, 'N/A', 'Passed');
                    empNum = "";

                } catch (error) {
                    console.error(`Test failed for ${givenName} ${familyName}:`, error);
                    let error1 = "Test failed for '" + givenName + " " + familyName + "' Employee:{" + empNum + "}" + error.toString();
                    //   // Write the failure status to the Excel file
                    writeErrorToExcel(excelFilePath, sheetName, index, error1, 'Failed');
                    empNum = "";
                }

            });
        }
    });
}



