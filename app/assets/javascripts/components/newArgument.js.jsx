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
  componentDidMount: function(){
    var that = this;
    $(window).on('new-argument-toggle', function(){
      that.toggle();
    });
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
    if (str.length > this.props.max) return;
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
      var props = this.props;
      var error = null;
      if (this.state.error) {
        error = <p>{this.state.error}</p>;
      }

      var theorems = _.map(this.state.theorems, function(theorem, index){
        return <li key={index} className="new-theorem">
          <textarea key={index} value={theorem} onChange={(e)=> updateTheorem(index, e.target.value)}></textarea>
          <span>({props.max - theorem.length} characters left)</span>
          <a href="javascript:;" onClick={()=> removeTheorem(index)}>X</a>
        </li>;
      });

      var theoremsList = <ul>{theorems}</ul>;
      if (this.state.ordered) {
        theoremsList = <ol>{theorems}</ol>;
      }

      return <div className="new-argument">
        {error}
        <div><button className={classNames({selector:true, active: this.state.ordered})} onClick={() => setOrdered(true)}>Ordered Proof</button> <button onClick={() => setOrdered(false)} className={classNames({selector:true, active: !this.state.ordered})}>List of Evidences</button></div>
        <div className="argument-name"><input placeholder="Argument name" type="text" value={this.state.title} onChange={this.updateTitle}/></div>
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
      return null;
    }
  },
})
