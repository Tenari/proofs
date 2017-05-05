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
  render: function(){
    var state = this.state;
    var goToTheorem = function(t){
      window.location = '/theorems/'+t.id;
    }
    return <div className="theorem-list">
      <div className="search-section">
        <div className="search-bar">
          <input type="text"/>
          <button>search</button>
        </div>
        <div className="filters">
          <div className={classNames({left: true, selected: state.query.filters.mine})}>Mine</div>
          <div className={classNames({right: true, selected: !state.query.filters.mine})}>All</div>
        </div>
      </div>
      <div className="results">
        {
          _.map(this.state.theorems, function(theorem){
            return <div className="root-theorem-preview">
              <div className="header">
                <div className="title" onClick={()=>goToTheorem(theorem)}>{theorem.text}</div>
              </div>
              <div className="body">
                <div className="theorem-arguments">
                {_.map(theorem.arguments, function(a, index){
                  var comma = ', ';
                  if (index == theorem.arguments.length-1) {
                    comma = null;
                  }
                  return <span><a href={"/arguments/"+a.id}>{a.title}</a>{comma}</span>
                })}
                </div>
                <div className="timestamp">{theorem.updated_at}</div>
              </div>
            </div>
          })
        }
      </div>
    </div>;
  },
})
