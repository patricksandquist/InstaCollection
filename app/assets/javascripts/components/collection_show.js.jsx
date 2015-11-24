window.CollectionShow = React.createClass({
  _onChange: function () {
    this.setState({ collection: CollectionStore.all() });
  },

  getInitialState: function () {
    return { collections: CollectionStore.all() };
  },

  componentDidMount: function () {
    // Add a listener and grab the collections
    CollectionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    CollectionStore.removeChangeListener(this._onChange);
  },

  render: function () {
    if (this.state.collections.length !== 0) {
      return (
        <ul className="collection-list">
          {this.state.collections.map(function (collection) {
            return <li key={collection.id}>{collection.hashtag}</li>;
          })}
        </ul>
      );
    } else {
      return <ul className="no-collections"></ul>;
    }
  }
});
