import {inject} from 'aurelia-framework';
import AuthService from 'resources/services/auth-service';
import UserService from 'resources/services/user-service';
import RemarkService from 'resources/services/remark-service';
import LocationService from 'resources/services/location-service';
import StatisticsService from 'resources/services/statistics-service';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';
import TranslationService from 'resources/services/translation-service';
import {Router} from 'aurelia-router';

@inject(AuthService, UserService, RemarkService,
LocationService, StatisticsService, ToastService,
LoaderService, TranslationService, Router)
export class Profile {
  constructor(authService, userService, remarkService,
  locationService, statisticsService, toast, loader,
    translationService, router) {
    this.authService = authService;
    this.userService = userService;
    this.remarkService = remarkService;
    this.location = locationService;
    this.statisticsService = statisticsService;
    this.toast = toast;
    this.loader = loader;
    this.translationService = translationService;
    this.router = router;
    this.sending = false;
    this.remarks = [];
    this.username = '';
    this.user = null;
    this.currentUser = null;
    this.statistics = {
      reportedCount: 0,
      resolvedCount: 0
    };
  }

  async activate(params) {
    if (params.name) {
      this.username = params.name;
    }
  }

  async attached() {
    await this.fetchUser();
    if (!this.user.name) {
      return;
    }
    await this.fetchStatistics();
    await this.fetchRemarks();
    this.avatar = this.user.avatarUrl ? this.user.avatarUrl : 'assets/images/user_placeholder.png';
    this.fileInput = document.getElementById('new-image');
    $('#new-image').change(async () => {
      this.newImage = this.files[0];
    });
  }

  async fetchUser() {
    this.currentUser = await this.userService.getAccount();
    if (this.isCurrentUser) {
      this.user = this.currentUser;
    } else {
      this.user = await this.userService.getAccountByName(this.username);
    }
  }

  async fetchStatistics() {
    let statistics = await this.statisticsService.getUserStatistics(this.user.userId);
    if (statistics.name) {
      this.statistics = statistics;
    } else {
      this.statistics = {
        remarks: {
          reportedCount: 0
        }
      };
    }
  }

  async fetchRemarks() {
    let query = {
      authorId: this.user.userId,
      state: 'active',
      page: 1,
      results: 5,
      orderBy: 'createdAt',
      sortOrder: 'descending'
    };
    let remarks = await this.remarkService.browse(query);
    remarks.forEach(remark => {
      remark.url = this.router.generate('remark', { id: remark.id });
      remark.distance = this.location.calculateDistance({
        latitude: remark.location.coordinates[1],
        longitude: remark.location.coordinates[0]
      });
    }, this);
    this.remarks = remarks;
  }

  get isCurrentUser() {
    return !this.username || this.currentUser.name === this.username;
  }

  get isCollectivelyAccount() {
    return this.authService.provider === 'collectively';
  }

  get avatarUrl() {
    return this.avatar;
  }

  displayCamera() {
    this.fileInput.click();
  }

  newImageResized = async (base64) => {
    if (base64 === '') {
      return;
    }
    this.base64Image = base64;
    this.avatar = base64;
    this.avatarSelected = true;
  };

  async uploadAvatar() {
    this.avatarSelected = false;
    this.sending = true;
    this.loader.display();
    let reader = new FileReader();
    let file = this.newImage;
    reader.onload = async () => {
      if (file.type.indexOf('image') < 0) {
        this.toast.error(this.translationService.trCode('invalid_file'));
        this.loader.hide();
        this.sending = false;
        this.avatarSelected = true;

        return;
      }
      let avatar = {
        base64: this.base64Image,
        name: file.name,
        contentType: file.type
      };
      let request = {
        avatar
      };
      await this.userService.uploadAvatar(request);
      this.toast.success(this.translationService.tr('account.avatar_uploaded'));
      this.sending = false;
      this.loader.hide();
    };
    reader.readAsDataURL(file);
  }
}
