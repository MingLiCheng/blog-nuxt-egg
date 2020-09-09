/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = (exports = {
        security: {
            xframe: {
                enable: false,
            },
            csrf: {
                enable: false,
            },
            domainWhiteList: ['*'],
        },
    })

    config.cors = {
        // origin: 'http://127.0.0.1:3000',  // 这里注释掉 上面的 domainWhiteList就会生效
        credentials: true,
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    }

    // 自定义启动端口
    config.cluster = {
        listen: {
            path: '',
            port: 7003,
            hostname: '0.0.0.0',
        },
    }

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1588140941053_5935'

    // add your middleware config here
      config.middleware = ['checkLogin']
      config.checkLogin = {
          whiteList: ['/backend/user/login', '/backend/article/list'],
      }

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    }

    config.sequelize = {
        dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
        database: 'cml_blog',
        host: '123.56.11.149',
        port: '3306',
        username: 'root',
        password: '888123',
        pool: {
            max: 50,
            min: 0,
            idle: 10000,
        },
        timezone: '+08:00', //东八时区
    }
    config.session = {
        key: 'SESSION_ID', // 设置session cookie里面的key
        maxAge: 1000 * 60 * 30, // 设置过期时间
        httpOnly: false,
        encrypt: false,
        signed: false,
        renew: true, // renew等于true 那么每次刷新页面的时候 session都会被延期
    }

    config.redis = {
        client: {
            host: '123.56.11.149',
            port: '6379',
            password: '147258',
            db: '0',
        },
        agent: true,
    }

    return {
        ...config,
        ...userConfig,
    }
}
