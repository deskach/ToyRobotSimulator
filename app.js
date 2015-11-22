var StateUndefined = require('./stateUndefined');
var StateReady = require('./stateReady');
var StateMachine = require('./stateMachine');
var CommandFactory = require('./cmdFactory.js');

var states = [new StateUndefined(), new StateReady()];
var stateMachine = new StateMachine(states, StateUndefined.prototype.name());
var cmdFactory = new CommandFactory();
var readline = require('readline');

var input = [];

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

console.log('Write commands one command per line.');
console.log('Empty command will trigger robot to execute the queue of commands.');

rl.setPrompt('CMD>');
rl.prompt();

rl.on('line', function (d) {
  var strCmd = d.trim();
  
  if (strCmd.length > 0) {
    try {
      var cmd = cmdFactory.create(strCmd);
      input.push(cmd);
    } catch (e) {
      console.log('Wrong command "' + strCmd + '"');
    }
  } else {
    stateMachine.runAll(input);
    input = [];
  }
  
  rl.prompt();
}).on('close', function () {
  console.log('See you!');
  process.exit(0);
});
