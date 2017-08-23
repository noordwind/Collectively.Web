import {inject} from 'aurelia-framework';
import ApiBaseService from 'resources/services/api-base-service';
import OperationService from 'resources/services/operation-service';

@inject(ApiBaseService, OperationService)
export default class ReportService {
  constructor(apiBaseService, operationService) {
    this.apiBaseService = apiBaseService;
    this.operationService = operationService;
  }

  async reportActivity(remarkId, activityId) {
    return await this._report('activity', remarkId, activityId);
  }

  async reportComment(remarkId, commentId) {
    return await this._report('comment', remarkId, commentId);
  }

  async reportRemark(remarkId) {
    return await this._report('remark', remarkId);
  } 

  async _report(type, remarkId, resourceId) {
    this._clearRemarksCache();
    return await this.operationService.execute(async ()
      => await this.apiBaseService.post(`remarks/${remarkId}/reports`, {type, resourceId}));
  }
  
  _clearRemarksCache() {
    this.apiBaseService.cacheService.invalidateMatchingKeys(this.remarksRegexp);
  }
}
