window.Submission = React.createClass({
  render: function () {
    var element;
    if (this.props.type === 'photo') {
      // photo
      return (
        <div className='submission-item'>
          <img className='photo'
               src={this.props.image_path}
               width='325px'/>
          <a className='link' href={this.props.link}>Photo</a> by {this.props.username}
        </div>
      );
    } else {
      // video
      return (
        <div className='submission-item'>
          <img className='video'
               src={this.props.image_path}
               width='325px'/>
          <a className='link' href={this.props.link}>Photo</a> by {this.props.username}
        </div>
      );
    }
  }
});
