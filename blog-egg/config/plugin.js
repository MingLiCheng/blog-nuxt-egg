'use strict';

/** @type Egg.EggPlugin */
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.cors = {
    enable: true,
    package: 'egg-cors',
};

exports.redis = {
    enable: true,
    package: 'egg-redis',
}
exports.session = {
    enable: true,
    package: 'egg-session',
}
exports.sessionRedis = {
    enable: true,
    package: 'egg-session-redis',
}
