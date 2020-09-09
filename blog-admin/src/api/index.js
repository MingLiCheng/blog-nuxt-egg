/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-06-02 15:21:57
 */
import { getRequest, postRequest, cancelReq } from './request';

export default {
    cancelReq() {
        return cancelReq()
    },
    $$path: {
        createArticle: '/article/create',
        updateArticle: '/article/update',
        getArticleList: '/article/list',
        changeAritcleShowState: '/article/changeShowState',
        delArticle: '/article/del',
        queryArticleById: '/article',
        login: '/user/login',
    },
    changeAritcleShowState(params) {
        return postRequest(this.$$path.changeAritcleShowState, params)
    },
    updateArticleInfoById(params) {
        return postRequest(this.$$path.updateArticle, params)
    },

    login(params) {
        return postRequest(this.$$path.login, params)
    },
    queryArticleById(params) {
        return getRequest(this.$$path.queryArticleById, params)
    },
    delArticle(params) {
        return postRequest(this.$$path.delArticle, params)
    },
    createArticle(params) {
        return postRequest(this.$$path.createArticle, params)
    },
    getArticleList(params) {
        return getRequest(this.$$path.getArticleList, params)
    },
}