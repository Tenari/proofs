var ArgumentTheorem = React.createClass({
  getInitialState: function(){
    return {
      objections: [],
    }
  },
  showObjections: function(){
    if(this.state.objections.length == 0) {
      var that = this;
      $.ajax({
        url: '/theorems/'+this.props.theorem.id+'/objections.json',
        method: 'GET',
        success: function(data){
          that.setState({objections: data});
        }
      })
    } else {
      this.setState({objections: []});
    }
  },
  render: function(){
    var theorem = this.props.theorem;
    var argument = this.props.argument;
    var tids = this.props.tids;
    var user = this.props.user;
    var editMode = this.props.editMode;
    var changeTheorem = this.props.changeTheorem;
    var deleteTheorem = this.props.deleteTheorem;
    var addTheorem = this.props.addTheorem;
    var index = this.props.index;
    var max = this.props.max;
    var signInPath = this.props.signInPath;
    var newObjectionPath = this.props.newObjectionPath;
    var showObjections = this.showObjections;

    var linkUrl = "/theorems/"+theorem.id + "?tids="+tids+argument.theorem_id;

    var link = null;
    if (user && user.id == theorem.user_id) {
      link = <a href={linkUrl}>add support</a>;
    }
    if (theorem.arguments_count > 0) {
      link = <a href={linkUrl}>supporting arguments</a>;
    }

    var text = <span className="text">{theorem.text}</span>;

    var destroy = null;
    if (editMode) {
      element = <input type="text" value={theorem.text} onChange={(e) => changeTheorem(index, e.target.value)}/>;
      destroy = <span>({max - theorem.text.length} characters left) <a href="javascript:;" onClick={()=> deleteTheorem(theorem.id)}>X</a></span>;
    }

    var objection = <a className="object-link" href={signInPath}>Sign In to Object</a>;
    if (user) {
      if (user.id != theorem.user_id) {
        objection = <a className="object-link" href={newObjectionPath + "?objection_id=" + theorem.id}>I object!</a>;
      } else {
        objection = null;
      }
    }

    var objections = null;
    if (theorem.objections_count > 0){
      objections = <a className="objections-link" href="javascript:;" onClick={showObjections}>[{theorem.objections_count} objections]</a>;
      objection = null; // they can click the objections link if they want to object
    }

    var numberOrDot = '-';
    if (argument.ordered) {
      numberOrDot = <span className="number">{theorem.order+'.'}</span>;
    }


    return <div>
      <li key={index} className="argument-theorem">
        {numberOrDot}
        {text}
        {link}
        <span>
          {destroy}
          {objections}
          {objection}
        </span>
      </li>
      <div className={this.state.objections.length == 0 ? 'hide' : ''}>
        <Objections objections={this.state.objections}/>
      </div>
    </div>;
  },
})
