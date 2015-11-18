var StateBase = require('./stateBase').StateBase;
var sConsts = require('./constants').stateConstants;
var smConsts = require('./constants').stateMachineConstants;

var StateUndefined = function (stateMachine) {
  StateBase.call(this, stateMachine);
}

StateUndefined.prototype = Object.create(StateBase.prototype);

StateUndefined.prototype.name = function () {
  return sConsts.types.undefined;
}

StateUndefined.prototype.next = function (cmd) {
  this.validate(cmd);
  
  if (cmd.name === sConsts.Commands.PLACE) {
    var nextState = this.stateMachine.states[smConsts.stateNames.READY];
    
    nextState.cmd = cmd;
    
    return nextState;
  }
  
  return this;
}

StateUndefined.prototype.run = function () {
  return;
}

StateUndefined.prototype.constructor = StateUndefined;

module.exports.StateUndefined = StateUndefined;
