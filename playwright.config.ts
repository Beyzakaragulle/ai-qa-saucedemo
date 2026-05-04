import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests/e2e',
    timeout: 30000,
    retries: 1,
    reporter: [['html', { outputFolder: 'reports', open: 'always' }], ['list']],
    use: {
        baseURL: 'https://www.saucedemo.com',
        headless: false,
        slowMo: 400,
        screenshot: 'on',
        video: 'on',
    },
});