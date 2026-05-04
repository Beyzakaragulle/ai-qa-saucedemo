import { test, expect } from '@playwright/test';
import { users } from '../fixtures/users';

test.describe('Login Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test.describe('Happy Path', () => {
        test('standard_user başarıyla giriş yapabilmeli', async ({ page }) => {
            await page.getByRole('textbox', { name: /username/i }).fill(users.standard.username);
            await page.getByRole('textbox', { name: /password/i }).fill(users.standard.password);
            await page.getByRole('button', { name: /login/i }).click();

            await expect(page).toHaveURL(/inventory/);
            await expect(page.getByText('Products')).toBeVisible();
        });

        test('performance_glitch_user giriş yapabilmeli', async ({ page }) => {
            await page.getByRole('textbox', { name: /username/i }).fill(users.performance.username);
            await page.getByRole('textbox', { name: /password/i }).fill(users.performance.password);
            await page.getByRole('button', { name: /login/i }).click();

            await expect(page).toHaveURL(/inventory/);
            await expect(page.getByText('Products')).toBeVisible();
        });
    });

    test.describe('Negative Path', () => {
        test('locked_out_user giriş yapamamalı ve hata mesajı görmeli', async ({ page }) => {
            await page.getByRole('textbox', { name: /username/i }).fill(users.locked.username);
            await page.getByRole('textbox', { name: /password/i }).fill(users.locked.password);
            await page.getByRole('button', { name: /login/i }).click();

            await expect(page.getByText(/sorry, this user has been locked out/i)).toBeVisible();
            await expect(page).not.toHaveURL(/inventory/);
        });

        test('boş kullanıcı adı ile giriş hata vermeli', async ({ page }) => {
            await page.getByRole('textbox', { name: /password/i }).fill(users.standard.password);
            await page.getByRole('button', { name: /login/i }).click();

            await expect(page.getByText(/username is required/i)).toBeVisible();
        });

        test('boş şifre ile giriş hata vermeli', async ({ page }) => {
            await page.getByRole('textbox', { name: /username/i }).fill(users.standard.username);
            await page.getByRole('button', { name: /login/i }).click();

            await expect(page.getByText(/password is required/i)).toBeVisible();
        });

        test('tamamen boş form gönderildiğinde hata vermeli', async ({ page }) => {
            await page.getByRole('button', { name: /login/i }).click();

            await expect(page.getByText(/username is required/i)).toBeVisible();
        });

        test('yanlış şifre ile giriş hata vermeli', async ({ page }) => {
            await page.getByRole('textbox', { name: /username/i }).fill(users.standard.username);
            await page.getByRole('textbox', { name: /password/i }).fill('wrong_password');
            await page.getByRole('button', { name: /login/i }).click();

            await expect(page.getByText(/username and password do not match/i)).toBeVisible();
        });
    });

    test.describe('Edge Case', () => {
        test('problem_user giriş yapabilmeli', async ({ page }) => {
            await page.getByRole('textbox', { name: /username/i }).fill(users.problem.username);
            await page.getByRole('textbox', { name: /password/i }).fill(users.problem.password);
            await page.getByRole('button', { name: /login/i }).click();

            await expect(page).toHaveURL(/inventory/);
            await expect(page.getByText('Products')).toBeVisible();
        });

        test('giriş sonrası ana sayfaya gidilince session korunmuyor (BUG-001)', async ({ page }) => {
            await page.getByRole('textbox', { name: /username/i }).fill(users.standard.username);
            await page.getByRole('textbox', { name: /password/i }).fill(users.standard.password);
            await page.getByRole('button', { name: /login/i }).click();

            await expect(page).toHaveURL(/inventory/);

            await page.goto('/');
            await expect(page).toHaveURL('https://www.saucedemo.com/');
        });
    });
});
