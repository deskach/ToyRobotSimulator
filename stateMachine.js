﻿var _ = require('underscore');

function StateMachine(states, currentStateName) {
  if (states) {
    var self = this;

    _.each(states, function (state) {
      state.stateMachine = self;
      self.states[state.name()] = state;
    });
    
    this.currentState = this.states[currentStateName];
  }
}

StateMachine.prototype = Object.create(Object.prototype, {
  states: { writable: true, configurable: false, value: {} },
  currentState: { writable: true, configurable: false, value: null }
});

StateMachine.prototype.runAll = function (input) {
  var self = this;

  _.each(input, function (cmd) {
    try {
      self.currentState = self.currentState.next(cmd);
      self.currentState.run();
    } catch (e) {
      console.log('Impossible command "' + cmd.name + '"');
    } 
  });
};

module.exports = StateMachine;
