import {inject} from 'aurelia-framework';
import ApiBaseService from 'resources/services/api-base-service';

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

    return new Promise(async (resolve, reject) => {
      await this.fetchOperationState(operationEndpoint, x => resolve(x));
    });
  }

  async fetchOperationState(endpoint, next) {
    let operation = await this.getOperation(endpoint);
    await setTimeout(async () => {
      if (operation.statusCode === 404) {
        await this.fetchOperationState(endpoint, next);

        return;
      }
      if (operation.state === 'created') {
        await this.fetchOperationState(endpoint, next);

        return;
      }
      if (operation.success) {
        next({success: true, message: operation.message});

        return;
      }
      if (operation.state === 'rejected') {
        next({success: false, message: operation.message});

        return;
      }
    }, 1000);
  }

  async getOperation(endpoint) {
    return await this.apiBaseService.get(endpoint, {}, false);
  }
}
