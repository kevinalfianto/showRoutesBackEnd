'use strict';
module.exports = function(sequelize, DataTypes) {
  var Position = sequelize.define('Position', {
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Position;
};