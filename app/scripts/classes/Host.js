const NO_APPS_IN_HOST = 'No applications registered in the host';

const Host = {
  init: () => {
    this.firstApp = undefined;
  },
  addApp: (app) => {
    let currentApp = this.firstApp,
      previousApp = undefined;

    if (this.firstApp === undefined) {
      // No apps in the host
      this.firstApp = app;
      app.nextApp = null;
      return;
    }

    // We look for a fit for the app
    while (currentApp !== null) {
      if (app.apdex >= currentApp.apdex) {
        // Found a fit
        if (previousApp === undefined) {
          // The app is going in first place
          app.nextApp = this.firstApp;
          this.firstApp = app.nextApp;
        } else if (currentApp.nextApp === null) {
          // The app is going in last place
          currentApp.nextApp = app;
          app.nextApp = null;
        } else {
          // Standard case
          previousApp.nextApp = app;
          app.nextApp = currentApp;
        }
      }

      previousApp = currentApp;
      currentApp = currentApp.nextApp;
    }
  },
  removeApp: (app) => {
    let currentApp = this.firstApp,
      previousApp = undefined;

    if (this.firstApp === undefined) {
      throw NO_APPS_IN_HOST;
    }

    // We search the app
    while (currentApp !== null) {
      if (currentApp.id === app.id) {
        // found the app
        if (previousApp === undefined) {
          // The app is the first app
          this.firstApp = currentApp.nextApp;
        } else {
          previousApp.nextApp = currentApp.nextApp;
        }
      }

      previousApp = currentApp;
      currentApp = currentApp.nextApp;
    }

  },
  getTopAps: () => {
    let result = [],
      currentApp = this.firstApp;

    for (let i = 0; i < TOP_RESULTS; i++) {
      if (currentApp === null) break;
      result.push(currentApp);
      currentApp = currentApp.nextApp();
    }

    return result;
  }
};

export { Host };