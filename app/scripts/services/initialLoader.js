/**
 This Prototype will load the data from the json
 */
const initialLoader = {
  load: (hostManager, data, debug = false) => {
    const startTime = Date.now();
    data.forEach(function (app) {

      hostManager.addAppToHosts(app);
    });

    if (debug === true) {
      let endTime = Date.now();
      console.log('Load Time = ' + (endTime - startTime) / 1000 + 's');
    }
  }
};

export { initialLoader };