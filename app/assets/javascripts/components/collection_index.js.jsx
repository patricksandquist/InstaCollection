window.CollectionIndex = React.createClass({
  _onChange: function () {
    this.setState({ collections: CollectionStore.all() });
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

  handleSubmit: function (e) {
    e.preventDefault();
    this.props.history.pushState(null, 'collections/new');
  },

  handleClick: function (id, e) {
    e.preventDefault();
    this.props.history.pushState(null, 'collections/' + id);
  },

  render: function () {
    if (this.state.collections.length !== 0) {
      return (
        <div className='collection-index'>
          <input type='submit' onClick={this.handleSubmit} value='New Collection'/>
          {this.state.collections.map(function (collection) {
            return (
              <a key={collection.id}
                 onClick={this.handleClick.bind(this, collection.id)}>
                {collection.hashtag}
              </a>
            );
          }.bind(this))}
        </div>
      );
    } else {
      return (
        <div className='collection-index'>
          <h3>No collections to show.</h3>
          <input type='submit' onClick={this.handleSubmit} value='New Collection'/>
        </div>
      );
    }
  }
});
