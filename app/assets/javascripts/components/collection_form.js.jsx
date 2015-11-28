window.CollectionForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();

    // Capture the fields and convert the date to a Unix Timestamp
    var inputCollection = {
      hashtag: e.target[0].value,
      start_date: Date.parse(e.target[1].value)/1000,
      end_date: Date.parse(e.target[2].value)/1000,
    };

    ApiUtil.createCollection(inputCollection);
    this.props.history.pushState(null, '/');
  },

  handleCancel: function (e) {
    this.props.history.pushState(null, '/');
  },

  render: function () {
    return (
      <div>
        <h2>Make a new collection by providing a hashtag (no need to include the '#') and date range</h2>
        <form action="" onSubmit={this.handleSubmit}>
          Hashtag:    <input id='hashtag' type='text'/><br></br>
          Start Date: <input id='start-date' type='date'/><br></br>
          End Date:   <input id='end-date' type='date'/><br></br>
          <input type='submit' value='Create Collection'/>
        </form>
        <input type='submit' onClick={this.handleCancel} value='Back'/>
      </div>
    );
  }
});
