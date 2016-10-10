import ApiBaseService from 'resources/services/api-base-service';

export default class RemarkService extends ApiBaseService {
    async sendRemark(remark){
        return await this.post('remarks', remark);
    }

    async browse(query){
        return await this.get('remarks', query);
    }

    async getCategories(){
        return await this.get('remarks/categories');
    }

    async getRemark(id){
        return await this.get(`remarks/${id}`);
    }

    async getPhoto(id){
        return await this.get(`remarks/${id}/photo`);
    }

    async deleteRemark(id){
        return await this.delete('remarks', {remarkId : id});
    }
}