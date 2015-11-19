var consts = require('./constants').stateConstants;
var assert = require('assert');

function StateBase(stateMachine) {
  this.stateMachine = stateMachine;
}

StateBase.prototype = Object.create(Object.prototype, {
  x: { writable: true, configurable: false, value: consts.minX },
  y: { writable: true, configurable: false, value: consts.minY },
  f: { writable: true, configurable: false, value: undefined },
  cmd: { writable: true, configurable: false, value: null },
  stateMachine: {
    writable: true, 
    configurable: false, 
    value: undefined
  }
});

StateBase.prototype.name = function () {
  return consts.types.base;
};

StateBase.prototype.validate = function (cmd) {
  assert(cmd.hasOwnProperty('name'));
  
  if (cmd.name === consts.Commands.PLACE) {
    assert(cmd.hasOwnProperty('args'));
    assert(cmd.args.hasOwnProperty('x'));
    assert(cmd.args.hasOwnProperty('y'));
    assert(cmd.args.hasOwnProperty('f'));
    
    var x = cmd.args.x,
        y = cmd.args.y,
        f = cmd.args.f;
    
    if (x < consts.minX || x > consts.maxX) {
      throw consts.Exceptions.badX;
    } else if (y < consts.minY || y > consts.maxY) {
      throw consts.Exceptions.badY;
    } else if (f === consts.Facings.UNDEFINED || 
            !consts.Facings.hasOwnProperty(f)) {
      throw consts.Exceptions.badF;
    }
  } else if (cmd.name === consts.Commands.MOVE) {
    if ((this.f === consts.Facings.NORTH) && (this.y + 1 > consts.maxY)) {
      throw consts.Exceptions.badY;
    } else if ((this.f === consts.Facings.SOUTH) && (this.y - 1 < consts.minY)) {
      throw consts.Exceptions.badY;
    } else if ((this.f === consts.Facings.EAST) && (this.x + 1 > consts.maxX)) {
      throw consts.Exceptions.badX;
    } else if ((this.f === consts.Facings.WEST) && (this.x - 1 < consts.minX)) {
      throw consts.Exceptions.badX;
    }
  }
};

StateBase.prototype.next = function () {
  throw "Override me";
};

module.exports.StateBase = StateBase;
