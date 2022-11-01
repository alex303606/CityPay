/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import axios from 'axios';

axios.defaults.baseURL = 'http://brandgallery.kido.kg/api/';

axios.interceptors.request.use(
  conf => {
    // Do something before request is sent
    conf.data = {
      params: {
        API_KEY: '3YFtpQzbfg3TAomaXRrawJviX',
        ...conf.data,
      },
    };

    return conf;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

AppRegistry.registerComponent(appName, () => App);
