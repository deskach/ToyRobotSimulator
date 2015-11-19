var StateBase = require('./stateBase').StateBase;
var StateUndefined = require('./stateUndefined').StateUndefined;
var sConsts = require('./constants').stateConstants;
var assert = require('assert');

var face2face = {};
face2face[sConsts.Commands.LEFT] = {};
face2face[sConsts.Commands.LEFT][sConsts.Facings.EAST] = sConsts.Facings.NORTH;
face2face[sConsts.Commands.LEFT][sConsts.Facings.NORTH] = sConsts.Facings.WEST;
face2face[sConsts.Commands.LEFT][sConsts.Facings.WEST] = sConsts.Facings.SOUTH;
face2face[sConsts.Commands.LEFT][sConsts.Facings.SOUTH] = sConsts.Facings.EAST;
face2face[sConsts.Commands.RIGHT] = {};
face2face[sConsts.Commands.RIGHT][sConsts.Facings.EAST] = sConsts.Facings.SOUTH;
face2face[sConsts.Commands.RIGHT][sConsts.Facings.NORTH] = sConsts.Facings.EAST;
face2face[sConsts.Commands.RIGHT][sConsts.Facings.WEST] = sConsts.Facings.NORTH;
face2face[sConsts.Commands.RIGHT][sConsts.Facings.SOUTH] = sConsts.Facings.WEST;

function StateReady(options) {
  StateBase.call(this, options);
}

StateReady.prototype = Object.create(StateBase.prototype);
StateReady.prototype.name = function () {
  return sConsts.types.ready;
};

StateReady.prototype.run = function () {
  assert(this.cmd);
  
  if (this.cmd.name === sConsts.Commands.PLACE) {
    this.x = this.cmd.args.x;
    this.y = this.cmd.args.y;
    this.f = this.cmd.args.f;
  } else if (this.cmd.name === sConsts.Commands.MOVE) {
    if (this.f === sConsts.Facings.NORTH) {
      this.y += 1;
    } else if (this.f === sConsts.Facings.SOUTH) {
      this.y -= 1;
    } else if (this.f === sConsts.Facings.EAST) {
      this.x += 1;
    } else if (this.f === sConsts.Facings.WEST) {
      this.x -= 1;
    }
  } else if (this.cmd.name === sConsts.Commands.LEFT) {
    this.f = face2face[sConsts.Commands.LEFT][this.f];
  } else if (this.cmd.name === sConsts.Commands.RIGHT) {
    this.f = face2face[sConsts.Commands.RIGHT][this.f];
  } else if (this.cmd.name === sConsts.Commands.REPORT) {
    var output = [this.x, this.y, this.f].join(',');
    
    this.report(output);
  }
};

StateReady.prototype.next = function (cmd) {
  this.validate(cmd);
  this.cmd = cmd;
  
  return this;
};

module.exports.StateReady = StateReady;
