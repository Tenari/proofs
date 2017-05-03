var NewSource = React.createClass({
  getInitialState: function(){
    return {
      open: false,
      link: '',
    };
  },
  toggle: function(){
    this.setState({open: !this.state.open});
  },
  updateLink: function(e){
    this.setState({link: e.target.value});
  },
  submit: function(){
    $.ajax({
      type: 'PUT',
      url: this.props.updateTheoremPath,
      data: {
        theorem: {
          source: this.state.link,
        },
      },
      success: function(){
        window.location.reload();
      },
    })
  },
  render: function(){
    if (this.state.open) {
      return <div className="new-link">
        <div>Link: <input type="text" value={this.state.link} onChange={this.updateLink}/></div>
        <button onClick={this.submit}>Submit</button>
        <button onClick={this.toggle}>Cancel</button>
      </div>;
    } else {
      return <button onClick={this.toggle}>Add a link to support this theorem</button>;
    }
  },
})
