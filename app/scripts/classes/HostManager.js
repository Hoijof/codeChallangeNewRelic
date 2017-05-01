const HostManager = {
  init: () => {
    this.hosts = {};
    this.instance = this;

    return this;
  },
  getInstance: () => {
    return this.instance || this.init();
  },
  getTopAppsByHost: () => {
    return this.hosts;
  },
  addAppToHosts: () => {

  },
  removeAppFromHosts: () => {

  },
};

export {HostManager};