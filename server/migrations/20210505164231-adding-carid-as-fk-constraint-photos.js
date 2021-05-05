'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Photos', {
      fields: ['carId'],
      type: 'FOREIGN KEY',
      name: 'carid-fk-in-photos',
      references: {
        table: 'Cars',
        field: 'id'
      }
    }
  )    
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Photos', 'carid-fx-in-photos')
  }
};
