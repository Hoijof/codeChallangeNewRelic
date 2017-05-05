import { HostManager } from './classes/HostManager';
import { initialLoader } from './services/initialLoader';
import { injector } from './services/injector';

const hostManager = Object.create(HostManager).init(),
  mainContainer = document.getElementById('mainContainer'),
  contentDiv = document.getElementById('content');

function init () {
  initialLoader.load(hostManager);

  let result = hostManager.getTopApps(5);

  for (let host in result) {
    if (result.hasOwnProperty(host)) {
      contentDiv.innerHTML += injector.createHost(hostManager.hosts[host], result[host]);
    }
  }
}

function addListeners () {
  document.getElementById('changeView').addEventListener('click', function (e) {
    if (mainContainer.classList.contains('list')) {
      mainContainer.classList.remove('list');
    } else {
      mainContainer.classList.add('list');
    }
  });

  contentDiv.addEventListener('click', function (e) {
    if (e.target.matches('.metric, .name, .score')) {
      e.stopPropagation();

      let elem = e.target.getAttribute('data-release-date') === null ? e.target.parentNode : e.target;

      alert('Release number: ' + elem.getAttribute('data-release-date'));

    }
  });
}

addListeners();
init();
