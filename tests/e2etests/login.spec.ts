import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

const getEnv = (k: string): string => {
  const v = process.env[k];
  if (!v) throw new Error(`Missing env var ${k}`);
  return v;
};

const VALID_USER = getEnv('EFECTE_USERNAME');
const VALID_PASS = getEnv('EFECTE_PASSWORD');

test.describe('Login', () => {
  test('login with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await expect(login.loginWindow).toBeVisible();
    await login.login(VALID_USER, VALID_PASS);

  });

  test('login with invalid credentials', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await expect(login.loginWindow).toBeVisible();
    await login.usernameInput.fill(VALID_USER);
    await login.passwordInput.fill('TotallyWrongPassword!');
    await login.loginDirectoryButton.click();
    await expect(login.invalidCredentialsError).toBeVisible();
  });
});