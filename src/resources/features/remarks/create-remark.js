import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {I18N} from 'aurelia-i18n';
import environment from '../../../environment';
import TranslationService from 'resources/services/translation-service';
import LocationService from 'resources/services/location-service';
import RemarkService from 'resources/services/remark-service';
import GroupService from 'resources/services/group-service';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';
import OperationService from 'resources/services/operation-service';
import LogService from 'resources/services/log-service';
import StorageService from 'resources/services/storage-service'
import FeatureService from 'resources/services/feature-service'
import {ObserverLocator} from 'aurelia-binding';

@inject(Router, I18N, TranslationService, LocationService,
RemarkService, GroupService, ToastService, LoaderService, OperationService,
LogService, StorageService, FeatureService, ObserverLocator)
export class CreateRemark {
  constructor(router, i18n, translationService, location, remarkService,
    groupService, toast, loader, operationService, logService, 
    storageService, featureService, observerLocator) {
    this.router = router;
    this.i18n = i18n;
    this.translationService = translationService;
    this.environment = environment;
    this.location = location;
    this.remarkService = remarkService;
    this.groupService = groupService;
    this.toast = toast;
    this.loader = loader;
    this.operationService = operationService;
    this.storageService = storageService;
    this.log = logService;
    this.observerLocator = observerLocator;
    this.featureService = featureService;
    this.remark = {
      category: {
        name: ''
      },
      tags: [],
      hasOffering: false,
      offering: {
        price: 1,
        currency: "BTC",
        startDate: null,
        endDate: null
      }
    };
    this.currencies = [
      {"name": "BTC", "code": "BTC"},
      {"name": "PLN", "code": "PLN"},
      {"name": "EUR", "code": "EUR"},
      {"name": "USD", "code": "USD"}
    ];
    this.groups = [];
    this.sending = false;
    this.foundAddress = '';
    this.coordinates = {};
    this.summaryVisible = false;
    this.similarRemarks = [];
  }

  async activate(params) {
    this.address = this.location.current.address;
    this.foundAddress = this.address;
    this.remark.category.name = params.category;
    this.remark.latitude = this.location.current.latitude;
    this.remark.longitude = this.location.current.longitude;
    this.remark.address = this.location.current.address;
    this.coordinates.latitude = this.location.current.latitude;
    this.coordinates.longitude = this.location.current.longitude;
    let remarkLocation = this.storageService.read(this.environment.createRemarkLocationStorageKey);
    if (remarkLocation !== null && typeof remarkLocation !== 'undefined') {
      this.address = remarkLocation.address;
      this.foundAddress = remarkLocation.address;
      this.remark.latitude = remarkLocation.latitude;
      this.remark.longitude = remarkLocation.longitude;
      this.remark.address = remarkLocation.address;
      this.coordinates.latitude = remarkLocation.latitude;
      this.coordinates.longitude = remarkLocation.longitude;      
    } else {
      this.refreshLocation();
    }
    this.groups.push(this.defaultLoadingGroup);
    this.selectGroup(this.groups[0]);
    this.loadInitialData();
  }

  async loadInitialData() {
    // let tags = await this.remarkService.getTags();
    // this.tags = tags.map(tag => {
    //   return {
    //     key: tag.name,
    //     value: this.translationService.tr(`tags.${tag.name}`),
    //     selected: false
    //   };
    // });
    this.groups = await this.groupService.browse({});
    this.groups.push(this.defaultGroup);
    this.selectGroup(this.groups[0]);
    let query = {
      radius: 10,
      longitude: this.coordinates.longitude,
      latitude: this.coordinates.latitude,
      category: this.remark.category.name
    };
    this.similarRemarks = await this.remarkService.browseSimilar(query);
    this.similarRemarks.forEach(remark => {
      remark.url = this.router.generate('remark', { id: remark.id });
      remark.icon = `assets/images/${remark.category.name}_icon_dark.png`;
    });
  } 

  attached() {
    this.log.trace('create_remark_attached');
    this.operationService.subscribe('create_remark',
      async operation => await this.handleRemarkCreated(operation),
      operation => this.handleCreateRemarkRejected(operation));

    this.setupCameraInput();
    this.setupFileInput();

    this.observerLocator.getObserver(this, 'address')
      .subscribe(async (newValue, oldValue) => {
        this.coordinates = {};
        if (newValue.match(/^ *$/) !== null) {
          return;
        }
        let addresses = await this.geocode(newValue);
        addresses.forEach(address => {
          let location = address.geometry.location;
          this.foundAddress = address.formatted_address;
          this.coordinates.latitude = location.lat();
          this.coordinates.longitude = location.lng();
        });
      });
  }

  get featuresEnabled() {
    return this.featureService.enabled;
  }

  detached() {
    this.operationService.unsubscribeAll();
    this.location.stopUpdatingAddress();
  }

  get displayRemarkPhoto() {
    return this.remark.photos && this.remark.photos.length > 0;
  }

  setupCameraInput() {
    this.cameraInput = document.getElementById('camera-input');
    $('#camera-input').change(async () => {
      this.newImage = this.files[0];
    });
  }

  setupFileInput() {
    this.fileInput = document.getElementById('file-input');
    $('#file-input').change(async () => {
      this.newImage = this.files[0];
    });
  }

  refreshLocation() {
    this.location.stopUpdating();
    this.location.startUpdatingAddress();
    this.location.startUpdating();
    this.address = this.location.current.address;
  }

  clearAddress() {
    this.address = '';
  }

  selectGroup(group) {
    this.remark.group = {};
    this.remark.groupId = group.id;
    this.remark.group.name = group.name;
  }

  selectCurrency(currency) {
    this.remark.offering.currency = currency.code;
  }

  get defaultGroup() {
    return {id: "", name: this.translationService.tr('group.send_globally')};
  }

  get defaultLoadingGroup() {
    return {id: "", name: this.translationService.tr('group.loading')};
  }
  
  async geocode(value) {
    return new Promise((resolve, reject) => {
      new google.maps.Geocoder().geocode({ address: value }, (results, status) => {
        status === google.maps.GeocoderStatus.OK ? resolve(results) : {};
      });
    });
  }

  goToSummary() {
    if (!this.coordinates.longitude) {
      this.toast.error(this.translationService.trCode('invalid_address'));

      return;
    }
    if (!this.remark.hasOffering) {
      this.remark.offering = null;
    }
    this.remark.address = this.foundAddress;
    this.remark.latitude = this.coordinates.latitude;
    this.remark.longitude = this.coordinates.longitude;
    this.toggleSummary();
  }

  toggleSummary() {
    this.summaryVisible = !this.summaryVisible;
  }

  get displaySimilarRemarks() {
    return this.similarRemarks.length > 0;
  }

  async sendRemark() {
    this.sending = true;
    this.loader.display();
    this.toast.info(this.translationService.tr('remark.sending'));
    //this.remark.tags = this.tags.filter(x => x.selected).map(x => x.key);
    let remark = JSON.parse(JSON.stringify(this.remark));
    remark.category = this.remark.category.name;
    this.log.trace('create_remark_submitted', {remark: remark});
    await this.remarkService.sendRemark(remark);
  }

  displayCamera() {
    this.cameraInput.click();
  }

  displayFileInput() {
    this.fileInput.click();
  }

  removePhoto() {
    this.remark.photos = [];
  }

  newImageResized = async (base64) => {
    if (base64 === '') {
      return;
    }
    this.base64Image = base64;
    this.remark.photos = [{
      medium: base64,
      visible: true
    }];
  };

  async addPhotos(remarkId, base64Image) {
    this.sending = true;
    this.loader.display();
    let reader = new FileReader();
    let file = this.newImage;
    reader.onload = async () => {
      if (file.type.indexOf('image') < 0) {
        this.toast.error(this.translationService.trCode('invalid_file'));
        this.loader.hide();
        this.sending = false;

        return;
      }
      let photo = {
        base64: base64Image,
        name: file.name,
        contentType: file.type
      };

      let photos = {
        photos: [photo]
      };

      await this.remarkService.addPhotos(remarkId, photos);
    };
    reader.readAsDataURL(file);
  }

  async handleRemarkCreated(operation) {
    this.toast.success(this.translationService.tr('remark.processed'));
    this.loader.hide();
    let resourceData = operation.resource.split('/');
    let remarkId = resourceData[resourceData.length - 1];
    if (this.remark.photos) {
      await this.addPhotos(remarkId, this.base64Image);
    }
    this.router.navigateToRoute('remark-added', { id: remarkId });
  }

  handleCreateRemarkRejected(operation) {
    this.toast.error(this.translationService.trCode(operation.code));
    this.sending = false;
    this.loader.hide();
  }

  toggleTag(tag) {
    tag.selected = !tag.selected;
  }
}
