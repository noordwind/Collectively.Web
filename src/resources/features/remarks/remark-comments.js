import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {I18N} from 'aurelia-i18n';
import TranslationService from 'resources/services/translation-service';
import LocationService from 'resources/services/location-service';
import FiltersService from 'resources/services/filters-service';
import RemarkService from 'resources/services/remark-service';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';
import AuthService from 'resources/services/auth-service';
import UserService from 'resources/services/user-service';
import CriteriaService from 'resources/services/criteria-service';
import WebsocketService from 'resources/services/websocket-service';
import OperationService from 'resources/services/operation-service';
import LogService from 'resources/services/log-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import Environment from '../../../environment';

@inject(Router, I18N, TranslationService,
LocationService, FiltersService, RemarkService,
ToastService, LoaderService, AuthService, UserService, 
CriteriaService, WebsocketService, OperationService, 
EventAggregator, LogService, Environment)
export class RemarkComments {
  newImageResized = null;

  constructor(router, i18n, translationService, location, filtersService, remarkService,
  toastService, loader, authService, userService, criteriaService, websockets, operationService,
  eventAggregator, logService, environment) {
    this.router = router;
    this.i18n = i18n;
    this.translationService = translationService;
    this.location = location;
    this.filtersService = filtersService;
    this.remarkService = remarkService;
    this.toast = toastService;
    this.loader = loader;
    this.authService = authService;
    this.userService = userService;
    this.criteriaService = criteriaService;
    this.websockets = websockets;
    this.operationService = operationService;
    this.eventAggregator = eventAggregator;
    this.log = logService;
    this.feature = environment.feature;
    this.remark = {};
    this.sending = false;
    this.commentVotes = [];
    this.comment = '';
    this.editedCommentText = '';
    this.editedCommentOriginalText = '';
    this.editedComment = null;
    this.websockets.initialize();
  }

  canAdd() {
    return this.isAuthenticated && !this.remark.resolved;
  }

  canDelete(userId) {
    return this.isAuthenticated && (this.account.userId === userId || 
      this.criteriaService.canDeleteRemarkComment(this.remark, this.account.userId));
  }

  canEdit(userId) {
    return this.isAuthenticated && this.account.userId === userId && !this.remark.resolved;
  }

  removeUserVote(comment) {
    let vote = comment.votes.find(x => x.userId === this.account.userId);
    let index = comment.votes.indexOf(vote);
    comment.votes = comment.votes.splice(index, 1);
    comment.hasVoted = false;
  }

  setUserVote(comment, positive) {
    let vote = comment.votes.find(x => x.userId === this.account.userId);
    if (vote === null || typeof vote === 'undefined') {
      vote = {
        userId: this.account.userId
      };
      comment.votes.push(vote);
    }
    vote.positive = positive;
    comment.hasVoted = true;
    comment.hasVotedPositively = positive;
  }

  getUserVote(commentId) {
    return this.getComment(commentId).votes.find(x => x.userId === this.account.userId);
  }

  getComment(commentId) {
    return this.remark.comments.find(x => x.id === commentId);
  }

  canVote() {
    return this.isAuthenticated && !this.remark.resolved;
  }

  async activate(params, routeConfig) {
    this.id = params.id;
    this.account = {userId: ''};
    this.isAuthenticated = this.authService.isLoggedIn;
    if (this.isAuthenticated) {
      this.account = await this.userService.getAccount();
    }
    await this.loadRemark();
    this.log.trace('remark_comments_activated', {
      remark: this.remark
    });
  }

  async attached() {
    this.remarkDeletedSubscription = await this.subscribeRemarkDeleted();

    this.operationService.subscribe('add_comment_to_remark',
      operation => this.handleCommentAddedToRemark(operation),
      operation => this.handleRejectedOperation(operation));

    this.operationService.subscribe('edit_remark_comment',
      operation => this.handleCommentEditedInRemark(operation),
      operation => this.handleRejectedOperation(operation));

    this.operationService.subscribe('submit_remark_comment_vote',
      operation => this.handleVoteSubmitted(operation),
      operation => this.handleRejectedOperation(operation));

    this.operationService.subscribe('delete_remark_comment_vote',
      operation => this.handleVoteDeleted(operation),
      operation => this.handleRejectedOperation(operation));

    this.log.trace('remark_comments_attached');
  }

  detached() {
    this.remarkDeletedSubscription.dispose();
    this.operationService.unsubscribeAll();
  }

  async loadRemark() {
    let remark = await this.remarkService.getRemark(this.id);
    this.remark = remark;
    if (remark.comments === null) {
      remark.comments = [];
    }
    if (remark.votes === null) {
      remark.votes = [];
    }
    this.remark.comments.forEach(c => {
      c.edited = c.history.length > 0;
      c.editedAt = c.edited ? c.history[0].createdAt : null;
      let vote = c.votes.find(x => x.userId === this.account.userId);
      if (vote === null || typeof vote === 'undefined') {
        c.hasVoted = false;

        return;
      }
      c.hasVoted = true;
      c.hasVotedPositively = vote.positive;
    });
  }

  async delete(comment) {
    if (this.canDelete(comment.user.userId) === false) {
      await this.toast.error(this.translationService.tr('remark.not_allowed_to_delete_comment'));

      return;
    }
    await this.remarkService.deleteComment(this.id, comment.id);
    this.toast.info(this.translationService.tr('remark.comment_was_removed'));
    comment.removed = true;
  }

  async subscribeRemarkDeleted() {
    return await this.eventAggregator
      .subscribe('remark:deleted', async message => {
        if (this.remark.id !== message.remarkId) {
          return;
        }
        if (this.account.userId !== this.remark.author.userId) {
          this.toast.info(this.translationService.tr('remark.remark_removed_by_author'));
          this.router.navigateToRoute('remarks');
        }
      });
  }

  calculateRating(commentId) {
    let comment = this.remark.comments.find(x => x.id === commentId);
    if (Array.isArray(comment.votes)) {
      let rating = 0;
      comment.votes.forEach(x => {
        if (x.positive) {
          comment.rating++;
        } else {
          comment.rating--;
        }
      });
      comment.rating = rating;
    }
  }

  async votePositive(commentId) {
    this._vote(commentId, true);
  }

  async voteNegative(commentId) {
    this._vote(commentId, false);
  }

  async _vote(commentId, positive) {
    this.sending = true;
    await this.remarkService.voteComment(this.id, commentId, positive);
    this._changeVoteType(commentId, positive);
    this.sending = false;
  }

  async deleteVote(commentId) {
    this.sending = true;
    await this.remarkService.deleteCommentVote(this.id, commentId);
    let comment = this.getComment(commentId);
    let positive = !comment.hasVotedPositively;
    this.removeUserVote(comment);
    this._updateRating(comment, positive);
    this.sending = false;
  }

  _changeVoteType(commentId, positive) {
    let comment = this.getComment(commentId);
    this._updateRating(comment, positive);
    if (!comment.hasVoted) {
      this.removeUserVote(comment);
    }
    this.setUserVote(comment, positive);
  }

  _updateRating(comment, positive) {
    if (!comment.hasVoted) {
      if (positive) {
        comment.rating++;
      } else {
        comment.rating--;
      }
      return;
    }
    if (positive) {
      comment.rating += 2;
    } else {
      comment.rating -= 2;
    }
  }

  get isCommentValid() {
    return this._isCommentValid(this.comment);
  }

  get isEditedCommentValid() {
    return this.editedCommentText !== this.editedCommentOriginalText && this._isCommentValid(this.editedCommentText);
  }

  _isCommentValid(comment) {
    return comment !== null && comment.match(/^ *$/) === null && comment.length <= 1000;
  }

  async addComment() {
    this.sending = true;
    this.loader.display();
    this.toast.info(this.translationService.tr('remark.adding_comment'));
    await this.remarkService.addComment(this.remark.id, this.comment);
  }

  async editComment(commentId) {
    this.sending = true;
    this.loader.display();
    this.toast.info(this.translationService.tr('remark.updating_comment'));
    await this.remarkService.editComment(this.remark.id, commentId, this.editedCommentText);
  }

  toggleCommentForm() {
    this.canAdd = !this.canAdd;
    this.commentFormVisible = !this.commentFormVisible;
    this.comment = '';
  }

  hideEditCommentForm(comment) {
    comment.text = this.editedCommentOriginalText;
    comment.editMode = false;
  }

  displayEditCommentForm(comment) {
    this.remark.comments.forEach(c => c.editMode = false);
    this.editedComment = comment;
    this.editedCommentText = comment.text;
    this.editedCommentOriginalText = comment.text;
    comment.editMode = true;
  }

  handleVoteSubmitted(operation) {
    this.toast.success(this.translationService.tr('remark.comment_vote_submitted'));
  }

  handleVoteDeleted(operation) {
    this.toast.success(this.translationService.tr('remark.comment_vote_deleted'));
  }

  handleCommentAddedToRemark(operation) {
    this.loader.hide();
    this.sending = false;
    this.toast.success(this.translationService.tr('remark.comment_added'));
    let resourceData = operation.resource.split('/');
    let commentId = resourceData[resourceData.length - 1];
    this.remark.comments.push({
      renderText: true,
      edited: false,
      editedAt: null,
      id: commentId,
      text: this.comment,
      editMode: false,
      rating: 0,
      createdAt: new Date(),
      history: [],
      votes: [],
      user: {
        userId: this.account.userId,
        name: this.account.name
      }});
    this.toggleCommentForm();
  }

  handleCommentEditedInRemark(operation) {
    let comment = this.getComment(this.editedComment.id);
    comment.history.push({
      text: this.editedCommentOriginalText,
      createdAt: new Date()
    });
    comment.edited = true;
    comment.editedAt = new Date();
    this.editedCommentOriginalText = this.editedCommentText;
    this.hideEditCommentForm(this.editedComment);
    this.editedComment = null;
    this.loader.hide();
    this.sending = false;
    this.toast.success(this.translationService.tr('remark.comment_updated'));
  }

  handleRemarkVoteSubmitted(operation) {
    this.toast.success(this.translationService.tr('remark.vote_submitted'));
  }

  handleRemarkVoteDeleted(operation) {
    this.toast.success(this.translationService.tr('remark.vote_deleted'));
  }

  handleRejectedOperation(operation) {
    this.toast.error(this.translationService.trCode(operation.code));
    this.sending = false;
    this.loader.hide();
  }
}
