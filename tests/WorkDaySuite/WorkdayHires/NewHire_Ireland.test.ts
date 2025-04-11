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
const excelFileName = 'testDataIreland.xlsx';
const excelFilePath = getExcelFilePath(excelFileName);

// Convert the Excel sheets to JSON format
const sheetsJson = excelToJson(excelFilePath);

for (const sheetName in sheetsJson) {
    const dataSet = sheetsJson[sheetName];

    dataSet.forEach((data, index) => {
        //  const givenName = givenName || `GivenName_${index + 1}`;
        //  const familyName = familyName || `FamilyName_${index + 1}`;
        const jobProfile = (data.JobProfile || `JobProfile_${index + 1}`).trim();
        const { givenName, familyName } = generateRandomName();
        //const givenName = data.GivenName;
        //const familyName = data.FamilyName
        test(`@Hire Employee - Test ${index + 1} `, async ({ page, context, login, home, hireEmployee, appCommon, proxy }) => {
            try {
                //await page.setViewportSize({ width: 1280, height: 600 });
                await page.setViewportSize({ width: 1275, height: 595 });

                const empInboxpage = new employeeInboxPage(page, givenName, familyName, jobProfile, context);
                const hrInbxPage = new HrInboxPage(page, givenName, familyName, context);
                const proposeCompensation = new ProposeCompensationPage(page, givenName, familyName, context);
                const homePageRon = new contactInformationAddressCzechia(page, context)
                const jobDetailsPageObj = new JobDetailsPage(page, context)
                const governemntIDs = new GovernmentsIDPageCzechia(page, givenName, familyName, context);
                capObj = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index)
                //const hireAdditionalData = new HireAdditionalData(page, givenName, familyName, context)
                const createPostition = new createPositionPage(page);
                console.log(`Starting Test for Hire  ${givenName} ${familyName}`);
                writeUniqueNamesToExcel(excelFilePath, sheetName, index, givenName, familyName)
                /*Login creds for PK17*/
                const username = "90002196";
                const password = "Wizos2025!";

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
                await hireEmployee.legalNameInformationBelgium(data.Prefix, givenName, familyName,"NaN");
                await hireEmployee.contactInformationpage();
                await hireEmployee.contactInformationPhone(data.PhoneNumber, data.PhoneDevice, data.Type);
                await homePageRon.contactInformationAddressIreland(
                    data.AdressLine1,
                    data.AdressLine2,
                    data.City,
                    data.PostalCode,
                    data.County,
                    data.Type,
                    data.UseFor
                );
                await hireEmployee.contactInformationEmail(data.EmailAddress, data.Type);
                await hireEmployee.okHireButton();
                await capObj.checkForScreenErrors();

                await jobDetailsPageObj.setJobDetails(
                    data.HireDate,
                    data.EmployeeType.trim(),
                    String(data.JobProfile).trim(),
                    data.TimeType,
                    data.WorkShift,
                    String(data.AdditionalJobClassifications),
                    position,
                    data.ScheduledWeeklyHours,
                    data.DefaultWeeklyHours,
                    data.Location,
                    data.EndEmploymentDate,
                    data.PayRateType
                );
                await capObj.checkForScreenErrors();
                await appCommon.SuccessEventHandle();
                await appCommon.MyTasks();

                await empInboxpage.setDeparmentAndCostCenter("position", data.CostCenter, data.DepartmentSection, givenName, familyName);
                await capObj.checkForScreenErrors();
                await appCommon.SuccessEventHandle();

                const HRPartner = await appCommon.getHRpartnerID(givenName, familyName);
                await appCommon.Searchbox("Start Proxy");
                await proxy.startProxy(HRPartner);
                await appCommon.MyTasks();

                //Probation Date Details for Employee
                await appCommon.MyTasks();
                await hrInbxPage.setManageProbation(data.ProbationEndDate, "NaN");
                await appCommon.SuccessEventHandle();

                await appCommon.MyTasks();
                await proposeCompensation.setProposeCompensationHire(data.GradeProfile, data.Step, data.Salary, "NaN", data.AllowanceAmount);
                await capObj.checkForScreenErrors();

                //await appCommon.SuccessEventHandle();
                empNum = await hrInbxPage.getEmployeeID();
                console.log("Emplyoee ID : " + empNum + " " + givenName + " " + familyName);

                // empNum = String(data.EmployeeID);
                await appCommon.SearchboxEmp("Start Proxy");
                await proxy.startProxy(empNum);

                await appCommon.MyTasks();
                await page.waitForTimeout(5000);
                await appCommon.MyTasks();
                await empInboxpage.onBoardingGuide();
                await appCommon.SuccessEventHandle();
                await appCommon.MyTasks();
                await empInboxpage.empaddPhoto();
                await appCommon.SuccessEventHandle();

                await appCommon.MyTasks();
                await empInboxpage.addEmployeeBankDetails(data.BankName, data.BankIdentificationCode, "NaN", String(data.IBAN), data.AccountType, "NaN", "NaN");
                await capObj.checkForScreenErrors();
                await appCommon.SuccessEventHandle();

                await appCommon.MyTasks();
                await empInboxpage.clickInboxMyTaskAndSubmit("Change/Update My Contact Information");
                await appCommon.SuccessEventHandle();
                await empInboxpage.changePersonalInformation(data.Gender, data.DateOfBirth, data.CityOfBirth, data.MaritalStatus, data.MaritalStatusDate, "NaN", data.PrimaryNationality, data.CountryOfBirth, data.RegionOfBirth, data.RaceEthnicity, "NaN");
                await capObj.checkForScreenErrors();
                await appCommon.SuccessEventHandle();
                await empInboxpage.changepersonalinformationSubmit();
                await appCommon.SuccessEventHandle();

                //fill Government IDs  Details for Employee
                await appCommon.MyTasks();
                //await governemntIDs.EnterGovID(data.Country, data.NationalIDType1, data.AddEditID1, "NaN", "NaN");
                await governemntIDs.setGovernmentIDsUK(data.Country1, data.NationalIDType1, data.AddEditID1, data.IssuedDate1, data.ExpirationDate1);
                await capObj.checkForScreenErrors();
                await appCommon.SuccessEventHandle();
                await empInboxpage.changeGovIDInformation();
                await appCommon.SuccessEventHandle();

                await empInboxpage.AddEmergecyInformation();
                await appCommon.SuccessEventHandle();

                await appCommon.MyTasks();
                await empInboxpage.addCertificationSubmit();
                await appCommon.SuccessEventHandle();


                await empInboxpage.reviewDocumentSubmitGeneric();
                await appCommon.SuccessEventHandle();

                await appCommon.SearchboxEmp("Start Proxy");
                await proxy.startProxy(HRPartner);
                await appCommon.MyTasks();

                await hrInbxPage.clickInboxMyTaskAndSubmit("Verify nationality: Onboarding for");
                await capObj.checkForScreenErrors();
                await appCommon.SuccessEventHandle();

                await appCommon.MyTasks();
                await hrInbxPage.clickInboxMyTaskAndApprove("Personal Information Change:");
                await appCommon.SuccessEventHandle();

                await page.waitForTimeout(5000);
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
    });
}

