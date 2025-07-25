import test from '@lib/BaseTest';
import { CaptureAlertErrors } from '@lib/CaptureErrors';
import { excelToJson, getExcelFilePath } from '@lib/ExceltoJsonUtil';
import { writePositionToExcel, writeResultsToExcel, writeUniqueNamesToExcel } from '@lib/ExcelUtils';
import { JobDetailsPage } from '@pages/CommonPages/JobDetailsPage';
import { MaintainContractPage } from '@pages/CommonPages/MaintainContractPage';
import { ProposeCompensationPage } from '@pages/CommonPages/ProposeCompensationPage';
import { createPositionPage } from '@pages/createPositionpage';
import { GovernmentsIDPageCzechia } from '@pages/CzechiaPages/GovernmentIDsCzechiaPage';
import { employeeInboxPage } from '@pages/employeeInboxpage';
import { HrInboxPage } from '@pages/hrInboxPage';
import { contactInformationAddressPoland } from '@pages/PolandPages/contactInformationAddressPoland';
import { generateRandomName } from 'utils/functional/utils';


let empNum: string;
let position: string;
let captureErrors: CaptureAlertErrors;

// Define the relative directory path to your Excel file
const excelFileName = 'Hires/testDataNetherland6.xlsx';
const excelFilePath = getExcelFilePath(excelFileName);

// Convert the Excel sheets to JSON format
const sheetsJson = excelToJson(excelFilePath);

// Iterate over each dataset and run the test
for (const sheetName in sheetsJson) {
    const dataSet = sheetsJson[sheetName];

    dataSet.forEach((data, index) => {
        if (data.TestStatus !== "Passed") {
            const jobProfile = data.JobProfile || `JobProfile_${index + 1}`;
            const { givenName, familyName } = generateRandomName();

            test(`@HirePK6 Employee - Test ${index + 1} `, async ({ page, context, login, home, hireEmployee, appCommon, proxy }) => {
                try {
                    await page.setViewportSize({ width: 1275, height: 595 });//
                    const empInboxpage = new employeeInboxPage(page, givenName, familyName, jobProfile, context);
                    const hrInbxPage = new HrInboxPage(page, givenName, familyName, context);
                    const homePagePoland = new contactInformationAddressPoland(page, context);
                    const proposeCompensation = new ProposeCompensationPage(page, givenName, familyName, context);
                    const createPostition = new createPositionPage(page);
                    const jobDetailsPage = new JobDetailsPage(page, context)
                    captureErrors = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index);
                    const contractObj = new MaintainContractPage(page, givenName, familyName, context);
                    const capObj = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index);
                    const governemntIDs = new GovernmentsIDPageCzechia(page, givenName, familyName, context);
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
                    await hireEmployee.legalNameInformationBelgium(data.Prefix, givenName, familyName, data.Initials);
                    await hireEmployee.contactInformationpage();
                    await hireEmployee.contactInformationPhone(data.PhoneNumber, data.PhoneDevice, data.Type);
                    await homePagePoland.contactInformationAddress(data.StreetName, data.HouseNumber, "NaN", "NaN", data.Province, data.PostalCode, data.City, data.Type, data.UseFor);
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
                    console.log('HR Parnter ID -' + HRPartner);
                    await appCommon.Searchbox("Start Proxy");
                    await proxy.startProxy(HRPartner);
                    await appCommon.MyTasks();



                    //fill Contract Details for Employee
                    await appCommon.staticWait(4);
                    await contractObj.setContractDetails(data.ContractType, data.Status, data.DateEmployeeSigned, data.DateEmployerSigned, data.ContractEndDate, data.ContractReason);
                    //Skip The Task
                    await hrInbxPage.PageHireSkipThisTask();
                    await captureErrors.checkForScreenErrors();
                    await appCommon.SuccessEventHandle();

                    //Select PayrollTaxDeductionNL
                    await hrInbxPage.SetPayrollTaxDeductionNL(data.PayrollTaxDeduction);
                    await captureErrors.checkForScreenErrors();
                    await appCommon.SuccessEventHandle();

                    //Select WW aansturing
                    await hrInbxPage.SetWWaansturing(data.WWAansturing);
                    await captureErrors.checkForScreenErrors();
                    await appCommon.SuccessEventHandle();

                    await proposeCompensation.setProposeCompensationHire(data.GradeProfile, data.Step, data.Salary, data.Country, "NaN");
                    await captureErrors.checkForScreenErrors();

                    //To start Employee Proxy
                    empNum = await hrInbxPage.getEmployeeID();
                    console.log("Emplyoee ID : " + empNum + " " + givenName + " " + familyName);
                    await appCommon.SearchboxEmp("Start Proxy");
                    await proxy.startProxy(empNum);
                    await page.waitForTimeout(5000);

                    await appCommon.MyTasks();
                    await page.waitForTimeout(5000);
                    await empInboxpage.onBoardingGuide();
                    await appCommon.SuccessEventHandle();

                    await appCommon.MyTasks();
                    await empInboxpage.verifyLegalNameSubmit();
                    await appCommon.SuccessEventHandle();

                    await appCommon.MyTasks();
                    await empInboxpage.empaddPhoto();
                    await appCommon.SuccessEventHandle();

                    await empInboxpage.addEmployeeBankDetails(data.BankName, data.BankIdentificationCode, "NaN", String(data.IBAN), data.AccountType, "NaN", data.NameOnAccount);
                    await capObj.checkForScreenErrors();
                    await appCommon.SuccessEventHandle();

                    await governemntIDs.setGovernmentIDsUK(data.Country1, data.NationalIDType1, data.AddEditID1, data.IssuedDate1, data.ExpirationDate1);
                    await empInboxpage.changeGovIDInformation();
                    await appCommon.SuccessEventHandle();

                    await empInboxpage.clickInboxMyTaskAndSubmit("Change/Update My Contact Information");
                    await appCommon.SuccessEventHandle();
                    await page.waitForTimeout(5000);
                    await empInboxpage.changePersonalInformationNetherland(data.Gender, data.DateOfBirth, data.CityOfBirth, data.CitizenshipStatus, data.PrimaryNationality, data.CountryOfBirth, data.RegionOfBirth);
                    await capObj.checkForScreenErrors();
                    await appCommon.SuccessEventHandle();
                    await page.waitForTimeout(5000);
                    await appCommon.MyTasks();
                    await empInboxpage.changepersonalinformationSubmit();
                    await appCommon.SuccessEventHandle();

                    await empInboxpage.AddEmergecyInformation();
                    await appCommon.SuccessEventHandle();

                    await empInboxpage.addCertificationNetherlandSubmit();
                    await appCommon.SuccessEventHandle();

                    await empInboxpage.reviewDocumentSubmitGeneric();
                    await appCommon.SuccessEventHandle();

                    await appCommon.SearchboxEmp("Start Proxy");
                    await proxy.startProxy(HRPartner);
                    await appCommon.MyTasks();

                    await appCommon.staticWait(10);
                    await hrInbxPage.setMaintainRightToWorkDocumentation()
                    await captureErrors.checkForScreenErrors();
                    await appCommon.SuccessEventHandle();

                    await hrInbxPage.assignPayGroupApprove(String(data.ProposedPayGroupFinal));
                    await capObj.checkForScreenErrors();

                    await appCommon.SearchClickLink(empNum)
                    await appCommon.assignPaygroupValidation(String(data.ProposedPayGroupFinal));
                    // Write the results to the Excel file
                    writeResultsToExcel(excelFilePath, sheetName, index, empNum, 'Passed');
                    //await appCommon.tearDown();
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
        }
    });
}
