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
      success: function (collectionData) {
        ApiActions.receiveCollectionInfo(collectionData.collection);
        ApiActions.receiveSubmissions(collectionData.submissions);
      }
    });
  },

  loadMoreSubmissions: function (collectionId) {
    $.ajax({
      url: "https://api.instagram.com/v1/tags/sf/media/recent/?count=100&access_token=255819380.1677ed0.b38ac955d015439e8fc9878739d3f5a8",
      type: "get",
      dataType: "jsonp",
      success: function (response) {
        debugger;
        // response.data.forEach(function (mediaItem) {
        // });
      }
    });
  }
};
