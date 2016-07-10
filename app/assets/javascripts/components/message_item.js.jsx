class MessageItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="row">
        <article className={this.props.classType}>
          <span className="thumb">
            <img src="http://www.twetter.local/avatars/original/missing.png" />
          </span>
          <span className="content">
            <span className="speaker">
              {this.props.username}
            </span>
            <span className="body">{this.props.message}</span>
          </span>
        </article>
      </div>
    )
  }
}
