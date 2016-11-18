import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import LocationService from 'resources/services/location-service';
import RemarkService from 'resources/services/remark-service';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';
import UserService from 'resources/services/user-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import Environment from '../../../environment';

@inject(Router, LocationService, RemarkService, ToastService, LoaderService, UserService, EventAggregator, Environment)
export class Remark {
  constructor(router, location, remarkService, toastService, loader, userService, eventAggregator, environment) {
    this.router = router;
    this.location = location;
    this.remarkService = remarkService;
    this.toast = toastService;
    this.loader = loader;
    this.userService = userService;
    this.eventAggregator = eventAggregator;
    this.feature = environment.feature;
    this.remark = {};
    this.isDeleting = false;
    this.isSending = false;
    this.isInRange = false;
  }

  get canDelete() {
    return this.account.userId === this.remark.author.userId;
  }

  get canResolve() {
    return this.remark.resolved === false && (this.feature.resolveRemarkLocationRequired === false || this.isInRange);
  }

  async activate(params, routeConfig) {
    this.location.startUpdating();
    this.id = params.id;
    this.account = await this.userService.getAccount();
    let remark = await this.remarkService.getRemark(this.id);
    this.remark = remark;
    this.mediumPhoto = remark.photos.find(x => x.size === 'medium');
    this.bigPhoto = remark.photos.find(x => x.size === 'big');
    this.resolvedMediumPhoto = remark.photos.find(x => x.size === 'medium' && x.metadata === 'resolved');
    this.resolvedBigPhoto = remark.photos.find(x => x.size === 'big' && x.metadata === 'resolved');
    this.state = remark.resolved ? 'resolved' : 'new';
    this.isInRange = this.location.isInRange({
      latitude: remark.location.coordinates[1],
      longitude: remark.location.coordinates[0]
    });
  }

  async delete() {
    if (this.canDelete === false) {
      await this.toast.error('I\'m sorry. You are not allowed to delete a remark!');
      return;
    }
    this.loader.display();
    this.isDeleting = true;
    this.toast.info('Removing remark, please wait...');
    let remarkRemoved = await this.remarkService.deleteRemark(this.id);
    if (remarkRemoved.success) {
      this.toast.success('Remark has been removed.');
      this.loader.hide();
      this.router.navigateToRoute('remarks');

      return;
    }

    this.isDeleting = false;
    this.toast.error(remarkRemoved.message);
    this.loader.hide();
  }

  async resolve() {
    let command = {
      remarkId: this.remark.id,
      latitude: this.location.current.latitude,
      longitude: this.location.current.longitude
    };
    this.isSending = true;
    this.loader.display();
    this.toast.info('Resolving remark, please wait...');
    let remarkResolved = await this.remarkService.resolveRemark(command);
    if (remarkResolved.success) {
      this.toast.success('Remark has been resolved.');
      this.loader.hide();
      this.router.navigateToRoute('remarks');

      return;
    }

    this.toast.error(remarkResolved.message);
    this.isSending = false;
    this.loader.hide();
  }
}
