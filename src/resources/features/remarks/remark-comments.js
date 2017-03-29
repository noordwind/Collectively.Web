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
import WebsocketService from 'resources/services/websocket-service';
import OperationService from 'resources/services/operation-service';
import LogService from 'resources/services/log-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import Environment from '../../../environment';

@inject(Router, I18N, TranslationService,
LocationService, FiltersService, RemarkService,
ToastService, LoaderService, AuthService, UserService,
WebsocketService, OperationService, EventAggregator,
LogService, Environment)
export class RemarkComments {
  newImageResized = null;

  constructor(router, i18n, translationService, location, filtersService, remarkService,
  toastService, loader, authService, userService, websockets, operationService,
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

  canDelete(userId) {
    return this.isAuthenticated && this.account.userId === userId;
  }

  canEdit(userId) {
    return this.isAuthenticated && this.account.userId === userId;
  }

  canVoteNegatively(commentId) {
    return this.canVote && (this.hasVotedPositively(commentId) || !this.hasVoted(commentId));
  }

  canVotePositively(commentId) {
    return this.canVote && (this.hasVotedNegatively(commentId) || !this.hasVoted(commentId));
  }

  hasVotedPositively(commentId) {
    return this.hasVoted(commentId) && this.vote.positive;
  }

  hasVotedNegatively(commentId) {
    return this.hasVoted(commentId) && !this.vote.positive;
  }

  hasVoted(commentId) {
    return this.vote !== null && typeof this.vote !== 'undefined';
  }

  canVote() {
    return this.isAuthenticated;
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
    this.operationService.subscribe('add_comment_to_remark',
      operation => this.handleCommentAddedToRemark(operation),
      operation => this.handleRejectedOperation(operation));

    this.operationService.subscribe('edit_remark_comment',
      operation => this.handleCommentEditedInRemark(operation),
      operation => this.handleRejectedOperation(operation));

    this.log.trace('remark_comments_attached');
  }

  detached() {
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
    this.vote = remark.votes.find(x => x.userId === this.account.userId);
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

  async subscribeRemarkVoteSubmitted() {
    return await this.eventAggregator
      .subscribe('remark:vote_submitted', async message => {
        if (this.remark.id !== message.remarkId) {
          return;
        }
        if (Array.isArray(this.remark.votes)) {
          let index = this.remark.votes.findIndex(x => x.userId === message.userId);
          if (index < 0) {
            this.remark.votes.push({
              userId: message.userId,
              positive: message.positive,
              createdAt: message.createdAt
            });
          } else if (this.remark.votes[index].positive !== message.positive) {
            this.remark.votes[index].positive = message.positive;
          }
          if (this.account.userId !== message.userId) {
            this.calculateRating();
          }
        }
      });
  }

  async subscribeRemarkVoteDeleted() {
    return await this.eventAggregator
      .subscribe('remark:vote_deleted', async message => {
        if (Array.isArray(this.remark.votes)) {
          if (this.remark.id !== message.remarkId) {
            return;
          }
          let index = this.remark.votes.findIndex(x => x.userId === message.userId);
          if (index < 0) {
            return;
          }
          this.remark.votes.splice(index, 1);
          if (this.account.userId !== message.userId) {
            this.calculateRating();
          }
        }
      });
  }

  calculateRating() {
    if (Array.isArray(this.remark.votes)) {
      let rating = 0;
      this.remark.votes.forEach(x => {
        if (x.positive) {
          rating++;
        } else {
          rating--;
        }
      });
      this.rating = rating;
    }
  }

  async votePositive(commentId) {
    this._vote(commentId, true);
  }

  async voteNegative(commentId) {
    this._vote(commentId, false);
  }

  async _vote(commentId, positive) {
    console.log('Not implemented yet...');
    // this.sending = true;
    // this.isPositiveVote = positive;
    // await this.remarkService.voteComment(this.id, commentId, positive);
    // this._changeVoteType(this.isPositiveVote(commentId));
    // this.sending = false;
  }

  async deleteVote(commentId) {
    this.sending = true;
    await this.remarkService.deleteCommentVote(this.id, commentId);
    let positive = !this.vote.positive;
    this.vote = null;
    this._updateRating(positive);
    this.sending = false;
  }

  _changeVoteType(positive) {
    this._updateRating(positive);
    if (!this.hasVoted) {
      this.vote = {
        userId: this.account.userId
      };
    }
    this.vote.positive = positive;
  }

  _updateRating(positive) {
    if (!this.hasVoted) {
      if (positive) {
        this.rating++;
      } else {
        this.rating--;
      }

      return;
    }

    if (positive) {
      this.rating += 2;
    } else {
      this.rating -= 2;
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

  handleRemarkVoteSubmitted(operation) {
    this.toast.success(this.translationService.tr('remark.vote_submitted'));
  }

  handleRemarkVoteDeleted(operation) {
    this.toast.success(this.translationService.tr('remark.vote_deleted'));
  }

  handleCommentAddedToRemark(operation) {
    this.loader.hide();
    this.sending = false;
    this.toast.success(this.translationService.tr('remark.comment_added'));
    let resourceData = operation.resource.split('/');
    let commentId = resourceData[resourceData.length - 1];
    this.remark.comments.push({
      renderText: true,
      id: commentId,
      text: this.comment,
      editMode: false,
      rating: 0,
      user: {
        userId: this.account.userId,
        name: this.account.name
      }});
    this.toggleCommentForm();
  }

  handleCommentEditedInRemark(operation) {
    this.editedCommentOriginalText = this.editedCommentText;
    this.hideEditCommentForm(this.editedComment);
    this.editedComment = null;
    this.loader.hide();
    this.sending = false;
    this.toast.success(this.translationService.tr('remark.comment_updated'));
  }

  handleRejectedOperation(operation) {
    this.toast.error(this.translationService.trCode(operation.code));
    this.sending = false;
    this.loader.hide();
  }
}
