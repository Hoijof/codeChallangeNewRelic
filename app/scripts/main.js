import { HostManager } from './classes/HostManager';
import { initialLoader } from './services/initialLoader';
import { injector } from './services/injector';
import { default as data } from '../data/host-app-data.json';

const LIST_CLASS = 'list',
  TEXT_RELEASE_NUMBER = 'Release number: ';

const hostManager = Object.create(HostManager).init(),
  mainContainer = document.getElementById('mainContainer'),
  overlay = document.getElementById('overlay'),
  contentDiv = document.getElementById('content');


addListeners();
init();
// Since our algorithm is synchronous it's okay to do it this way
overlay.style.display = 'none';


/**
 Initializes the app
 */
function init () {
  initialLoader.load(hostManager, data);

  let result = hostManager.getTopApps(5);

  for (let host in result) {
    if (result.hasOwnProperty(host)) {
      contentDiv.innerHTML += injector.createHost(hostManager.hosts[host], result[host]);
    }
  }
}

/**
 Adds all the DOM related events
 */
function addListeners () {
  document.getElementById('changeView').addEventListener('click', function (e) {
    if (mainContainer.classList.contains(LIST_CLASS)) {
      mainContainer.classList.remove(LIST_CLASS);
    } else {
      mainContainer.classList.add(LIST_CLASS);
    }
  });

  contentDiv.addEventListener('click', function (e) {
    if (e.target.matches('.metric, .name, .score')) {
      e.stopPropagation();

      let elem = e.target.getAttribute('data-release-date') === null ? e.target.parentNode : e.target;

      alert(TEXT_RELEASE_NUMBER + elem.getAttribute('data-release-date'));

    }
  });
}

