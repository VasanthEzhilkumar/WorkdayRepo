import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  globalSetup: `./global-setup`,
  timeout: 550000,
  retries: 0,
  workers: 1,
  reporter: [
    [`./CustomReporterConfig.ts`],
    [`allure-playwright`],
    [`html`, { outputFolder: 'html-report', open: 'never' }]
  ],
  projects: [
    {
      name: 'Chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 650 },
        headless: false,
        acceptDownloads: true,
        screenshot: 'on',
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          args: ["--start-maximized"],
          slowMo: 0
        }
      },
    }
  ],
};

export default config;
