export default class PreLoginRoute {
  run(routingContext, next) {
    let skipRoutes = ['sign-in', 'sign-up', 'start'];
    if (skipRoutes.indexOf(routingContext.config.route) === -1) {
      this.route = routingContext.config.route;
    }
    return next();
  }
}