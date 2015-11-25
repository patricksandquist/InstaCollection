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

  fetchCollection: function (collectionId) {
    $.ajax({
      url: 'collections/' + collectionId,
      type: 'get',
      success: function (collection) {
        ApiActions.receiveCollectionInfo(collection);
      }
    });
  },

  fetchSubmissions: function (collectionId) {
    $.ajax({
      url: 'submissions',
      type: 'get',
      data: {collection_id: collectionId},
      success: function (submissions) {
        ApiActions.receiveSubmissions(submissions);
      }
    });
  },

  loadMoreSubmissions: function (collectionData, count, min_tag_id) {
    debugger;
    if (typeof count === 'undefined') {
      count = 0;
    }
    var nextUrl, newestDate, oldestDate;
    if (typeof min_tag_id === 'undefined') {
      nextUrl = "https://api.instagram.com/v1/tags/" + collectionData.hashtag + "/media/recent/?count=20&access_token=255819380.1677ed0.b38ac955d015439e8fc9878739d3f5a8";
    } else {
      nextUrl = "https://api.instagram.com/v1/tags/" + collectionData.hashtag + "/media/recent/?count=20&min_tag_id=" + min_tag_id + "&access_token=255819380.1677ed0.b38ac955d015439e8fc9878739d3f5a8";
    }

    $.ajax({
      url: nextUrl,
      type: "get",
      dataType: "jsonp",
      success: function (response) {
        min_tag_id = parseInt(response.pagination.min_tag_id);
        oldestDate = parseInt(response.data[response.data.length - 1].created_time);
        debugger;

        var start = collectionData.startDate,
            end = collectionData.endDate,
            collectionId = collectionData.collectionId;

        response.data.forEach(function (mediaItem) {
          // inRange will return the tag time if in range, false otherwise
          var tag_time = this.inRange(mediaItem, start, end, collectionData.hashtag);

          if (tag_time) {
            count++;
            var submission = {
              tag_time: tag_time,
              media_type: mediaItem.type,
              link: mediaItem.link,
              username: mediaItem.user.username,
              image_path: mediaItem.images.standard_resolution.url,
              collection_id: collectionId
            };

            this.saveSubmission(submission);
            ApiActions.addSubmission(submission);
          }
        }.bind(this));

        if (count < 20 && collectionData.endDate < oldestDate) {
          debugger;
          this.loadMoreSubmissions(collectionData, count, min_tag_id);
        } else {
          this.fetchSubmissions(collectionId);
        }
      }.bind(this)
    });
  },

  inRange: function (mediaItem, start, end, hashtag) {
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
      data: {submission: submission},
      success: function (savedSubmission) {
        //this.fetchSubmissions(savedSubmission.collection_id);
      }.bind(this)
    });
  }
};
