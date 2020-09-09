/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-04-29 16:16:47
 */

const Controller = require('egg').Controller
const Base64 = require('js-base64').Base64
class UserController extends Controller {
    constructor(ctx) {
        super(ctx)
        this.session = ctx.session
        this.UserModel = ctx.model.UserModel
        this.UserService = ctx.service.userService
        this.ResponseCode = ctx.response.ResponseCode
        this.ServerResponse = ctx.response.ServerResponse
        this.RequestParamsVerify = ctx.request.RequestParamsVerify
        // console.log('ctx',ctx);
    }

    async test() {
        console.log('this.UserModel', this.UserModel)

        this.ctx.body = {
            code: '0',
            message: 'this is userController',
        }
    }
    async userList() {}

    // 注册 post
    async register() {
        const user = this.ctx.request.body
        // 需要在这校验参数
        const paramsVerifyRes = await this.RequestParamsVerify.verifyParamsIsRequired(
            ['username','email', 'password'],
            user
        )
        if (paramsVerifyRes) {
            this.ctx.body = this.ServerResponse.createByErrorMsg(`缺少${paramsVerifyRes}参数`)
            return
        }

        const res = await this.UserService.register(user)
        console.log('res', JSON.stringify(res))
        this.ctx.body = res
    }

    // 登录 post
    async login() {
        const user = this.ctx.request.body
        user.password = Base64.decode(user.password)
        const res = await this.UserService.login(user)
        if(res.isSuccess()){ // 登陆成功
            this.session.user={
                ...res.data
            }
        }
        this.ctx.body = res
    }
}
module.exports = UserController
