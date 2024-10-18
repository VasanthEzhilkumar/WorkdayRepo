import { PlaywrightTestConfig, devices } from '@playwright/test';
import { testConfig } from './testConfig';
const ENV = process.env.npm_config_ENV;

/*if (!ENV || !['WFM',`qa`, `dev`, `qaApi`, `devApi`].includes(ENV)) {
 console.log(`Please provide a correct environment value after command like "--ENV=qa|dev|qaApi|devApi"`);
 process.exit();
} */

const config: PlaywrightTestConfig = {

  //Global Setup to run before all tests
  globalSetup: `./global-setup`,

  //sets timeout for each test case
  timeout: 550000,
  //number of retries if test case fails
  retries: 0,
  workers: 1,
  //fullyParallel: true,
  //fullyParallel : true,

  //Reporters
  reporter: [[`./CustomReporterConfig.ts`], [`allure-playwright`], [`html`, { outputFolder: 'html-report', open: 'never' }]],

  projects: [
    {
      name: 'Chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1275, height: 592 },
        //Browser Mode
        headless: false,

        //Enable File Downloads in Chrome
        acceptDownloads: true,
        //actionTimeout:10000,

        //Artifacts
        screenshot: 'on',
        video: `retain-on-failure`,
        trace: `retain-on-failure`,

        //Slows down execution by ms
        launchOptions: {
          args: ["--start-maximized"],
          slowMo: 0
        }
      },
    },
    // {
    //   name: `Chrome`,

    //   use: {
    //     // Configure the browser to use.
    //     browserName: `chromium`,
    //     ...devices['Desktop Chrome'] ,

    //     //Chrome Browser Config
    //     channel: `chrome`,

    //     //Picks Base Url based on User input
    //    // baseURL: testConfig[ENV],
    //     baseURL: testConfig.WFM,
    //     //Browser Mode
    //     headless: false,



        // //Browser height and width
        // viewport: { width: 1920, height: 1080 },
        // // ignoreHTTPSErrors: true,

        // //Enable File Downloads in Chrome
        // acceptDownloads: true,

        // //Artifacts
        // screenshot: 'on',
        // video: `retain-on-failure`,
        // trace: `retain-on-failure`,

    //     //Slows down execution by ms
    //     launchOptions: {
    //       args:["--start-maximized"],
    //       slowMo: 0
    //     }
    //   },

    // },
    /* {
       name: `Chrome- 4W`,
       use: {
         // Configure the browser to use.
         browserName: `chromium`,
 
         //Chrome Browser Config
         channel: `chrome`,
 
         //Picks Base Url based on User input
        // baseURL: testConfig[ENV],
         baseURL: testConfig.WFM,
         //Browser Mode
         headless: false,
         
         
 
         //Browser height and width
         viewport: { width: 1500, height: 730 },
         ignoreHTTPSErrors: true,
 
         //Enable File Downloads in Chrome
         acceptDownloads: true,
 
         //Artifacts
         screenshot: 'on',
         video: `retain-on-failure`,
         trace: `retain-on-failure`,
 
         //Slows down execution by ms
         launchOptions: {
           slowMo: 0
         }
       },
     },
     {
       name: `Chromium`,
       use: {
         browserName: `chromium`,
         baseURL: testConfig[ENV],
         headless: false,
         viewport: { width: 1500, height: 730 },
         ignoreHTTPSErrors: true,
         acceptDownloads: true,
         screenshot: `only-on-failure`,
         video: `retain-on-failure`,
         trace: `retain-on-failure`,
         launchOptions: {
           slowMo: 0
         }
       },
     },
 
     {
       name: `Firefox`,
       use: {
         browserName: `firefox`,
         baseURL: testConfig[ENV],
         headless: true,
         viewport: { width: 1500, height: 730 },
         ignoreHTTPSErrors: true,
         acceptDownloads: true,
         screenshot: `only-on-failure`,
         video: `retain-on-failure`,
         trace: `retain-on-failure`,
         launchOptions: {
           slowMo: 0
         }
       },
     },
 
     {
       name: `Edge`,
       use: {
         browserName: `chromium`,
         channel: `msedge`,
         baseURL: testConfig[ENV],
         headless: false,
         viewport: { width: 1500, height: 730 },
         ignoreHTTPSErrors: true,
         acceptDownloads: true,
         screenshot: `only-on-failure`,
         video: `retain-on-failure`,
         trace: `retain-on-failure`,
         launchOptions: {
           slowMo: 0
         }
       },
     },
     {
       name: `WebKit`,
       use: {
         browserName: `webkit`,
         baseURL: testConfig[ENV],
         headless: true,
         viewport: { width: 1500, height: 730 },
         ignoreHTTPSErrors: true,
         acceptDownloads: true,
         screenshot: `only-on-failure`,
         video: `retain-on-failure`,
         trace: `retain-on-failure`,
         launchOptions: {
           slowMo: 0
         }
       },
     },
     {
       name: `Device`,
       use: {
         ...devices[`Pixel 4a (5G)`],
         browserName: `chromium`,
         channel: `chrome`,
         baseURL: testConfig[ENV],
         headless: true,
         ignoreHTTPSErrors: true,
         acceptDownloads: true,
         screenshot: `only-on-failure`,
         video: `retain-on-failure`,
         trace: `retain-on-failure`,
         launchOptions: {
           slowMo: 0
         }
       },
     },
     {
       name: `DB`
     },
 
     {
       name: `API`,
       use: {
         baseURL: testConfig[ENV]
       }
     }*/
  ],
};
export default config;