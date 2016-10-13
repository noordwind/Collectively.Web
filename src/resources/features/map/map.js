import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import LocationService from 'resources/services/location-service';
import FiltersService from 'resources/services/filters-service';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router, LocationService, FiltersService, EventAggregator, )
export class Map {
    @bindable remarks = [];

    constructor(router, location, filters, eventAggregator) {
        this.router = router;
        this.location = location;
        this.filters = filters;
        this.eventAggregator = eventAggregator;
        this.map = null;
    }

    attached() {
        this.position = {lat: this.location.current.latitude, lng: this.location.current.longitude};
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: this.position
        });
        this.drawRadius();
        this.eventAggregator.publish('map:loaded');
    }

    remarksChanged(newValue){
        newValue.forEach(remark => {
            let longitude = remark.location.coordinates[0];
            let latitude = remark.location.coordinates[1];
            let position = {lng: longitude, lat: latitude};
            let category = remark.category.name;
            let url = this.router.generate('remark', {id: remark.id});
            let description = remark.description && remark.description.length > 15 ? 
                              `${remark.description.substring(0,15)}...` : remark.description;
            var content = `<strong>${category}</strong><br/><a href="${url}" class="btn waves-effect waves-light">Details</a><br/>${description}`;
            let infowindow = new google.maps.InfoWindow({
                content: content
            });
            let marker = new google.maps.Marker({
                position: position,
                title: "Details",
                map: this.map
            });
            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
        });
    }

    drawRadius(){
        var circle = new google.maps.Circle({
            strokeColor: '#E40521',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF1F3B',
            fillOpacity: 0.3,
            map: this.map,
            center: this.position,
            radius: parseFloat(this.filters.filters.radius)
        });
    }
}
