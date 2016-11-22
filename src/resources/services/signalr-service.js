import environment from '../../environment';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

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

    this.connection.start();
  }
}
