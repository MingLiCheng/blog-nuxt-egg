/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-04-29 17:23:02
 */
const Service = require('egg').Service;
const md5 = require('md5');
const { PWD_EXTEND_SECRET_KEY } = require('../common/property');

class UserService extends Service {
    constructor(ctx) {
        super(ctx);
        this.UserModel = ctx.model.UserModel;
        this.ResponseCode = ctx.response.ResponseCode;
        this.ServerResponse = ctx.response.ServerResponse;
    }

    async checkUserName(username) {
      const userInfo = await this.UserModel.findOne({
        where:{username},
        attributes: ['id','username']
      })
      console.log('验证用户名是否存在','username',username,'userInfo', userInfo && userInfo.toJSON());
      return !!userInfo;
    }

    async register(user) {
      console.log('this.ServerResponse', this.ServerResponse);
      if (await this.checkUserName(user.username)){
        return this.ServerResponse.createByErrorMsg('用户名已存在')
      }
      const newUser = await this.UserModel.create({
          username: user.username,
          email: user.email,
          password: md5(user.password + PWD_EXTEND_SECRET_KEY),
      });
      return newUser
          ? this.ServerResponse.createBySuccessMsgAndData('注册成功', newUser.toJSON())
          : this.ServerResponse.createByErrorMsg('注册失败');
    }
    async login(user) {
      const { username , password } = user
      const userInfo = await this.UserModel.findOne({
          where: { username, password: md5(password + PWD_EXTEND_SECRET_KEY) },
      })
      console.log('login-service-userInfo', userInfo, userInfo && userInfo.toJSON())

      return userInfo
          ? this.ServerResponse.createBySuccessMsgAndData('登陆成功', userInfo.toJSON())
          : this.ServerResponse.createByErrorMsg('登录失败，请检查用户名和密码是否正确！')
    }
}

module.exports = UserService;
