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
      return 'error';
    }
    let endpoint = response.headers.get('x-operation');
    if (!endpoint) {
      return 'error';
    }

    return new Promise(async (resolve, reject) => {
      await this.fetchOperationState(endpoint, x => resolve(x));
    });
  }

  async fetchOperationState(endpoint, next) {
    let operation = await this.getOperation(endpoint);
    await setTimeout(async () => {
      if (operation.status === 404) {
        await this.fetchOperationState(endpoint, next);

        return;
      }
      if (operation.state === 'created') {
        await this.fetchOperationState(endpoint, next);

        return;
      }
      if (operation.state === 'completed') {
        next(true);

        return;
      }
      if (operation.state === 'rejected') {
        next(false);

        return;
      }
    }, 1000);
  }

  async getOperation(endpoint) {
    return await this.apiBaseService.get(endpoint, {}, false);
  }
}
