var assert = require('assert');
var consts = require('./constants').commandConstants;
var CommandPlace = require('./cmdPlace').CommandPlace;
var CommandBase = require('./cmdBase');

var defaultCreators = {};
defaultCreators[consts.Commands.PLACE] = function (args) {
  return new CommandPlace(args);
};
defaultCreators[consts.Commands.LEFT] = function () {
  return new CommandBase(consts.Commands.LEFT);
};
defaultCreators[consts.Commands.RIGHT] = function () {
  return new CommandBase(consts.Commands.RIGHT);
};
defaultCreators[consts.Commands.MOVE] = function () {
  return new CommandBase(consts.Commands.MOVE);
};
defaultCreators[consts.Commands.REPORT] = function () {
  return new CommandBase(consts.Commands.REPORT);
};

function CommandFactory(cmd2creator) {
  this.cmd2creator = cmd2creator || this.cmd2creator;
}

CommandFactory.prototype = Object.create(Object.prototype, {
  cmd2creator: { writable: true, configurable: false, value: defaultCreators }
});

CommandFactory.prototype.create = function (strCmd) {
  var cmdArr = (strCmd.split(' '));
  var cmdName = cmdArr[0].toUpperCase();
  
  assert(this.cmd2creator.hasOwnProperty(cmdName));
  
  var argstr = cmdArr[1] || '';
  var cmdArgsArr = argstr.split(',');
  
  return this.cmd2creator[cmdName](cmdArgsArr);
};

module.exports.CommandFactory = CommandFactory;