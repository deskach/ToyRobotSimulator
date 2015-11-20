var assert = require('assert');
var cConsts = require('../constants').commandConstants;
var CommandPlace = require('../cmdPlace').CommandPlace;

describe('CommandPlace', function () {
  it('has a valid name (is. "PLACE")');
  it('checks if the number of arguments is >= 3');
  it('supports args as an array');
  it('supports args as a dictionary');
  it('checks if x is a valid number');
  it('checks if y is a valid number');
  it('checks if Facing is valid');
});
