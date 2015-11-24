(function(root){
  var _collections = [],
      _currentHashtag = '',
      _currentStart = 0,
      _currentEnd = 0,
      CHANGE_EVENT = 'change';

  var resetCollections = function (collections) {
    _collections = collections;
  };

  var resetCurrentCollection = function (collectionInfo) {
    _currentHashtag = collectionInfo.hashtag;
    _currentStart = collectionInfo.start_date;
    _currentEnd = collectionInfo.end_date;
  };

  var addCollection = function (collection) {
    _collections.push(collection);
  };

  root.CollectionStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _collections.slice(0);
    },

    hashtag: function () {
      return _currentHashtag;
    },

    startDate: function () {
      return _currentStart;
    },

    endDate: function () {
      return _currentEnd;
    },

    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case CollectionConstants.COLLECTIONS_RECEIVED:
          resetCollections(payload.collections);
          CollectionStore.emit(CHANGE_EVENT);
          break;
        case CollectionConstants.COLLECTION_UPDATED:
          resetCurrentCollection(payload.collectionInfo);
          CollectionStore.emit(CHANGE_EVENT);
          break;
        case CollectionConstants.COLLECTION_ADDED:
          addCollection(payload.collection);
          CollectionStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });

})(this);
