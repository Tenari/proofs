var CompactTheorem = React.createClass({
  getInitialState: function(){
    return {
      tab: 'arguments',
      objections: [],
      comments: [],
    };
  },
  componentDidMount: function(){
    var that = this;
    $.ajax({
      url: '/theorems/'+this.props.theorem.id+'/objections.json',
      method: 'GET',
      success: function(data){
        that.setState({objections: data});
      }
    })
    $.ajax({
      url: '/theorems/'+this.props.theorem.id+'/comments.json',
      method: 'GET',
      success: function(data){
        that.setState({comments: data});
      }
    })
  },
  render: function(){
    var that = this;
    var props = this.props;
    var theorem = this.props.theorem;
    var body = null;
    var theoremPath = "/theorems/"+theorem.id;

    if (this.state.tab == 'arguments') {
      body = <p>There are no arguments supporting this theorem.</p>;
      if (props.user && props.user.id == theorem.user_id) {
        body = <p>There are no arguments yet. <a href={theoremPath}>Make one</a></p>;
      }
      if (theorem.arguments_count > 0) {
        var addLink = null;
        if (props.user && theorem.user_id == props.user.id) {
          addLink = <a href={theoremPath}>Add Argument</a>;
        }
        body = <div>
          {_.map(theorem.arguments, function(arg){
            return <ShowArgument argument={arg} user={props.user} newObjectionPath='/theorems/new' max={props.max} />
          })}
          {addLink}
        </div>
      }
    } else if (this.state.tab == 'objections') {
      body = <p>There are no objections to this theorem yet.</p>;
      if (this.state.objections.length > 0) {
        body = <Objections theorem={theorem} objections={this.state.objections} user={props.user} max={props.max}/>;
      }
    } else if (this.state.tab == 'comments') {
      var newComment = null;
      if (props.user && props.user.id) {
        newComment = <NewComment object={{id: theorem.id, type: theorem.class_name}} user={props.user}/>;
      }
      body = <p>There are no comments on this theorem yet. {newComment}</p>;
      if (this.state.comments.length > 0) {
        body = <div className="comments">
          {
            _.map(this.state.comments, function(comment) {
               return <Comment comment={comment}/>;
            })
          }
          {newComment}
        </div>
      }
    }

    var writes = null;
    if (this.props.writes) {
      writes = <span className="author">{theorem.user.name} writes:</span>;
    }

    return <div className="full-theorem">
      <div className="hide-link">
        <a href="javascript:;" onClick={this.props.hide}>hide</a>
        {writes}
      </div>
      <h3 className={props.noTitle ? 'hide' : ''}>{theorem.text}</h3>
      <div className="tabs">
        <button onClick={()=> that.setState({tab: 'arguments'})} className={this.state.tab == 'arguments' ? 'selected' : ''}>Arguments ({theorem.arguments_count})</button>
        <button onClick={()=> that.setState({tab: 'objections'})} className={this.state.tab == 'objections' ? 'selected' : ''}>Objections ({theorem.objections_count})</button>
        <button onClick={()=> that.setState({tab: 'comments'})} className={this.state.tab == 'comments' ? 'selected' : ''}>Comments ({theorem.comments_count})</button>
      </div>
      {body}
    </div>
  }
})
