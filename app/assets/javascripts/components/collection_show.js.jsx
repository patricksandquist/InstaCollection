window.CollectionShow = React.createClass({
  _onSubmissionChange: function () {
    this.setState({ submissions: SubmissionStore.all() });
  },

  _onCollectionChange: function () {
    this.setState({
      hashtag: CollectionStore.hashtag(),
      startDate: CollectionStore.startDate(),
      endDate: CollectionStore.endDate()
    });
  },

  getInitialState: function () {
    return {
      collectionId: this.props.params.collectionId,
      hashtag: '',
      startDate: 0,
      endDate: 0,
      submissions: []
    };
  },

  componentDidMount: function () {
    // Add listeners and grab the submissions
    CollectionStore.addChangeListener(this._onCollectionChange);
    SubmissionStore.addChangeListener(this._onSubmissionChange);
    ApiUtil.fetchSubmissions(this.state.collectionId);
  },

  componentWillUnmount: function () {
    CollectionStore.removeChangeListener(this._onChange);
  },

  handleLoad: function (e) {
    e.preventDefault();
    var collectionData = {
      collectionId: this.state.collectionId,
      hashtag: this.state.hashtag,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };
    ApiUtil.loadMoreSubmissions(collectionData);
  },

  render: function () {
    return (
      <div className='submission-list'>
        <h2>{this.state.hashtag}</h2>
        {this.state.submissions.forEach(function (submission) {
          return <Submission type={submission.type}
                             link={submission.link}
                             username={submission.username}
                             path={submission.path}/>;
        })}
        <input type='submit' onClick={this.handleLoad} value='Load More'/>
      </div>
    );
  }
});
