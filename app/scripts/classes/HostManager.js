import { Host } from './Host';

const HOST_DOESNT_EXIST = 'Host doesn\'t exist';

const HostManager = {
  init: function () {
    this.hosts = {};
    this.lastId = 0;

    return this;
  },
  getTopAppsByHost: function (hostName) {
    return this.hosts[hostName].getTopApps();
  },
  getTopApps: function (appsPerHost) {
    let result = {},
      keys = Object.keys(this.hosts);


    for (let host of keys) {
      result[host] = this.hosts[host].getTopApps(appsPerHost);
    }

    return result;
  },
  addAppToHosts: function (app) {
    let hosts = app.host;

    app.id = this.lastId++;
    app.links = {};

    hosts.forEach((host) => {
      app.links[host] = {nextApp: null};
      this.addAppToHost(app, host);
    });
  },
  addAppToHost: function (app, host) {

    if (this.hosts[host] === undefined) {
      this.hosts[host] = Object.create(Host);
      this.hosts[host].init(host);
    }

    this.hosts[host].addApp(app);
  },
  removeAppFromHosts: function (app) {
    let hosts = app.host;

    hosts.forEach((host) => {
      this.removeAppFromHost(app, host);
    });
  },
  removeAppFromHost: function (app, host) {
    if (this.hosts[host] === undefined) {
      throw HOST_DOESNT_EXIST;
    }

    this.hosts[host].removeApp(app);
  }
};

export { HostManager };