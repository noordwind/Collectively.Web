import {inject} from 'aurelia-framework';
import ApiBaseService from 'resources/services/api-base-service';
import * as retry from 'retry';

@inject(ApiBaseService)
export default class OperationService {
  constructor(apiBaseService) {
    this.apiBaseService = apiBaseService;
  }

  async execute(fn) {
    let response = await fn();
    if (response.status !== 202) {
      return ({success: true, message: 'There was an error, please try again.'});
    }
    let operationEndpoint = response.headers.get('x-operation');
    if (!operationEndpoint) {
      return ({success: true, message: 'Operation has not been found.'});
    }
    let retryOperation = retry.operation({
      retries: 10,
      minTimeout: 1000
    });

    return new Promise(async (resolve, reject) => {
      retryOperation.attempt(async currentAttempt => {
        let operation = await this.fetchOperationState(operationEndpoint);
        if (operation.completed === false) {
          retryOperation.retry('Operation is not completed');
        } else {
          resolve(operation);
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
    if (operation.state === 'completed') {
      return {success: operation.success, message: operation.message, completed: true};
    }
    if (operation.state === 'rejected') {
      return {success: false, message: operation.message, completed: true};
    }
  }

  async getOperation(endpoint) {
    return await this.apiBaseService.get(endpoint, {}, false);
  }
}
