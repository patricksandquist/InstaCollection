window.CollectionForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    debugger;
    var inputCollection = {
      hashtag: e.target[0].value,
      startDate: e.target[1].value,
      endDate: e.target[2].value,
    };

    ApiUtil.createCollection(inputCollection);
    this.props.history.pushState(null, "/");
  },

  handleCancel: function (e) {
    this.props.history.pushState(null, "/");
  },

  render: function () {
    return (
      <div>
        <h2>Make a new collection by providing a hashtag and date range</h2>
        <form action="" onSubmit={this.handleSubmit}>
          Hashtag:    <input id='hashtag' type='text'/><br></br>
          Start Date: <input id='start-date' type='date'/><br></br>
          End Date:   <input id='end-date' type='date'/><br></br>
          <input type='submit' value='Add Collection'/>
        </form>
        <input type='submit' onClick={this.handleCancel} value='Back'/>
      </div>
    );
  }
});
