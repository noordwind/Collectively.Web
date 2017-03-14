export default class SideNavCleaner {
  run(routingContext, next) {
    $('.drag-target').remove();
    $('#sidenav-ovelay').remove();

    return next();
  }
}
