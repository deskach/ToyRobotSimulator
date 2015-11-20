var assert = require('assert');
var consts = require('./constants').commandConstants;
var CommandPlace = require('./cmdPlace').CommandPlace;
var CommandBasee = require('./cmdBase').CommandBase;

var defaultCreators = {};
defaultCreators[consts.Commands.PLACE] = function (args) {
  return new CommandPlace(args);
};
defaultCreators[consts.Commands.LEFT] = function (args) {
  return new CommandBasee(consts.Commands.LEFT);
};
defaultCreators[consts.Commands.RIGHT] = function (args) {
  return new CommandBasee(consts.Commands.RIGHT);
};
defaultCreators[consts.Commands.MOVE] = function (args) {
  return new CommandBasee(consts.Commands.MOVE);
};
defaultCreators[consts.Commands.REPORT] = function (args) {
  return new CommandBasee(consts.Commands.REPORT);
};

function CommandFactory(cmd2creator) {
  this.cmd2creator = cmd2creator || this.cmd2creator;
};

CommandFactory.prototype = Object.create(Object.prototype, {
  cmd2creator: { writable: true, configurable: false, value: defaultCreators },
});

CommandFactory.prototype.create = function (strCmd) {
  var s = strCmd.toString().trim();
  var cmdArr = (s.split(' '));
  var cmdName = cmdArr[0].toUpperCase();
  
  assert(this.cmd2creator.hasOwnProperty(cmdName))
  
  var argstr = cmdArr[1] || '';
  var cmdArgsArr = argstr.split(',');
  
  var cmd = this.cmd2creator[cmdName](cmdArgsArr);
  
  return cmd;
};

module.exports.CommandFactory = CommandFactory;