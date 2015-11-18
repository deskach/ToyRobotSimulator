var StateUndefined = require('./stateUndefined').StateUndefined;
var StateReady = require('./stateReady').StateReady;
var StateMachine = require('./stateMachine').StateMachine;
var sConsts = require('./constants').stateConstants;

var states = [new StateUndefined(), new StateReady()];
var stateMachine = new StateMachine(states, StateUndefined.prototype.name())

var stdin = process.openStdin();
var input = [];

stdin.addListener("data", function (d) {
  var s = d.toString().trim();
  var cmdArgsArr = (s.split(' '));
  var cmdName = cmdArgsArr[0].toUpperCase();
  var argstr = cmdArgsArr[1] || '';
  var cmdArgsArr = argstr.split(',');
  var cmdArgs = undefined;
  
  if (cmdName) {
    if (cmdArgsArr && cmdArgsArr[0]) {
      cmdArgs = {};
      cmdArgs['x'] = parseInt(cmdArgsArr[0]);
      cmdArgs['y'] = parseInt(cmdArgsArr[1]);
      cmdArgs['f'] = cmdArgsArr[2].toUpperCase();
    }
    
    var smCmd = {
      name: cmdName,
      args: cmdArgs
    };
    
    input.push(smCmd);
  } else {
    stateMachine.runAll(input);
    input = [];
  }
});
