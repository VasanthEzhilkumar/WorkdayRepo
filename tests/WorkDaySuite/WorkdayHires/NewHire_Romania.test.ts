import test from '@lib/BaseTest';

import { excelToJson, getExcelFilePath } from '@lib/ExceltoJsonUtil';
import { employeeInboxPage } from '@pages/employeeInboxpage';
import { HrInboxPage } from '@pages/hrInboxPage';
import ExcelJS from 'exceljs';
import path from 'path';
import { generateUniqueString, writeUniqueNamesToExcel, writeResultsToExcel } from '@lib/ExcelUtils';
import { generateRandomName } from 'utils/functional/utils';
import { homePageRomania } from '@pages/RomaniaPages/homePageRomania';
import { jobDetailsPage } from '@pages/RomaniaPages/jobDetailsPage_Romania'
import { GovernmentsIDPageRomania } from '@pages/RomaniaPages/GovernmentIDsRomaniaPage'
import { MaintainContractPage } from '@pages/CommonPages/MaintainContractPage'
import { HireAdditionalData } from '@pages/CommonPages/HireAdditionalDataPage'
import { error } from 'console';
import { CaptureAlertErrors } from '@lib/CaptureErrors';
import { expect } from '@playwright/test';


let empNum: string;
let capObj: CaptureAlertErrors;


// Define the relative directory path to your Excel file
const excelFileName = 'testDataRomania.xlsx';
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
        await page.setViewportSize({ width: 1275, height: 592 });
        // await page.evaluate(() => {
        //   document.body.style.transform = 'scale(0.50)'; // 150% zoom
        //   document.body.style.transformOrigin = '0 0'; // Set origin for scaling
        // });

        // const givenName: string = "Ursula";
        // const familyName: string = "Sporer";

        // const givenName: string = "Tressa";
        // const familyName: string = "Boehm";

        const empInboxpage = new employeeInboxPage(page, givenName, familyName, jobProfile, context);
        const hrInbxPage = new HrInboxPage(page, givenName, familyName, context);
        const homePageRon = new homePageRomania(page, context)
        const jobDetailsPageObj = new jobDetailsPage(page, context)
        const governemntIDs = new GovernmentsIDPageRomania(page, givenName, familyName, context);
        const contractObj = new MaintainContractPage(page, givenName, familyName, context)
        capObj = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index)
        const hireAdditionalData = new HireAdditionalData(page, givenName, familyName, context)
        //  test.step('Starting Test for Hire ${givenName} ${familyName}', async () => {

        console.log(`Starting Test for Hire  ${givenName} ${familyName}`);

        writeUniqueNamesToExcel(excelFilePath, sheetName, index, givenName, familyName)

        const username = "90001655";
        const password = "Primark123!!";
        await login.goto("Romania");

        // login into application 
        await login.sigIn(username, password);

        // if (data.Profile.includes("Manager")) {

        // Run Code for create poistion

        //Update the Poition name in Excel
        //writeData Excel
        // }
        // });
        // search Hire employee on Home Page after login
        await home.searchHireEmployee();

        // set Supervisisroy Organazation 
        await hireEmployee.searchSupervisoryOrganization(data.SupervisoryOrganisation, givenName);

        await hireEmployee.legalNameInformation(givenName, familyName);
        await hireEmployee.contactInformationpage();
        await hireEmployee.contactInformationPhone(data.PhoneNumber, data.PhoneDevice, data.Type);
        await homePageRon.contactInformationAddress(data.Street, data.PostalCode, data.City, data.County, data.Type, data.buildingNumber);
        await hireEmployee.contactInformationEmail(data.EmailAddress, data.Type);
        await hireEmployee.okHireButton(); /// should be inside or on page level
        await jobDetailsPageObj.genericJobDetails(
          data.HireDate,
          data.EmployeeType,
          data.JobProfile,
          data.TimeType,
          data.WorkShift,
          data.AdditionalJobClassifications,
          data.Position,
          data.ScheduledWeeklyHours,
          data.defaultHours,
          data.location
        );

        await appCommon.SuccessEventHandle();
        await appCommon.MyTasks();

        await empInboxpage.setDeparmentAndCostCenter(data.CostCenter, data.DepartmentSection, givenName, familyName);
        // //await empInboxpage.setCostCenter(data.CostCenter);
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();
        // //await appCommon.MyTasks();
        // await appCommon.ClickInbox();
        // await capObj.checkForScreenErrors();

        const HRPartner = await appCommon.getHRpartnerID(givenName, familyName);

        await appCommon.Searchbox("Start Proxy");
        await proxy.startProxy(HRPartner);
        await appCommon.ClickInbox();
        await appCommon.MyTasks();
        await capObj.checkForScreenErrors();
        //fill Government IDs  Details for Employee
        await governemntIDs.setGovernmentIDsRomania(data.Country1, data.Country2, data.NationalIDType1,
          data.NationalIDType2, data.DepartmentSection1, data.DepartmentSection2, data.IssuedDate1, data.IssuedDate2,
          data.ExpirationDate1, data.ExpirationDate2, data.IssuedBy2, data.series2);
        await capObj.checkForScreenErrors();
        // await appCommon.refreshInbox();
        await appCommon.SuccessEventHandle();

        //fill Contract Details for Employee
        await contractObj.setContractDetailsRomania(data.ContractType, data.Status, data.DateEmployeeSigned, data.DateEmployerSigned, data.ContractEndDate, data.ContractReason);
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();
        // await appCommon.refreshInbox();

        await hireAdditionalData.setHireAdditionalInfoDataRomania(data.HealthHouse, data.MealVoucher, data.Pensioner
          , data.pensioner, data.NegotiatedLeave);
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();
        await hireAdditionalData.setDependentAdditionalInfoRomania();
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();

        await hrInbxPage.setManageProbation(data.ProbationReviewDate);
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();
        //await appCommon.refreshInbox();

        await hrInbxPage.hrProposeCompensationHire();
        await capObj.checkForScreenErrors();
        await appCommon.SuccessEventHandle();
        // await appCommon.refreshInbox();
        await appCommon.SuccessEventHandle();

        await hrInbxPage.clickEditNoticePeriodsforHireSubmit()
        await capObj.checkForScreenErrors();
        const empNum = await hrInbxPage.getEmployeeIDFromEditNoticePeriodPage();
        
        console.log("Emplyoee ID : "+ empNum+" "+ givenName+" "+ familyName);
        await appCommon.ClickInbox();
        await appCommon.Searchbox("Stop Proxy");
        await proxy.stopproxy();

        await appCommon.SearchboxEmp("Start Proxy");
        await proxy.startProxy(empNum);
        await appCommon.ClickInbox();

        await empInboxpage.onBoardingGuide();
        await appCommon.SuccessEventHandle();
        await empInboxpage.empaddPhoto();
        await appCommon.SuccessEventHandle();

        await empInboxpage.changePersonalInformation(data.DateOfBirth, data.CityOfBirth, data.MaritalStatus, data.CitizenshipStatus, data.PrimaryNationality);
        await capObj.checkForScreenErrors();
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
        await appCommon.ClickInbox();

        await hrInbxPage.updateWorkerContactInfo();
        await appCommon.SuccessEventHandle();

        await appCommon.Searchbox(empNum)
        await empInboxpage.empaddBankDetails(data.BankName, data.BankCode, data.AccountNumber, data.IBAN);
        await appCommon.ClickInbox();
        await hrInbxPage.addWorkerBankDetails();
        await appCommon.SuccessEventHandle();

        await hrInbxPage.changePersonalInformation();
        await appCommon.SuccessEventHandle();
        await appCommon.refreshInbox();

        await hrInbxPage.updatePassportsAndVisa();
        await appCommon.SuccessEventHandle();
        await appCommon.refreshInbox();
        await hrInbxPage.assignPayGroupSubmit(data.PayGroup);
        await appCommon.SuccessEventHandle();
        await appCommon.ClickInbox();

        await appCommon.Searchbox("Stop Proxy");
        await proxy.stopproxy();

        await page.waitForTimeout(3000);

        // Write the results to the Excel file
        writeResultsToExcel(excelFilePath, sheetName, index, empNum, 'Passed');

      } catch (error) {
        console.error(`Test failed for ${givenName} ${familyName}:`, error);
        if ((await capObj.getUpdateError()) == undefined) {
          //    // let error1 = "Test failed for '" + givenName + " " + familyName + "' Employee:" + err.toString();
          //   // Write the failure status to the Excel file
          writeResultsToExcel(excelFilePath, sheetName, index, error, 'Failed');
        }


      }

    });
  });
}
