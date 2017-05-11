var NewComment = React.createClass({
  getInitialState: function(){
    return {
      editMode: false,
      text: '',
      error: false,
    };
  },
  toggleEdit: function(){
    this.setState({editMode: !this.state.editMode});
  },
  updateText: function(e){
    this.setState({text: e.target.value});
  },
  submit: function(){
    var that = this;
    if (this.state.text.length == 0) {
      this.setState({error: true});
      return false;
    }
    $.ajax({
      type: 'POST',
      url: '/comments.json',
      data: {
        comment: {
          object_type: this.props.object.type,
          object_id: this.props.object.id,
          text: this.state.text,
        }
      },
      success: function(){
        window.location.reload();
      },
      error: function(){
        that.setState({error: true});
      }
    })
  },
  render: function(){
    var state = this.state;
    if (state.editMode) {
      var error = null;
      if (state.error) {
        error = <p>You need to write a longer message.</p>;
      }
      return <div className="new-comment-form">
        {error}
        <textarea value={state.text} onChange={this.updateText}></textarea>
        <div>
          <button onClick={this.toggleEdit}>Cancel</button>
          <button onClick={this.submit}>Submit</button>
        </div>
      </div>;
    } else {
      return <button onClick={this.toggleEdit}>New comment</button>;
    }
  }
})
