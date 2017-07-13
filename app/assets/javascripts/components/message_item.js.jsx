class MessageItem extends React.Component {
  constructor(props) {
    super(props)
  }

  address() {
   return "http://localhost:3000?room=" + this.props.username
  }

  render() {
    return(
      <div className="row">
        <article className={this.props.classType}>
          <span className="thumb">
            <img src="https://image.freepik.com/free-icon/social-twitter-square_318-27827.png" />
          </span>
          <span className="content">
            <span className="speaker">
              <a href={this.address()}>
                {this.props.username}
              </a>
            </span>
            <span className="body" dangerouslySetInnerHTML={{__html: this.props.message}}></span>
          </span>
        </article>
      </div>
    )
  }
}
