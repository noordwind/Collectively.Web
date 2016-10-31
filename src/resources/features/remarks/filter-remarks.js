import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import LocationService from 'resources/services/location-service';
import FiltersService from 'resources/services/filters-service';
import ToastService from 'resources/services/toast-service';
import RemarkService from 'resources/services/remark-service';

@inject(Router, LocationService, FiltersService, ToastService, RemarkService)
export class FilterRemarks {
    constructor(router, locationService, filtersService, toast, remarkService) {
        this.router = router;
        this.location = locationService;
        this.filtersService = filtersService;
        this.toast = toast;
        this.remarkService = remarkService;
        this.filters = this.filtersService.filters;
    }

    async activate() {
        let self = this;
        self.location.startUpdating();
        let categories = await self.remarkService.getCategories();
        categories.forEach(function(category){
            if(self.filters.categories === null || typeof(self.filters.categories) === "undefined"){
                category.checked = true;
            } else {
                category.checked = self.filters.categories.indexOf(category.name) !== -1;
            }
        });
        self.categories = categories;
    }

    resetFilters() {
        this.filters = this.filtersService.defaultFilters;
        this.filtersService.filters = this.filters;
    }

    filterRemarks() {
        this.filters.categories = this.selectedCategories;
        this.filtersService.filters = this.filters;
        this.router.navigateBack();
    }

    get selectedCategories(){
        return $.grep(this.categories, c => c.checked)
            .map(c => c.name);
    }
}
