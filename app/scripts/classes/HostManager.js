import { Host } from './Host';

const HOST_DOESNT_EXIST = 'Host doesn\'t exist';

const HostManager = {
  init: () => {
    this.hosts = {};
    this.lastId = 0;

    return this;
  },
  getTopAppsByHost: () => {
    let result = {};

    for (let host of this.hosts) {
      result[host.name] = host.getTopAps();
    }

    return result;
  },
  addAppToHosts: (app) => {
    let hosts = app.host;

    app.id = this.lastId++;

    hosts.forEach((host) => {
      this.addAppToHost(app, host);
    });
  },
  addAppToHost: (app, host) => {

    if (this.hosts[host] === undefined) {
      this.hosts[host] = Object.create(Host, {name: host});
      this.hosts[host].init();
    }

    this.hosts[host].addApp(app);
  },
  removeAppFromHosts: (app) => {
    let hosts = app.getHosts();

    hosts.forEach((host) => {
      this.removeAppFromHost(app, host);
    });
  },
  removeAppFromHost: (app, host) => {
    if (this.hosts[host] === undefined) {
      throw HOST_DOESNT_EXIST;
    }

    this.hosts[host].removeApp(app);
  }
};

export { HostManager };