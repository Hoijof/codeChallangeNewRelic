const NO_APPS_IN_HOST = 'No applications registered in the host',
  TOP_RESULTS = 20;

/**
 This Prototype will handle all the Host logic. It will add methods in order to add/remove apps
 from the host in a sorted way. It uses a pointer structure, having a link to the first app
 (the highest) and then that app having a link to the next one, until null is found.
 */
const Host = {
  /**
   Initialize the scope
   @param name
   */
  init: function (name) {
    this.firstApp = undefined;
    this.name = name;
  },
  /**
   Adds an app to the pointer structure, keeping the structure sorted.
   @param app
   */
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
    while (currentApp !== null && currentApp !== undefined) {
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
  /**
   Removes an app from the pointer structure, keeping the structure sorted.
   @param app
   */
  removeApp: function (app) {
    let currentApp = this.firstApp,
      previousApp = undefined;

    if (this.firstApp === undefined || this.firstApp === null) {
      throw NO_APPS_IN_HOST;
    }

    // We search the app
    while (currentApp !== null) {
      if (currentApp.id === app.id) {
        // found the app
        if (previousApp === undefined || previousApp === null) {
          // The app is the first app
          this.firstApp = currentApp.links[this.name].nextApp;
        } else {
          previousApp.links[this.name].nextApp = currentApp.links[this.name].nextApp;
        }
        break;
      }

      previousApp = currentApp;
      currentApp = currentApp.links[this.name].nextApp;
    }

  },
  /**
   Get the N top apps of this host sorted by apdex
   @param appsPerHost specifies the number of apps to return
   @returns {Array}
   */
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