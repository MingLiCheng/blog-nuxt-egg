/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-06-02 14:52:59
 */
const env = process.env.NODE_ENV
const apiConfig = {
    development: {
        baseUrl: 'http://127.0.0.1:7003/backend',
    },
    production: {
        baseUrl: 'http://123.56.11.149:7003/backend',
    },
    test: {},
}

export default {
    apiConfig: apiConfig[`${env}`],
}
