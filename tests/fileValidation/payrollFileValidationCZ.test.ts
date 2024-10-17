import {compareData, compareWorkerData, compareXMLWithExcel, readExcel, readXML } from "@lib/fileComparison";
import test from '@lib/BaseTest';
import { excelToJson, getExcelFilePath } from '@lib/ExceltoJsonUtil';
import { employeeInboxPage } from '@pages/employeeInboxpage';
import { HrInboxPage } from '@pages/hrInboxPage';
import ExcelJS from 'exceljs';
import path from 'path';
import { generateUniqueString, writeUniqueNamesToExcel, writeResultsToExcel } from '@lib/ExcelUtils';
import { generateRandomName } from 'utils/functional/utils';


let empNum: string;

// Define the relative directory path to your Excel file
const excelFileName = 'testData.xlsx';
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
    
    // const excelFilePath = ('H:/WorkDaySuite_Playwright/Data/testData.xlsx');
    // const xmlFilePath = ('C:/Users/vezhil/Downloads/TEST_Primark_UK_200920240150 (UK Staff Group 30).xml');

    test(`@Hire Employee - Test ${index + 1} `, async ({ page, context, login, home, hireEmployee, appCommon, proxy, fileValidationCZ }) => {
      try {
        // await page.setViewportSize({ width: 1918, height: 1038 });
        //  await page.setViewportSize({ width: 1910, height: 1036 });
        //  await page.evaluate("document.body.style.zoom=0.75");
        // await page.setViewportSize({ width: 1275, height: 592 });
        await page.setViewportSize({ width: 1375, height: 692 });
        const empInboxpage = new employeeInboxPage(page, givenName, familyName, jobProfile, context);
        const hrInbxPage = new HrInboxPage(page, givenName, familyName, context);

        console.log(`Starting Test for Hire  ${givenName} ${familyName}`);

        writeUniqueNamesToExcel(excelFilePath, sheetName, index, givenName, familyName)
        
        const username = "90002710";
        const password = "Primark@12345!";
        await login.goto("Slovakia");
        await login.sigIn(username, password);

        await fileValidationCZ.searchIntegrationTitle();
        // await fileValidationCZ.clickMoreCategories();
        await fileValidationCZ.launchCZIntegration();
        await fileValidationCZ.setIntegrationCriteria();
        await fileValidationCZ.downloadXML();

        } catch (error) {
          console.error(`Test failed for ${givenName} ${familyName}:`, error);
          // Write the failure status to the Excel file
          writeResultsToExcel(excelFilePath, sheetName, index, error, 'Failed');
        }




      // const excelFilePath = ('C:/Users/vezhil/Downloads/Workday_NewHire_UK_TestData.xlsx');
      // const xmlFilePath = ('C:/Users/vezhil/Downloads/TEST_Primark_UK_200920240150 (UK Staff Group 30).xml');

      try {
          // const excelData = await readExcel(excelFilePath);
          // const xmlData = await readXML(xmlFilePath);

          // compareWorkerData(xmlData, excelData);
      } catch (error) {
          console.error('Error processing files:', error);
      }
    });
  });
}