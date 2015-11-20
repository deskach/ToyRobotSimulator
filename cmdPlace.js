var assert = require('assert');
var consts = require('./constants').commandConstants;
var sConsts = require('./constants').stateConstants;
var CommandBase = require('./cmdBase').CommandBase;

function CommandPlace(args) {
  assert(args.length >= 3);
  
  var x = parseInt(args[0]),
      y = parseInt(args[1]), 
      f = args[2].toUpperCase();
  
  assert(x + 0 === x);
  assert(y + 0 === y);
  assert(sConsts.Facings.hasOwnProperty(f));
  
  CommandBase.call(this, consts.Commands.PLACE, { x: x, y: y, f: f });
};

CommandPlace.prototype = Object.create(CommandBase.prototype);

module.exports.CommandPlace = CommandPlace;