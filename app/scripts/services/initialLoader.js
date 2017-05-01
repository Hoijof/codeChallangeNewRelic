import { data } from '../../data/host-app-data.json';

const initialLoader = {
  load: () => {
    console.log(data);
  }
};

export { initialLoader };