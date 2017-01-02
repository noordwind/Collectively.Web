import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import StatisticsService from 'resources/services/statistics-service';

@inject(Router, EventAggregator, StatisticsService)
export class Statistics {
  constructor(router, eventAggregator, statisticsService) {
    this.router = router;
    this.eventAggregator = eventAggregator;
    this.statisticsService = statisticsService;
    this.general = {
      reported: 0,
      resolved: 0
    };
    this.reporters = [];
    this.resolvers = [];
    this.query = {
      page: 1,
      results: 10
    };
  }

  async activate() {
    await this.browseGeneralStatistics();
    await this.browseReporters();
    await this.browseResolvers();
  }

  async attached() {
    this.remarkCreatedSubscription = await this.subscribeRemarkCreated();
    this.remarkResolvedSubscription = await this.subscribeRemarkResolved();
    this.remarkDeletedSubscription = await this.subscribeRemarkDeleted();
  }

  detached() {
    this.remarkCreatedSubscription.dispose();
    this.remarkResolvedSubscription.dispose();
    this.remarkDeletedSubscription.dispose();
  }

  async browseGeneralStatistics() {
    this.general = await this.statisticsService.getGeneralStatistics();
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

  async subscribeRemarkCreated() {
    return await this.eventAggregator
      .subscribe('remark:created', async message => {
        console.log('created');
        this.general.reported++;
      });
  }

  async subscribeRemarkResolved() {
    return await this.eventAggregator
      .subscribe('remark:resolved', async message => {
        this.general.resolved++;
      });
  }

  async subscribeRemarkDeleted() {
    return await this.eventAggregator
      .subscribe('remark:deleted', async message => {
        this.general.reported--;
      });
  }
}
