module.exports = options => {
  return async function checkLogin(ctx, next) {
    const user = ctx.session.user;
    ctx.logger.info('请求：', ctx.request.url, 'session:', ctx.session.user)
    if(ctx.request.url.startsWith('/front/')){
      await next()
      return false
    }
    if (!user) {
        // 如果session中不存在 user 则没有登录
        // 判断是否在白名单中
        if (!options.whiteList.includes(ctx.request.url)) {
            ctx.status = 401
            return (ctx.body = ctx.response.ServerResponse.createByErrorCodeMsg(
                ctx.response.ResponseCode.NEED_LOGIN,
                '用户未登录'
            ))
        }
    } else {
        if (!(user.id < 2)) {
            ctx.status = 403
            return (ctx.body = ctx.response.ServerResponse.createByErrorCodeMsg(
                ctx.response.ResponseCode.NO_AUTH,
                '抱歉！您暂无权限！请联系管理员！'
            ))
        }
    }
    await next()
  };
};
