import {inject} from 'aurelia-framework';
import ApiBaseService from 'resources/services/api-base-service';
import IdentityBaseService from 'resources/services/identity-base-service';
import OperationService from 'resources/services/operation-service';

@inject(ApiBaseService, IdentityBaseService, OperationService)
export default class UserService {
  constructor(apiBaseService, identityBaseService, operationService)  {
    this.apiBaseService = apiBaseService;
    this.identityBaseService = identityBaseService;
    this.operationService = operationService;
    this.moderatorRoles = ['moderator', 'administrator'];
  }

  async browse(query) {
    return await this.apiBaseService.get('users', query, false);
  }

  async signIn(account) {
    return await this.apiBaseService.post('sign-in', account);
  }

  async signUp(account) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.post('sign-up', account));
  }

  async getAccount(cache = true) {
    return await this.apiBaseService.get('account', {}, cache);
  }

  async getAccountByName(name) {
    return await this.apiBaseService.get(`users/${name}`, {}, false);
  }

  async getUserNotificationSettings() {
    return await this.apiBaseService.get('account/settings/notifications', {}, false);
  }

  async isNameAvailable(name) {
    return await this.apiBaseService.get(`account/names/${name}/available`, {}, false);
  }

  async setUserNotificationSettings(settings) {
    return await this.operationService.execute(async()
      => await this.apiBaseService.put('account/settings/notifications', settings));
  }

  async changeUsername(name) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.put('account/name', { name }));
  }

  async changePassword(currentPassword, newPassword) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.put('account/password', { currentPassword, newPassword }));
  }

  async resetPassword(email) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.post('reset-password', { email }));
  }

  async setNewPassword(email, token, password) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.post('reset-password/set-new', { email, token, password }));
  }

  async uploadAvatar(avatar) {
    this._clearAccountCache();
    return await this.operationService.execute(async ()
      => await this.apiBaseService.post('account/avatar', avatar));
  }

  async removeAvatar() {
    this._clearAccountCache();
    return await this.operationService.execute(async ()
      => await this.apiBaseService.delete('account/avatar'));
  }

  async addFavoriteRemark(remarkId) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.put(`account/favorites/remarks/${remarkId}`));
  }

  async deleteFavoriteRemark(remarkId) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.delete(`account/favorites/remarks/${remarkId}`));
  }

  async activateAccount(email, token) {
    return await this.operationService.execute(async ()
    => await this.apiBaseService.post('account/activate', {
      email: email,
      token: token
    }));
  }

  async lockAccount(userId) {
    this._clearUsersCache();
    return await this.operationService.execute(async ()
      => await this.apiBaseService.put(`users/${userId}/lock`));
  }

  async unlockAccount(userId) {
    this._clearUsersCache();
    return await this.operationService.execute(async ()
      => await this.apiBaseService.put(`users/${userId}/unlock`));
  }

  canModerate(user) {
    return user !== null && typeof user !== 'undefined' &&
      this.moderatorRoles.indexOf(user.role) >= 0;
  }

  _clearAccountCache() {
    this.apiBaseService.cacheService.invalidateMatchingKeys(/^cache\/api\/account*/);
  }

  _clearUsersCache() {
    this.apiBaseService.cacheService.invalidateMatchingKeys(/^cache\/user*/);
  }
}
