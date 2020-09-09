/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-04-26 10:36:15
 */
import { getRequest, postRequest, cancelReq } from './request'

export default {
  $$path: {
    adminLogin: "/backend/article/list",
    getArticleDetail: "/backend/article/list"
  },

  adminLogin(params) {
    getRequest("/backend/article/list", params);
  },
  getArticleDetail(params){
    return getRequest(this.$$path.getArticleDetail,params);
  }
};
