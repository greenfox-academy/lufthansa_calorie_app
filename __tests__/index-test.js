'use strict';

jest.dontMock('../client/index.js');

import React from 'react';
import ReactDOM from'react-dom';
import TestUtils from'react-addons-test-utils';

var CalorieInput = require('../client/index.js');

describe('CalorieInput', function() {

  it('should exists', function() {
    var renderedComponent = TestUtils.renderIntoDocument(
      <CalorieInput />
    );
    expect(TestUtils.isCompositeComponent(renderedComponent)).toBeTruthy();
  });
});
