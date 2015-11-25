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

  _submissionLinks: function () {
    return this.state.submissions.map(function (submission) {
      return submission.link;
    });
  },

  _formatDate: function (unixTimestamp) {
    var a = new Date(unixTimestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var month = months[a.getMonth()];
    var date = a.getDate();
    return ' ' + date + ' ' + month;
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
      endDate: this.state.endDate,
      submissionLinks: this._submissionLinks()
    };
    ApiUtil.loadMoreSubmissions(collectionData);
  },

  handleCancel: function (e) {
    this.props.history.pushState(null, '/');
  },

  render: function () {
    return (
      <div className='submission-list'>
        <h2>
          {this.state.hashtag}
          {this._formatDate(this.state.startDate)} -
          {this._formatDate(this.state.endDate)}
        </h2>
        { this.state.submissions.map(function (submission) {
          return <Submission key={submission.id}
                             media_type={submission.media_type}
                             link={submission.link}
                             username={submission.username}
                             image_path={submission.image_path}/>;
        })}
        <input type='submit' onClick={this.handleLoad} value='Load More'/>
        <input type='submit' onClick={this.handleCancel} value='Back'/>
      </div>
    );
  }
});
