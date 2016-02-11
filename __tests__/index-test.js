'use strict';

jest.dontMock('../client/index.jsx');

import React from 'react';
import ReactDOM from'react-dom';
import TestUtils from'react-addons-test-utils';

var CalorieInput = require('../client/index.jsx');

describe('CalorieInput', function() {

  it('should exists', function() {
    var renderedComponent = TestUtils.renderIntoDocument(
      <CalorieInput />
    );
    expect(TestUtils.isCompositeComponent(renderedComponent)).toBeTruthy();
  });
});
