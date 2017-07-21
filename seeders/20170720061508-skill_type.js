'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('skill_types',[
          {skill_name: 'Barber'},
          {skill_name: 'Freehand'},
          {skill_name: 'Razor'},
          {skill_name: 'Shaving'},
          {skill_name: 'Scissor over comb'},
          {skill_name: 'Texturing'},
          {skill_name: 'Clipper work'},
          {skill_name: 'Classics'},
          {skill_name: 'Dry cutting'},
          {skill_name: 'Wig cutting'},
          {skill_name: 'Long hair'},
          {skill_name: 'Short hair'},
          {skill_name: 'Makeup'},
          {skill_name: 'Hair coloring'}

      ])
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
