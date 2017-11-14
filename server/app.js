const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");

const router = require("./routes");
const app = new Koa();

app
  .use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set("X-Response-Time", `${ms}ms`);
  })
  .use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms} ms`);
  })
  .use(cors())
  .use(bodyParser())
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      ctx.body = "fff";
    }
  })
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);
