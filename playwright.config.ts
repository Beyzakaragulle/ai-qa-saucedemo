import { defineConfig } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
    testDir: './tests/e2e',
    timeout: isCI ? 60000 : 30000,
    retries: 1,
    reporter: [['html', { outputFolder: 'reports', open: isCI ? 'never' : 'always' }], ['list']],
    use: {
        baseURL: 'https://www.saucedemo.com',
        headless: isCI ? true : false,
        slowMo: isCI ? 0 : 400,
        screenshot: 'on',
        video: 'on',
    },
});
