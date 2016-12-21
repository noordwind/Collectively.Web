import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import StatisticsService from 'resources/services/statistics-service';

@inject(Router, StatisticsService)
export class Statistics {
  constructor(router, statisticsService) {
    this.router = router;
    this.statisticsService = statisticsService;
    this.reporters = [];
    this.resolvers = [];
    this.query = {
      page: 1,
      results: 10
    };
  }

  async activate() {
    let reporters = await this.statisticsService.browseReporters(this.query);
    reporters.forEach(x => {
      x.url = this.router.generate('user-remarks', {name: x.name});
    });
    this.reporters = reporters;
    this.resolvers = await this.statisticsService.browseResolvers(this.query);
  }

  async attached() {
  }

  detached() {
  }
}
