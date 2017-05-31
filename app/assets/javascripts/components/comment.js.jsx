var Comment = React.createClass({
  render: function(){
    var comment = this.props.comment;
    return <div className="comment">
      <div className="author">{comment.user.name} writes:</div>
      <div className="text">
        {_.map(comment.text_array, function(text){
          return <p>{text}</p>;
        })}
      </div>
      <div className="timestamp">on {comment.updated_at}</div>
    </div>
  }
})
