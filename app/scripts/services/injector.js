const HOST_TEMPLATE = '<article class="hostMetrics">' +
  '<header>%%hostName%%</header>' +
  '%%apps%% ' +
  '</article>';

const APP_TEMPLATE = '<div data-release-date="%%releaseNumber%%" class="metric">' +
  '<div class="score">%%score%%</div>' +
  '<div class="name">%%appName%%</div>' +
  '</div>';

/**
 This Prototype will handle all the HTML manipulation. It provides a template system where user can
 inject variables to the HTML template using an object.
 */
const injector = {
  /**
   Creates a String containing the HTML of a HOST_TEMPLATE with its configuration
   @param host
   @param apps
   @returns {String}
   */
  createHost: (host, apps) => {
    let appsTemplates = [],
      hostConfig = {
        hostName: host.name
      };

    apps.forEach((app) => {
      appsTemplates.push(injector.createApp(app));
    });

    hostConfig.apps = appsTemplates.reduce((previous, current) => {
      return '' + previous + current;
    });

    return injector.inject(HOST_TEMPLATE, hostConfig);
  },
  /**
   Creates a String containing the HTML of a APP_TEMPLATE with its configuration
   @param app
   @returns {String}
   */
  createApp: (app) => {
    let appConfig = {
      releaseNumber: app.version,
      score: app.apdex,
      appName: app.name
    };

    return injector.inject(APP_TEMPLATE, appConfig);
  },
  /**
   Creates a String with the variables parsed into it
   @param template
   @param values
   @returns {String}
   */
  inject: (template, values) => {
    for (let key in values) {
      template = template.replace('%%' + key + '%%', values[key]);
    }

    return template;
  }
};

export { injector };