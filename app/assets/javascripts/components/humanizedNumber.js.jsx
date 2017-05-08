function humanizedNumber(number) {
  if(number == 0) return 0;

  with (Math) {
    var base = floor(log(abs(number)) / log(1000));
    var suffix = 'KMBTQ'[base-1];
    var factor = number / pow(1000, base);

    // Show one decimal place iff that decimal place will not be zero.
    if(factor % 1 != 0) factor = factor.toFixed(2);

    return suffix ? factor + suffix : '' + factor;
  }
}

// This is intended to be a near-direct port of the Rails function number_to_human as currently used in the app.
// Any discrepancies need to be fixed here.

var HumanizedNumber = React.createClass({
  render: function(){
    if(this.props.number == null) return null;
    
    var formatted = humanizedNumber(this.props.number);

    var title = this.props.number.toLocaleString();
    if (this.props.titlePrefix) {
      title = this.props.titlePrefix + title;
    }
    
    return <span title={title}>
      {formatted}
    </span>;
  }
});

