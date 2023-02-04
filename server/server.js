import '@babel/polyfill';
import dotenv from 'dotenv';
import 'isomorphic-fetch';
import next from 'next';
import Koa from 'koa';
import Router from 'koa-router';
import UserRouter from './routes/user';
import DataRouter from './routes/data';
import EmailRouter from './routes/emails';
import MongoClientConnection from './db';
import cookie from 'koa-cookie';

dotenv.config();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

const server = new Koa();
const router = new Router();

// Initialize NextJs instance and expose request handler
const app = next({ dev });
const handler = app.getRequestHandler();

(async () => {
  try {
    await app.prepare();
    router.get('/custom-page', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/', ctx.query);
      ctx.respond = false;
    });
    const db = await MongoClientConnection.Get();
    server.context.db = db;
    const handleRequest = async (ctx) => {
      await handler(ctx.req, ctx.res);
      ctx.respond = false;
      ctx.res.statusCode = 200;
    };
    router.get('/_next/webpack-hmr', handleRequest); // Webpack content is clear
    router.get('(.*)', async (ctx) => {
      await handleRequest(ctx);
    });

    server.use(cookie());
    server.use(UserRouter.routes()).use(UserRouter.allowedMethods());
    server.use(DataRouter.routes()).use(DataRouter.allowedMethods());
    server.use(EmailRouter.routes()).use(EmailRouter.allowedMethods());
    server.use(router.routes());
    server.listen(port, (_) => console.log(`App running on port ${port}`));
  } catch (e) {
    console.error(e);
    process.exit();
  }
})();
