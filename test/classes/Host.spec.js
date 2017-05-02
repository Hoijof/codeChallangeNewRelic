import { Host } from '../../app/scripts/classes/Host';
import { default as fakeData } from '../../app/data/host-app-data.json';

describe('Host Prototype', function () {
  const TEST_NAME = 'testHost';

  beforeEach(function () {
    this.host = Object.create(Host);
    this.host.init(TEST_NAME);
  });

  it('should init properly', function () {
    expect(this.host.name).toBe(TEST_NAME);
  });

  it('should add an app', function () {
    let app = fakeData[0];

    app.id = 0;
    app.links = {};
    app.links[this.host.name] = {nextApp: null};

    this.host.addApp(app);

    expect(this.host.firstApp).toEqual(app);
  });

  it('should add two apps and order them', function () {
    let app = fakeData[1];

    app.id = 1;
    app.links = {};
    app.links[this.host.name] = {nextApp: null};

    this.host.addApp(app);

    let app2 = fakeData[0];

    app2.id = 0;
    app2.links = {};
    app2.links[this.host.name] = {nextApp: null};

    this.host.addApp(app2);

    expect(this.host.firstApp).toEqual(app2);
    expect(this.host.firstApp.links[this.host.name].nextApp).toEqual(app);
  });

  it('should remove an app succesfully', function () {
    let app = fakeData[1];

    app.id = 1;
    app.links = {};
    app.links[this.host.name] = {nextApp: null};

    this.host.addApp(app);

    expect(this.host.firstApp).toEqual(app);

    this.host.removeApp(app);

    expect(this.host.firstApp).toEqual(null);
  });

  it('should return top apps', function () {
    let app = fakeData[1];

    app.id = 1;
    app.links = {};
    app.links[this.host.name] = {nextApp: null};

    this.host.addApp(app);

    let app2 = fakeData[0];

    app2.id = 0;
    app2.links = {};
    app2.links[this.host.name] = {nextApp: null};

    this.host.addApp(app2);

    let result = this.host.getTopApps();

    expect(result.length).toBe(2);
    expect(result).toEqual([app2, app]);
  });
});