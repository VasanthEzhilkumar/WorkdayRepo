import { loginpage } from '@pages/LoginPage';
import { createPositionPage } from '@pages/createPositionpage';
import { fileValidationPage } from '@pages/fileValidationPage';
import { hireEmployeePage } from '@pages/hireEmployeePage';
import { homepage } from '@pages/homePage';
import { proxyPage } from '@pages/proxyPage';
import { test as baseTest } from '@playwright/test';
import { appCommons } from './appCommons';
import { JobDetailsPage } from '@pages/CommonPages/JobDetailsPage';
import { employeeInboxUSPage } from '@pages/USPages/employeeInboxUSPage';
import { contactInformationAddressCzechia } from '@pages/CzechiaPages/ContactInformationAddressCzechia';



// const createPostition = new createPositionPage(page);
// const jobDetailsPage = new JobDetailsPage(page, context)
// const empInboxUS = new employeeInboxUSPage(page, context);
// const homePageRon = new contactInformationAddressCzechia(page, context)

const test = baseTest.extend<{
  login: loginpage;
  home: homepage;
  hireEmployee: hireEmployeePage;
  appCommon: appCommons;
  proxy: proxyPage;
  fileValidationUK: fileValidationPage;
  fileValidationCZ: fileValidationPage;
  createPostition: createPositionPage;
  jobDetailsPage: JobDetailsPage;
  empInboxUS: employeeInboxUSPage;
  homePageRon: contactInformationAddressCzechia;


}>({
  login: async ({ page, context }, use) => {
    await use(new loginpage(page, context));
  },
  home: async ({ page, context }, use) => {
    await use(new homepage(page, context));
  },
  hireEmployee: async ({ page, context }, use) => {
    await use(new hireEmployeePage(page, context));
  },
  appCommon: async ({ page, context }, use) => {
    await use(new appCommons(page, context));
  },
  proxy: async ({ page, context }, use) => {
    await use(new proxyPage(page, context));
  },
  fileValidationUK: async ({ page, context }, use) => {
    await use(new fileValidationPage(page, context));
  },
  fileValidationCZ: async ({ page, context }, use) => {
    await use(new fileValidationPage(page, context));
  },
  createPostition: async ({ page }, use) => {
    await use(new createPositionPage(page));
  },
  jobDetailsPage: async ({ page, context }, use) => {
    await use(new JobDetailsPage(page, context));
  },
  empInboxUS: async ({ page, context }, use) => {
    await use(new employeeInboxUSPage(page, context));
  },
  homePageRon: async ({ page, context }, use) => {
    await use(new contactInformationAddressCzechia(page, context));
  },


});

export default test;

