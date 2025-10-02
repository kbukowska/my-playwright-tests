import { test, expect } from '@playwright/test';
import { LoginPage} from '../pages/login-page';
import { HomePage } from '../pages/home-page';  

const getEnv = (k: string): string => {
  const v = process.env[k];
  if (!v) throw new Error(`Missing env var ${k}`);
  return v;
};

const VALID_USER = getEnv('EFECTE_USERNAME');
const VALID_PASS = getEnv('EFECTE_PASSWORD');

test.only('User can create ticket', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await loginPage.goto();
  await loginPage.login(VALID_USER, VALID_PASS);
  await homePage.switchToAgentUI();
  await homePage.serviceDeskAgent.click();
    await homePage.openTickets.click(); 
await expect(homePage.sectionTitleName).toHaveText('06. Open Tickets ');
});