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
    var nextUrl, newestDate, oldestDate;

    if (typeof count === 'undefined') {
      count = 0;
    }

    if (typeof min_tag_id === 'undefined') {
      nextUrl = "https://api.instagram.com/v1/tags/" + collectionData.hashtag + "/media/recent/?count=33&access_token=255819380.1677ed0.b38ac955d015439e8fc9878739d3f5a8";
    } else {
      nextUrl = "https://api.instagram.com/v1/tags/" + collectionData.hashtag + "/media/recent/?count=33&max_tag_id=" + min_tag_id + "&access_token=255819380.1677ed0.b38ac955d015439e8fc9878739d3f5a8";
    }

    $.ajax({
      url: nextUrl,
      type: "get",
      dataType: "jsonp",
      success: function (response) {
        if (response.data.length === 0) {
          // No data back from Instagram
          this.fetchSubmissions(collectionId);
        } else {
          min_tag_id = parseInt(response.pagination.next_max_id);
          oldestDate = parseInt(response.data[response.data.length - 1].created_time);

          var start = collectionData.startDate,
              end = collectionData.endDate,
              collectionId = collectionData.collectionId;

          response.data.forEach(function (mediaItem) {
            // validTag will return the tag time if in range and unique, false otherwise
            var tag_time = this.validTag(mediaItem, start, end, collectionData);

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
              collectionData.submissionLinks.push(submission.link);
            }
          }.bind(this));

          if (count < 30 && collectionData.startDate < oldestDate) {
            this.loadMoreSubmissions(collectionData, count, min_tag_id);
          } else {
            this.fetchSubmissions(collectionId);
          }
        }
      }.bind(this)
    });
  },

  validTag: function (mediaItem, start, end, collectionData) {
    var tagTime;
    if (mediaItem.caption === null) {
      tagTime = parseInt(mediaItem.created_time);
    } else {
      tagTime = parseInt(mediaItem.caption.created_time);
    }
    var hashtag = collectionData.hashtag;
    var seen = collectionData.submissionLinks;

    if (start < tagTime && tagTime < end && seen.indexOf(mediaItem.link) === -1) {
      return tagTime;
    } else {
      // check the comments for the hashtag
      for (var i = 0; i < mediaItem.comments.data.length; i++) {
        var commentTime = mediaItem.comments.data[i].created_time,
            commentText = mediaItem.comments.data[i].text;

        if (commentText.indexOf(hashtag) > -1 &&
            start < commentTime &&
            commentTime < end &&
            seen.indexOf(mediaItem.link) === -1) {
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
      data: {submission: submission}
    });
  }
};
