import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import LocationService from 'resources/services/location-service';
import RemarkService from 'resources/services/remark-service';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';
import AuthService from 'resources/services/auth-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import Environment from '../../../environment';

@inject(Router, LocationService, RemarkService, ToastService, LoaderService, AuthService, EventAggregator, Environment)
export class Remark {
  constructor(router, location, remarkService, toastService, loader, authService, eventAggregator, environment) {
    this.router = router;
    this.location = location;
    this.remarkService = remarkService;
    this.toast = toastService;
    this.loader = loader;
    this.authService = authService;
    this.eventAggregator = eventAggregator;
    this.feature = environment.feature;
    this.remark = {};
    this.isDeleting = false;
    this.isSending = false;
    this.isInRange = false;
  }

  get canDelete() {
    let profile = this.authService.profile;

    return profile.user_id === this.remark.author.userId;
  }

  get canResolve() {
    return this.remark.resolved === false && (this.feature.resolveRemarkLocationRequired === false || this.isInRange);
  }

  async activate(params, routeConfig) {
    this.location.startUpdating();
    this.id = params.id;
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
    await this.remarkService.deleteRemark(this.id);
    await this.toast.info('Delete request has been sent, please wait...');
    this.isDeleting = false;
    this.loader.hide();
    this.router.navigate('');
  }

  async resolve() {
    let self = this;
    let command = {
      remarkId: self.remark.id,
      latitude: this.location.current.latitude,
      longitude: this.location.current.longitude
    };
    self.isSending = true;
    self.loader.display();
    self.remarkService.resolveRemark(command)
      .then(response => {
        self.toast.success('Your request is being processed.');
        self.router.navigate('');
      }, err => {
        self.toast.error('There was an error, please try again.');
        self.isSending = false;
        self.loader.hide();
      });
  }
}
