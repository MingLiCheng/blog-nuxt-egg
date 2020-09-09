/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-06-22 14:26:02
 */
import { Base64 } from 'js-base64'
// 创建设置Cookie
export function setCookie(name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    var eValue = Base64.encode(value)
    document.cookie =
        name +
        '=' +
        escape(eValue) +
        (expiredays == null ? '' : ';path=/;expires=' + exdate.toGMTString())
}
// 获取 Cookie的信息
export function getCookie(name, base64 = true) {
    var arr,
        reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if ((arr = document.cookie.match(reg))) {
        if (base64 === true) return Base64.decode(unescape(arr[2]))
        else return unescape(arr[2])
    } else return null
}
// 删除 Cookie的信息
export function delCookie(name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = this.getCookie(name, true)
    if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
}

export default {
    setCookie,
    getCookie,
    delCookie,
}
