const config = require('config');
const logger = require('./logger');
const MongoClient = require('mongodb').MongoClient;

module.exports = new Promise((resolve, reject) => {
  // Default options
  const options = config.mongodb || {};
  const url = options.url;
  const dbName = options.db;

  if (url && dbName) {
    // Use our chosen promise library (both for mongoose and mongodb)
    options.promiseLibrary = Promise;

    // Take db and url out of options
    delete options.url;
    delete options.db;

    // Connect to db and log success or failure
    MongoClient.connect(url, options).then(client => {
      logger.info('DB connected');
      resolve(client.db(dbName));
    }).catch(err => {
      const message = `DB failed to connect: ${err.message}`;
      logger.error(message);
      reject(message);
    });
  } else {
    const message = 'DB not connected: configuration is missing';
    logger.warn(message);
    reject(message);
  }
});
