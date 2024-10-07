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
                const empInboxpage = new employeeInboxPage(page, givenName, familyName, jobProfile, context);
                const hrInbxPage = new HrInboxPage(page, givenName, familyName, context);
                const homePageRon = new homePageRomania(page, context)
                const jobDetailsPageObj = new jobDetailsPage(page, context)
                const governemntIDs = new GovernmentsIDPageRomania(page, givenName, familyName, context);
                const contractObj = new MaintainContractPage(page, givenName, familyName, context)
                capObj = new CaptureAlertErrors(page, givenName, familyName, excelFilePath, sheetName, index)
                const hireAdditionalData = new HireAdditionalData(page, givenName, familyName, context)

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
                await home.searchEmp(data.Employee);
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

