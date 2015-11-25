window.Submission = React.createClass({
  render: function () {
    var element;
    if (this.props.media_type === 'image') {
      // photo
      return (
        <div className='submission-item'>
          <img className='photo' src={this.props.image_path} width='325px'/>
          <br></br>
          <a className='link' href={this.props.link}>Photo</a> by {this.props.username}
          <br></br>
        </div>
      );
    } else {
      // video
      return (
        <div className='submission-item'>
          <img className='video'
               src={this.props.image_path}
               width='325px'/>
          <br></br>
          <a className='link' href={this.props.link}>Photo</a> by {this.props.username}
          <br></br>
        </div>
      );
    }
  }
});
