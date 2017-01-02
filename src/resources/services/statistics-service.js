import {inject} from 'aurelia-framework';
import ApiBaseService from 'resources/services/api-base-service';

@inject(ApiBaseService)
export default class StatisticsService {
  constructor(apiBaseService) {
    this.apiBaseService = apiBaseService;
    this.userStatistcsPath = 'statistics/users';
    this.remarkStatisticsPath = 'statistics/remarks';
  }

  async browseUserStatistics(query) {
    return await this.apiBaseService.get(this.userStatistcsPath, query, false);
  }

  async getGeneralStatistics(query) {
    return await this.apiBaseService.get(`${this.remarkStatisticsPath}/general`, query);
  }

  async getUserStatistics(userId) {
    return await this.apiBaseService.get(`${this.userStatistcsPath}/${userId}`);
  }
}
