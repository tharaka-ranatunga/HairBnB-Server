/**
 * Created by Tharaka_kamal on 7/12/2017.
 */
module.exports = function(sequelize, DataTypes) {
    var role = sequelize.define('role', {
        role: DataTypes.STRING,
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return role;
};