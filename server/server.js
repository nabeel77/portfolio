import '@babel/polyfill';
import dotenv from 'dotenv';
import 'isomorphic-fetch';
import next from 'next';
import Koa from 'koa';
import Router from 'koa-router';

dotenv.config();

const compression = require('compression');

const port = parseInt(process.env.PORT, 10) || 3000;

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  const handleRequest = async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  };

  router.get('(/_next/static/.*)', handleRequest); // Static content is clear
  router.get('/_next/webpack-hmr', handleRequest); // Webpack content is clear
  router.get('(.*)', async (ctx) => {
    await handleRequest(ctx);
  });

  server.use(router.allowedMethods());
  server.use(router.routes());
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server ready on ${port}`);
  });
});
