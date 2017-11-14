const Router = require("koa-router");

const s_user = require("../service/user");

const router = new Router();

router
  .get("/", async (ctx, next) => {
    ctx.body =  {};
  })


  .post("/users", s_user.add)



  
  .put("/users/:id", async (ctx, next) => {
    // ...
    // ctx.body = ctx.request.body;
  })
  .del("/users/:id", async (ctx, next) => {
    // ...
    // ctx.body = ctx.request.body;
  })
  .all("/users/:id", async (ctx, next) => {
    // ...
    // ctx.body = ctx.request.body;
  });
  
  
module.exports = router;
