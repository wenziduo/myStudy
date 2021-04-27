const Koa = require("koa");
const Router = require("koa-router");
const router = new Router(); // 实例化路由

const app = new Koa();
router.get("/", async (ctx, next) => {
  console.log("666666666");
  var name = ctx.query.name; // 获取请求参数
  ctx.response.body = `<h5>Hello, ${name}!</h5>`;
});
app.use(router.routes());
app.listen(3008);
