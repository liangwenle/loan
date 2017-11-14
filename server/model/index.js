var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test", { useMongoClient: true }).then(
  () => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    console.log(`已经连接数据库 localhost/test`)
  },
  err => {
    /** handle initial connection error */
    console.error(`连接数据库 localhost/test 失败！！`)
    
  }
);
mongoose.Promise = global.Promise;

module.exports = {
  user:require('./user')
  
}
