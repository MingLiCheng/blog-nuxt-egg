/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-06-02 11:08:38
 */
import Vue from "vue";
import moment from "moment";
let filters = {
  dateFormat: function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern);
  }
};

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
export default filters;
