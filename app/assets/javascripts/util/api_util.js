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
      url: 'submissions',
      type: 'post',
      success: function (collectionData) {
        ApiActions.receiveCollectionInfo(collectionData.collection);
        ApiActions.receiveSubmissions(collectionData.submissions);
      }
    });
  },

  loadMoreSubmissions: function (collectionData) {
    $.ajax({
      url: "https://api.instagram.com/v1/tags/" + collectionData.hashtag + "/media/recent/?count=100&access_token=255819380.1677ed0.b38ac955d015439e8fc9878739d3f5a8",
      type: "get",
      dataType: "jsonp",
      success: function (response) {
        var start = collectionData.startDate,
            end = collectionData.endDate,
            count = 0;

        response.data.forEach(function (mediaItem) {
          // inRange will return the tag time if in range, false otherwise
          var tag_time = inRange(mediaItem, collectionData.hashtag);

          if (tag_time) {
            count++;
            var submission = {
              tag_time: tag_time,
              type: mediaItem.type,
              link: mediaItem.link,
              username: mediaItem.user.username,
              image_path: mediaItem.images.standard_resolution.url
            };

            saveSubmission(submission);
            ApiActions.addSubmission(submission);
          }
        });
      }
    });
  },

  inRange: function (mediaItem, hashtag) {
    var tagTime = parseInt(mediaItem.caption.created_time);

    if (start < tagTime && tagTime < end) {
      return mediaItem.caption.created_time;
    } else {
      // check the comments for the hashtag
      for (var i = 0; i < mediaItem.comments.count; i++) {
        var commentTime = mediaItem.comments.data[i].created_time,
            commentText = mediaItem.comments.data[i].text;

        if (commentText.includes(hashtag) &&
            start < commentTime &&
            commentTime < end) {
          return commentTime;
        }
      }
    }

    return false;
  },

  saveSubmission: function (submission) {
    $.ajax({
      url: 'submissions',
      type: 'post',
      success: function (collectionData) {
        ApiActions.receiveCollectionInfo(collectionData.collection);
        ApiActions.receiveSubmissions(collectionData.submissions);
      }
    });
  }
};
