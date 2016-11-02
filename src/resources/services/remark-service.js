import ApiBaseService from 'resources/services/api-base-service';

export default class RemarkService extends ApiBaseService {

  async sendRemark(remark) {
    this.cacheService.invalidateMatchingKeys(this.remarksRegexp);

    return await this.post('remarks', remark);
  }

  async browse(query) {
    //Building custom key with fixed lat & lng, so it works properly for minimal location updates.
    let path = 'remarks';
    let latitude = query.latitude || 0;
    let longitude = query.longitude || 0;
    query.latitude = parseFloat(latitude.toFixed(5));
    query.longitude = parseFloat(longitude.toFixed(5));
    let newCacheKey = this.buildPathWithQuery(path, query);
    let hasKey = this.cacheService.hasKey(`cache/api/${newCacheKey}`);
    if (hasKey) {
      this.cacheService.invalidate(newCacheKey);
    }

    query.latitude = latitude;
    query.longitude = longitude;

    return await this.get(path, query, true, newCacheKey);
  }

  async getCategories() {
    return await this.get('remarks/categories');
  }

  async getRemark(id) {
    return await this.get(`remarks/${id}`);
  }

  async getPhoto(id) {
    return await this.get(`remarks/${id}/photo`);
  }

  async resolveRemark(command) {
    return await this.put('remarks', command);
  }

  async deleteRemark(id) {
    return await this.delete(`remarks/${id}`);
  }

  get remarksRegexp() {
    return /^cache\/api\/remarks.*/;
  }
}
