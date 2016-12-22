import {inject} from 'aurelia-framework';
import ApiBaseService from 'resources/services/api-base-service';

@inject(ApiBaseService)
export default class StatisticsService {
  constructor(apiBaseService) {
    this.apiBaseService = apiBaseService;
  }

  async browseReporters(query) {
    let path = 'statistics/reporters';
    let result = await this.apiBaseService.get(path, query, false);
    return result;
  }

  async browseResolvers(query) {
    let path = 'statistics/resolvers';
    return await this.apiBaseService.get(path, query, false);
  }
}
