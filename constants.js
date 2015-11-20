var commands = {
  PLACE: 'PLACE',
  MOVE: 'MOVE',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  REPORT: 'REPORT'
};

var exceptions = {
  ImplementMe: 'Implement me',
  badX: 'x is invalid',
  badY: 'y is invalid',
  badF: 'facing is invalid'
};

module.exports.stateConstants = {
  types: {
    base: 'BASE',
    undefined: 'UNDEFINED',
    ready: 'READY'
  },
  
  Facings: {
    NORTH: 'NORTH',
    EAST: 'EAST',
    SOUTH: 'SOUTH',
    WEST: 'WEST'
  },
  
  Commands : commands,
  
  Exceptions: exceptions,
  
  minX: 0,
  minY: 0,
  maxX: 5,
  maxY: 5
};

module.exports.stateMachineConstants = {
  stateNames : {
    READY: 'READY',
    UNDEFINED: 'UNDEFINED'
  }
};

module.exports.commandConstants = {
  Commands: commands,
  Exceptions: exceptions
};
