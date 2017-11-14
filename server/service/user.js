 const db = require("../model");
 class User {

  async add (ctx){
    let user = db.user.find({name:"12"})

  }

}

module.exports  = new User()