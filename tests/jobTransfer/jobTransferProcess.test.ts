import test from '@lib/BaseTest';

import { excelToJson, getExcelFilePath } from '@lib/ExceltoJsonUtil';
import { writeResultsToExcel } from '@lib/ExcelUtils';
import { employeeCareerPage } from '@pages/employeeCareerPage';
import { throws } from 'assert';
import { error } from 'console';


let empManager: string;
let empName: string;
let errorMsg: string;


// Define the relative directory path to your Excel file
const excelFileName = 'Slovenia  795 JTS Automation File.xlsx';
const excelFilePath = getExcelFilePath(excelFileName);

// Convert the Excel sheets to JSON format
const sheetsJson = excelToJson(excelFilePath);

// test.use({ viewport: { width: 1920, height: 1080 } }); 

// Group the data by EmpID

// Iterate over each dataset and run the test
for (const sheetName in sheetsJson) {
    const dataSet = sheetsJson[sheetName];


    dataSet.forEach((data, index) => {

        //const { givenName, familyName } = generateRandomName();

        test(`@Hire Employee - Test ${index + 1} `, async ({ page, context, login, home, appCommon, proxy }) => {
            try {
                await page.setViewportSize({ width: 1280, height: 995 });
                const empCareerPage = new employeeCareerPage(page, context);

                const username = "90001655";
                const password = "Vasanth2025!";
                await login.goto("Romania");

                // login into application 
                await login.sigIn(username, password);

                await appCommon.Searchbox("Start Proxy");
                await proxy.startProxy(data.HRPartner);
                // search Hire employee on Home Page after login
                await home.searchEmp(data.EmployeeID);
                //console.log(`HR Partner: ${ empManager } `)

                empName = await home.getEmpName(data.EmployeeID);
                errorMsg = await empCareerPage.addEmpCertification(data.Job);
                if (errorMsg !== undefined && errorMsg !== null && errorMsg !== '') {
                    new throws(error);
                }

                empManager = await empCareerPage.getEmpManager();
                await appCommon.SuccessEventHandle();

                if (empManager !== undefined && empManager !== null && empManager !== '') {
                    // await appCommon.Searchbox("Stop Proxy");
                    // await proxy.stopproxy();
                    await appCommon.Searchbox("Start Proxy")
                    await proxy.startProxy(empManager);
                    await appCommon.ClickInbox();
                    await empCareerPage.approveCertification(empName);
                    writeResultsToExcel(excelFilePath, sheetName, index, data.EmployeeID, 'Passed');
                } else {
                    writeResultsToExcel(excelFilePath, sheetName, index, data.EmployeeID, 'Passed');
                }



            } catch (error) {
                    //   // Write the failure status to the Excel file
                    writeResultsToExcel(excelFilePath, sheetName, index, data.EmployeeID, 'Failed -' + errorMsg);

            }

        });
    });
}

