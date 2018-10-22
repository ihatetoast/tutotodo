var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  const config = require('./config.json');
  const currentEnv = config[env];
  // Object.keys produces an array of the keys for the obj. in this case it's development and test. for each of those, set process.env[key] to the config argument of key
  Object.keys(currentEnv).forEach(key => {
    process.env[key] = currentEnv[key];
  });
}
