import ApiBaseService from 'resources/services/api-base-service';

export default class UserService extends ApiBaseService {
  async signIn(accessToken) {
    return await this.post('sign-in', { accessToken });
  }

  async getAccount() {
    return await this.get('account');
  }

  async getAccountByName(name) {
    return await this.get(`${name}/account`);
  }

  async isNameAvailable(name) {
    return await this.get(`${name}/available`, {}, false);
  }

  async changeUsername(name) {
    return await this.put('account/username', { name });
  }
}
