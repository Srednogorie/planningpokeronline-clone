import { defineConfig } from "cypress"
import admin from 'firebase-admin'
import { plugin as cypressFirebasePlugin } from 'cypress-firebase'

export default defineConfig({
  e2e: {
    watchForFileChanges: false,
    baseUrl: 'http://localhost:3000',
    // supportFile: 'cypress/support/e2e/index.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      cypressFirebasePlugin(on, config, admin, {
        projectId: "planningpokeronline-clone",
        credential: admin.credential.cert(require("./planningpokeronline-clone-firebase-adminsdk.json"))
      })
    },
  },
})
