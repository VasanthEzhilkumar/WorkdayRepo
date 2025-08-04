import { chromium } from 'playwright';
import * as fs from 'fs';

(async () => {
  const browser = await chromium.launch({
    headless: false, // headless = true usually gets blocked
    args: ['--disable-blink-features=AutomationControlled']
  });

  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/117.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 },
    locale: 'en-US',
  });

  // 🛡️ Apply stealth-like patches
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });

    Object.defineProperty(navigator, 'languages', {
      get: () => ['en-US', 'en'],
    });

    Object.defineProperty(navigator, 'plugins', {
      get: () => [1, 2, 3],
    });

    // Minimal window.chrome emulation
    // @ts-ignore
    window.chrome = {
      runtime: {},
      // Prevent detection of undefined chrome property
    };
  });

  const page = await context.newPage();

  try {
    console.log('🌐 Navigating to SmartRecruiters...');
    await page.goto('https://www.smartrecruiters.com/account/sign-in', {
      waitUntil: 'load',
      timeout: 60000,
    });

    console.log('✅ Page loaded. Checking stealth status...');
    // Simulate human interaction
    await page.waitForTimeout(2000);
    await page.mouse.move(200, 300);
    await page.waitForTimeout(1000);
    
    const isBot = await page.evaluate(() => navigator.webdriver);
    console.log('🤖 navigator.webdriver =', isBot); // should print false

    // Simulate human interaction
    await page.waitForTimeout(2000);
    await page.mouse.move(200, 300);
    await page.waitForTimeout(1000);

    // Capture screenshot and HTML for debugging
    await page.screenshot({ path: 'smartrecruiters.png' });
    fs.writeFileSync('smartrecruiters.html', await page.content());

    console.log('📸 Screenshot and HTML saved.');

  } catch (error) {
    console.error('❌ Failed to load page:', error);
  } finally {
    // await browser.close();
  }
})();
