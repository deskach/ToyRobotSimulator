var assert = require('assert');
var consts = require('./constants').commandConstants;
var sConsts = require('./constants').stateConstants;
var CommandBase = require('./cmdBase');

function CommandPlace(args) {
  var x, y, f;
  
  if (args instanceof Array) {
    assert(args.length >= 3);
    
    x = parseInt(args[0]);
    y = parseInt(args[1]);
    f = args[2].toUpperCase();
  } else {
    assert(Object.keys(args).length >= 3);
    
    x = parseInt(args['x']);
    y = parseInt(args['y']);
    f = args['f'].toUpperCase();
  }
  
  assert(x + 0 === x);
  assert(y + 0 === y);
  assert(sConsts.Facings.hasOwnProperty(f));
  
  CommandBase.call(this, consts.Commands.PLACE, { x: x, y: y, f: f });
};

CommandPlace.prototype = Object.create(CommandBase.prototype);

module.exports = CommandPlace;