import { HostManager } from './classes/HostManager';
import { initialLoader } from './services/initialLoader';

let hostManager = Object.create(HostManager).init();

initialLoader.load(hostManager);

console.log(hostManager.getTopAppsByHost());