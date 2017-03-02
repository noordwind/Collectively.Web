import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import StatisticsService from 'resources/services/statistics-service';
import TranslationService from 'resources/services/translation-service';

@inject(Router, EventAggregator, StatisticsService, TranslationService)
export class Statistics {
  constructor(router, eventAggregator, statisticsService, translationService) {
    this.router = router;
    this.eventAggregator = eventAggregator;
    this.statisticsService = statisticsService;
    this.translationService = translationService;
    this.general = {
      reported: 0,
      resolved: 0
    };
    this.reporters = [];
    this.resolvers = [];
    this.categories = [];
    this.tags = [];
    this.query = {
      page: 1,
      results: 10
    };
  }

  async activate() {
    await this.browseGeneralStatistics();
    await this.browseReporters();
    await this.browseResolvers();
    await this.browseCategories();
    await this.browseTags();
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
    let generalStats = await this.statisticsService.getGeneralStatistics();
    this.general = [
      { name: this.translationService.trCapitalized('remark.state_new'), count: generalStats.newCount},
      { name: this.translationService.trCapitalized('remark.state_reported'), count: generalStats.reportedCount},
      { name: this.translationService.trCapitalized('remark.state_processing'), count: generalStats.processingCount},
      { name: this.translationService.trCapitalized('remark.state_resolved'), count: generalStats.resolvedCount},
      { name: this.translationService.trCapitalized('remark.state_canceled'), count: generalStats.canceledCount},
      { name: this.translationService.trCapitalized('remark.state_deleted'), count: generalStats.deletedCount},
      { name: this.translationService.trCapitalized('remark.state_renewed'), count: generalStats.renewedCount}
    ];
  }

  async browseReporters() {
    let reporters = await this.statisticsService.browseUserStatistics({
      page: 1,
      results: 10,
      orderBy: 'reported'
    });
    reporters.forEach(x => {
      if (x.name) {
        x.count = x.remarks.reportedCount;
        x.url = this.router.generate('user-remarks', {username: x.name});
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
        x.count = x.remarks.resolvedCount;
        x.url = this.router.generate('user-resolved-remarks', {resolver: x.name});
      }
    });
    this.resolvers = resolvers;
  }

  async browseCategories() {
    let categories = await this.statisticsService.browseCategoriesStatistics({
      page: 1,
      results: 5
    });
    categories.forEach(x => {
      x.url = this.router.generate('category-remarks', {category: x.name});
      x.name = this.translationService.tr(`remark.category_${x.name}`);
      x.count = x.remarks.reportedCount;
    });
    this.categories = categories;
  }

  async browseTags() {
    let tags = await this.statisticsService.browseTagsStatistics({
      page: 1,
      results: 5
    });
    tags.forEach(x => {
      x.url = this.router.generate('tag-remarks', {tag: x.name});
      x.name = this.translationService.trCapitalized(`tags.${x.name}`);
      x.count = x.remarks.reportedCount;
    });
    this.tags = tags;
  }

  async subscribeRemarkCreated() {
    return await this.eventAggregator
      .subscribe('remark:created', async message => {
        this.general.reported++;
        let index = this.reporters.findIndex(x => x.name === message.author);
        if (index >= 0) {
          this.reporters[index].count++;
        }
      });
  }

  async subscribeRemarkResolved() {
    return await this.eventAggregator
      .subscribe('remark:resolved', async message => {
        this.general.resolved++;
        let index = this.resolvers.findIndex(x => x.name === message.author);
        if (index >= 0) {
          this.resolvers[index].count++;
        }
      });
  }

  async subscribeRemarkDeleted() {
    return await this.eventAggregator
      .subscribe('remark:deleted', async message => {
        this.general.reported--;
      });
  }
}
