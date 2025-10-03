import { Page, expect } from '@playwright/test';
import { Locator } from '@playwright/test';
export class HomePage {
  constructor(private page: Page) { }

  get avatarButton(): Locator {
    return this.page.getByTestId('header-avatar');
  }
  get switchButton(): Locator {
    return this.page.locator('.header-end>.switch-button');
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
    return this.page.locator('//div[contains(@class,"tree-nav-div")][@title="06. Open Tickets"]');
  }
  get sectionTitleName(): Locator {
    return this.page.locator('.wsh-view-name');
  }
  get createNewTicketButton(): Locator {
    return this.page.locator('#create-new-dc');
  }
  get newTicketContainer(): Locator {
    return this.page.getByTestId('data-card-container');
  }
  get quickfillInput(): Locator {
    return this.page.locator('#reference-dropdown-7792477');
  }
  get accessKeycardTicketOption(): Locator {
    return this.page.locator('#reference-dropdown-option-7792477-8063530');
  }
  get ticketTypeField(): Locator {
    return this.page.locator('.esm-ui-control-wrapper>div>.static-dropdown>div');
  }
  // await page.getByRole('listbox').getByRole('option', { name: /^Incident$/ }).click();
  get customerField(): Locator {
    return this.page.getByTestId('reference-dropdown-7793318');
  }
  get firstCustomerOption(): Locator {
    return this.page.locator('#item-0');
  }
  get detailsField(): Locator {
    return this.page.locator('#rte-7792799_rte-edit-view');
  }
  get saveButton(): Locator {
    return this.page.locator('[data-test="save-datacard-button"]');
  }
  get cancelButton(): Locator {
    return this.page.locator('#cancel-datacard-button');
  }
  get descriptionTicketTypeField(): Locator {
    return this.page.locator('#7792256');
  }
  get descriptionTicketTypeOptionIncident(): Locator {
    return this.page.locator('.select2-results>li:nth-child(1)');
  }
  get teamField(): Locator {
    return this.page.getByTestId('reference-dropdown-7795676');
  }
  get firstTeamOption(): Locator {
    return this.page.locator('#item-0');
  }
  get ticketNumberHeader(): Locator {
    return this.page.locator('.title-with-breadcrumb');
  }

  get ticketTypeFirstOption(): Locator {
    return this.page.locator('#d4e3-1');
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

  async createNewTicket() {
    await this.createNewTicketButton.click();
    await expect(this.newTicketContainer).toBeVisible({ timeout: 5_000 });
    await this.ticketTypeField.first().click();
    await this.ticketTypeField.first().press('ArrowDown');
    await this.ticketTypeField.first().press('Enter'); 
    // await this.page.getByRole('listbox').getByRole('option', { name: /^Incident$/ }).click();
    await this.customerField.click();
    await this.firstCustomerOption.click();
    await this.teamField.click();
    await this.firstTeamOption.click();
    await this.detailsField.click();
    await this.detailsField.fill('This is a test ticket created by Playwright');
   const [resp] = await Promise.all([
    this.page.waitForResponse(r =>
      r.request().method() === 'POST' &&
      r.url().includes('/itsm/rest/data-card') &&
      r.status() === 200
    ),
    this.saveButton.click(),]);
    await expect(this.ticketNumberHeader).toBeVisible({ timeout: 10_000 });
  }
}