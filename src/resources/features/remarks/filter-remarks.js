import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {I18N} from 'aurelia-i18n';
import TranslationService from 'resources/services/translation-service';
import LocationService from 'resources/services/location-service';
import FiltersService from 'resources/services/filters-service';
import ToastService from 'resources/services/toast-service';
import RemarkService from 'resources/services/remark-service';
import GroupService from 'resources/services/group-service';
import UserService from 'resources/services/user-service';

@inject(Router, I18N, TranslationService,
 LocationService, FiltersService, ToastService, RemarkService, GroupService, UserService)
export class FilterRemarks {
  constructor(router, i18n, translationService, locationService, filtersService, 
      toast, remarkService, groupService, userService) {
    this.router = router;
    this.i18n = i18n;
    this.translationService = translationService;
    this.location = locationService;
    this.filtersService = filtersService;
    this.toast = toast;
    this.remarkService = remarkService;
    this.groupService = groupService;
    this.userService = userService;
    this.filters = this.filtersService.filters;
    this.states = [];
    this.groups = [];
    this.showMyRemarks = {
      checked: this.filters.type === 'mine'
    };
  }

  async activate() {
    this.location.startUpdating();
    this.currentUser = await this.userService.getAccount(false);
    this.setupGroupsFilter();
    await this.setupCategoriesFilter();
    this.setupStateFilter();
    this.setupTypeFilter();
  }

  deactivate() {
    this.filterRemarks();
  }

  resetFilters() {
    this.categories.forEach(c => c.checked = true);
    this.selectedGroup = this.defaultGroup;
    this.filters = this.filtersService.defaultFilters;
    this._updateFilters();
  }

  filterRemarks() {
    this.filters.categories = this.selectedCategories;
    this.filters.states = this.selectedStates;
    this.filters.groupId = this.selectedGroup.id;
    if (this.showMyRemarks.checked) {
      this.filters.type = 'mine';
    } else {
      this.filters.type = 'all';
    }
    if (this.states.findIndex(x => x.checked && x.value === 'unassigned') >= 0) {
      this.filters.availableGroupId = this.selectedGroup.id;
      this.filters.groupId = '';
    } else {
      this.filters.availableGroupId = '';
      this.filters.groupId = this.selectedGroup.id;
    }
    this._updateFilters();
  }

  get selectedCategories() {
    return $.grep(this.categories, c => c.checked)
            .map(c => c.name);
  }

  get selectedStates() {
    return this.states.filter(x => x.checked).map(x => x.value);
  }

  async setupCategoriesFilter() {
    let that = this;
    let categories = await this.remarkService.getCategories();
    categories.forEach(c => {
      if (typeof(that.filters.categories) === 'undefined' || that.filters.categories.length === 0) {
        c.checked = true;
      } else {
        c.checked = that.filters.categories.indexOf(c.name) !== -1;
      }
    });
    that.categories = categories;
  }

  setupGroupsFilter() {
    this.groups.push(this.defaultGroup);
    this.groups.push(...this.currentUser.groups);
    let selectedGroup = this.filters.groupId !== '' ? this.groups.find(x => x.id === this.filters.groupId) : this.groups[0];
    this.selectGroup(selectedGroup);
  }

  get displayGroups() {
    return this.groups.length > 1;
  }

  selectGroup(group) {
    this.selectedGroup = group;
  }

  get defaultGroup() {
    return {id: '', name: this.translationService.tr('group.globally')};
  }

  setupStateFilter() {
    this.filtersService.states.forEach(x => {
      let checked = this.filters.states.findIndex(s => s === x) > -1;
      this.states.push({ name: x, value: x, checked: checked});
    });
  }

  setupTypeFilter() {
    this.types = [ {name: this.translationService.trCapitalized('common.all'), value: 'all'},
     {name: this.translationService.trCapitalized('common.mine'), value: 'mine'}
     ];
  }

  _updateFilters() {
    this.filtersService.filters = this.filters;
  }
}
