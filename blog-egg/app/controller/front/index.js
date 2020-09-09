/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-04-29 15:03:28
 */
const Controller = require('egg').Controller;
module.exports = app =>
    class FrontIndexController extends Controller {
        constructor(ctx) {
            super(ctx)
            this.session = ctx.session
            this.request = ctx.request
            this.CartService = ctx.service.cartService
            this.UserService = ctx.service.userService
            this.ResponseCode = ctx.response.ResponseCode
            this.ServerResponse = ctx.response.ServerResponse
            this.ArticleService = ctx.service.articleService
        }

        // test
        async test() {
            this.ctx.body = {
                code: '0',
                message: 'the api of front is running',
            }
        }

        async list() {
            const { pageSize = 10, pageNum = 1 } = this.ctx.request.query
            const articleList = await this.ArticleService.queryArticleListOfShow({ pageSize, pageNum })
            this.ctx.body = articleList
        }
    }