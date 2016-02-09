'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var CalorieInput = React.createClass({
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
    console.log(this.state.name + ' ' + this.state.calorie + ' kCal' + ' ' + this.state.date);
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