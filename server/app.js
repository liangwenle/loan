const Koa = require("koa");
const mount = require("koa-mount");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const serve = require("koa-static");

const router = require("./routes");

const appStatic = new Koa();
appStatic.use(serve(__dirname + "/html"));

const appApi = new Koa();

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/loan', { useMongoClient: true })
mongoose.Promise = global.Promise

appApi
  .use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms} ms`);
    ctx.set("X-Response-Time", `${ms}ms`);
  })
  .use(cors())
  .use(bodyParser())
  .use(async (ctx, next) => {
    await next();
    ctx.body = JSON.stringify(ctx.body)
  })
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      console.log(e)
      ctx.body = {code:500,msg:'服务器有误！！'};
    }
  })
  .use(router.routes())
  .use(router.allowedMethods());

const app = new Koa();
app.use(mount("/static", appStatic));
app.use(mount("/", appApi));
app.listen(3000);
