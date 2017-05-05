import { HostManager } from './classes/HostManager';
import { initialLoader } from './services/initialLoader';
import { injector } from './services/injector';

let hostManager = Object.create(HostManager).init(),
  contentDiv = document.getElementById('content'),
  host;

initialLoader.load(hostManager);

let result = hostManager.getTopApps(5);

for (host in result) {
  if (result.hasOwnProperty(host)) {
    contentDiv.innerHTML += injector.createHost(hostManager.hosts[host], result[host]);
  }
}