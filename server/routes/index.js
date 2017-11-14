const Router = require("koa-router");
const router = new Router();

router
  .get("/", async (ctx, next) => {
    ctx.body =  ctxsd.request.body;
  })
  .post("/users", async (ctx, next) => {
    // ...
    // ctx.body = ctx.request.body;
  })
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
