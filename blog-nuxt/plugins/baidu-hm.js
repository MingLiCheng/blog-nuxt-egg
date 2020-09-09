/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-04-29 11:39:59
 */
export default ({app: {router}, store}) => {
  /* 当路由改变的时候，推送一次 */
  router.afterEach((to, from) => {
    try {
      window._hmt = window._hmt || [];
      window._hmt.push(['_trackPageview', to.fullPath])
    } catch (e) {
    }
  })
}