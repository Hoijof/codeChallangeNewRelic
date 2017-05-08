import { HostManager } from '../../app/scripts/classes/HostManager';
import { default as fakeData } from '../../app/data/host-app-data.json';

describe('HostManager prototype', function () {
  beforeEach(function () {
    this.hostManager = Object.create(HostManager).init();
  });

  it('should init properly', function () {
    expect(this.hostManager.hosts).toEqual(jasmine.any(Object));
    expect(this.hostManager.lastId).toBe(0);
  });

  it('should create all the hosts in an app', function () {
    let app = fakeData[0];

    spyOn(this.hostManager, 'addAppToHost').and.callThrough();

    this.hostManager.addAppToHosts(app);

    expect(Object.keys(this.hostManager.hosts)).toEqual(app.host);
    expect(this.hostManager.addAppToHost.calls.count()).toBe(app.host.length);

    app.host.forEach((h) => {
      expect(this.hostManager.hosts[h]).toEqual(jasmine.any(Object));
    });
  });

  it('should add an app to a host', function () {
    let app = fakeData[0];

    this.hostManager.addAppToHost(app, app.host[0]);

    expect(Object.keys(this.hostManager.hosts).length).toBe(1);
    expect(this.hostManager.hosts[app.host[0]]).toEqual(jasmine.any(Object));
  });

  it('should remove an app from all its hosts', function () {
    let app = fakeData[0];
    spyOn(this.hostManager, 'removeAppFromHost').and.callThrough();

    this.hostManager.addAppToHosts(app);

    this.hostManager.removeAppFromHosts(app);

    expect(this.hostManager.removeAppFromHost.calls.count()).toBe(app.host.length);
  });

  it('should remove an app from a host', function () {
    let app = fakeData[0],
      app2 = fakeData[1];

    app.id = 0;
    app.links = {};
    app.links[app.host[0]] = {nextApp: null};
    this.hostManager.addAppToHost(app, app.host[0]);

    app2.id = 1;
    app2.links = {};
    app2.links[app.host[0]] = {nextApp: null};
    this.hostManager.addAppToHost(app2, app.host[0]);

    spyOn(this.hostManager.hosts[app.host[0]], 'removeApp').and.callThrough();

    this.hostManager.removeAppFromHost(app, app.host[0]);

    expect(this.hostManager.hosts[app.host[0]].removeApp).toHaveBeenCalled();

    // Error case
    this.hostManager.removeAppFromHost(app2, app.host[0]);

    try {
      this.hostManager.removeAppFromHost(app, app.host[0]);
      fail('HostManager should throw an exception');
    } catch (e) {
      expect();
    }
  });

  it('should get top apps by host', function () {
    let app = fakeData[0];

    this.hostManager.addAppToHost(app, app.host[0]);

    let result = this.hostManager.getTopAppsByHost(app.host[0]);

    expect(result.length).toBe(1);
    expect(result).toEqual([app]);
  });

  it('should get top apps', function () {
    let app = fakeData[0],
      app2 = fakeData[1],
      app3 = fakeData[2];

    this.hostManager.addAppToHosts(app);
    this.hostManager.addAppToHosts(app2);
    this.hostManager.addAppToHosts(app3);

    let result = this.hostManager.getTopApps();

    expect(Object.keys(result).length).toBe(6);

    let expectedResult = app.host.concat(app2.host).concat(app3.host).unique();

    expect(Object.keys(result)).toEqual(expectedResult);
  });
});