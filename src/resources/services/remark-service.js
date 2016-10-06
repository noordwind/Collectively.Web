import ApiBaseService from 'resources/services/api-base-service';

export default class RemarkService extends ApiBaseService {
    async sendRemark(remark){
        return await this.post('remarks', remark);
    }

    async browse(){
        return await this.get('remarks');
    }

    async getRemark(id){
        return await this.get(`remarks/${id}`);
    }

    async getPhoto(id){
        return await this.get(`remarks/${id}/photo`);
    }
}