"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var CalorieInput = require('./index.jsx').CalorieInput;
var list = require('./index.jsx').MealList;
var request = require('./index.jsx').createRequest;


ReactDOM.render(<CalorieInput />, document.getElementById('app'));
