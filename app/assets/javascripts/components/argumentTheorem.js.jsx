var ArgumentTheorem = React.createClass({
  getInitialState: function(){
    return {
      fullTheorem: false,
    }
  },
  showTheorem: function(){
    if(this.state.fullTheorem) {
      this.setState({fullTheorem: false});
    } else {
      var that = this;
      $.ajax({
        url: '/theorems/'+this.props.theorem.id+'.json',
        method: 'GET',
        success: function(data){
          that.setState({fullTheorem: data});
        }
      })
    }
  },
  render: function(){
    var theorem = this.props.theorem;
    var argument = this.props.argument;
    var user = this.props.user;
    var editMode = this.props.editMode;
    var changeTheorem = this.props.changeTheorem;
    var deleteTheorem = this.props.deleteTheorem;
    var addTheorem = this.props.addTheorem;
    var index = this.props.index;
    var max = this.props.max;
    var newObjectionPath = this.props.newObjectionPath;
    var showTheorem = this.showTheorem;

    var numberOrDot = '-';
    if (argument.ordered) {
      numberOrDot = <span className="number">{theorem.order+'.'}</span>;
    }

    var text = <span className="text">{theorem.text}</span>;

    var destroy = null;
    if (editMode) {
      text = <input type="text" value={theorem.text} onChange={(e) => changeTheorem(index, e.target.value)}/>;
      destroy = <span>({max - theorem.text.length} characters left) <a href="javascript:;" onClick={()=> deleteTheorem(theorem.id)}>X</a></span>;
      objections = null;
      objection = null;
      link = null;
    }

    var linkUrl = "/theorems/"+theorem.id;

    var link = null;
    
    if (theorem.arguments_count > 0 || theorem.objections_count > 0) {
      link = <a href="javascript:;" onClick={showTheorem}>expand</a>;
    } else if (user && user.id == theorem.user_id) {
      link = <a href={linkUrl}>add support</a>;
    } else {
      link = <a className="object-link" href={newObjectionPath + "?objection_id=" + theorem.id}>I object!</a>;
    }

    var source = null;
    if (theorem.source) {
      link = <a href={theorem.source} target="_blank">source</a>;
    }

    var thin = <li key={index} className="argument-theorem">
      {numberOrDot}
      {text}
      <span className="actions">
        {source}
        {link}
        {destroy}
      </span>
    </li>;
    var full = null;
    if (this.state.fullTheorem) {
      full = <CompactTheorem theorem={this.state.fullTheorem} user={user} hide={showTheorem} max={max}/>;
      thin = null;
    }

    return <div>
      {thin}
      {full}
    </div>;
  },
})
