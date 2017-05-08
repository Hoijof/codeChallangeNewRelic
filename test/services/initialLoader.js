import { HostManager } from '../../app/scripts/classes/HostManager';
import { initialLoader } from '../../app/scripts/services/initialLoader';
import { default as fakeData } from '../../app/data/host-app-data.json';

describe('Initial Loader Servie', function () {
  it('should load the data for the application through hostManager', function () {
    let hostManager = Object.create(HostManager).init();

    spyOn(hostManager, 'addAppToHosts').and.callThrough();

    initialLoader.load(hostManager, [
      fakeData[0],
      fakeData[1],
      fakeData[2],
      fakeData[3],
      fakeData[4]
    ]);

    expect(hostManager.addAppToHosts.calls.count()).toBe(5);
  });
});