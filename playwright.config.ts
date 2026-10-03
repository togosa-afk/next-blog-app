import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    channel: 'chrome',
    baseURL: 'http://localhost:3000',
  },
  
  projects: [
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
  ],
});