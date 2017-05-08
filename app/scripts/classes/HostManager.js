import { Host } from './Host';

const HOST_DOESNT_EXIST = 'Host doesn\'t exist';

/**
 This Prototype will serve as an API to the main algorithm. It will handle all the massive insertions
 and queries.
 */
const HostManager = {
  /**
   Initializes the scope.
   @returns {HostManager}
   */
  init: function () {
    this.hosts = {};
    this.lastId = 0;

    return this;
  },
  /**
   Returns the top apps of a host given its name
   @param hostName
   @returns {*|Array}
   */
  getTopAppsByHost: function (hostName) {
    return this.hosts[hostName].getTopApps();
  },
  /**
   Returns the top apps for all the hosts
   @param appsPerHost
   @returns {{Object}}
   */
  getTopApps: function (appsPerHost) {
    let result = {},
      keys = Object.keys(this.hosts);


    for (let host of keys) {
      result[host] = this.hosts[host].getTopApps(appsPerHost);
    }

    return result;
  },
  /**
   Adds an app to all its hosts
   @param app
   */
  addAppToHosts: function (app) {
    let hosts = app.host;

    if (hosts === undefined) return;

    app.id = this.lastId++;
    app.links = {};

    hosts.forEach((host) => {
      app.links[host] = {nextApp: null};
      this.addAppToHost(app, host);
    });
  },
  /**
   Adds an app to a specific host
   @param app
   @param host
   */
  addAppToHost: function (app, host) {

    if (this.hosts[host] === undefined) {
      this.hosts[host] = Object.create(Host);
      this.hosts[host].init(host);
    }

    this.hosts[host].addApp(app);
  },
  /**
   Removes an app from all its hosts
   @param app
   */
  removeAppFromHosts: function (app) {
    let hosts = app.host;

    hosts.forEach((host) => {
      this.removeAppFromHost(app, host);
    });
  },
  /**
   Removes an app from an specific host
   @param app
   @param host
   */
  removeAppFromHost: function (app, host) {
    if (this.hosts[host] === undefined) {
      throw HOST_DOESNT_EXIST;
    }

    this.hosts[host].removeApp(app);

    if (this.hosts[host].firstApp === undefined || this.hosts[host].firstApp === null) {
      delete this.hosts[host];
    }
  }
};

export { HostManager };