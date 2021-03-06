import {inject} from 'aurelia-framework';
import UserService from 'resources/services/user-service';
import LoaderService from 'resources/services/loader-service';

@inject(UserService, LoaderService)
export class NotificationsSettings {
  constructor(userService, loaderService) {
    this.userService = userService;
    this.loader = loaderService;
    this.emailSettings = null;
    this.pushSettings = null;
    this.preferredLanguage = null;
  }

  async attached() {
    this.loader.display();
    let settings = await this.userService.getUserNotificationSettings();
    this.account = await this.userService.getAccount();
    if (settings.statusCode && settings.statusCode === 'notFound') {
      settings = this.defaultSettings;
    }
    this.preferredLanguage = settings.culture;
    this.emailSettings = this.processSettings(settings.emailSettings);
    this.pushSettings = this.processSettings(settings.pushSettings);
    this.loader.hide();
  }

  async deactivate() {
    await this.updateSettings();
  }

  processSettings(settings) {
    let checkboxes = [
      {name: 'enabled', checked: settings.enabled, translationKey: 'notifications.enabled'},
      {name: 'remarkCreated', checked: settings.remarkCreated, translationKey: 'notifications.remark_created', description: 'notifications.remark_created_description'},
      {name: 'remarkProcessed', checked: settings.remarkProcessed, translationKey: 'notifications.remark_processed', description: 'notifications.remark_processed_description'},
      {name: 'remarkResolved', checked: settings.remarkResolved, translationKey: 'notifications.remark_resolved', description: 'notifications.remark_resolved_description'},
      {name: 'remarkCanceled', checked: settings.remarkCanceled, translationKey: 'notifications.remark_canceled', description: 'notifications.remark_canceled_description'},
      {name: 'remarkRenewed', checked: settings.remarkRenewed, translationKey: 'notifications.remark_renewed', description: 'notifications.remark_renewed_description'},
      {name: 'photosToRemarkAdded', checked: settings.photosToRemarkAdded, translationKey: 'notifications.photo_added', description: 'notifications.photo_added_description'},
      {name: 'commentAdded', checked: settings.commentAdded, translationKey: 'notifications.comment_added', description: 'notifications.comment_added_description'}
    ];

    return checkboxes;
  }

  async updateSettings() {
    let emailSettings = this.getSettingsFromCheckboxes(this.emailSettings);
    let pushSettings = this.getSettingsFromCheckboxes(this.pushSettings);

    let settings = {
      userId: this.account.userId,
      email: this.account.email,
      username: this.account.name,
      culture: this.preferredLanguage,
      emailSettings: emailSettings,
      pushSettings: pushSettings
    };

    await this.userService.setUserNotificationSettings(settings);
  }

  getSettingsFromCheckboxes(checkboxList) {
    let settings = {};
    checkboxList.forEach(element => {
      settings[element.name] = element.checked;
    }, this);

    return settings;
  }

  isMainSwitch(setting) {
    return setting && setting.name === 'enabled';
  }

  get showEmailSection() {
    return this.emailSettings !== null;
  }

  get showEmailSettings() {
    return this.showEmailSection && this.emailSettings[0].checked;
  }

  get showPushSection() {
    return this.pushSettings !== null;
  }

  get showPushSettings() {
    return this.showPushSection && this.pushSettings[0].checked;
  }

  get defaultSettings() {
    return {
      userId: this.account.userId,
      email: this.account.email,
      username: this.account.name,
      culture: 'en-gb',
      emailSettings: {
        enabled: true,
        remarkCreated: false,
        remarkProcessed: true,
        remarkResolved: true,
        remarkCanceled: true,
        remarkRenewed: true,
        remarkDeleted: true,
        photosToRemarkAdded: true,
        commentAdded: true
      },
      pushSettings: {
        enabled: false,
        remarkCreated: true,
        remarkProcessed: true,
        remarkResolved: true,
        remarkCanceled: true,
        remarkDeleted: true,
        remarkRenewed: true,
        photosToRemarkAdded: true,
        commentAdded: true
      }
    };
  }
}
