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
    return <div>Figure out</div>;
  }
});
