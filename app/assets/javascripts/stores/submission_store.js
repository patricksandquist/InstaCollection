(function(root){
  var _submissions = [], CHANGE_EVENT = 'change';

  var resetSubmissions = function (submissions) {
    _submissions = submissions;
  };

  var addsubmission = function (submission) {
    _submissions.push(submission);
  };

  root.SubmissionStore = $.extend({}, EventEmitter.prototype, {
    all: function(){
      return _submissions.slice(0);
    },

    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case SubmissionConstants.SUBMISSIONS_RECEIVED:
          resetSubmissions(payload.submissions);
          SubmissionStore.emit(CHANGE_EVENT);
          break;
        case SubmissionConstants.SUBMISSIONS_CHANGED:
          resetSubmissions(payload.submissions);
          SubmissionStore.emit(CHANGE_EVENT);
          break;
        case SubmissionConstants.SUBMISSION_ADDED:
          addSubmission(payload.submission);
          SubmissionStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });

})(this);
