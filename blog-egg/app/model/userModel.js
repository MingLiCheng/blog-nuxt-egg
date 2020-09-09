/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-04-29 15:59:11
 */

module.exports = app => {
    const { STRING, INTEGER, DATE, UUID, UUIDV4 } = app.Sequelize;
    const UserModel = app.model.define(
        'user',
        {
            id: {
                type: INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            // 用户id
            userId: {
                type: UUID,
                defaultValue: UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            username: {
                type: STRING(50),
                allowNull: false,
                unique: true,
            },
            password: {
                type: STRING(50),
                allowNull: false,
            },
            email: {
                type: STRING(50),
                allowNull: true,
            },
            createTime: {
                type: DATE,
                allowNull: false,
                defaultValue: new Date(),
            },
            updateTime: {
                type: DATE,
                allowNull: false,
                defaultValue: new Date(),
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
            tablseName: 'user',
        }
    );

    UserModel.beforeBulkUpdate(user => {
        article.individualHooks = true
        user.attributes.updateTime = new Date();
        return user;
    });
    return UserModel;
};
