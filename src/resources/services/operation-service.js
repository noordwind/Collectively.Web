import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import ApiBaseService from 'resources/services/api-base-service';
import * as retry from 'retry';

@inject(EventAggregator, ApiBaseService)
export default class OperationService {
  constructor(eventAggregator, apiBaseService) {
    this.eventAggregator = eventAggregator;
    this.apiBaseService = apiBaseService;
    this.operations = [];
    this.eventAggregator
      .subscribe('operation:updated', async message => {
        this.handleOperationUpdated(message);
      });
  }

  async execute(fn) {
    let response = await fn();
    let operationEndpoint = response['x-operation'];
    let resource = response['x-resource'];
    if (!operationEndpoint) {
      return ({success: false, message: 'Operation has not been found.', code: 'error'});
    }
    this.operations.push({key: operationEndpoint, value: {completed: false}});

    let retryOperation = retry.operation({
      retries: 200,
      minTimeout: 50,
      maxTimeout: 100
    });

    return new Promise(async (resolve, reject) => {
      retryOperation.attempt(async currentAttempt => {
        let index = this.operations.findIndex(x => x.key === operationEndpoint);
        let operation = this.operations[index];
        if (operation.value.completed === true) {
          this.stopDelayedFetch(operation.timeoutId);
          this.operations.splice(index, 1);
          operation.value.resource = resource;

          resolve(operation.value);
        } else {
          this.startDelayedFetch(operationEndpoint, index);
          
          retryOperation.retry('Operation is not completed.');
        }
      });
    });
  }

  async fetchOperationState(endpoint, next) {
    let operation = await this.getOperation(endpoint);
    if (operation.statusCode === 404) {
      return {completed: false};
    }
    if (operation.state === 'created') {
      return {completed: false};
    }

    return {
      completed: true,
      success: operation.success,
      code: operation.code,
      message: operation.message,
      resource: operation.resource
    };
  }

  async getOperation(endpoint) {
    return await this.apiBaseService.get(endpoint, {}, false);
  }

  handleOperationUpdated(message) {
    let key = `operations/${message.requestId}`;
    let index = this.operations.findIndex(x => x.key === key);
    if (index < 0) {
      return;
    }
    let operation = {
      completed: true,
      success: message.state === 'completed',
      code: message.code,
      message: message.message
    };
    this.operations[index].value = operation;
    this.stopDelayedFetch(this.operations[index].timeoutId);
  }

  startDelayedFetch(endpoint, operationIndex) {
    if (!this.operations[operationIndex].timeoutId) {
      let timeoutId = setTimeout(async () => {
        let result = await this.fetchOperationState(endpoint);
        this.operations[operationIndex].value = result;
        this.operations[operationIndex].timeoutId = null;
      }, 1000);
      this.operations[operationIndex].timeoutId = timeoutId;
    }
  }

  stopDelayedFetch(id) {
    clearTimeout(id);
  }
}
