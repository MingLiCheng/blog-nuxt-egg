/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-07-08 16:34:58
 */
export default ({ app: { router }, store }) => {
  // 顶部loading
  router.afterEach((to, from) => {
    setTimeout(() => {
      document.querySelector('.tabloader').style.display = 'none'
    }, 1000)
  })
  router.beforeEach((to, from, next) => {
    document.querySelector('.tabloader').style.display = 'block'
    next()
  })
}