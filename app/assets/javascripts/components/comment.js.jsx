var Comment = React.createClass({
  render: function(){
    var comment = this.props.comment;
    return <div className="comment">
      <div className="author">{comment.user.name} writes:</div>
      <div className="text" dangerouslySetInnerHTML={{__html:comment.text_html}}></div>
      <div className="timestamp">on {comment.updated_at}</div>
    </div>
  }
})
