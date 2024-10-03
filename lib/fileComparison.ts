import { log } from 'console';
import * as fs from 'fs';
import * as xlsx from 'xlsx';
import { parseStringPromise } from 'xml2js';

// Function to read Excel file with multiple fields
export async function readExcel(filePath: string) {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[3]; // Reading the first sheet
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);
    return jsonData; // Returns an array of objects [{firstName: ..., lastName: ..., dob: ..., govId: ...}]
}

// Function to read and parse XML file
export async function readXML(filePath: string) {
    const xmlData = fs.readFileSync(filePath, 'utf-8');
    const parsedData = await parseStringPromise(xmlData);
    return parsedData; // Parsed XML as a JavaScript object
}

// export async function compareXMLWithExcel(xmlFilePath, excelData) {
//     try {
//         const xmlData = await readXML(xmlFilePath);

//         // Log the parsed XML structure
//         console.log('Parsed XML Data:', JSON.stringify(xmlData, null, 2));

//         // Access the worker entries
//         const xmlWorkers = xmlData['peci:Workers_Effective_Stack']['peci:Worker'];

//         xmlWorkers.forEach(worker => {
//             const workerSummary = worker['peci:Worker_Summary'][0];
//             const personalInfo = worker['peci:Effective_Change'][0]['peci:Personal'][0];

//             // Extract the relevant fields
//             const firstName = personalInfo['peci:Legal_Name'][0]['peci:First_Name'][0];
//             const dateOfBirth = personalInfo['peci:Date_of_Birth'][0];

//             // Compare with Excel data
//             const match = excelData.find(excelEntry => {
//                 return (
//                     excelEntry['Given Name'] === firstName && // Adjust key to match excelData
//                     excelEntry['Date Of Birth'] == dateOfBirth // Use '==' for loose comparison
//                 );
//             });

//             if (match) {
//                 console.log('Match found:', match);
//             } else {
//                 console.log('No match found for:', { firstName, dateOfBirth });
//             }
//         });
//     } catch (error) {
//         console.error('Error during comparison:', error);
//     }
// }


export async function compareXMLWithExcel(xmlFilePath, excelData) {
    try {
        const xmlData = await readXML(xmlFilePath);

        // Log the parsed XML structure
        console.log('Parsed XML Data:', JSON.stringify(xmlData, null, 2));

        // Access the worker entries
        const xmlWorkers = xmlData['peci:Workers_Effective_Stack']['peci:Worker'];

        // Define the fields to validate
        const fieldsToValidate = [
            'Account Number',
            'Account Type',
            'Add Edit ID1',
            'Additional Job Classifications',
            'AdressLine1',
            'AdressLine2',
            'AdressLine3',
            'Bank Name',
            'Bank Sort Code',
            'City',
            'City Of Birth',
            'Comments',
            'Cost Center',
            'Country',
            'Country Of Birth',
            'Country_1',
            'Country1',
            'County'
        ];

        //const xmlWorkers = xmlData['peci:Workers_Effective_Stack']['peci:Worker'];

        // xmlWorkers.forEach(worker => {
        //     const effectiveChange = worker['peci:Effective_Change'][0];
        //     const personalInfo = effectiveChange['peci:Personal'][0];

        //     // Personal Info
        //     const firstName = personalInfo['peci:Legal_Name'][0]['peci:First_Name'][0];
        //     const lastName = personalInfo['peci:Legal_Name'][0]['peci:Last_Name'][0];
        //     const dateOfBirth = personalInfo['peci:Date_of_Birth'][0];
        //     const gender = personalInfo['peci:Gender'][0];
        //     const maritalStatus = personalInfo['ptdf:Marital_Status'][0]['_'];
        //     const nationality = personalInfo['ptdf:Nationality'][0]['_'];

        //     // Address Info
        //     const address = effectiveChange['peci:Person_Communication'][0]['peci:Address'][0];
        //     const addressLine1 = address['peci:Address_Line_1'][0];
        //     const addressLine2 = address['peci:Address_Line_2'] ? address['peci:Address_Line_2'][0] : '';
        //     const city = address['peci:City'] ? address['peci:City'][0] : '';
        //     const postalCode = address['peci:Postal_Code'] ? address['peci:Postal_Code'][0] : '';
        //     const country = address['peci:Country'] ? address['peci:Country'][0] : '';

        //     // Worker Summary
        //     const workerSummary = worker['peci:Worker_Summary'][0];
        //     const workerID = effectiveChange['peci:WorkerID'] ? effectiveChange['peci:WorkerID'][0] : '';
        //     const employeeID = workerSummary['peci:Employee_ID'][0];
        //     const employeeName = workerSummary['peci:Name'][0];

        //     // Worker Status
        //     const workerStatus = effectiveChange['peci:Worker_Status'][0];
        //     const hireDate = workerStatus['peci:Hire_Date'][0];
        //     const originalHireDate = workerStatus['peci:Original_Hire_Date'][0];
        //     const status = workerStatus['peci:Status'][0];
        //     const activeStatusDate = workerStatus['peci:Active_Status_Date'][0];
        //     const terminated = workerStatus['peci:Terminated'][0];

        //     // Compensation Plans
        //     const compensationPlans = effectiveChange['peci:Compensation_Plans'];
        //     const compensationPlanInfo = compensationPlans.length > 0 ? compensationPlans[0]['peci:Salary_and_Hourly_Plan'] : [];
        //     const compensationPlan = compensationPlanInfo.length > 0 ? compensationPlanInfo[0]['peci:Compensation_Plan'][0] : '';
        //     const basePay = compensationPlanInfo.length > 0 ? compensationPlanInfo[0]['peci:Amount'][0] : '';
        //     const currency = compensationPlanInfo.length > 0 ? compensationPlanInfo[0]['peci:Currency'][0] : '';
        //     const frequency = compensationPlanInfo.length > 0 ? compensationPlanInfo[0]['peci:Frequency'][0] : '';

        //     // Additional Information
        //     const additionalInfo = effectiveChange['peci:Additional_Information'][0];
        //     const workerIDFromAdditional = additionalInfo['peci:WorkerID'] ? additionalInfo['peci:WorkerID'][0] : '';
        //     const pernr = additionalInfo['ptdf:PERNR'] ? additionalInfo['ptdf:PERNR'][0]['_'] : '';
        //     const workContract = additionalInfo['ptdf:Work_Contract'] ? additionalInfo['ptdf:Work_Contract'][0]['_'] : '';


        // });

        //  const xmlWorkers = xmlData['peci:Workers_Effective_Stack']['peci:Worker'];

        xmlWorkers.forEach(worker => {
            const effectiveChange = worker['peci:Effective_Change'][0];
            const personalInfo = effectiveChange['peci:Personal'][0];

            // Personal Info
            const firstName = personalInfo['peci:Legal_Name'][0]['peci:First_Name'][0];
            const lastName = personalInfo['peci:Legal_Name'][0]['peci:Last_Name'][0];
            const title = personalInfo['peci:Legal_Name'][0]['peci:Title'][0];
            const dateOfBirth = personalInfo['peci:Date_of_Birth'][0];
            const gender = personalInfo['peci:Gender'][0];
            const maritalStatus = personalInfo['ptdf:Marital_Status'][0]['_'];
            const nationality = personalInfo['ptdf:Nationality'][0]['_'];

            // Address Info
            const address = effectiveChange['peci:Person_Communication'][0]['peci:Address'][0];
            const addressLine1 = address['peci:Address_Line_1'][0];
            const addressLine2 = address['peci:Address_Line_2'] ? address['peci:Address_Line_2'][0] : '';
            const city = address['peci:City'] ? address['peci:City'][0] : '';
            const postalCode = address['peci:Postal_Code'] ? address['peci:Postal_Code'][0] : '';
            const country = address['peci:Country'] ? address['peci:Country'][0] : '';

            // Worker Summary
            const workerSummary = worker['peci:Worker_Summary'][0];
            const workerID = effectiveChange['peci:WorkerID'] ? effectiveChange['peci:WorkerID'][0] : '';
            const employeeID = workerSummary['peci:Employee_ID'][0];
            const employeeName = workerSummary['peci:Name'][0];
            const wid = workerSummary['peci:WID'][0];

            // Worker Status
            const workerStatus = effectiveChange['peci:Worker_Status'][0];
            const hireDate = workerStatus['peci:Hire_Date'][0];
            const originalHireDate = workerStatus['peci:Original_Hire_Date'][0];
            const status = workerStatus['peci:Status'][0];
            const activeStatusDate = workerStatus['peci:Active_Status_Date'][0];
            const terminated = workerStatus['peci:Terminated'][0];
            const continuousServiceDate = workerStatus['peci:Continuous_Service_Date'] ? workerStatus['peci:Continuous_Service_Date'][0] : '';

            // Compensation Plans
            const compensationPlans = effectiveChange['peci:Compensation_Plans'];
            const compensationPlanInfos = compensationPlans.map(plan => ({
                compensationPlan: plan['peci:Salary_and_Hourly_Plan'][0]['peci:Compensation_Plan'][0],
                amount: plan['peci:Salary_and_Hourly_Plan'][0]['peci:Amount'][0],
                currency: plan['peci:Salary_and_Hourly_Plan'][0]['peci:Currency'][0],
                frequency: plan['peci:Salary_and_Hourly_Plan'][0]['peci:Frequency'][0],
                startDate: plan['peci:Salary_and_Hourly_Plan'][0]['peci:Start_Date'][0],
                endDate: plan['peci:Salary_and_Hourly_Plan'][0]['peci:End_Date'] ? plan['peci:Salary_and_Hourly_Plan'][0]['peci:End_Date'][0]['_'] : '',
            }));

            // Additional Information
            const additionalInfo = effectiveChange['peci:Additional_Information'][0];
            const workerIDFromAdditional = additionalInfo['peci:WorkerID'] ? additionalInfo['peci:WorkerID'][0] : '';
            const pernr = additionalInfo['ptdf:PERNR'] ? additionalInfo['ptdf:PERNR'][0]['_'] : '';
            const workContract = additionalInfo['ptdf:Work_Contract'] ? additionalInfo['ptdf:Work_Contract'][0]['_'] : '';

            // Position Information
            const position = effectiveChange['peci:Position'][0];
            const jobTitle = position['peci:Job_Title'][0]; // Example for Job Title
            const defaultWeeklyHours = position['peci:Default_Weekly_Hours'] ? position['peci:Default_Weekly_Hours'][0] : null; // Default Weekly Hours
            const positionStartDate = position['peci:Position_Start_Date'][0];

            // Print all extracted fields
            console.log('--- Worker Info ---');
            console.log('First Name:', firstName);
            console.log('Last Name:', lastName);
            console.log('Title:', title);
            console.log('Date of Birth:', dateOfBirth);
            console.log('Gender:', gender);
            console.log('Marital Status:', maritalStatus);
            console.log('Nationality:', nationality);
            console.log('Address Line 1:', addressLine1);
            console.log('Address Line 2:', addressLine2);
            console.log('City:', city);
            console.log('Postal Code:', postalCode);
            console.log('Country:', country);
            console.log('Worker ID:', workerID);
            console.log('Employee ID:', employeeID);
            console.log('Employee Name:', employeeName);
            console.log('WID:', wid);
            console.log('Hire Date:', hireDate);
            console.log('Original Hire Date:', originalHireDate);
            console.log('Status:', status);
            console.log('Active Status Date:', activeStatusDate);
            console.log('Terminated:', terminated);
            console.log('Continuous Service Date:', continuousServiceDate);

            compensationPlanInfos.forEach((plan, index) => {
                console.log(`--- Compensation Plan ${index + 1} ---`);
                console.log('Compensation Plan:', plan.compensationPlan);
                console.log('Amount:', plan.amount);
                console.log('Currency:', plan.currency);
                console.log('Frequency:', plan.frequency);
                console.log('Start Date:', plan.startDate);
                console.log('End Date:', plan.endDate);
            });

            console.log('Worker ID from Additional Info:', workerIDFromAdditional);
            console.log('PERNR:', pernr);
            console.log('Work Contract:', workContract);
            console.log('-------------------');
        });



        xmlWorkers.forEach(worker => {

            // Check if Worker_Summary and Effective_Change are defined
            const workerSummary = worker['peci:Worker_Summary'] && worker['peci:Worker_Summary'][0];
            const effectiveChange = worker['peci:Effective_Change'] && worker['peci:Effective_Change'][0];

            // Continue only if both are available
            if (workerSummary && effectiveChange) {
                const personalInfo = effectiveChange['peci:Personal'][0];

                // Check if personalInfo is defined
                if (personalInfo) {
                    // Extract relevant fields from XML
                    const xmlDataMap = {
                        'Given Name': personalInfo['peci:Legal_Name'][0]['peci:First_Name'][0],
                        'Family Name': personalInfo['peci:Legal_Name'][0]['peci:Last_Name'][0],
                        'Date Of Birth': personalInfo['peci:Date_of_Birth'][0],
                        'Account Number': personalInfo['peci:Account_Number'][0],
                        'Account Type': personalInfo['peci:Account_Type'][0],
                        'Bank Name': personalInfo['peci:Bank_Name'][0],
                        'Bank Sort Code': personalInfo['peci:Bank_ID'][0],
                        'Martial Status': personalInfo['ptdf:Martial_Status'][0],
                        'Nationality': personalInfo['ptdf:Nationality'][0],
                        'Gender': personalInfo['peci:Gender'][0],
                        'Job Profile': personalInfo['peci:position'][0],



                    };

                    // Find matching Excel entry based on Given Name and Family Name
                    const match = excelData.find(excelEntry => {
                        return (
                            excelEntry['Given Name'] === xmlDataMap['Given Name'] &&
                            excelEntry['Family Name'] === xmlDataMap['Family Name']
                        );
                    });

                    if (match) {
                        // Validate each field
                        // Inside the fieldsToValidate.forEach loop
                        fieldsToValidate.forEach(field => {
                            const xmlValue = xmlDataMap[field] || ''; // Get XML value
                            const excelValue = match[field] !== undefined ? String(match[field]).replace(/'/g, '').trim() : ''; // Ensure it's treated as a string

                            if (xmlValue.toString().trim() === excelValue.toString().trim()) {
                                console.log(`Match for ${field}: ${xmlValue}`);
                            } else {
                                console.log(`Mismatch for ${field}: XML value = ${xmlValue}, Excel value = ${excelValue}`);
                            }
                        });
                    } else {
                        console.log('No match found for:', { 'Given Name': xmlDataMap['Given Name'], 'Family Name': xmlDataMap['Family Name'] });
                    }
                } else {
                    console.log('Personal Info not found for worker:', workerSummary);
                }
            } else {
                console.log('Worker Summary or Effective Change not found:', worker);
            }
        });
    } catch (error) {
        console.error('Error during comparison:', error);
    }
}


export function compareData(excelData, xmlData) {
    excelData.forEach(row => {
        const { firstName, lastName, dob, govId, address, ...restFields } = row;

        xmlData.persons?.person?.forEach((xmlPerson) => {
            const legalName = xmlPerson?.['peci:Legal_Name']?.[0] || {};
            const xmlGovId = xmlPerson?.['peci:Government_ID']?.[0] || '';
            const xmlDob = xmlPerson?.['peci:Date_of_Birth']?.[0] || '';

            const xmlFirstName = legalName['peci:First_Name'] || '';
            const xmlLastName = legalName['peci:Last_Name'] || '';
            const xmlAddress = xmlPerson?.['peci:Person_Communication']?.[0]?.['peci:Address']?.[0] || {};

            // Check for valid data before comparison
            if (firstName && lastName && dob && xmlFirstName && xmlLastName && xmlDob) {
                const isNameMatch = (firstName === xmlFirstName && lastName === xmlLastName);
                const isDobMatch = (dob === xmlDob);
                const isGovIdMatch = (govId === xmlGovId);

                if (!isNameMatch) {
                    console.log(`Name mismatch for ${firstName} ${lastName}`);
                }
                if (!isDobMatch) {
                    console.log(`DOB mismatch for ${firstName} ${lastName}`);
                }
                if (!isGovIdMatch) {
                    console.log(`Government ID mismatch for ${firstName} ${lastName}`);
                }

                // Address comparison (if needed)
                const xmlFullAddress = [
                    xmlAddress['peci:Address_Line_1'],
                    xmlAddress['peci:City'],
                    xmlAddress['peci:Postal_Code'],
                    xmlAddress['peci:Country']
                ].filter(Boolean).join(', ');

                if (address && xmlFullAddress !== address) {
                    console.log(`Address mismatch for ${firstName} ${lastName}`);
                }
            } else {
                console.log(`Missing data for ${firstName} ${lastName}`);
            }
        });
    });
}


// Assuming 'xlsxData' is the data extracted from the Excel sheet
// and 'xmlWorkers' is the parsed XML data

export const compareWorkerData = (xmlData, excelData) => {

    let matchCount = 0;
    let misMatchCount = 0;

    // Compare personal information
    const compareField = (xmlField, excelField, fieldName) => {
        let xmlValue = xmlField?.toString().toLowerCase().trim() || '';
        let excelValue = excelField?.toString().toLowerCase().trim() || '';


        // Modify xmlValue based on specific conditions
        if (xmlValue.includes('gb')) {
            xmlValue = 'united kingdom';  // Convert 'gb' to 'United Kingdom'
        }

        if (xmlValue.includes('married_united_kingdom')) {
            xmlValue = 'married (united kingdom)';  // Convert 'married_united_kingdom' to 'married (united kingdom)'
        }

        if (xmlValue.includes('LOC'))
        {
            xmlValue = xmlValue.replace("LOC_", "");
        }

        // Remove spaces from xmlValue if it matches the format of National ID
        xmlValue = xmlValue.replace(/\s+/g, '');

        excelValue = excelValue.replace(/\s+/g, '');



        if (xmlValue === excelValue) {
            console.log(`${fieldName} matches: ${xmlValue}`);
            matchCount++;
        } else {
            console.error(`${fieldName} mismatch: XML(${xmlValue}) vs Excel(${excelValue})`);
            misMatchCount++;
        }
    };



    // Access the worker entries
    const xmlWorkers = xmlData['peci:Workers_Effective_Stack']['peci:Worker'];

    xmlWorkers.forEach((worker, index) => {
        const excelWorker = excelData[index];  // Matching the Excel worker data row with XML

        const effectiveChange = worker['peci:Effective_Change']?.[0];
        if (!effectiveChange) return;  // Skip if no Effective_Change element

        // Personal Info Comparison
        const personalInfo = effectiveChange['peci:Personal']?.[0];
        compareField(personalInfo?.['peci:Legal_Name']?.[0]?.['peci:First_Name']?.[0], excelWorker['Given Name'], 'Given Name');
        compareField(personalInfo?.['peci:Legal_Name']?.[0]?.['peci:Last_Name']?.[0], excelWorker['Family Name'], 'Family Name');
        compareField(personalInfo?.['peci:Date_of_Birth']?.[0], excelWorker['Date Of Birth'], 'Date of Birth');
        compareField(personalInfo?.['peci:Gender']?.[0], excelWorker['Gender'], 'Gender');
        compareField(personalInfo?.['ptdf:Marital_Status']?.[0]?._, excelWorker['Marital Status'], 'Marital Status');

        // Address Info Comparison
        const address = effectiveChange?.['peci:Person_Communication']?.[0]?.['peci:Address']?.[0];
        const email = effectiveChange?.['peci:Person_Communication']?.[0]?.['peci:Email']?.[0];
        compareField(address?.['peci:Address_Line_2']?.[0], excelWorker['AdressLine1'], 'Address Line 1');
        compareField(address?.['peci:Address_Line_1']?.[0], excelWorker['AdressLine2'], 'Address Line 2');
        compareField(address?.['peci:City']?.[0], excelWorker['City'], 'City');
        compareField(address?.['peci:Postal_Code']?.[0], excelWorker['Postal Code'], 'Postal Code');
        compareField(address?.['peci:Country']?.[0], excelWorker['Country'], 'Country');
        compareField(email?.['peci:Usage_Type']?.[0], excelWorker['Type'], 'Email Type');
        compareField(email?.['peci:Email_Address']?.[0], excelWorker['Email Address'], 'Email Address');

        // Bank and Payment Info Comparison
        const paymentElection = effectiveChange?.['peci:Payment_Election']?.[0];
        compareField(paymentElection?.['peci:Payment_Type']?.[0], excelWorker['Payment Type'], 'Payment Type');
        compareField(paymentElection?.['peci:Country']?.[0], excelWorker['Country'], 'Payment Country');
        compareField(paymentElection?.['peci:Currency']?.[0], excelWorker['Currency'], 'Payment Currency');
        compareField(paymentElection?.['peci:Account_Number']?.[0], excelWorker['Account Number'], 'Account Number');
        compareField(paymentElection?.['peci:Account_Type']?.[0], excelWorker['Account Type'], 'Account Type');
        compareField(paymentElection?.['peci:Bank_Name']?.[0], excelWorker['Bank Name'], 'Bank Name');
        compareField(paymentElection?.['peci:Bank_ID']?.[0], excelWorker['Bank Sort Code'], 'Bank Sort Code');

        // Position Information Comparison
        const position = effectiveChange?.['peci:Position']?.[0];
        compareField(position?.['peci:Business_Title']?.[0], excelWorker['Job Profile'], 'Job Title');
        const defaultWeeklyHours = position?.['peci:Scheduled_Weekly_Hours']?.[0] || null;
        compareField(defaultWeeklyHours, excelWorker['Scheduled Weekly Hours'], 'Default Weekly Hours');
        compareField(position?.['peci:Pay_Rate_Type']?.[0], excelWorker['Job Profile'], 'Job Title');
        compareField(position?.['peci:Business_Site']?.[0]?.['peci:Location_ID']?.[0],excelWorker['Location'], 'Location');

        // Worker Summary Comparison
        const workerSummary = worker?.['peci:Worker_Summary']?.[0];
        compareField(workerSummary?.['peci:Employee_ID']?.[0], excelWorker['Last Run Employee No'], 'Last Run Employee No');

        // Worker Status Comparison
        const workerStatus = effectiveChange?.['peci:Worker_Status']?.[0];
        compareField(workerStatus?.['peci:Hire_Date']?.[0], excelWorker['Hire Date'], 'Hire Date');
        compareField(workerStatus?.['peci:Status']?.[0], excelWorker['Status'], 'Status');

        // Compensation Plan Comparison
        const compensationPlans = effectiveChange?.['peci:Compensation_Plans'] || [];
        compensationPlans.forEach((plan, i) => {
            compareField(plan?.['peci:Salary_and_Hourly_Plan']?.[0]?.['peci:Amount']?.[0], excelWorker['Salary'], 'Salary');
        });

        // National Identifier Comparison
        const nationalIdentifier = effectiveChange?.['peci:Person_Identification']?.[0]?.['peci:National_Identifier']?.[0];
        compareField(nationalIdentifier?.['peci:National_ID_Type']?.[0], excelWorker['National ID Type1'], 'National ID Type');
        const nationalID = nationalIdentifier['peci:National_ID'][0];
        compareField(nationalIdentifier?.['peci:National_ID']?.[0], excelWorker['Add Edit ID1'], 'National ID ');
        // Phone Number Comparison (If it exists in XML)
        const phoneInfo = effectiveChange?.['peci:Person_Communication']?.[0]?.['peci:Phone']?.[0];
        compareField(phoneInfo?.['peci:Phone']?.[0], excelWorker['Phone Number'], 'Phone Number');
    });

    // Final match/mismatch summary
    console.log(`Total Matches: ${matchCount}`);
    console.error(`Total Mismatches: ${misMatchCount}`);
};