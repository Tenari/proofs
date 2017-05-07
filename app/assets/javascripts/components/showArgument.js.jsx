var ShowArgument = React.createClass({
  getInitialState: function(){
    return {
      editMode: false,
      argument: this.props.argument,
      original: '',
    };
  },
  toggleEditMode: function(){
    if (this.state.editMode) {
      var arg = JSON.parse(this.state.original);
      this.setState({argument: arg, original: ''});
    } else {
      this.setState({original: JSON.stringify(this.state.argument)});
    }
    this.setState({editMode: !this.state.editMode});
  },
  changeTheorem: function(index, str){
    var argument = this.state.argument;
    argument.theorems[index].text = str.substr(0,255);
    this.setState({argument: argument});
  },
  changeTitle: function(e){
    var argument = this.state.argument;
    argument.title = e.target.value;
    this.setState({argument: argument});
  },
  addTheorem: function(){
    var arg = this.state.argument;
    arg.theorems.push({user_id: this.state.argument.user_id, text: ''});
    this.setState({argument: arg});
  },
  saveChanges: function(){
    var that = this;
    var original = JSON.parse(this.state.original);
    _.each(this.state.argument.theorems, function(theorem, index){
      if (original.theorems[index] && original.theorems[index].text == theorem.text) return false;

      if (theorem.id) { // just update it
        $.ajax({
          type: 'PUT',
          url: '/theorems/'+theorem.id,
          data: {
            theorem: {
              text: theorem.text,
            }
          },
          success: function(data){
            that.setState({editMode: false});
          },
        })
      } else { // gotta create it
        $.ajax({
          type: 'POST',
          url: '/theorems.json',
          data: {
            theorem: {
              text: theorem.text,
            },
            argument_id: that.state.argument.id,
          },
          success: function(data){
            var arg = that.state.argument;
            arg.theorems[index] = data;
            that.setState({editMode: false, argument: arg});
          },
        })
      }
    })
    if (original.title == this.state.argument.title) return false;
    // update the title also
    $.ajax({
      type: 'PUT',
      url: '/arguments/'+this.state.argument.id,
      data: {
        argument: {
          title: this.state.argument.title,
        }
      },
      success: function() {
        that.setState({editMode: false});
      }
    })
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
    var props = this.props;
    var user = this.props.user;
    var argument = this.state.argument;
    var changeTheorem = this.changeTheorem;
    var deleteTheorem = this.deleteTheorem;
    var addTheorem = this.addTheorem;

    var controlButtons = null;
    if (user && user.id == argument.user_id) {
      controlButtons = <div className="argument-control-buttons">
        <button onClick={this.toggleEditMode}>{this.state.editMode ? "Cancel" : "Edit"}</button>
        <button onClick={this.saveChanges} className={this.state.editMode ? '' : 'hide'}>Save</button>
        <button onClick={this.deleteArgument}>Delete</button>
      </div>;
    }
    var addTheoremButton = null;
    if (state.editMode) {
      addTheoremButton = <button onClick={addTheorem}>Add Theorem</button>;
    }

    var theorems = _.map(argument.theorems, function(theorem, index){
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
        destroy = <span>({255 - theorem.text.length} characters left) <a href="javascript:;" onClick={()=> deleteTheorem(theorem.id)}>X</a></span>;
      }

      var objections = null;
      if (theorem.objections_count > 0){
        objections = <a className="objections-link" href={"/theorems/"+theorem.id+"/objections"}>[{theorem.objections_count} objections]</a>;
      }

      var objection = <a className="object-link" href={props.signInPath}>Sign In to Object</a>;
      if (user) {
        if (user.id != theorem.user_id) {
          objection = <a className="object-link" href={props.newObjectionPath + "?objection_id=" + theorem.id}>I object!</a>;
        } else {
          objection = null;
        }
      }

      return <li key={index}><div className="argument-theorem">
        {element}
        <span>
          {destroy}
          {objections}
          {objection}
        </span>
      </div></li>;
    });

    var theoremsList = <ul>{theorems}</ul>;
    if (argument.ordered) {
      theoremsList = <ol>{theorems}</ol>;
    }

    var argumentTitle = <div className="argument-title">
      <a href={"/arguments/"+argument.id}>{argument.title}</a>
    </div>;
    if (state.editMode) {
      argumentTitle = <div className="argument-title">
        <input type="text" value={argument.title} onChange={this.changeTitle}/>
      </div>
    }

    return <div className="argument">
      {argumentTitle}
      {controlButtons}
      {theoremsList}
      {addTheoremButton}
    </div>;
  },
})
