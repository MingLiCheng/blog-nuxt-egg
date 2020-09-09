/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-04-29 16:33:46
 */
const Controller = require('egg').Controller

class IndexController  extends Controller {

  async test(){
    this.ctx.body = {
      code: '0',
      message: 'the backend api is running'
    }
  }
}

module.exports = IndexController