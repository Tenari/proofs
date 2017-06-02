var Arguments = React.createClass({
  getInitialState: function(){
    return {
      argument: null,
    }
  },
  render: function() {
    var that = this;
    var props = this.props;
    var theorem = this.props.theorem;
    var noneMessage = null;
    if (theorem.arguments.length == 0) {
      noneMessage = <tr><td>There are no arguments supporting this theorem yet.</td></tr>;
    }

    if (theorem.arguments.length == 1) {
      return <ShowArgument argument={theorem.arguments[0]} path={props.path} user={props.user} newObjectionPath='/theorems/new' max={props.max}/>;
    }
    if (this.state.argument) {
      return <ShowArgument argument={this.state.argument} path={props.path} user={props.user} newObjectionPath='/theorems/new' max={props.max} goBack={()=>that.setState({argument: null})}/>;
    }

    return <div>
      <div className="arguments-header">Arguments</div>
      <table className="arguments">
        <tbody>
          {_.map(theorem.arguments, function(argument) {
            return <tr>
              <td><a href="#" onClick={() => that.setState({argument: JSON.parse(JSON.stringify(argument))})}>{argument.title}</a></td>
              <td>{theorem.user.name}</td>
            </tr>;
          })}
          {noneMessage}
        </tbody>
      </table>
    </div>;
  }
})
