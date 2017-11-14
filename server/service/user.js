 const db = require("../model");
 class User {

  async add (ctx){
    let user = db.user.find({name:"123456"})
  }

}

module.exports  = new User()