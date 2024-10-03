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



function excelDateToJSDate(excelDate: number): Date {
    const jsDate = new Date((excelDate - 25569) * 86400 * 1000);
    return jsDate;
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
