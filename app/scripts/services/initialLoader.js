import { default as data } from '../../data/host-app-data.json';

const initialLoader = {
  load: (hostManager) => {
    const startTime = Date.now();
    for (let app in data) {
      hostManager.addAppToHosts(data[app]);
    }
    const endTime = Date.now();

    console.log('Load Time = ' + (endTime - startTime) / 1000 + 's');
  }
};

export { initialLoader };