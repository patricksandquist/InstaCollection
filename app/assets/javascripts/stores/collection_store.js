(function(root){
  var _collections = [], CHANGE_EVENT = 'change';

  var resetCollections = function (collections) {
    _collections = collections;
  };

  var addCollection = function (collection) {
    _collections.push(collection);
  };

  root.CollectionStore = $.extend({}, EventEmitter.prototype, {
    all: function(){
      return _collections.slice(0);
    },

    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case CollectionConstants.COLLECTIONS_RECEIVED:
          resetCollections(payload.collections);
          CollectionStore.emit(CHANGE_EVENT);
          break;
        case CollectionConstants.COLLECTIONS_CHANGED:
          resetCollections(payload.collections);
          CollectionStore.emit(CHANGE_EVENT);
          break;
        case CollectionConstants.COLLECTION_ADDED:
          debugger;
          addCollection(payload.collection);
          CollectionStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });

})(this);
