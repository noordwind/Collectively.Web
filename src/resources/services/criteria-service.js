import {inject} from 'aurelia-framework';
import ApiBaseService from 'resources/services/api-base-service';
import OperationService from 'resources/services/operation-service';

@inject(ApiBaseService, OperationService)
export default class CriteriaService {
  constructor(apiBaseService, operationService)  {
    this.apiBaseService = apiBaseService;
    this.operationService = operationService;
    this.memberRoles = ['participant', 'moderator', 'administrator', 'owner']
  }

  canResolveRemark(remark, userId) {
    return this._canExecute('remark_resolve', remark, userId);
  }

  canDeleteRemark(remark, userId) {
    return this._canExecute('remark_delete', remark, userId);
  }

  canDeleteRemarkComment(remark, userId) {
    return this._canExecute('remark_comment_delete', remark, userId);
  }

  _canExecute(criterion, remark, userId) {
    if (userId === null || typeof userId === 'undefined') {
      return false;
    }
    let criterionRoles = remark.group.criteria[criterion];
    if (criterionRoles === null || typeof criterionRoles === 'undefined') {
      return false;
    }
    let criterionRole = criterionRoles[0]; 
    if (criterionRole === 'public') {
      return true;
    }
    let memberRole = remark.group.members[userId];

    return this._hasValidMemberRole(criterionRole, memberRole);
  }

  _hasValidMemberRole(criterionRole, memberRole) {
    if (memberRole === null || typeof memberRole === 'undefined') {
      return false;
    }
    let criterionRoleIndex = this.memberRoles.indexOf(criterionRole);
    let memberRoleIndex = this.memberRoles.indexOf(memberRole);
    
    return memberRoleIndex >= criterionRoleIndex;
  }
}
