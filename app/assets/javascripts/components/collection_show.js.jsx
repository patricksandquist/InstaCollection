window.CollectionShow = React.createClass({
  _onChange: function () {
    this.setState({ submissions: SubmissionStore.all() });
  },

  getInitialState: function () {
    return {
      collectionId: this.props.params.collectionId,
      submissions: []
    };
  },

  componentDidMount: function () {
    // Add a listener and grab the collections
    CollectionStore.addChangeListener(this._onChange);
    ApiUtil.fetchSubmissions(this.state.collectionId);
  },

  componentWillUnmount: function () {
    CollectionStore.removeChangeListener(this._onChange);
  },

  render: function () {
    return <div>Figure out</div>;
  }
});
