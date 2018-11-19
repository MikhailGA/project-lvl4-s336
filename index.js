// @flow
import Koa from 'koa';
import Router from 'koa-router';
import Pug from 'koa-pug';
import path from 'path';
import _ from 'lodash';
import koaWebpack from 'koa-webpack';
import dotenv from 'dotenv';
import Rollbar from 'rollbar';

import webpackConfig from './webpack.config';
import addRoutes from './routes';
import container from './container';

export default () => {
  dotenv.config();
  const app = new Koa();

  const rollbar = new Rollbar({
    accessToken: 'b44929a142b74030917746be92e9a62b',
    captureUncaught: true,
    captureUnhandledRejections: true,
  });

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (process.env.NODE_ENV === 'production') {
        rollbar.log(err);
      } else {
        console.log(err);
      }
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    koaWebpack({
      config: webpackConfig,
    }).then(m => app.use(m));
  }

  const router = new Router();
  addRoutes(router, container);
  app.use(router.allowedMethods());
  app.use(router.routes());

  const pug = new Pug({
    viewPath: path.join(__dirname, 'views'),
    noCache: process.env.NODE_ENV === 'development',
    debug: true,
    pretty: true,
    compileDebug: true,
    locals: [],
    basedir: path.join(__dirname, 'views'),
    helperPath: [
      { _ },
      { urlFor: (...args) => router.url(...args) },
    ],
  });
  pug.use(app);

  return app;
};
