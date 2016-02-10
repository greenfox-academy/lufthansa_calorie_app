'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
import FlatButton from 'material-ui/lib/flat-button';


var url = window.location + 'meals';

const FlatButtonExampleSimple = () => (
  <div>
    <FlatButton label="Default" />
  </div>
);

var createRequest = function(method, url, data, cb) {
  var request = new XMLHttpRequest();
  request.open(method, url, true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(data);
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      cb(request.response);
    }
  }
}

var MealList = React.createClass({
  render: function(response) {
    var createItem = function(meal) {
      return <li key={meal.meal_id}>{meal.name} {meal.calorie}kCal {meal.date}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
})

var CalorieInput = React.createClass({

  getInitialState: function() {
    return {items: [], name: '', calorie: '', date: Date.now()};
  },

  updateList: function(response) {
    console.log(response);
    this.setState({items: JSON.parse(response)})
  },

  componentDidMount: function() {
    this.getItems();
  },

  getItems: function() {
  createRequest('GET', url, {}, this.updateList);
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
    createRequest('POST', url, data, this.getItems);

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
        <MealList items={this.state.items}/>
      </div>
      );
  }
});

ReactDOM.render(<CalorieInput />, document.getElementById('app'))
