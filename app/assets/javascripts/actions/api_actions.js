window.ApiActions = {
  receiveCollections: function (collections) {
    AppDispatcher.dispatch({
      actionType: CollectionConstants.COLLECTIONS_RECEIVED,
      collections: collections
    });
  },

  receiveCollection: function (collection) {
    AppDispatcher.dispatch({
      actionType: CollectionConstants.COLLECTION_ADDED,
      collection: collection
    });
  },

  receiveSubmissions: function (submissions) {
    AppDispatcher.dispatch({
      actionType: SubmissionConstants.SUBMISSIONS_RECEIVED,
      submissions: submissions
    });
  },

  receiveCollectionInfo: function (collectionInfo) {
    AppDispatcher.dispatch({
      actionType: CollectionConstants.COLLECTION_UPDATED,
      collectionInfo: collectionInfo
    });
  },

  addSubmission: function (submission) {
    AppDispatcher.dispatch({
      actionType: SubmissionConstants.SUBMISSION_ADDED,
      submission: submission
    });
  }
};
