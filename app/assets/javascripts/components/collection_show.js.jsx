window.CollectionShow = React.createClass({
  _onSubmissionChange: function () {
    this.setState({ submissions: SubmissionStore.all() });
    this.forceUpdate();
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
    ApiUtil.fetchCollection(this.state.collectionId);
    ApiUtil.fetchSubmissions(this.state.collectionId);
  },

  componentWillUnmount: function () {
    CollectionStore.removeChangeListener(this._onCollectionChange);
    SubmissionStore.removeChangeListener(this._onSubmissionChange);
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
        { this.state.submissions.map(function (submission) {
          return <Submission key={submission.id}
                             media_type={submission.media_type}
                             link={submission.link}
                             username={submission.username}
                             image_path={submission.image_path}/>;
        })}
        <input type='submit' onClick={this.handleLoad} value='Load More'/>
      </div>
    );
  }
});
