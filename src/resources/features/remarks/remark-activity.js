import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {I18N} from 'aurelia-i18n';
import TranslationService from 'resources/services/translation-service';
import LocationService from 'resources/services/location-service';
import FiltersService from 'resources/services/filters-service';
import RemarkService from 'resources/services/remark-service';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';
import AuthService from 'resources/services/auth-service';
import UserService from 'resources/services/user-service';
import ReportService from 'resources/services/report-service';
import WebsocketService from 'resources/services/websocket-service';
import OperationService from 'resources/services/operation-service';
import LogService from 'resources/services/log-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import Environment from '../../../environment';

@inject(Router, I18N, TranslationService,
LocationService, FiltersService, RemarkService,
ToastService, LoaderService, AuthService, UserService,
ReportService, WebsocketService, OperationService, 
EventAggregator, LogService, Environment)
export class RemarkActivity {
  newImageResized = null;

  constructor(router, i18n, translationService, location, filtersService, remarkService,
  toastService, loader, authService, userService, reportService, websockets, operationService,
  eventAggregator, logService, environment) {
    this.router = router;
    this.i18n = i18n;
    this.translationService = translationService;
    this.location = location;
    this.filtersService = filtersService;
    this.remarkService = remarkService;
    this.toast = toastService;
    this.loader = loader;
    this.authService = authService;
    this.userService = userService;
    this.reportService = reportService;
    this.websockets = websockets;
    this.operationService = operationService;
    this.eventAggregator = eventAggregator;
    this.log = logService;
    this.feature = environment.feature;
    this.remark = {};
    this.activities = [];
    this.sending = false;
    this.reportedActivity = null;
    this.websockets.initialize();
  }

  async activate(params, routeConfig) {
    this.id = params.id;
    this.account = {userId: ''};
    this.isAuthenticated = this.authService.isLoggedIn;
    if (this.isAuthenticated) {
      this.account = await this.userService.getAccount();
    }
    await this.loadRemark();
    this.displayStates();
    this.log.trace('remark_participants_activated', {
      remark: this.remark
    });
  }

  async attached() {
    this.operationService.subscribe('report_remark',
      operation => this.handleActivityReported(operation),
      operation => this.handleRejectedOperation(operation));

    this.log.trace('remark_participants_attached');
  }

  detached() {
  }

  async loadRemark() {
    let remark = await this.remarkService.getRemark(this.id);
    this.remark = remark;
    if (this.remark.participants === null) {
      this.remark.participants = [];
    }
  }

  canDelete(activity) {
    if (!activity || !activity.id) {
      return false;
    }

    if (activity.id === '00000000-0000-0000-0000-000000000000') {
      return false;
    }

    if (activity.removed) {
      return false;
    }

    return this.isAuthenticated
      && this.isProcessingState(activity)
      && this.isActivityAuthor(activity);
  }

  get canReport() {
    return this.isAuthenticated;
  }

  isProcessingState = (activity) => activity.name === 'processing';

  isActivityAuthor = (activity) => activity.userId === this.account.userId;

  get isParticipant() {
    return this.remark.participants.find(x => x.user.userId === this.account.userId);
  }

  async cancelAction() {
    await this.remarkService.cancelAction(this.id);
  }

  displayStates() {
    let removedMessage = this.translationService.tr('remark.activity_removed');
    this.activities = this.remark.states.map(x => {
      return {
        id: x.id,
        name: x.state,
        description: x.removed ? removedMessage : x.description,
        createdAt: x.createdAt,
        user: x.user.name,
        userId: x.user.userId,
        removed: x.removed,
        reportsCount: x.reportsCount
      };
    });
  }

  async delete(activity) {
    await this.remarkService.deleteState(this.id, activity.id);
    this.toast.info(this.translationService.tr('remark.activity_removed'));
    activity.removed = true;
  }

  async report(activity) {
    this.sending = true;
    this.reportedActivity = activity;
    await this.reportService.reportActivity(this.remark.id, activity.id);
  }

  handleActivityReported(operation) {
    this.toast.success(this.translationService.tr('remark.report_sent'));
    this.loader.hide();
    this.sending = false;
    this.reportedActivity.reportsCount++;
    this.reportedActivity = null;
  }

  handleRejectedOperation(operation) {
    this.toast.error(this.translationService.trCode(operation.code));
    this.sending = false;
    this.loader.hide();
  }
}
