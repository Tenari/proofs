var NewArgument = React.createClass({
  getInitialState: function(){
    return {
      open: false,
      title: '',
      theorems: [''],
      error: null,
      ordered: true,
    };
  },
  toggle: function(){
    this.setState({open: !this.state.open, error: null});
  },
  setOrdered: function(val){
    this.setState({ordered: val});
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
          ordered: this.state.ordered,
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
    var setOrdered = this.setOrdered;
    if (this.state.open) {
      var updateTheorem = this.updateTheorem;
      var addTheorem = this.addTheorem;
      var removeTheorem = this.removeTheorem;
      var error = null;
      if (this.state.error) {
        error = <p>{this.state.error}</p>;
      }

      var theorems = _.map(this.state.theorems, function(theorem, index){
        return <li key={index} className="new-theorem">
          <input key={index} type="text" value={theorem} onChange={(e)=> updateTheorem(index, e.target.value)}/>
          <span>({255 - theorem.length} characters left)</span>
          <a href="javascript:;" onClick={()=> removeTheorem(index)}>X</a>
        </li>;
      });

      var theoremsList = <ul>{theorems}</ul>;
      if (this.state.ordered) {
        theoremsList = <ol>{theorems}</ol>;
      }

      return <div className="new-argument">
        {error}
        <div>Argument type: <span className={classNames({selector:true, active: this.state.ordered})} onClick={() => setOrdered(true)}>Ordered Proof</span> <span onClick={() => setOrdered(false)} className={classNames({selector:true, active: !this.state.ordered})}>List of Evidences</span></div>
        <div>Argument name: <input type="text" value={this.state.title} onChange={this.updateTitle}/></div>
        {theoremsList}
        <div>
          <button onClick={addTheorem}>Add Theorem</button>
        </div>
        <div>
          <button onClick={this.submit}>Submit</button>
          <button onClick={this.toggle}>Cancel</button>
        </div>
      </div>;
    } else {
      return <button onClick={this.toggle}>Add a new argument to support this theorem</button>;
    }
  },
})
