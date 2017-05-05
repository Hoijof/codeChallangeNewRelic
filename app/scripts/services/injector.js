const HOST_TEMPLATE = '<article class="hostMetrics">' +
  '<header>%%hostName%%</header>' +
  '%%apps%% ' +
  '</article>';

const APP_TEMPLATE = '<div data-release-date="%%releaseNumber%%" class="metric">' +
  '<div class="score">%%score%%</div>' +
  '<div class="name">%%appName%%</div>' +
  '</div>';

const injector = {
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
  createApp: (app) => {
    let appConfig = {
      releaseNumber: app.version,
      score: app.apdex,
      appName: app.name
    };

    return injector.inject(APP_TEMPLATE, appConfig);
  },
  inject: (template, values) => {
    for (let key in values) {
      template = template.replace('%%' + key + '%%', values[key]);
    }

    return template;
  }
};

export { injector };