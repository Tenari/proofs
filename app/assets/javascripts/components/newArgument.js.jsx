var NewArgument = React.createClass({
  getInitialState: function(){
    return {
      open: false,
      title: '',
      theorems: [],
      error: null,
    };
  },
  toggle: function(){
    this.setState({open: !this.state.open, error: null});
  },
  updateTitle: function(e){
    this.setState({title: e.target.value});
  },
  updateTheorem: function(index, str){
    if (str.length > 255) return;
    var list = this.state.theorems;
    list[index] = str;
    this.setState({theorems: list});
  },
  addTheorem: function(){
    var list = this.state.theorems;
    list.push("");
    this.setState({theorems: list});
  },
  removeTheorem: function(index){
    var list = this.state.theorems;
    list.splice(index, 1);
    this.setState({theorems: list});
  },
  submit: function(){
    var that = this;
    $.post({
      url: this.props.createArgumentPath,
      data: {
        argument: {
          theorem_id: this.props.theorem_id,
          title: this.state.title,
        },
        theorems: this.state.theorems,
      },
      success: function(data){
        if (data && data.error) {
          that.setState({error: data.error});
        } else {
          window.location.reload();
        }
      },
    })
  },
  render: function(){
    if (this.state.open) {
      var updateTheorem = this.updateTheorem;
      var addTheorem = this.addTheorem;
      var removeTheorem = this.removeTheorem;
      var error = null;
      if (this.state.error) {
        error = <p>{this.state.error}</p>;
      }

      return <div className="new-argument">
        {error}
        <div>Title: <input type="text" value={this.state.title} onChange={this.updateTitle}/></div>
        <ol>
          {_.map(this.state.theorems, function(theorem, index){
            return <li key={index} className="new-theorem">
              <input key={index} type="text" value={theorem} onChange={(e)=> updateTheorem(index, e.target.value)}/>
              <span>({255 - theorem.length} characters left)</span>
              <a href="javascript:;" onClick={()=> removeTheorem(index)}>X</a>
            </li>;
          })}
          <button onClick={addTheorem}>Add Theorem</button>
        </ol>
        <button onClick={this.submit}>Submit</button>
        <button onClick={this.toggle}>Cancel</button>
      </div>;
    } else {
      return <button onClick={this.toggle}>Add a new argument to support this theorem</button>;
    }
  },
})
