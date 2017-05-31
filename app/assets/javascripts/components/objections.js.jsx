var Objections = React.createClass({
  render: function(){
    var user = this.props.user;
    var max = this.props.max;
    var newObjectionLink = <a href={"/theorems/new?objection_id="+this.props.theorem.id}>Add objection</a>;
    if (!user || user.id == this.props.theorem.user_id) {
      newObjectionLink = null;
    }
    return <div className="objections-list">
      {
        _.map(this.props.objections, function(objection){
          return <Objection objection={objection} user={user} max={max}/>;
        })
      }
      {newObjectionLink}
    </div>
  }
})

var Objection = React.createClass({
  getInitialState: function(){
    return { fullTheorem: false};
  },
  showTheorem: function(){
    if(this.state.fullTheorem) {
      this.setState({fullTheorem: false});
    } else {
      var that = this;
      $.ajax({
        url: '/theorems/'+this.props.objection.id+'.json',
        method: 'GET',
        success: function(data){
          that.setState({fullTheorem: data});
        }
      })
    }
  },
  render: function(){
    var objection = this.props.objection;
    var link = null;
    if (objection.arguments_count > 0 || objection.objections_count > 0) {
      link = <a href="javascript:;" onClick={this.showTheorem}>Expand</a>;
    } else {
      link = <a href={"/theorems/"+objection.id}>{this.props.user.id == objection.user_id ? 'Edit' : 'I object!'}</a>
    }

    var writes = <div className="top-line">
      <span className="author">{objection.user.name} writes:</span>
      {link}
    </div>;

    var text = null;
    if (this.state.fullTheorem) {
      text = <CompactTheorem theorem={this.state.fullTheorem} user={this.props.user} hide={this.showTheorem} writes={true} max={this.props.max}/>
      writes = null;
    } else {
      text = <div className="objection-text">{objection.text}</div>
    }

    return <div className={"objection-summary" + (this.state.fullTheorem ? ' no-bottom-line' : '')}>
      {writes}
      {text}
    </div>
  }
})
