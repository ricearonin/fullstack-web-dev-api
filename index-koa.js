const Koa = require('koa');

const app = new Koa();

app.use(async ctx => {
  ctx.body = { hi: 'there' };
});

// dynamically configure PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT);
