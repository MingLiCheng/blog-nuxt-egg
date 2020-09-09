/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-05-27 15:13:26
 */
const moment = require('moment')
module.exports = app => {
    const { TEXT, STRING, INTEGER, DATE, UUID, UUIDV4, NOW } = app.Sequelize;
    const ArticleModel = app.model.define(
        'article',
        {
            id: {
                type: INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            articleId: {
                type: UUID,
                defaultValue: UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            title: {
                type: STRING(128),
                allowNull: false,
            },
            tags: {
                type: STRING(255),
                allowNull: true,
            },
            content: {
                type: TEXT,
                allowNull: true,
            },
            description: {
                type: STRING(255),
                allowNull: true,
            },
            isShow: {
                type: INTEGER(1),
                allowNull: false,
                defaultValue: '1',
            },
            isDeleted: {
                type: INTEGER(1),
                allowNull: false,
                defaultValue: '1',
            },
            updateTime: {
                type: DATE,
                allowNull: true,
                defaultValue: NOW,
                // get() {
                //     return moment(this.getDataValue('updateTime')).format('YYYY-MM-DD HH:mm:ss')
                // },
            },
            createTime: {
                type: DATE,
                allowNull: true,
                defaultValue: NOW, // new Date()  这里使用 new Date() 不行 运行之后 默认值 时运行时的值
                // get() {
                //     return moment(this.getDataValue('createTime')).format('YYYY-MM-DD HH:mm:ss')
                // },
            },
            deleteTime: {
                type: DATE,
                allowNull: true,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
            tablseName: 'article',
        }
    )

    ArticleModel.beforeBulkUpdate(article => {
        article.individualHooks = true
        article.attributes.updateTime = new Date();
        return article;
    });

    return ArticleModel;
};
