import { injector } from '../../app/scripts/services/injector';
import { default as fakeData } from '../../app/data/host-app-data.json';


describe('Injector Prototype', function () {
  it('should create a Host HTML template', function () {

    spyOn(injector, 'createApp').and.callThrough();
    spyOn(injector, 'inject').and.callThrough();

    let result = injector.createHost(fakeData[0].host[0], [fakeData[0], fakeData[1]]);

    expect(injector.createApp.calls.count()).toBe(2);
    expect(injector.inject).toHaveBeenCalled();
    expect(result).toEqual(jasmine.any(String));
  });

  it('should create the HTML template for an app', function () {
    spyOn(injector, 'inject').and.callThrough();

    let result = injector.createApp({
      version: 21242352341241,
      apdex: 7324243529,
      name: 'testName234'
    });

    expect(injector.inject).toHaveBeenCalled();
    expect(result.includes('21242352341241')).toBe(true);
    expect(result.includes('7324243529')).toBe(true);
    expect(result.includes('testName234')).toBe(true);

  });

  it('should inject properly', function () {
    const testTemplate = 'lorem ipsum %%testValue1%% saklfjakls %%testValue2%%',
      testValues = {
        testValue1: 'test51',
        testValue2: 'test52'
      };

    let result = injector.inject(testTemplate, testValues);

    expect(result.includes('test51')).toBe(true);
    expect(result.includes('test52')).toBe(true);

  });
});