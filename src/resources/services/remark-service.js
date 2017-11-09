import {inject} from 'aurelia-framework';
import ApiBaseService from 'resources/services/api-base-service';
import OperationService from 'resources/services/operation-service';

@inject(ApiBaseService, OperationService)
export default class RemarkService {
  constructor(apiBaseService, operationService) {
    this.apiBaseService = apiBaseService;
    this.operationService = operationService;
  }

  async sendRemark(remark) {
    this._clearRemarksCache();
    this._clearStatisticsCache();

    return await this.operationService.execute(async ()
      => await this.apiBaseService.post('remarks', remark));
  }

  async getTags() {
    return await this.apiBaseService.get('tags?results=1000');
  }

  async browse(query, cache = true) {
    //Building custom key with fixed lat & lng, so it works properly for minimal location updates.
    let path = 'remarks';
    let latitude = query.latitude || 0;
    let longitude = query.longitude || 0;
    query.latitude = parseFloat(latitude.toFixed(5));
    query.longitude = parseFloat(longitude.toFixed(5));
    let newCacheKey = this.apiBaseService.buildPathWithQuery(path, query);
    let hasKey = this.apiBaseService.cacheService.hasKey(`cache/api/${newCacheKey}`);
    if (!hasKey) {
      this._clearRemarksCache();
    }

    query.latitude = latitude;
    query.longitude = longitude;

    return await this.apiBaseService.get(path, query, cache, newCacheKey);
  }

  async browseSimilar(query) {
    let latitude = query.latitude || 0;
    let longitude = query.longitude || 0;
    query.latitude = parseFloat(latitude.toFixed(5));
    query.longitude = parseFloat(longitude.toFixed(5));

    return await this.apiBaseService.get('remarks/similar', query, false);
  }

  async addPhotos(remarkId, photos) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.put(`remarks/${remarkId}/photos`, photos));
  }

  async deletePhoto(remarkId, groupId) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.delete(`remarks/${remarkId}/photos/${groupId}`));
  }

  async vote(remarkId, positive) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.put(`remarks/${remarkId}/votes`, { positive }));
  }

  async deleteVote(remarkId) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.delete(`remarks/${remarkId}/votes`));
  }

  async addComment(remarkId, text) {
    let request = {
      text
    };

    return await this.operationService.execute(async ()
      => await this.apiBaseService.post(`remarks/${remarkId}/comments`, request));
  }

  async editComment(remarkId, commentId, text) {
    let request = {
      text
    };

    return await this.operationService.execute(async ()
      => await this.apiBaseService.put(`remarks/${remarkId}/comments/${commentId}`, request));
  }

  async deleteComment(remarkId, commentId) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.delete(`remarks/${remarkId}/comments/${commentId}`));
  }

  async voteComment(remarkId, commentId, positive) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.put(`remarks/${remarkId}/comments/${commentId}/votes`, { positive }));
  }

  async deleteCommentVote(remarkId, commentId) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.delete(`remarks/${remarkId}/comments/${commentId}/votes`));
  }

  async takeAction(remarkId, description) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.post(`remarks/${remarkId}/actions`, { description }));
  }

  async cancelAction(remarkId) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.delete(`remarks/${remarkId}/actions`));
  }

  async process(remarkId, description) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.post(`remarks/${remarkId}/actions`, { description }));
  }

  async getCategories() {
    return await this.apiBaseService.get('remarks/categories');
  }

  async getRemark(id) {
    return await this.apiBaseService.get(`remarks/${id}`, {}, false);
  }

  async resolveRemark(command) {
    this._clearRemarksCache();
    this._clearStatisticsCache();

    return await this.operationService.execute(async ()
      => await this.apiBaseService.put(`remarks/${command.remarkId}/resolve`, command));
  }

  async renewRemark(command) {
    this._clearRemarksCache();
    this._clearStatisticsCache();

    return await this.operationService.execute(async ()
      => await this.apiBaseService.put(`remarks/${command.remarkId}/renew`, command));
  }

  async processRemark(remarkId, description) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.put(`remarks/${remarkId}/process`, { description }));
  }

  async cancelRemark(remarkId, description) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.put(`remarks/${remarkId}/cancel`, { description }));
  }

  async deleteState(remarkId, stateId) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.delete(`remarks/${remarkId}/states/${stateId}`));
  }

  async assignGroup(remarkId, groupId) {
    return await this.operationService.execute(async ()
      => await this.apiBaseService.post(`remarks/${remarkId}/assignments`, { groupId }));
  }

  async deleteRemark(id) {
    this._clearRemarksCache();
    this._clearStatisticsCache();

    return await this.operationService.execute(async ()
      => await this.apiBaseService.delete(`remarks/${id}`));
  }

  getAssignableGroups(remark, user) {
    if (!user.groups || user.groups.length === 0) {
      return [];
    }
    if (!remark.availableGroups || remark.availableGroups.length === 0) {
      return [];
    }

    let groups = [];
    user.groups.forEach(userGroup => {
      if (!userGroup.isActive) {
        return;
      }
      if (userGroup.role === 'participant') {
        return;
      }
      let isValidGroup = remark.availableGroups.findIndex(x => x === userGroup.id) >= 0;
      if (!isValidGroup) {
        return;
      }
      groups.push({id: userGroup.id, name: userGroup.name});
    });

    return groups;
  }

  get remarksRegexp() {
    return /^cache\/api\/remarks.*/;
  }

  get statisticsRegexp() {
    return /^cache\/api\/statistics.*/;
  }

  _clearRemarksCache() {
    this.apiBaseService.cacheService.invalidateMatchingKeys(this.remarksRegexp);
  }

  _clearStatisticsCache() {
    this.apiBaseService.cacheService.invalidateMatchingKeys(this.statisticsRegexp);
  }
}
