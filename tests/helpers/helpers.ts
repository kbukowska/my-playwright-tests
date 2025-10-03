import { Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';


export const nowSlug = () => new Date().toISOString().replace(/[:.]/g, '-');
export async function loginAndHandleSession(page: Page, user: string, pass: string) {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(user, pass);

    const terminateButton = page.getByRole('button', { name: /terminate the other session/i });
    try {
        await terminateButton.waitFor({ state: 'visible', timeout: 2000 });
        await terminateButton.click();
        await page.waitForLoadState('networkidle');
    } catch { }
}


