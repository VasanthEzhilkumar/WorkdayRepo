import { test as baseTest } from '@playwright/test';
import { loginpage } from '@pages/LoginPage';
import { homepage } from '@pages/homePage';
import { hireEmployeePage } from '@pages/hireEmployeePage';
import { proxyPage } from '@pages/proxyPage';
import { appCommons } from './appCommons';
import { fileValidationPage } from '@pages/fileValidationPage';

const test = baseTest.extend<{
  login: loginpage;
  home: homepage;
  hireEmployee: hireEmployeePage;
  appCommon: appCommons;
  proxy: proxyPage;
  fileValidationUK : fileValidationPage;
  fileValidationCZ : fileValidationPage;

  
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

});

export default test;

