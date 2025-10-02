import { Page, expect } from '@playwright/test';
import { Locator } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }

  get loginWindow(): Locator {
    return this.page.locator('.card-pf');
  }

  get usernameInput(): Locator {
    return this.page.locator('input[name="username"]');
  }

  get passwordInput(): Locator {
    return this.page.locator('input[name="password"]');
  }
  get loginDirectoryButton(): Locator {
    return this.page.locator('#kc-login')
  }
  get loginMatrixButton(): Locator {
    return this.page.locator('#kc-efecte-login');
  }
  get invalidCredentialsError(): Locator {
    return this.page.locator('.kc-feedback-text');
  }
  get terminateSessionButton(): Locator {
  return this.page.getByRole('button', { name: /terminate the other session/i });
}
get terminateDialog(): Locator {
  return this.page.getByText(/another user is currently logged in/i);
}
get headerAvatar(): Locator {
  return this.page.getByTestId('header-avatar');
}

  async login(username: string, password: string) {
    await expect(this.loginWindow).toBeVisible();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginDirectoryButton.click();
//      const terminateAppeared = await this.terminateSessionButton
//     .waitFor({ state: 'visible', timeout: 4000 })
//     .then(() => true)
//     .catch(() => false);

//   if (terminateAppeared) {
//     await this.terminateSessionButton.click();
//   }
//   await expect(this.headerAvatar).toBeVisible({ timeout: 15000 });

//         const dialogVisible = await this.terminateDialog.isVisible({ timeout: 3000 }).catch(() => false);
//         if (dialogVisible) {
//         await this.terminateSessionButton.click();
//   }
    // await expect(this.page.locator('.menu-tab-icon-section')).toBeVisible();
  }
}