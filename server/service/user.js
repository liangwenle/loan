 const db = require("../model");
 class User {

  async add (ctx){
<<<<<<< HEAD
    consoel.log(ctx)
    let user = db.user.find({name:"123456"})
=======
    let user = db.user.find({name:"12"})
>>>>>>> b7ccaf0c7badad1ce42d3a81c4ef55fa17d41d97
  }

}

module.exports  = new User()