'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role:DataTypes.INTEGER,
    location: DataTypes.STRING,
    promotion: DataTypes.STRING,
    profile_pic:DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          user.belongsTo(models.role,{
            foreignKey:'role',
          })
      }
    }
  });
  return user;
};