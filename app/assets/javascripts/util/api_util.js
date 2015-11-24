window.ApiUtil = {
  fetchCollections: function () {
    $.ajax({
      url: 'collections',
      type: 'get',
      success: function (collections) {
        ApiActions.receiveCollections(collections);
      }
    });
  },

  createCollection: function (collection) {
    $.ajax({
      url: 'collections',
      type: 'post',
      data: {collection: collection},
      success: function (collection) {
        ApiActions.receiveCollection(collection);
      }
    });
  },

  fetchSubmissions: function (collectionId) {
    $.ajax({
      url: 'collections/' + collectionId,
      type: 'get',
      success: function (submissions) {
        debugger;
        ApiActions.receiveSubmissions(submissions);
      }
    });
  }
};
