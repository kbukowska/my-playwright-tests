import { Page } from '@playwright/test';

export const nowSlug = () => new Date().toISOString().replace(/[:.]/g, '-');