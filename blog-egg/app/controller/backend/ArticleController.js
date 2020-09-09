const Controller = require('egg').Controller

/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-05-28 14:53:46
 */
class ArticleController extends Controller {
    constructor(ctx) {
        super(ctx)
        this.session = ctx.session
        this.ArticleService = ctx.service.articleService
        this.RequestParamsVerify = ctx.request.RequestParamsVerify
        this.ServerResponse = ctx.response.ServerResponse
    }

    async detail() {
        const { articleId } = this.ctx.request.query
        if (!articleId) {
            this.ctx.body = this.ServerResponse.createByErrorMsg('缺少articleId参数')
            return
        }
        const articleInfo = await this.ArticleService.queryArticleById(articleId)
        this.ctx.body = articleInfo
    }

    async list() {
        const { pageSize = 10, pageNum = 1 } = this.ctx.request.query
        const articleList = await this.ArticleService.queryArticleList({ pageSize, pageNum })
        this.ctx.body = articleList
    }

    async create() {
        const article = this.ctx.request.body
        // 参数校验
        const paramsVerifyRes = await this.RequestParamsVerify.verifyParamsIsRequired(
            ['title', 'description', 'articleContent'],
            article
        )
        if (paramsVerifyRes) {
            this.ctx.body = this.ServerResponse.createByErrorMsg(`缺少${paramsVerifyRes}参数`)
            return
        }
        const res = await this.ArticleService.addNewArtice(article)
        this.ctx.body = res
    }

    async update() {
        const article = this.ctx.request.body
        if (!article.id) {
            this.ctx.body = this.ServerResponse.createByErrorMsg('缺少参数id')
            return
        }
        const res = await this.ArticleService.updateArticleInfo(article)
        this.ctx.body = res
    }

    async changeShowState(){
        const {articleId, showState} = this.ctx.request.body
        if (!articleId) {
            this.ctx.body = this.ServerResponse.createByErrorMsg('缺少参数articleId')
            return
        }
        if (!showState) {
            this.ctx.body = this.ServerResponse.createByErrorMsg('缺少参数showState')
            return
        }

        const isShow = showState >= 1 ? 1 : -1
        const res = await this.ArticleService.updateArticleShowState({ articleId, isShow })
        this.ctx.body = res
    }

    async del() {
        const article = this.ctx.request.body
        // 参数校验
        const paramsVerifyRes = await this.RequestParamsVerify.verifyParamsIsRequired(
            ['articleId'],
            article
        )
        if (paramsVerifyRes) {
            this.ctx.body = this.ServerResponse.createByErrorMsg(`缺少${paramsVerifyRes}参数`)
            return
        }
        const resInfo = await this.ArticleService.deleteArticleById(article)
        this.ctx.body = resInfo
    }
}

module.exports = ArticleController
