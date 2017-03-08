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
    this.connection = null;
    this.reconnect = true;
  }

  initialize() {
    if (this.initalized) {
      return;
    }
    if (!this.authService.isLoggedIn) {
      return;
    }

    this.connect();
    this.connection.on('operation_updated', (message) => {
      this.logger.debug('operation_updated message received', message);
      this.eventAggregator.publish('operation:updated', message);
    });
    this.connection.on('remark_created', (message) => {
      this.logger.debug('remark_created message received', message);
      this.eventAggregator.publish('remark:created', message);
    });
    this.connection.on('remark_resolved', (message) => {
      this.logger.debug('remark_resolved message received', message);
      this.eventAggregator.publish('remark:resolved', message);
    });
    this.connection.on('remark_deleted', (message) => {
      this.logger.debug('remark_deleted message received', message);
      this.eventAggregator.publish('remark:deleted', message);
    });
    this.connection.on('photos_to_remark_added', (message) => {
      this.logger.debug('photos_to_remark_added message received', message);
      this.eventAggregator.publish('remark:photo_added', message);
    });
    this.connection.on('photos_from_remark_removed', (message) => {
      this.logger.debug('photos_from_remark_removed message received', message);
      this.eventAggregator.publish('remark:photo_removed', message);
    });
    this.connection.on('remark_vote_submitted', (message) => {
      this.logger.debug('remark_vote_submitted message received', message);
      this.eventAggregator.publish('remark:vote_submitted', message);
    });
    this.connection.on('remark_vote_deleted', (message) => {
      this.logger.debug('remark_vote_deleted message received', message);
      this.eventAggregator.publish('remark:vote_deleted', message);
    });
  }

  get initalized() {
    return this.connection !== null;
  }

  get connected() {
    return this.connection !== null && this.connection.connected;
  }

  connect() {
    console.log('connecting to socket io server');
    this.connection = io.connect(environment.websocketUrl);
  }
}
