// excelToJsonUtil.ts
import * as XLSX from 'xlsx';
import path from 'path';

// export function excelToJson(filePath: string): Record<string, any[]> {
//     const workbook = XLSX.readFile(filePath);
//     const sheetsJson: Record<string, any[]> = {};

//     workbook.SheetNames.forEach(sheetName => {
//         const worksheet = workbook.Sheets[sheetName];
//         sheetsJson[sheetName] = XLSX.utils.sheet_to_json(worksheet, { defval: null });
//     });

//     return sheetsJson;
// }

// Helper function to get the absolute path to the Excel file from a specific directory
export function getExcelFilePath(fileName: string): string {
    const directory = path.resolve(__dirname,'../Data');
    return path.resolve(directory, fileName);
}



function excelDateToJSDate(excelDate: number): string {
    const jsDate = new Date((excelDate - 25569) * 86400 * 1000);
        // Extract day, month, and year
        const day = String(jsDate.getDate()).padStart(2, '0');  // Add leading 0 if needed
        const month = String(jsDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based
        const year = jsDate.getFullYear();
    
        // Return in DD/MM/YYYY format
        return `${day}/${month}/${year}`;
    
}

export function excelToJson(filePath: string): Record<string, any[]> {
    const workbook = XLSX.readFile(filePath);
    const sheetsJson: Record<string, any[]> = {};

    workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(worksheet, { defval: null });

        // Iterate over each row and convert date fields
        sheetData.forEach((row: any) => {
            for (const key in row) {
                if (row.hasOwnProperty(key)) {
                    const cellValue = row[key];
                    // Check if the value is a number and falls within the range of possible Excel dates
                    if (typeof cellValue === 'number' && cellValue > 25569 && cellValue < 60000) {
                        row[key] = excelDateToJSDate(cellValue);
                    }
                }
            }
        });

        sheetsJson[sheetName] = sheetData;
    });

    return sheetsJson;
}
