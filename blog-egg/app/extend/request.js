/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-05-28 14:06:12
 */
class RequestParamsVerify {
    constructor(params) {
        this.params = params;
    }
    static verifyParamsIsRequired(params,data) {
      const res = params.find(key => data[key] === null || data[key] == undefined);
      return res ? res : null;
    }
}

module.exports = {
    RequestParamsVerify,
};