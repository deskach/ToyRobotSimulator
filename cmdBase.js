var consts = require('./constants').commandConstants;

function CommandBase(name, args) {
  this.name = name;
  this.args = args;
};

CommandBase.prototype = Object.create(Object.prototype, {
  name: { writable: true, configurable: false, value: "" },
  args: { writable: true, configurable: false, value: {} }
});

module.exports.CommandBase = CommandBase;
