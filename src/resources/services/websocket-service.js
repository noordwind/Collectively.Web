import environment from '../../environment';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import AuthService from 'resources/services/auth-service';
import * as retry from 'retry';

@inject(EventAggregator, AuthService)
export default class WebsocketService {
  constructor(eventAggregator, authService) {
    this.eventAggregator = eventAggregator;
    this.authService = authService;
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

    console.log(environment.websocketUrl);
    this.connection = new WebSocketManager.Connection(environment.websocketUrl, 'formatType=json&format=text');
    this.connection.enableLogging = false;
    this.connection.clientMethods['remark_created'] = (message) => {
      this.eventAggregator.publish('remark:created', message);
    };
    this.connection.clientMethods['remark_resolved'] = (message) => {
      this.eventAggregator.publish('remark:resolved', message);
    };
    this.connection.clientMethods['remark_deleted'] = (message) => {
      this.eventAggregator.publish('remark:deleted', message);
    };
    this.connection.clientMethods['photos_to_remark_added'] = (message) => {
      this.eventAggregator.publish('remark:photo_added', message);
    };
    this.connection.clientMethods['photos_from_remark_removed'] = (message) => {
      this.eventAggregator.publish('remark:photo_removed', message);
    };
    this.connection.clientMethods['remark_vote_submitted'] = (message) => {
      this.eventAggregator.publish('remark:vote_submitted', message);
    };
    this.connection.clientMethods['remark_vote_deleted'] = (message) => {
      this.eventAggregator.publish('remark:vote_deleted', message);
    };
    this.connection.clientMethods['operation_updated'] = (message) => {
      console.log('received operation updated');
      this.eventAggregator.publish('operation:updated', message);
    };
    this.connection.clientMethods['disconnect'] = async (message) => {
      this.reconnect = false;
      if (this.connected) {
        this.connection.socket.close();
      }
    };
    this.connection.connectionMethods.onConnected = () => {
      console.log('Websocket connected! connectionId: ' + this.connection.connectionId);
    };
    this.connection.connectionMethods.onDisconnected = () => {
      console.log('Websocket connection was lost.');
      if (this.reconnect) {
        this.connect();
      }
    };
    this.connect();
  }

  get initalized() {
    return this.connection !== null;
  }

  get connected() {
    return this.connection !== null && this.connection.socket.readyState === 1;
  }

  connect() {
    let connection = this.connection;
    connection.start();
    let token = `Bearer ${this.authService.token}`;
    if (this.connected) {
      connection.invoke('InitializeAsync', connection.connectionId, token);
    }

    let operation = retry.operation({
      retries: 20,
      factor: 2,
      minTimeout: 100,
      maxTimeout: 500
    });
    operation.attempt(currentAttempt => {
      if (this.connected === false ) {
        operation.retry('Websocket connection not established.');
        return;
      }
      connection.invoke('InitializeAsync', connection.connectionId, token);
    });
  }
}
