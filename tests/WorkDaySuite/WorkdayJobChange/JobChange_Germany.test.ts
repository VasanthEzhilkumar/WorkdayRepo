// import test from '@lib/BaseTest';

// import { CaptureAlertErrors } from '@lib/CaptureErrors';
// import { excelToJson, getExcelFilePath } from '@lib/ExceltoJsonUtil';
// import { writePositionToExcel, writeResultsToExcel } from '@lib/ExcelUtils';
// import { HireAdditionalData } from '@pages/CommonPages/HireAdditionalDataPage';
// import { JobDetailsPage } from '@pages/CommonPages/JobDetailsPage';
// import { MaintainContractPage } from '@pages/CommonPages/MaintainContractPage';
// import { ProposeCompensationPage } from '@pages/CommonPages/ProposeCompensationPage';
// import { createPositionPage } from '@pages/createPositionpage';
// import { employeeInboxPage } from '@pages/employeeInboxpage';
// // import { ContactInformationAddressGermany } from '@pages/GermanyPages/ContactInformationAddressGermany';
// // import { GovernmentsIDPageGermany } from '@pages/GermanyPages/GovernmentIDsGermanyPage';
// import { HrInboxPage } from '@pages/hrInboxPage';
// //import { generateRandomName } from 'utils/functional/utils';
// import { JobChangePage } from '@pages/JobChangePage';



// let empNum: string;
// let position: string;
// let capObj: CaptureAlertErrors;


// // Define the relative directory path to your Excel file
// const excelFileName = 'JobChange/Workday_JobChange_Germany.xlsx';
// const excelFilePath = getExcelFilePath(excelFileName);

// // Convert the Excel sheets to JSON format
// const sheetsJson = excelToJson(excelFilePath);

// // test.use({ viewport: { width: 1920, height: 1080 } }); 
// // Iterate over each dataset and run the test
// for (const sheetName in sheetsJson) {
//   const dataSet = sheetsJson[sheetName];

//   dataSet.forEach((data, index) => {
//     //  const givenName = givenName || `GivenName_${index + 1}`;
//     //  const familyName = familyName || `FamilyName_${index + 1}`;
//     //const jobProfile = data.JobProfile || `JobProfile_${index + 1}`;
//     //const { givenName, familyName } = generateRandomName();

//     const givenName = data.GivenName;
//     const familyName = data.FamilyName;
//     const jobProfile = data.ChangeJob_JobProfile;
//     // const givenName: string = "Gussie";
//     // const familyName: string = "Stanton";
//     // if (data.TestStatus != 'Passed') {


//     const JobChangeProcess = data.Process;

//     let boolJobChangeViewable = false;

//     const startEffectiveDateStr = data.ChangeJob_Start_EffectiveDate;



//     test(`@JobChange - Test ${index + 1} `, async ({ page, context, login, home, hireEmployee, appCommon, proxy }) => {
//       try {
//         await page.setViewportSize({ width: 1280, height: 650 });

//         const empInboxpage = new employeeInboxPage(page, givenName, familyName, jobProfile, context);
//         const hrInbxPage = new HrInboxPage(page, givenName, familyName, context);
//         const proposeCompensation = new ProposeCompensationPage(page, givenName, familyName, context);
//         const homePageRon = new ContactInformationAddressGermany(page, context);
//         const jobDetailsPage = new JobDetailsPage(page, context);
//         const jobChangePage = new JobChangePage(page, context);
//         const governemntIDs = new GovernmentsIDPageGermany(page, givenName, familyName, context);
//         const contractObj = new MaintainContractPage(page, givenName, familyName, context)
//         capObj = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index);
//         const hireAdditionalData = new HireAdditionalData(page, givenName, familyName, context)
//         const createPostition = new createPositionPage(page);

//         console.log(`Starting JobChange  ${process} ${data.Proxy_EmployeeID}`);
//         //writeUniqueNamesToExcel(excelFilePath, sheetName, index, givenName, familyName)

//         const username = "90003482";
//         const password = "Prasad2025!";

//         // initlize the web environment 
//         await login.goto("Germany");

//         // login into application 
//         await login.sigIn(username, password);

//         // // create position for Management hires
//         if (data.Process.toString().includes("Manager")) {
//           await appCommon.SearchClickLink("Create Position");
//           //await hireEmployee.searchSupervisoryOrganizationMgr(data.SupervisoryOrganisation);
//           await hireEmployee.searchSupervisoryOrganizationGermany(data.SupervisoryOrganisation);
//           position = await createPostition.createPositionForManager(data.HireDate, data.HireDate, data.EmployeeType, data.JobProfile, data.TimeType, data.Location);
//           await capObj.checkForScreenErrors();
//           await appCommon.SuccessEventHandle();
//           await appCommon.MyTasks();
//           //passing position created for selecting exact task from My Task (inbox).
//           await empInboxpage.setDeparmentAndCostCenter(position, data.CostCenter, data.DepartmentSection, givenName, familyName);
//           await capObj.checkForScreenErrors();
//           await appCommon.SuccessEventHandle();
//           // Write the results to the Excel file
//           writePositionToExcel(excelFilePath, sheetName, index, position, 'Position');
//           await appCommon.MyTasks();
//         } else {
//           position = "DummyValue";
//         }

//         //searchEmp(strEmp: any)  

//         await appCommon.Searchbox("Start Proxy");
//         await proxy.startProxy("10697347");

//         await appCommon.SearchClickLink(data.Proxy_EmployeeID.toString());

//         await empInboxpage.goToJobChange();

//         await jobChangePage.editStartDetails(data.ChangeJob_Start_EffectiveDate.toString(), data.ChangeJob_Start_Reason.toString());


//         await capObj.checkForScreenErrors();

//         await jobChangePage.editJobProfile(data.ChangeJob_JobProfile.toString());
//         await capObj.checkForScreenErrors()

//         await jobChangePage.editLocationDetails();
//         await capObj.checkForScreenErrors()
//         await jobChangePage.editAdminDetails();
//         await capObj.checkForScreenErrors()
//         await jobChangePage.editOrganizationDetails();
//         await capObj.checkForScreenErrors()
//         await jobChangePage.ReviewSummarySubmit();
//         await capObj.checkForScreenErrors()
//         await appCommon.SuccessEventHandleJobChange();


















//         //await home.searchEmp(data.Proxy_EmployeeID);
//         writeResultsToExcel(excelFilePath, sheetName, index, empNum, 'Passed');
//         // await appCommon.tearDown();
//       } catch (error) {
//         console.error(`Test failed for ${givenName} ${familyName}:`, error);
//         if ((await capObj.getUpdateError()) == undefined) {
//           let error1 = "Test failed for '" + givenName + " " + familyName + "' Employee:{" + empNum + "}" + error.toString();
//           //   // Write the failure status to the Excel file
//           writeResultsToExcel(excelFilePath, sheetName, index, error1, 'Failed');
//           empNum = "";
//         }
//       }
//     });

//     // test.afterEach(`Tear down ${test.name}`, async ({ page, context})=>{
//     //   await new appCommons(page, context).tearDown();
//     // });

//   });
// }