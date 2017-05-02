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

});