var Objections = React.createClass({
  render: function(){
    return <div className="objections-list">
      <h3>Objections</h3>
      {
        _.map(this.props.objections, function(objection){
          return <Objection objection={objection}/>;
        })
      }
    </div>
  }
})

var Objection = React.createClass({
  render: function(){
    return <div className="objection-summary">
      <div className="author">{this.props.objection.user.name} writes:</div>
      <div className="objection-text">{this.props.objection.text}</div>
    </div>
  }
})
