import welcome from './welcome';
// import users from './users';
// import sessions from './sessions';

const controllers = [welcome];

export default (router, container) => controllers.forEach(f => f(router, container));
