var TheoremList = React.createClass({
  getInitialState: function(){
    return {
      theorems: this.props.theorems,
      query: {
        search: '',
        filters: {
          mine: true,
        },
      }
    };
  },
  changeSearch: function(e){
    var q = this.state.query;
    q.search = e.target.value;
    this.setState({query: q});
  },
  handleKey: function(e){
    if (e.keyCode == 13) // enter 
      this.search();
  },
  search: function(){
    var that = this;
    $.ajax({
      type: 'GET',
      url: window.location.pathname + '.json',
      data: {
        query: this.state.query,
      },
      success: function(data){
        that.setState({theorems: data});
      },
    })
  },
  render: function(){
    var state = this.state;
    var filters = null;
    if (this.props.user) {
      filters = <div className="filters">
        <div className={classNames({left: true, selected: state.query.filters.mine})}>Mine</div>
        <div className={classNames({right: true, selected: !state.query.filters.mine})}>All</div>
      </div>;
    }
    var searchSection = null;
    if (!this.props.noSearch) {
      searchSection = <div className="search-section">
        <div className="search-bar">
          <input type="text" value={this.state.query.search} onChange={this.changeSearch} onKeyUp={this.handleKey}/>
          <button onClick={this.search}>Search</button>
        </div>
        {filters}
      </div>;
    }
    return <div className="theorem-list">
      {searchSection}
      <div className="results">
        {
          _.map(this.state.theorems, function(theorem){
            return <div className="root-theorem-preview">
              <div className="header">
                <div className="title"><a href={"/theorems/"+theorem.id}>{theorem.text}</a></div>
                <div className="views"><HumanizedNumber number={theorem.views} titlePrefix="Views: "/> views</div>
              </div>
              <div className="body">
                <div className="theorem-arguments">
                {_.map(theorem.arguments, function(a, index){
                  var comma = ', ';
                  if (index == theorem.arguments.length-1) {
                    comma = null;
                  }
                  return <span>{a.title}{comma}</span>
                })}
                </div>
                <div className="footer"><span className="timestamp">{theorem.updated_at}</span></div>
              </div>
            </div>
          })
        }
      </div>
    </div>;
  },
})
