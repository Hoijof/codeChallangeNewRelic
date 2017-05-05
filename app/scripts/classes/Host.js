const NO_APPS_IN_HOST = 'No applications registered in the host',
  TOP_RESULTS = 20;

const Host = {
  init: function (name) {
    this.firstApp = undefined;
    this.name = name;
  },
  addApp: function (app) {
    let currentApp = this.firstApp,
      previousApp = undefined;

    if (this.firstApp === undefined) {
      // No apps in the host
      this.firstApp = app;
      app.links[this.name].nextApp = null;
      return;
    }

    // We look for a fit for the app
    while (currentApp !== null) {
      if (app.apdex >= currentApp.apdex) {
        // Found a fit
        if (previousApp === undefined) {
          // The app is going in first place
          app.links[this.name].nextApp = this.firstApp;
          this.firstApp = app;
        } else if (currentApp.links[this.name].nextApp === null) {
          // The app is going in last place
          previousApp.links[this.name].nextApp = app;
          app.links[this.name].nextApp = currentApp;
        } else {
          // Standard case
          previousApp.links[this.name].nextApp = app;
          app.links[this.name].nextApp = currentApp;
        }

        return;
      }

      previousApp = currentApp;
      currentApp = currentApp.links[this.name].nextApp;
    }

    previousApp.links[this.name].nextApp = app;
    app.links[this.name].nextApp = null;
  },
  removeApp: function (app) {
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
          this.firstApp = currentApp.links[this.name].nextApp;
        } else {
          previousApp.links[this.name].nextApp = currentApp.links[this.name].nextApp;
        }
      }

      previousApp = currentApp;
      currentApp = currentApp.links[this.name].nextApp;
    }

  },
  getTopApps: function (appsPerHost = TOP_RESULTS) {
    let result = [],
      currentApp = this.firstApp;

    for (let i = 0; i < appsPerHost; i++) {
      if (currentApp === null) break;
      result.push(currentApp);
      currentApp = currentApp.links[this.name].nextApp;
    }

    return result;
  }
};

export { Host };