 const db = require("../model");
 class User {

  async add (ctx){
    let data = ctx.request.body,
        kitty = new Cat({
          name: data.name, 
          phone: data.phone,
          imgCodes: data.imgCodes,
          smsCode: data.smsCode
        })
    
    ctx.body = {}
  }
}

module.exports = new User();
