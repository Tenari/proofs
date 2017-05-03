var ShowArgument = React.createClass({
  getInitialState: function(){
    return {
      editMode: false,
      argument: this.props.argument,
    };
  },
  toggleEditMode: function(){
    this.setState({editMode: !this.state.editMode});
  },
  changeTheorem: function(index, str){
    var argument = this.state.argument;
    argument.theorems[index].text = str;
    this.setState({argument: argument});
  },
  deleteTheorem: function(id){
    $.ajax({
      type: 'DELETE',
      url: '/theorems/'+id+"?argument_id="+this.state.argument.id,
      success: function(){
        window.location.reload();
      },
    })
  },
  deleteArgument: function(){
    $.ajax({
      type: 'DELETE',
      url: '/arguments/'+this.state.argument.id,
      success: function(){
        window.location.reload();
      },
    })
  },
  render: function(){
    var tids = this.props.tids || "";
    if (tids.length > 0) tids += ",";
    var state = this.state;
    var user = this.props.user;
    var argument = this.state.argument;
    var changeTheorem = this.changeTheorem;
    var deleteTheorem = this.deleteTheorem;

    var controlButtons = null;
    if (user) {
      controlButtons = <div>
        <button onClick={this.toggleEditMode}>{this.state.editMode ? "Cancel" : "Edit"}</button>
        <button onClick={this.deleteArgument}>Delete</button>
      </div>;
    }

    return <div className="argument">
      <p className="argument-title">{argument.title}</p>
      {controlButtons}
      <ol>
        {_.map(argument.theorems, function(theorem, index){
          var linkUrl = "/theorems/"+theorem.id + "?tids="+tids+argument.theorem_id;

          var link = null;
          if (user && user.id == theorem.user_id) {
            link = <a href={linkUrl}>add support</a>;
          }
          if (theorem.source) {
            link = <a href={theorem.source} target="_blank">source</a>;
          }

          var element = <span>{theorem.text} {link}</span>;
          if (theorem.arguments_count > 0) {
            element = <a href={linkUrl}>{theorem.text}</a>;
          }

          var destroy = null;
          if (state.editMode) {
            element = <input type="text" value={theorem.text} onChange={(e) => changeTheorem(index, e.target.value)}/>;
            destroy = <a href="javascript:;" onClick={()=> deleteTheorem(theorem.id)}>X</a>
          }

          return <li className="argument-theorem" key={index}>
            {element}
            {destroy}
          </li>;
        })}
      </ol>
    </div>;
  },
})
