import environment from '../../environment';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import * as retry from 'retry';
import AuthService from 'resources/services/auth-service';

@inject(EventAggregator, AuthService)
export default class SignalRService {
  constructor(eventAggregator, authService) {
    this.eventAggregator = eventAggregator;
    this.authService = authService;
    this.connection = null;
    this.reconnect = true;
  }

  initialize() {
    if (this.connection !== null) {
      return;
    }

    this.connection = new RpcConnection(environment.signalRUrl, 'formatType=json&format=text');
    this.connection.on('remarkCreated', (message) => {
      this.eventAggregator.publish('remark:created', message);
    });
    this.connection.on('remarkResolved', (message) => {
      this.eventAggregator.publish('remark:resolved', message);
    });
    this.connection.on('remarkDeleted', (message) => {
      this.eventAggregator.publish('remark:deleted', message);
    });
    this.connection.on('photosToRemarkAdded', (message) => {
      this.eventAggregator.publish('remark:photoAdded', message);
    });
    this.connection.on('photosFromRemarkRemoved', (message) => {
      this.eventAggregator.publish('remark:photoRemoved', message);
    });
    this.connection.on('operationUpdated', (message) => {
      this.eventAggregator.publish('operation:updated', message);
    });
    this.connection.on('disconnect', async (message) => {
      this.reconnect = false;
      this.connection.stop();
    });
    this.connection.connectionClosed = e => {
      if (e) {
        console.log('Connection closed with error: ' + e);
      } else {
        console.log('SignalR connection lost');
        if (this.reconnect) {
          this.connect();
        }
      }
    };
    this.connect();
  }

  connect() {
    let operation = retry.operation({
      retries: 20,
      factor: 2,
      minTimeout: 1000,
      maxTimeout: 5000
    });
    operation.attempt(currentAttempt => {
      console.log(`Connecting to SignalR, attempt:${currentAttempt}`);
      let connection = this.connection;
      let token = `Bearer ${this.authService.token}`;
      connection.start()
        .then(() => {
          connection.invoke('Coolector.Services.SignalR.Hubs.CoolectorHub.InitializeAsync', token);
        })
        .catch(err => operation.retry(err));
    });
  }
}
