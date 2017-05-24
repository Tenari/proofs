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
    argument.theorems[index].text = str.substr(0,this.props.max);
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
      return <ArgumentTheorem key={index} theorem={theorem}
                              argument={argument} tids={tids}
                              user={user} changeTheorem={changeTheorem}
                              editMode={state.editMode} index={index}
                              deleteTheorem={deleteTheorem} addTheorem={addTheorem}
                              max={props.max} signInPath={props.signInPath}
                              newObjectionPath={props.newObjectionPath}
                              />;
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
