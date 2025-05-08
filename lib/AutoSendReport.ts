import archiver from 'archiver';
import fs from 'fs';
import nodemailer from 'nodemailer';

export class AutoSendReport {
    // Function to send the HTML report via email
    async sendEmailWithReport(htmlReportPath: string) {
        const transporter = nodemailer.createTransport({
            service: 'outlook', // Replace with your email service provider
            auth: {
                user: '', // Replace with your email
                pass: '',   // Replace with your email password or app-specific password
            },
        });

        const mailOptions = {
            from: '',
            to: '',  // Client's email address
            subject: 'Execution Report',
            html: fs.readFileSync(htmlReportPath, 'utf-8'), // Attach the HTML content
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    async deleteOldreport() {
        const reportPath = process.cwd + "\\html-report";
        if (fs.existsSync(reportPath)) {
            console.log("Cleaning up old report directory...");
            await fs.promises.rm(reportPath, { recursive: true, force: true });
        }
    }
    // Function to zip the report
    async zipReport(testName: string) {
        //const reportPath = path.join(__dirname, 'html-report');
        const reportPath = process.cwd + "\\html-report";
        const filename = testName.split('.xlsx')[0];
        const now = new Date();
        const timeString = `${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
        //const zipPath = path.join(__dirname, 'test-report.zip');
        const zipPath = process.cwd + "\\ZipsHtmlReports\\HTMLReport_" + filename +"_"+timeString+".zip";
        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', { zlib: { level: 9 } });
        archive.pipe(output);
        // archive.file(reportPath, { name: 'test-report_Execution.zip' });
        await archive.directory(reportPath, false);
        await archive.finalize();
        return zipPath;
    }

    // Function to send the email with the report attached
    async sendEmail(zipPath: string) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',  // Correct SMTP server for Office 365
            port: 587,                   // Port for TLS
            secure: false,               // Use TLS
            // service: 'Gmail', // Replace with your email provider (e.g., Gmail, Office 365)
            auth: {
                user: '', // Replace with your email address
                pass: '',  // Replace with your email password or app-specific password
            },
            logger: true,
            debug: true
        });

        const mailOptions = {
            from: '',
            to: '',  // Client's email address
            subject: 'Execution Report',
            text: 'Please find the test execution report attached.',
            attachments: [
                {
                    filename: 'test-report_Execution.zip',
                    path: zipPath,
                },
            ],
        };

        // await transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //         console.log('Error sending email:', error);
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //     }
        // });

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }


    // Function to zip the report files
    async zipReport2(reportFolder: string, zipPath: string) {
        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        archive.pipe(output);
        archive.directory(reportFolder, false);
        await archive.finalize();
    }
}


