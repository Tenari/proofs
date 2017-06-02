var ShowTheorem = React.createClass({
  getInitialState: function(){
    return {
      tab: 'arguments',
    }
  },
  render: function(){
    var that = this;
    var theorem = this.props.theorem;

    return <div className="theorem">
      <div className="theorem-header">
        <button onClick={()=> that.setState({tab: 'arguments'})} className={this.state.tab == 'arguments' ? 'selected' : ''}>Arguments ({theorem.arguments_count})</button>
        <button onClick={()=> that.setState({tab: 'objections'})} className={this.state.tab == 'objections' ? 'selected' : ''}>Objections ({theorem.objections_count})</button>
      </div>
      <div className="theorem-body">
      </div>
    </div>
  }
})
