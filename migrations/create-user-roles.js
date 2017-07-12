/**
 * Created by Tharaka_kamal on 7/12/2017.
 */
/**
 * Created by Tharaka_kamal on 7/12/2017.
 */
'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('roles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            role: {
                allowNull: false,
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('roles');
    }
};