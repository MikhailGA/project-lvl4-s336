export default (router, container) => {
  router.get('root', '/', (ctx) => {
    container.logger('get first request/!!!!!!!!!!!!!!!!');
    ctx.render('welcome/index');
  });
};
