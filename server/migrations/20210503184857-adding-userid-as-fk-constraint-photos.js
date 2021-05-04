'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Photos', {
      fields: ['userId'],
      type: 'FOREIGN KEY',
      name: 'userid-fk-in-photos',
      references: {
        table: 'Users',
        field: 'id'
      }
    }
  )    
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Photos', 'userid-fx-in-photos')
  }
};
