import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
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
  // wywołaj zaraz po próbie logowania (po submit)
const terminateBtn = page.getByRole('button', { name: /terminate the other session/i });

try {
  // spróbuj poczekać chwilę na pojawienie się przycisku
  await terminateBtn.waitFor({ state: 'visible', timeout: 2000 });
  await terminateBtn.click();
  // opcjonalnie: poczekaj aż strona przeładuje się po akcji
  await page.waitForLoadState('networkidle');
} catch {
  // okno się nie pojawiło – idziemy dalej
}
  await homePage.switchToAgentUI();
  await homePage.serviceDeskAgent.click();
  await homePage.openTickets.click();
  await expect(homePage.sectionTitleName).toHaveText('06. Open Tickets ');
  await homePage.createNewTicket();
  await expect(homePage.ticketNumberHeader).toBeVisible({ timeout: 10_000 });
});