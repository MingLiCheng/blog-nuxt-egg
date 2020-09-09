/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-04-29 15:02:40
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/front/test', controller.front.index.test);
    // 查询
  router.get('/front/article', controller.backend.articleController.detail)
  router.get('/front/article/list', controller.front.index.list)

};
