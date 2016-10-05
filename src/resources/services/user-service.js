import ApiBaseService from 'resources/services/api-base-service';

export default class UserService extends ApiBaseService {
    async signIn(accessToken) {
        return await this.post('sign-in', { accessToken });
    }

    async getUser(id){
        return await this.get(`users/${id}`);
    }

    async changeUsername(name){
        return await this.put('account/username', { name });
    }
}