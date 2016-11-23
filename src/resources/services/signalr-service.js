import environment from '../../environment';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import * as retry from 'retry';

@inject(EventAggregator)
export default class SignalRService {
  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
    this.connection = null;
  }

  initialize() {
    if (this.connection !== null) {
      return;
    }

    this.connection = new RpcConnection(`${environment.signalRUrl}remarks`, 'formatType=json&format=text');
    this.connection.on('RemarkCreated', (message) => {
      this.eventAggregator.publish('remark:created', message);
    });
    this.connection.on('RemarkResolved', (message) => {
      this.eventAggregator.publish('remark:resolved', message);
    });
    this.connection.on('RemarkDeleted', (message) => {
      this.eventAggregator.publish('remark:deleted', message);
    });
    this.connection.connectionClosed = e => {
      if (e) {
        console.log('Connection closed with error: ' + e);
      }
      else {
        console.log('SignalR connection lost');
        this.connect();
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
      this.connection.start()
        .catch(err => operation.retry(err));
    });
  }
}
