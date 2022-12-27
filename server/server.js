import '@babel/polyfill';
import dotenv from 'dotenv';
import 'isomorphic-fetch';
import next from 'next';
import Koa from 'koa';
import mongo from 'koa-mongo';
import cors from '@koa/cors';
import Router from 'koa-router';
import serve from 'koa-static';
import conditional from 'koa-conditional-get';
import etag from 'koa-etag';
import cacheControl from 'koa-cache-control';
import staticCache from 'koa-static-cache';
import MongoClientConnection from './db';

dotenv.config();
const port = parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev,
});

const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = new Koa();
  const router = new Router();
  server.use(
    cors({
      origin: '*',
    })
  );
  server.on('error', (err) => {
    const errorMessage = err.toString();
    if (
      errorMessage !=
        'BadRequestError: Expected a valid shop query parameter' &&
      errorMessage != 'ClientError [BadRequestError]: Malicious Path'
    ) {
      if (errorMessage.startsWith('TimeoutError')) {
        console.log('Timeout restarting');
        process.exit(1);
      }
    }
  });

  server.use(router.allowedMethods());
  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
