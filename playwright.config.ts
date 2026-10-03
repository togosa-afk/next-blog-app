import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
  use: {
    baseURL: "http://localhost:3000",
    browserName: "chromium",
  },

  projects: [
    {
      name: "Chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
