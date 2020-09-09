/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-04-29 16:24:08
 */
module.exports = app => {
  const { router,controller } = app
  router.get('/backend/test', controller.backend.index.test);



  // user
  router.get('/backend/user/test', controller.backend.userController.test);
  // 新增用户
  router.post('/backend/user/register', controller.backend.userController.register);
  // 删除用户
    // login
  router.post('/backend/user/login', controller.backend.userController.login)


  // 文章
  // 新增
  router.post('/backend/article/create', controller.backend.articleController.create);
  // 查询
  router.get('/backend/article', controller.backend.articleController.detail);
  router.get('/backend/article/list', controller.backend.articleController.list);
  router.post('/backend/article/update', controller.backend.articleController.update)
  router.post('/backend/article/changeShowState', controller.backend.articleController.changeShowState)
  router.post('/backend/article/del', controller.backend.articleController.del)

}