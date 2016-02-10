'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
import FlatButton from 'material-ui/lib/flat-button';

var url = 'http://localhost:3000/meals';

const FlatButtonExampleSimple = () => (
  <div>
    <FlatButton label="Default" />
  </div>
);

var CalorieInput = React.createClass({

  createRequest: function(method, url, data, cb) {
    var request = new XMLHttpRequest();
    request.open(method, url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(data);
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        cb(request.response);
      }
    }
  },

  requestChecker: function(data) {
    console.log(data);
  },

  getInitialState: function() {
    return {name: '', calorie: '', date: Date.now()};
  },

  mealOnChange: function(event) {
    this.setState({name: event.target.value});
  },

  calorieOnChange: function(event) {
    this.setState({calorie: event.target.value});
  },

  dateOnChange: function(event) {
    this.setState({date: event.target.value});
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var dataToObject = {
      name: this.state.name,
      calorie: this.state.calorie,
      date: this.state.date
    };
    var data = JSON.stringify(dataToObject);
    // this.requestChecker('')

    this.createRequest('POST', url, data, this.requestChecker)
    // console.log(data);
  },

  render: function() {
    return (
      <div>
        <h1>Calorie Counter</h1>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.mealOnChange} value={this.state.name} placeholder="meal" />
          <input onChange={this.calorieOnChange} value={this.state.calorie} placeholder="calorie" />
          <input type="datetime-local" onChange={this.dateOnChange} value={this.state.date} />
          <button>SUBMIT</button>
        </form>
      </div>
      );
  }

});

ReactDOM.render(<CalorieInput />, document.getElementById('app'))
