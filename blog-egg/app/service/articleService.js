/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-05-28 14:51:11
 */
const Service = require('egg').Service
class ArticleService extends Service {
    constructor(ctx) {
        super(ctx)
        this.ArticleModel = ctx.model.ArticleModel
        this.ResponseCode = ctx.response.ResponseCode
        this.ServerResponse = ctx.response.ServerResponse
    }

    async addNewArtice(article) {
        // 检查是否重名
        const newArtice = await this.ArticleModel.create({
            title: article.title,
            content: article.articleContent,
            tags: article.tags,
            description: article.description,
        })
        return newArtice
            ? this.ServerResponse.createBySuccessMsgAndData('添加成功', newArtice)
            : this.ServerResponse.createByErrorMsg('添加失败')
    }

    async queryArticleById(id) {
        const article = await this.ArticleModel.findOne({
            where: { articleId: id },
        })
        return article
            ? this.ServerResponse.createBySuccessMsgAndData('SUCCESS', article.toJSON())
            : this.ServerResponse.createByErrorMsg('为查询到信息')
    }

    async queryArticleList(params) {
        const { pageSize, pageNum } = params
        const { count, rows } = await this.ArticleModel.findAndCountAll({
            // where: { userId: role === ROLE_ADMAIN ? { $regexp: '[0-9a-zA-Z]' } : userId },
            where: { is_deleted: 1 },
            attributes: { exclude: ['id','content'] },
            order: [['id', 'DESC']],
            limit: Number(pageSize | 0),
            offset: Number((pageNum - 1) | 0) * Number(pageSize | 0),
        })

        return this.ServerResponse.createBySuccessMsgAndData('SUCCESS', {
            total: count,
            list: rows,
        })
    }
    async queryArticleListOfShow(params) {
        const { pageSize, pageNum } = params
        const { count, rows } = await this.ArticleModel.findAndCountAll({
            // where: { userId: role === ROLE_ADMAIN ? { $regexp: '[0-9a-zA-Z]' } : userId },
            where: { is_deleted: 1, isShow: 1 },
            attributes: { exclude: ['id', 'content'] },
            order: [['id', 'DESC']],
            limit: Number(pageSize | 0),
            offset: Number((pageNum - 1) | 0) * Number(pageSize | 0),
        })

        return this.ServerResponse.createBySuccessMsgAndData('SUCCESS', {
            total: count,
            list: rows,
        })
    }

    // 修改文章信息
    async updateArticleInfo(article) {
        const { id, title, articleContent, description } = article
        try {
            const res = await this.ArticleModel.update(
                {
                    title,
                    content: articleContent,
                    description,
                },
                { where: { articleId: id } }
            )
            console.log('res', res)

            return res.length > 0
                ? this.ServerResponse.createBySuccessMsg('修改成功')
                : this.ServerResponse.createByErrorMsg('修改失败+' + res)
        } catch (error) {
            return this.ServerResponse.createByErrorMsg('修改失败+' + error)
        }
    }

    async deleteArticleById(params) {
        const { articleId } = params
        // 逻辑删除
        const res = await this.ArticleModel.update({ isDeleted: -1 }, { where: { articleId } })
        return res.length > 0
            ? this.ServerResponse.createBySuccessMsg('删除成功')
            : this.ServerResponse.createByErrorMsg('删除失败')
    }

    // updateShowState
    async updateArticleShowState(params) {
        const res = await this.ArticleModel.update(
            {
                isShow: params.isShow,
            },
            { where: { articleId: params.articleId } }
        )
        return res.length > 0
            ? this.ServerResponse.createBySuccessMsg('更新成功')
            : this.ServerResponse.createByErrorMsg('更新失败')
    }
}

module.exports = ArticleService
