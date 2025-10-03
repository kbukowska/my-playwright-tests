import { loginAndHandleSession } from '../helpers/helpers';
import { test, expect } from '../fixtures/fixtures'

const getEnv = (k: string): string => {
  const v = process.env[k];
  if (!v) throw new Error(`Missing env var ${k}`);
  return v;
};

const VALID_USER = getEnv('EFECTE_USERNAME');
const VALID_PASS = getEnv('EFECTE_PASSWORD');

test.beforeEach(async ({ page }) => {
  await loginAndHandleSession(page, VALID_USER, VALID_PASS);
});

test('User can create ticket', async ({ homePage }) => {
  await homePage.switchToAgentUI();
  await homePage.serviceDeskAgent.click();
  await homePage.openTickets.click();
  await expect(homePage.sectionTitleName).toHaveText('06. Open Tickets ');
  await homePage.createNewTicket();
  await expect(homePage.ticketNumberHeader).toBeVisible({ timeout: 10_000 });
});