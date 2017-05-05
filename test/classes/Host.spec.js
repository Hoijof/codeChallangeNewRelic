import { Host } from '../../app/scripts/classes/Host';
import { default as fakeData } from '../../app/data/host-app-data.json';
import { helper } from '../helpers/helper';
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
    let app = helper.host.addApp(fakeData[0], this.host);

    expect(this.host.firstApp).toEqual(app);
  });

  it('should add two apps and order them', function () {
    let app = helper.host.addApp(fakeData[1], this.host),
      app2 = helper.host.addApp(fakeData[0], this.host);

    expect(this.host.firstApp).toEqual(app2);
    expect(this.host.firstApp.links[this.host.name].nextApp).toEqual(app);
  });

  it('should remove an app when there\'s only one left successfully', function () {
    let app = helper.host.addApp(fakeData[1], this.host);

    expect(this.host.firstApp).toEqual(app);

    this.host.removeApp(app);

    expect(this.host.firstApp).toEqual(null);
  });

  it('should throw an error if we try to remove an app from an empty host', function () {
    let app = helper.host.addApp(fakeData[1], this.host);
    this.host.removeApp(app);

    try {
      this.host.removeApp(app);
      fail('Host should throw an exception');
    } catch (e) {
      expect(true).toBe(true);
    }
  });

  it('should remove the first app and keep the strucutre coherent', function () {
    let app = helper.host.addApp(fakeData[1], this.host),
      app2 = helper.host.addApp(fakeData[0], this.host),
      app3 = helper.host.addApp(fakeData[2], this.host);

    expect(this.host.firstApp).toEqual(app2);
    expect(this.host.firstApp.links[this.host.name].nextApp).toEqual(app3);
    expect(this.host.firstApp.links[this.host.name].nextApp.links[this.host.name].nextApp).toEqual(app);

    this.host.removeApp(app2);

    expect(this.host.firstApp).toEqual(app3);
    expect(this.host.firstApp.links[this.host.name].nextApp).toEqual(app);

  });

  it('should remove an app in between and keep the strucutre coherent', function () {
    let app = helper.host.addApp(fakeData[1], this.host),
      app2 = helper.host.addApp(fakeData[0], this.host),
      app3 = helper.host.addApp(fakeData[2], this.host);

    expect(this.host.firstApp).toEqual(app2);
    expect(this.host.firstApp.links[this.host.name].nextApp).toEqual(app3);
    expect(this.host.firstApp.links[this.host.name].nextApp.links[this.host.name].nextApp).toEqual(app);

    this.host.removeApp(app3);

    expect(this.host.firstApp).toEqual(app2);
    expect(this.host.firstApp.links[this.host.name].nextApp).toEqual(app);

  });

  it('should remove the last app and keep the strucutre coherent', function () {
    let app = helper.host.addApp(fakeData[1], this.host),
      app2 = helper.host.addApp(fakeData[0], this.host),
      app3 = helper.host.addApp(fakeData[2], this.host);

    expect(this.host.firstApp).toEqual(app2);
    expect(this.host.firstApp.links[this.host.name].nextApp).toEqual(app3);
    expect(this.host.firstApp.links[this.host.name].nextApp.links[this.host.name].nextApp).toEqual(app);

    this.host.removeApp(app);

    expect(this.host.firstApp).toEqual(app2);
    expect(this.host.firstApp.links[this.host.name].nextApp).toEqual(app3);
    expect(this.host.firstApp.links[this.host.name].nextApp.links[this.host.name].nextApp).toEqual(null);

  });

  it('should return top apps', function () {
    let app = helper.host.addApp(fakeData[1], this.host),
      app2 = helper.host.addApp(fakeData[0], this.host);

    let result = this.host.getTopApps();

    expect(result.length).toBe(2);
    expect(result).toEqual([app2, app]);
  });
});