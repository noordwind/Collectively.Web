import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export default class LoaderService {
  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
  }

  display() {
    this.eventAggregator.publish('loader:display');
  }

  hide() {
    this.eventAggregator.publish('loader:hide');
  }
}
