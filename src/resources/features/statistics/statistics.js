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
    
  }

  async attached() {
    await this.browseReporters();
    await this.browseResolvers();
  }

  detached() {
  }

  async browseReporters() {
    let reporters = await this.statisticsService.browseUserStatistics({
      page: 1,
      results: 10,
      orderBy: 'reported'
    });
    reporters.forEach(x => {
      if (x.name) {
        x.count = x.reportedCount;
        x.url = this.router.generate('profile', {name: x.name});
      }
    });
    this.reporters = reporters;
  }

  async browseResolvers() {
    let resolvers = await this.statisticsService.browseUserStatistics({
      page: 1,
      results: 10,
      orderBy: 'resolved'
    });
    resolvers.forEach(x => {
      if (x.name) {
        x.count = x.resolvedCount;
        x.url = this.router.generate('profile', {name: x.name});
      }
    });
    this.resolvers = resolvers;
  }
}
