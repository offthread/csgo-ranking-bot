//import _ from 'lodash';
//import local from './local';

const _ = require('lodash');
const local = require('./local');

const NODE_ENV = process.NODE_ENV || 'local';

const settings = {
  defaults: {
    mongo: {
      host: 'localhost',
      database: 'csgo-ranking-bot',
      port: 27017
    }
  },
  local: {

  },
  development: {

  },
  production: {

  }
};
const config = _.defaultsDeep(local, settings[NODE_ENV], settings['defaults']);

module.exports = config;