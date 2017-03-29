import environment from '../../environment';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import AuthService from 'resources/services/auth-service';
import LogService from 'resources/services/log-service';
import io from 'socket.io-client';

@inject(EventAggregator, AuthService, LogService)
export default class WebsocketService {
  constructor(eventAggregator, authService, logService) {
    this.eventAggregator = eventAggregator;
    this.authService = authService;
    this.logger = logService;
    this.socket = null;
    this.reconnect = true;
  }

  initialize() {
    if (this.initalized) {
      return;
    }
    if (!this.authService.isLoggedIn) {
      return;
    }

    console.log('connecting to socket io server');
    let socket = io.connect(environment.websocketUrl, {
      path: environment.websocketPath,
      query: `auth_token=${this.authService.token}`
    });
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('error', function(err) {
      console.log('error');
      console.log(err);
    });
    socket.on('authenticated', () => {
      console.log('authentication succeeded');
      socket.on('operation_updated', (message) => {
        this.logger.debug('operation_updated message received', message);
        this.eventAggregator.publish('operation:updated', message);
      });
      socket.on('remark_created', (message) => {
        this.logger.debug('remark_created message received', message);
        this.eventAggregator.publish('remark:created', message);
      });
      socket.on('remark_resolved', (message) => {
        this.logger.debug('remark_resolved message received', message);
        this.eventAggregator.publish('remark:resolved', message);
      });
      socket.on('remark_deleted', (message) => {
        this.logger.debug('remark_deleted message received', message);
        this.eventAggregator.publish('remark:deleted', message);
      });
      socket.on('photos_to_remark_added', (message) => {
        this.logger.debug('photos_to_remark_added message received', message);
        this.eventAggregator.publish('remark:photo_added', message);
      });
      socket.on('photos_from_remark_removed', (message) => {
        this.logger.debug('photos_from_remark_removed message received', message);
        this.eventAggregator.publish('remark:photo_removed', message);
      });
      socket.on('remark_vote_submitted', (message) => {
        this.logger.debug('remark_vote_submitted message received', message);
        this.eventAggregator.publish('remark:vote_submitted', message);
      });
      socket.on('remark_vote_deleted', (message) => {
        this.logger.debug('remark_vote_deleted message received', message);
        this.eventAggregator.publish('remark:vote_deleted', message);
      });
    });
    this.socket = socket;
  }

  get initalized() {
    return this.socket !== null;
  }

  get connected() {
    return this.socket !== null && this.socket.connected;
  }
}
