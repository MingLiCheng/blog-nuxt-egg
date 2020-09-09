/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-04-26 10:40:57
 */
const env = process.env.NODE_ENV
console.log('env', env);


 const apiConfig = {
   development: {
    //  reqBaseUrl: "http://127.0.0.1:7003"
     reqBaseUrl: "http://10.5.14.95:7003"
   },
   test: {
     reqBaseUrl: ""
   },
   production: {
     reqBaseUrl: "http://123.56.11.149:7003"
   }
 };

 export default {
   apiConfig: apiConfig[env === 'development' ? 'development' : env === 'production' ? 'production' : env === 'test' ? 'test' : env]
 }