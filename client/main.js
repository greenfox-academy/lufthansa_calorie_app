"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var CalorieApp = require('./index.jsx').CalorieApp;
var list = require('./index.jsx').MealList;
var request = require('./index.jsx').createRequest;


ReactDOM.render(<CalorieApp />, document.getElementById('app'));
