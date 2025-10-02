import { Page, expect } from '@playwright/test';
import { Locator } from '@playwright/test';
export class HomePage {
  constructor(private page: Page) {}

  get avatarButton(): Locator {
    return this.page.getByTestId('header-avatar');
  }
  get switchButton(): Locator {
    return this.page.locator('.switch-button');
  }
  get logoutButton(): Locator {
    return this.page.locator('button[name="Logout"]');
  }
  get AgentUIContent(): Locator {
    return this.page.getByText(' AGENT UI ');
  }
  get switchButtonLabel(): Locator {
    return this.page.locator('.switch-button>span');
  }

    get serviceDeskAgent(): Locator {
      return this.page.getByText('Service Desk Agent');
    }

    get openTickets(): Locator {
      return this.page.getByTestId('7820326_BOOKMARK');
    }

    get sectionTitleName(): Locator {
      return this.page.locator('.wsh-view-name');
    }

  
   async logout() {
    await this.avatarButton.click();
    await expect(this.logoutButton).toBeVisible({ timeout: 5_000 });
    await this.logoutButton.click();
   }

   async switchToAgentUI() {
   await this.switchButton.click();
   await this.page.waitForLoadState('networkidle');
   await this.switchButton.hover();
   await expect(this.switchButtonLabel).toHaveText(' AGENT UI ');
   await expect(this.page).toHaveURL('https://qatestenv.efectecloud-demo.com/itsm/agentui/home');

   }
}