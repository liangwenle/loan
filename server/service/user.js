 const db = require("../model");
 class User {

  async add (ctx){
    let data = ctx.request.body
    // 获取pdId字段
    let res = await db.user.findOne({pdId:[data.pdId]}, {pdId: 1})

    let kitty = new db.user({
          name: data.name, 
          phone: data.phone,
          pdId: [data.pdId]
        })
    
    // let res = await kitty.save()
    // console.log(a)
    
    ctx.body = {
      code: 200,
      mgs: '成功',
      res:res
    }
  }
}

module.exports = new User();
