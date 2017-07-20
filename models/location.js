'use strict';
module.exports = function(sequelize, DataTypes) {
  var location = sequelize.define('location', {
      location_name: {
          type: DataTypes.STRING,
          required: true
      }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return location;
};