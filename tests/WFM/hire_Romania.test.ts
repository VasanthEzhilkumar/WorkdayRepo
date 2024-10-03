import test from '@lib/BaseTest';
import { excelToJson, getExcelFilePath } from '@lib/ExceltoJsonUtil';
import { employeeInboxPage } from '@pages/employeeInboxpage';
import { HrInboxPage } from '@pages/hrInboxPage';
import ExcelJS from 'exceljs';
import path from 'path';
import { generateUniqueString, writeUniqueNamesToExcel, writeResultsToExcel } from '@lib/ExcelUtils';
import { generateRandomName } from 'utils/functional/utils';
import { homePageRomania } from '@pages/RomaniaPages/homePageRomania';


let empNum: string;

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
    const { givenName, familyName }  = generateRandomName();
    

    test(`@Hire Employee - Test ${index + 1} `, async ({ page, context, login, home, hireEmployee, appCommon, proxy }) => {
      try {
        await page.setViewportSize({ width: 1918, height: 1038 });
        const empInboxpage = new employeeInboxPage(page, givenName, familyName, jobProfile, context);
          const hrInbxPage = new HrInboxPage(page, givenName, familyName, context);
          const homePageRon = new homePageRomania(page,context)

        console.log(`Starting Test for Hire  ${givenName} ${familyName}`);

        writeUniqueNamesToExcel(excelFilePath, sheetName, index, givenName, familyName)
        
        const username = "90001655";
        const password = "Primark123!!";
        await login.goto("Slovakia");
        await login.sigIn(username, password);

          if (data.Profile.includes("Managre"))
          {
              
              // Run Code for create poistion

              //Update the Poition name in Excel
              //writeData Excel
          }

        await home.searchHireEmployee();

        await hireEmployee.searchSupervisoryOrganization(data.SupervisoryOrganisation, givenName);
        await hireEmployee.legalNameInformation(givenName, familyName);
        await hireEmployee.contactInformationpage();
        await hireEmployee.contactInformationPhone(data.PhoneNumber, data.PhoneDevice, data.Type);
        await homePageRon.contactInformationAddress(data.Street, data.PostalCode, data.City, data.County, data.Type);
        await hireEmployee.contactInformationEmail(data.EmailAddress, data.Type);
        await hireEmployee.okHireButton();
        await hireEmployee.hireEmployeeJobDetails(
          data.HireDate,
          data.EmployeeType,
          data.JobProfile,
          data.TimeType,
          data.WorkShift,
          data.AdditionalJobClassifications,
          data.Position,
          data.ScheduledWeeklyHours
        );
        await appCommon.SuccessEventHandle();
        await appCommon.MyTasks();

        

        await empInboxpage.assignDeparment(data.DepartmentSection, givenName, familyName);
        await empInboxpage.assigncostCenter(data.CostCenter)
        await appCommon.SuccessEventHandle();

        const HRPartner = await appCommon.clickHRPartnerLink(givenName, familyName);

        await appCommon.Searchbox("Start Proxy");
        await proxy.startProxy(HRPartner);
        await appCommon.ClickInbox();

        await hrInbxPage.EnterGovID(data.Country1, data.NationalIDType1, data.NIDPersonal, "", "", "", "", "", "", "");
        await appCommon.refreshInbox();
        await appCommon.SuccessEventHandle();

        await hrInbxPage.hrcontractsubmit(data.ContractType, data.Status, data.DateEmployeeSigned, data.DateEmployerSigned, data.ContractEndDate, data.ContractReason);
        await appCommon.SuccessEventHandle();
        await appCommon.refreshInbox();
        await hrInbxPage.hrHireAdditionalDataDependentSK(data.MealVoucher, data.HealthInsuranceType);
        
        await appCommon.SuccessEventHandle();
        await hrInbxPage.hrHireAdditionalDataSK(data.MealVoucher, data.HealthInsuranceType);
        await appCommon.SuccessEventHandle();

        // await hrInbxPage.hrManageProbation(data.ProbationReviewDate);
        // await appCommon.SuccessEventHandle();
        // await appCommon.refreshInbox();

        await hrInbxPage.hrProposeCompensationHire();
        await appCommon.SuccessEventHandle();
        await appCommon.refreshInbox();
        await appCommon.SuccessEventHandle();
        const empNum = await hrInbxPage.hrgetemployeenumber();
        console.log(empNum, givenName, familyName);
        await appCommon.SuccessEventHandle();
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
        // Write the failure status to the Excel file
        writeResultsToExcel(excelFilePath, sheetName, index, error, 'Failed');
      }
      
    });
  });
}



