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

  handleClick: function (e) {
    e.preventDefault();
    this.props.history.pushState(null, 'collections/new');
  },

  render: function () {
    if (this.state.collections.length !== 0) {
      return (
        <div className='collection-index'>
          <input type='submit' onClick={this.handleClick} value='New Collection'/>
          <ul className="collection-list">
            {this.state.collections.map(function (collection) {
              return <li key={collection.id}>{collection.hashtag}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return (
        <div className='collection-index'>
          <h3>No collections to show.</h3>
          <input type='submit' onClick={this.handleClick} value='New Collection'/>
        </div>
      );
    }
  }
});
