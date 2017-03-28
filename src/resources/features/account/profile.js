import {inject} from 'aurelia-framework';
import AuthService from 'resources/services/auth-service';
import UserService from 'resources/services/user-service';
import LocationService from 'resources/services/location-service';
import StatisticsService from 'resources/services/statistics-service';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';
import TranslationService from 'resources/services/translation-service';
import OperationService from 'resources/services/operation-service';
import {Router} from 'aurelia-router';

@inject(AuthService, UserService, LocationService,
StatisticsService, ToastService, LoaderService,
TranslationService, OperationService, Router)
export class Profile {
  constructor(authService, userService, locationService,
  statisticsService, toast, loader, translationService,
  operationService, router) {
    this.authService = authService;
    this.userService = userService;
    this.location = locationService;
    this.statisticsService = statisticsService;
    this.toast = toast;
    this.loader = loader;
    this.translationService = translationService;
    this.operationService = operationService;
    this.router = router;
    this.sending = false;
    this.username = '';
    this.user = null;
    this.currentUser = null;
    this.statistics = {
      reportedCount: 0,
      resolvedCount: 0
    };
    this.setDefaultAvatar();
  }

  async activate(params) {
    if (params.name) {
      this.username = params.name;
    }
  }

  async attached() {
    this.operationService.subscribe('upload_avatar',
      async operation => await this.handleAvatarUploaded(operation),
      operation => this.handleUploadAvatarRejected(operation));
    this.operationService.subscribe('remove_avatar',
      async operation => await this.handleAvatarRemoved(operation),
      operation => this.handleRemoveAvatarRejected(operation));
    await this.fetchUser();
    if (!this.user.name) {
      return;
    }
    await this.fetchStatistics();
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
    if (this.user.avatarUrl) {
      this.avatar = this.user.avatarUrl;
    }
  }

  async fetchStatistics() {
    let statistics = await this.statisticsService.getUserStatistics(this.user.userId);
    if (statistics.name) {
      this.statistics = statistics;
    } else {
      this.statistics = {
        remarks: {
          reportedCount: 0,
          resolvedCount: 0
        }
      };
    }
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

  get defaultAvatarUrl() {
    return 'assets/images/user_placeholder.png';
  }

  get isAvatarDefault() {
    return this.avatarUrl === this.defaultAvatarUrl;
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
    };
    reader.readAsDataURL(file);
  }

  async handleAvatarUploaded(operation) {
    this.toast.success(this.translationService.tr('account.avatar_uploaded'));
    this.sending = false;
    this.loader.hide();
  }

  handleUploadAvatarRejected(operation) {
    this.toast.error(this.translationService.trCode(operation.code));
    this.sending = false;
    this.loader.hide();
  }

  async removeAvatar() {
    this.sending = true;
    this.loader.hide();
    await this.userService.removeAvatar();
  }

  async handleAvatarRemoved(operation) {
    this.setDefaultAvatar();
    this.toast.success(this.translationService.tr('account.avatar_removed'));
    this.sending = false;
    this.loader.hide();
  }

  handleRemoveAvatarRejected(operation) {
    this.toast.error(this.translationService.trCode(operation.code));
    this.sending = false;
    this.loader.hide();
  }

  setDefaultAvatar() {
    this.avatar = this.defaultAvatarUrl;
  }
}
