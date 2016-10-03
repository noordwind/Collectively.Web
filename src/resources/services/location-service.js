import ApiBaseService from 'resources/services/api-base-service';

export default class LocationService extends ApiBaseService {
    getLocation(next, err){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(next);
            
            return;
        }
        err();
    }
}